import type { DreamMap, MapEdge, MapNode, NodeKind } from './types'

/**
 * Layout for the dream map: a layered top-to-bottom flow, one band per node
 * kind, in causal order. The model authors the graph; nothing here is
 * draggable. Positions are fully derived, so the diagram is stable across
 * reloads and the record stays free of view state.
 */

export const KIND_ORDER: NodeKind[] = ['origin', 'trigger', 'world', 'lens', 'consequence']

export const KIND_LABEL: Record<NodeKind, string> = {
  origin: 'Conditions',
  trigger: 'Triggers',
  world: 'The world it makes',
  lens: 'How things get read',
  consequence: 'What keeps happening',
}

/** Maps onto the existing NT diagram tokens in globals.css. */
export const KIND_COLOR: Record<NodeKind, string> = {
  origin: 'var(--nt-state)',
  trigger: 'var(--nt-action)',
  world: 'var(--nt-reality)',
  lens: 'var(--nt-mind)',
  consequence: 'var(--nt-body)',
}

export const NODE_W = 188
export const LINE_H = 15
export const NODE_PAD_Y = 13
export const COL_GAP = 30
export const ROW_GAP = 74
export const MARGIN_X = 24
export const MARGIN_TOP = 30
export const MARGIN_BOTTOM = 24
/** Left gutter holding the band names, which wrap to two lines. */
export const GUTTER = 116
export const BAND_LINE_H = 13
/** Right-hand channel reserved for feedback loops, only when there are any. */
export const LOOP_GUTTER = 46

export interface PositionedNode extends MapNode {
  x: number
  y: number
  w: number
  h: number
  lines: string[]
}

export interface PositionedEdge extends MapEdge {
  path: string
  /** Midpoint for the label, and whether the edge runs backwards (a loop). */
  labelX: number
  labelY: number
  isLoop: boolean
}

export interface Band {
  kind: NodeKind
  y: number
  h: number
  /** Pre-wrapped so the name never runs into the first node. */
  labelLines: string[]
}

export interface Layout {
  nodes: PositionedNode[]
  edges: PositionedEdge[]
  bands: Band[]
  width: number
  height: number
}

/**
 * Wraps a label to the node width. SVG has no text wrapping, so we estimate
 * from an average glyph advance — close enough at this size, and it keeps the
 * whole diagram in plain <text> where it stays selectable and themeable.
 */
function wrap(text: string, maxChars = 24): string[] {
  const words = text.trim().split(/\s+/)
  const lines: string[] = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 3)
}

export function layoutMap(map: DreamMap): Layout {
  const visible = map.nodes.filter((n) => n.confidence !== 'rejected')

  // Only render bands that hold something — an empty "Conditions" row would
  // read as a gap the person is meant to fill, which is exactly wrong here.
  const activeKinds = KIND_ORDER.filter((k) => visible.some((n) => n.kind === k))

  const rows = activeKinds.map((kind) => ({
    kind,
    nodes: visible.filter((n) => n.kind === kind),
  }))

  const widest = Math.max(1, ...rows.map((r) => r.nodes.length))
  const contentW = widest * NODE_W + (widest - 1) * COL_GAP
  const baseW = GUTTER + contentW + MARGIN_X * 2

  const positioned: PositionedNode[] = []
  const bands: Band[] = []
  let y = MARGIN_TOP

  for (const row of rows) {
    const lineCounts = row.nodes.map((n) => wrap(n.label).length)
    const rowH = Math.max(...lineCounts) * LINE_H + NODE_PAD_Y * 2

    const rowW = row.nodes.length * NODE_W + (row.nodes.length - 1) * COL_GAP
    const startX = GUTTER + MARGIN_X + (contentW - rowW) / 2

    row.nodes.forEach((node, index) => {
      positioned.push({
        ...node,
        x: startX + index * (NODE_W + COL_GAP),
        y,
        w: NODE_W,
        h: rowH,
        lines: wrap(node.label),
      })
    })

    bands.push({ kind: row.kind, y, h: rowH, labelLines: wrap(KIND_LABEL[row.kind], 14) })
    y += rowH + ROW_GAP
  }

  const height = Math.max(y - ROW_GAP + MARGIN_BOTTOM, 120)
  const byId = new Map(positioned.map((n) => [n.id, n]))

  const live = map.edges.filter((edge) => {
    if (edge.confidence === 'rejected') return false
    const from = byId.get(edge.from)
    const to = byId.get(edge.to)
    return Boolean(from && to)
  })

  // A backward edge is a feedback loop — a consequence feeding a trigger.
  // Those are truthful and common, so they get their own channel down the
  // right rather than being drawn straight back through the diagram.
  const isBackward = (edge: MapEdge) => byId.get(edge.to)!.y <= byId.get(edge.from)!.y
  const hasLoop = live.some(isBackward)
  const width = baseW + (hasLoop ? LOOP_GUTTER : 0)
  const loopX = baseW + LOOP_GUTTER / 2

  const edges: PositionedEdge[] = []
  for (const edge of live) {
    const from = byId.get(edge.from)!
    const to = byId.get(edge.to)!
    const isLoop = isBackward(edge)

    if (isLoop) {
      const sx = from.x + from.w
      const sy = from.y + from.h / 2
      const tx = to.x + to.w
      const ty = to.y + to.h / 2
      edges.push({
        ...edge,
        isLoop,
        path: `M ${sx} ${sy} C ${loopX} ${sy}, ${loopX} ${ty}, ${tx} ${ty}`,
        labelX: loopX,
        labelY: (sy + ty) / 2,
      })
      continue
    }

    const sx = from.x + from.w / 2
    const sy = from.y + from.h
    const tx = to.x + to.w / 2
    const ty = to.y
    const mid = (sy + ty) / 2
    // The label sits in the gap directly under its source rather than at the
    // curve's midpoint — an edge that skips a band would otherwise drop its
    // label straight onto a node in the band it passes over.
    edges.push({
      ...edge,
      isLoop,
      path: `M ${sx} ${sy} C ${sx} ${mid}, ${tx} ${mid}, ${tx} ${ty}`,
      labelX: sx + (tx - sx) * 0.16,
      labelY: sy + Math.min(18, (ty - sy) / 2),
    })
  }

  return { nodes: positioned, edges, bands, width, height }
}
