import type {
  ChatMessage,
  Confidence,
  IfThen,
  MapNode,
  NodeKind,
  ProgramState,
  ResponseOption,
  StageId,
  ToolCall,
} from './types'
import { STAGES } from './stages'

export const STORAGE_KEY = 'nt.program.v1'
const VERSION = 1

export const STAGE_IDS: StageId[] = [1, 2, 3, 4, 5]

export function createState(now = Date.now()): ProgramState {
  return {
    version: VERSION,
    createdAt: now,
    updatedAt: now,
    currentStage: 1,
    status: { 1: 'active', 2: 'locked', 3: 'locked', 4: 'locked', 5: 'locked' },
    completionProposals: {},
    observations: [],
    map: { nodes: [], edges: [] },
    plan: { issues: [], anticipations: [] },
    missions: [],
    practices: [],
    transcripts: { 1: [], 2: [], 3: [], 4: [], 5: [] },
  }
}

export function loadState(): ProgramState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ProgramState
    // A version bump means the shape changed; start clean rather than
    // half-migrating a demo record into a form the UI can't render.
    if (parsed.version !== VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function saveState(state: ProgramState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Quota exceeded or storage disabled — the session still works in memory.
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

/* ------------------------------------------------------------------ *
 * Applying the model's tool calls
 * ------------------------------------------------------------------ */

const s = (v: unknown): string | undefined => (typeof v === 'string' && v ? v : undefined)
const req = (v: unknown): string => (typeof v === 'string' ? v : '')

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Applies one tool call and returns the next state plus a short human-readable
 * description of what changed. The description is shown under the assistant's
 * message so the person can see exactly what was written to their file — the
 * model is told not to narrate this itself.
 */
export function applyToolCall(
  state: ProgramState,
  call: ToolCall,
  now = Date.now(),
): { state: ProgramState; effect: string | null } {
  const i = call.input
  const next: ProgramState = { ...state, updatedAt: now }

  switch (call.name) {
    case 'record_observation': {
      const text = req(i.text)
      if (!text) return { state, effect: null }
      next.observations = [
        ...state.observations,
        {
          id: uid('obs'),
          category: (req(i.category) || 'outlook') as never,
          text,
          basis: s(i.basis),
          createdAt: now,
        },
      ]
      return { state: next, effect: `Noted — ${text}` }
    }

    case 'propose_node': {
      const id = req(i.id)
      const label = req(i.label)
      if (!id || !label) return { state, effect: null }
      const node: MapNode = {
        id,
        kind: (req(i.kind) || 'world') as NodeKind,
        label,
        detail: s(i.detail),
        confidence: 'proposed',
        createdAt: now,
      }
      const exists = state.map.nodes.some((n) => n.id === id)
      next.map = {
        ...state.map,
        nodes: exists
          ? state.map.nodes.map((n) => (n.id === id ? { ...n, ...node, createdAt: n.createdAt } : n))
          : [...state.map.nodes, node],
      }
      return { state: next, effect: `Added to the map — ${label}` }
    }

    case 'propose_edge': {
      const from = req(i.from)
      const to = req(i.to)
      if (!from || !to || from === to) return { state, effect: null }
      // Both endpoints must exist, or the diagram would render a dangling arrow.
      const known = new Set(state.map.nodes.map((n) => n.id))
      if (!known.has(from) || !known.has(to)) return { state, effect: null }
      if (state.map.edges.some((e) => e.from === from && e.to === to)) {
        return { state, effect: null }
      }
      next.map = {
        ...state.map,
        edges: [
          ...state.map.edges,
          { id: uid('edge'), from, to, label: s(i.label), confidence: 'proposed' },
        ],
      }
      return { state: next, effect: null }
    }

    case 'update_node': {
      const id = req(i.id)
      const node = state.map.nodes.find((n) => n.id === id)
      if (!node) return { state, effect: null }
      const confidence = s(i.confidence) as Confidence | undefined
      const updated: MapNode = {
        ...node,
        label: s(i.label) ?? node.label,
        detail: s(i.detail) ?? node.detail,
        confidence: confidence ?? node.confidence,
      }
      next.map = {
        ...state.map,
        nodes: state.map.nodes.map((n) => (n.id === id ? updated : n)),
        // An edge is only as good as its weaker endpoint.
        edges:
          confidence === 'rejected'
            ? state.map.edges.map((e) =>
                e.from === id || e.to === id ? { ...e, confidence: 'rejected' as const } : e,
              )
            : state.map.edges,
      }
      const effect =
        confidence && confidence !== node.confidence
          ? confidence === 'confirmed'
            ? `Confirmed — ${updated.label}`
            : confidence === 'rejected'
              ? `Dropped — ${updated.label}`
              : null
          : `Revised — ${updated.label}`
      return { state: next, effect }
    }

    case 'remove_node': {
      const id = req(i.id)
      const node = state.map.nodes.find((n) => n.id === id)
      if (!node) return { state, effect: null }
      next.map = {
        ...state.map,
        nodes: state.map.nodes.filter((n) => n.id !== id),
        edges: state.map.edges.filter((e) => e.from !== id && e.to !== id),
      }
      return { state: next, effect: `Removed — ${node.label}` }
    }

    case 'remove_edge': {
      const from = req(i.from)
      const to = req(i.to)
      next.map = {
        ...state.map,
        edges: state.map.edges.filter((e) => !(e.from === from && e.to === to)),
      }
      return { state: next, effect: null }
    }

    case 'set_map_frame': {
      next.map = {
        ...state.map,
        title: s(i.title) ?? state.map.title,
        thesis: s(i.thesis) ?? state.map.thesis,
      }
      const thesis = s(i.thesis)
      return { state: next, effect: thesis ? `The dream, in one line — ${thesis}` : null }
    }

    case 'add_plan_issue':
    case 'update_plan_issue': {
      const id = req(i.id)
      if (!id) return { state, effect: null }
      const existing = state.plan.issues.find((issue) => issue.id === id)
      const responses = Array.isArray(i.responses)
        ? (i.responses as ResponseOption[]).filter((r) => r && typeof r.text === 'string')
        : undefined
      const protocols = Array.isArray(i.protocols)
        ? (i.protocols as IfThen[]).filter((p) => p && typeof p.when === 'string')
        : undefined

      if (existing) {
        const updated = {
          ...existing,
          title: s(i.title) ?? existing.title,
          showsUpWhen: s(i.showsUpWhen) ?? existing.showsUpWhen,
          responsibility: s(i.responsibility) ?? existing.responsibility,
          responses: responses ?? existing.responses,
          protocols: protocols ?? existing.protocols,
        }
        next.plan = {
          ...state.plan,
          issues: state.plan.issues.map((issue) => (issue.id === id ? updated : issue)),
        }
        return { state: next, effect: `Updated the plan — ${updated.title}` }
      }

      const title = req(i.title)
      if (!title) return { state, effect: null }
      next.plan = {
        ...state.plan,
        issues: [
          ...state.plan.issues,
          {
            id,
            title,
            showsUpWhen: req(i.showsUpWhen),
            responsibility: s(i.responsibility),
            responses: responses ?? [],
            protocols: protocols ?? [],
            nodeId: s(i.nodeId),
            createdAt: now,
          },
        ],
      }
      return { state: next, effect: `Added to the plan — ${title}` }
    }

    case 'add_anticipation': {
      const objection = req(i.objection)
      if (!objection) return { state, effect: null }
      next.plan = {
        ...state.plan,
        anticipations: [
          ...state.plan.anticipations,
          { id: req(i.id) || uid('ant'), objection, reply: req(i.reply), createdAt: now },
        ],
      }
      return { state: next, effect: `Named in advance — ${objection}` }
    }

    case 'add_mission':
    case 'update_mission': {
      const id = req(i.id)
      if (!id) return { state, effect: null }
      const existing = state.missions.find((m) => m.id === id)
      if (existing) {
        const updated = {
          ...existing,
          title: s(i.title) ?? existing.title,
          why: s(i.why) ?? existing.why,
          cadence: s(i.cadence) ?? existing.cadence,
          successLooksLike: s(i.successLooksLike) ?? existing.successLooksLike,
          active: typeof i.active === 'boolean' ? i.active : existing.active,
        }
        next.missions = state.missions.map((m) => (m.id === id ? updated : m))
        return {
          state: next,
          effect: updated.active ? `Updated — ${updated.title}` : `Retired — ${updated.title}`,
        }
      }
      const title = req(i.title)
      if (!title) return { state, effect: null }
      next.missions = [
        ...state.missions,
        {
          id,
          title,
          why: s(i.why),
          cadence: s(i.cadence),
          successLooksLike: s(i.successLooksLike),
          issueId: s(i.issueId),
          checkins: [],
          active: true,
          createdAt: now,
        },
      ]
      return { state: next, effect: `New mission — ${title}` }
    }

    case 'log_checkin': {
      const missionId = req(i.missionId)
      const mission = state.missions.find((m) => m.id === missionId)
      if (!mission) return { state, effect: null }
      next.missions = state.missions.map((m) =>
        m.id === missionId
          ? {
              ...m,
              checkins: [
                ...m.checkins,
                {
                  id: uid('chk'),
                  status: (req(i.status) || 'mixed') as never,
                  note: req(i.note),
                  createdAt: now,
                },
              ],
            }
          : m,
      )
      return { state: next, effect: `Checked in on — ${mission.title}` }
    }

    case 'add_practice':
    case 'update_practice': {
      const id = req(i.id)
      if (!id) return { state, effect: null }
      const existing = state.practices.find((p) => p.id === id)
      if (existing) {
        const updated = {
          ...existing,
          name: s(i.name) ?? existing.name,
          instructions: s(i.instructions) ?? existing.instructions,
          duration: s(i.duration) ?? existing.duration,
          aimedAt: s(i.aimedAt) ?? existing.aimedAt,
        }
        next.practices = state.practices.map((p) => (p.id === id ? updated : p))
        return { state: next, effect: `Revised — ${updated.name}` }
      }
      const name = req(i.name)
      if (!name) return { state, effect: null }
      next.practices = [
        ...state.practices,
        {
          id,
          name,
          instructions: req(i.instructions),
          duration: s(i.duration),
          aimedAt: s(i.aimedAt),
          createdAt: now,
        },
      ]
      return { state: next, effect: `New practice — ${name}` }
    }

    case 'propose_stage_complete': {
      next.completionProposals = {
        ...state.completionProposals,
        [state.currentStage]: req(i.summary),
      }
      return { state: next, effect: null }
    }

    default:
      return { state, effect: null }
  }
}

/* ------------------------------------------------------------------ *
 * Stage navigation — always user-driven
 * ------------------------------------------------------------------ */

export function completeStage(state: ProgramState, stage: StageId): ProgramState {
  const nextStage = Math.min(5, stage + 1) as StageId
  return {
    ...state,
    updatedAt: Date.now(),
    currentStage: nextStage,
    status: {
      ...state.status,
      [stage]: 'complete',
      [nextStage]: state.status[nextStage] === 'locked' ? 'active' : state.status[nextStage],
    },
  }
}

/** Revisiting an earlier stage is always allowed once it has been reached. */
export function goToStage(state: ProgramState, stage: StageId): ProgramState {
  if (state.status[stage] === 'locked') return state
  return { ...state, currentStage: stage, updatedAt: Date.now() }
}

export function appendMessage(
  state: ProgramState,
  stage: StageId,
  message: ChatMessage,
): ProgramState {
  return {
    ...state,
    updatedAt: Date.now(),
    transcripts: { ...state.transcripts, [stage]: [...state.transcripts[stage], message] },
  }
}

/* ------------------------------------------------------------------ *
 * Serializing the record back into the prompt
 * ------------------------------------------------------------------ */

/**
 * Renders the state as markdown for the system prompt. Deliberately compact —
 * this is re-sent on every turn, and the transcript already carries the
 * conversational detail.
 */
export function serializeContext(state: ProgramState): string {
  const parts: string[] = []

  if (state.observations.length) {
    const byCategory = state.observations.reduce<Record<string, string[]>>((acc, o) => {
      const line = o.basis ? `${o.text} _(from: ${o.basis})_` : o.text
      ;(acc[o.category] ??= []).push(line)
      return acc
    }, {})
    parts.push(
      `## Observations\n${Object.entries(byCategory)
        .map(([cat, lines]) => `**${cat}**\n${lines.map((l) => `- ${l}`).join('\n')}`)
        .join('\n\n')}`,
    )
  }

  const { map } = state
  if (map.nodes.length || map.thesis) {
    const frame = [
      map.title ? `**Title:** ${map.title}` : null,
      map.thesis ? `**Thesis:** ${map.thesis}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    const nodes = map.nodes
      .map(
        (n) =>
          `- \`${n.id}\` [${n.kind}, ${n.confidence}] ${n.label}${n.detail ? ` — ${n.detail}` : ''}`,
      )
      .join('\n')

    const edges = map.edges
      .filter((e) => e.confidence !== 'rejected')
      .map((e) => `- \`${e.from}\` →${e.label ? ` ${e.label} →` : ''} \`${e.to}\``)
      .join('\n')

    parts.push(
      `## The map\n${frame}${frame ? '\n\n' : ''}${nodes || '_no nodes yet_'}${
        edges ? `\n\n**Connections**\n${edges}` : ''
      }`,
    )
  }

  if (state.plan.issues.length) {
    parts.push(
      `## Plan — issues\n${state.plan.issues
        .map((issue) => {
          const responses = issue.responses
            .map((r) => `  - ${r.text}${r.caveat ? ` _(caveat: ${r.caveat})_` : ''}`)
            .join('\n')
          const protocols = issue.protocols.map((p) => `  - If ${p.when} → ${p.then}`).join('\n')
          return [
            `- \`${issue.id}\` **${issue.title}** — shows up when ${issue.showsUpWhen}`,
            issue.responsibility ? `  Theirs: ${issue.responsibility}` : null,
            responses,
            protocols,
          ]
            .filter(Boolean)
            .join('\n')
        })
        .join('\n')}`,
    )
  }

  if (state.plan.anticipations.length) {
    parts.push(
      `## Plan — anticipated objections\n${state.plan.anticipations
        .map((a) => `- "${a.objection}" → ${a.reply}`)
        .join('\n')}`,
    )
  }

  if (state.missions.length) {
    parts.push(
      `## Missions\n${state.missions
        .map((m) => {
          const checkins = m.checkins
            .map((c) => `  - [${c.status}] ${c.note}`)
            .join('\n')
          return [
            `- \`${m.id}\` **${m.title}**${m.active ? '' : ' _(retired)_'}${
              m.cadence ? ` — ${m.cadence}` : ''
            }`,
            m.why ? `  Why: ${m.why}` : null,
            m.successLooksLike ? `  Success: ${m.successLooksLike}` : null,
            checkins,
          ]
            .filter(Boolean)
            .join('\n')
        })
        .join('\n')}`,
    )
  }

  if (state.practices.length) {
    parts.push(
      `## Practices\n${state.practices
        .map((p) => `- \`${p.id}\` **${p.name}**${p.aimedAt ? ` — aimed at ${p.aimedAt}` : ''}`)
        .join('\n')}`,
    )
  }

  // Stages already finished, so the model knows what ground is covered.
  const done = STAGE_IDS.filter((id) => state.status[id] === 'complete')
  if (done.length) {
    parts.push(
      `## Stages completed\n${done
        .map((id) => `- ${STAGES.find((st) => st.id === id)!.name}`)
        .join('\n')}`,
    )
  }

  return parts.length ? parts.join('\n\n') : '_Nothing recorded yet. This is the first conversation._'
}
