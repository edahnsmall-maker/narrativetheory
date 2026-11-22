'use client'

import { useState, type ReactNode } from 'react'
import { LAYERS, LOOP, STATES, type Layer, type LayerKey, type StateKey } from './ntMapData'

/*
  The Narrative Theory map: isometric layers stacked from the slice down to outcomes,
  in black and white. Each plane's contents are drawn in a flat 100×100 square and
  projected onto the plane with one SVG matrix, so text and shapes lie on the plane.
*/

const W = 340 // plane width (px)
const H = 170 // plane height (px), 2:1 isometric
const S = 100 // flat drawing square

const INK = '#f4f4f2'
const DIM = 'rgba(244,244,242,0.38)'
const FAINT = 'rgba(244,244,242,0.16)'
const TEXT_DIM = 'rgba(244,244,242,0.6)'
const BG = '#0b0b0c'

const r2 = (n: number) => Math.round(n * 100) / 100

/** Matrix that maps the flat square onto an isometric plane centered at (cx, cy). */
const iso = (cx: number, cy: number) =>
  `matrix(${W / (2 * S)} ${H / (2 * S)} ${-W / (2 * S)} ${H / (2 * S)} ${cx} ${cy - H / 2})`

const NS = { vectorEffect: 'non-scaling-stroke' as const }

// Where things sit in the restaurant slice (flat coords).
const ITEMS = [
  { id: 'baby', x: 30, y: 26, r: 3.2, label: 'baby' },
  { id: 'mom', x: 22, y: 42, r: 4.2, label: 'parents' },
  { id: 'dad', x: 40, y: 44, r: 4.2, label: '' },
  { id: 'steak', x: 64, y: 58, r: 2.6, label: 'steak' },
  { id: 'me', x: 74, y: 74, r: 4.6, label: 'me' },
]

function wave(state: StateKey, row: number): string {
  const y0 = row
  const pts: string[] = []
  for (let u = 6; u <= 94; u += 1) {
    let dy = 0
    if (state === 'loving') dy = 3.4 * Math.sin((u / 34) * Math.PI * 2 + row / 9)
    if (state === 'agitated') dy = (u % 6 < 3 ? (u % 3) : 3 - (u % 3)) * 2.4 - 3.6
    if (state === 'fearful') dy = 1.3 * Math.sin(u * 2.3 + row) + 0.8 * Math.sin(u * 5.1)
    if (state === 'analytical') dy = (Math.floor(u / 11) % 2 ? 2.4 : -2.4)
    pts.push(`${u === 6 ? 'M' : 'L'}${u} ${r2(y0 + dy)}`)
  }
  return pts.join(' ')
}

/** The flat contents of each plane. */
function PlaneArt({ layer, state }: { layer: LayerKey; state: StateKey }): ReactNode {
  switch (layer) {
    case 'slice':
      return (
        <g>
          {Array.from({ length: 19 }, (_, i) => (
            <g key={i}>
              <line x1={5 + i * 5} y1={4} x2={5 + i * 5} y2={96} stroke={FAINT} strokeWidth={0.6} {...NS} />
              <line x1={4} y1={5 + i * 5} x2={96} y2={5 + i * 5} stroke={FAINT} strokeWidth={0.6} {...NS} />
            </g>
          ))}
          <rect x={48} y={48} width={30} height={18} fill="none" stroke={DIM} strokeWidth={1} {...NS} />
          {ITEMS.map((it) => (
            <circle key={it.id} cx={it.x} cy={it.y} r={it.r} fill={INK} opacity={0.9} />
          ))}
        </g>
      )
    case 'cuts':
      return (
        <g>
          {ITEMS.filter((i) => i.label).map((it) => {
            const pad = it.id === 'mom' ? { x: it.x - 7, y: it.y - 7, w: 32, h: 14 } : { x: it.x - it.r - 3, y: it.y - it.r - 3, w: it.r * 2 + 6, h: it.r * 2 + 6 }
            return (
              <g key={it.id}>
                <rect x={pad.x} y={pad.y} width={pad.w} height={pad.h} fill="none" stroke={INK} strokeWidth={1} strokeDasharray="3 2.5" {...NS} />
                <text x={pad.x} y={pad.y - 2} fontSize={4.4} fill={INK} letterSpacing={0.4}>
                  {it.label.toUpperCase()}
                </text>
              </g>
            )
          })}
          {ITEMS.map((it) => (
            <circle key={it.id} cx={it.x} cy={it.y} r={it.r * 0.7} fill={DIM} />
          ))}
          <line x1={10} y1={92} x2={90} y2={92} stroke={DIM} strokeWidth={1} {...NS} />
          {[10, 26, 42, 58, 74, 90].map((u) => (
            <line key={u} x1={u} y1={89.5} x2={u} y2={94.5} stroke={DIM} strokeWidth={1} {...NS} />
          ))}
        </g>
      )
    case 'energy':
      return (
        <g key={state} className="ntmap-fade">
          {[18, 30, 42, 54, 66, 78].map((row) => (
            <path key={row} d={wave(state, row)} fill="none" stroke={row === 42 ? INK : DIM} strokeWidth={row === 42 ? 1.6 : 1} {...NS} />
          ))}
        </g>
      )
    case 'mode': {
      const nodes = [
        { k: 'N', x: 50, y: 16 },
        { k: 'B', x: 84, y: 50 },
        { k: 'A', x: 50, y: 84 },
        { k: 'E', x: 16, y: 50 },
      ]
      return (
        <g>
          {nodes.map((n) => (
            <line key={n.k} x1={50} y1={50} x2={n.x} y2={n.y} stroke={DIM} strokeWidth={1} {...NS} />
          ))}
          <polygon points="50,16 84,50 50,84 16,50" fill="none" stroke={FAINT} strokeWidth={1} {...NS} />
          {nodes.map((n) => (
            <g key={n.k}>
              <circle cx={n.x} cy={n.y} r={6} fill={BG} stroke={INK} strokeWidth={1} {...NS} />
              <text x={n.x} y={n.y + 1.8} fontSize={5} fill={INK} textAnchor="middle">
                {n.k}
              </text>
            </g>
          ))}
          <circle cx={50} cy={50} r={16} fill={INK} />
          <text key={state} className="ntmap-fade" x={50} y={51.6} fontSize={4.6} fill={BG} textAnchor="middle" fontWeight={600}>
            M({state})
          </text>
        </g>
      )
    }
    case 'flavor': {
      const lines: Record<StateKey, string[]> = {
        agitated: ['annoying.', 'the rules of dining.', 'where are the parents?'],
        fearful: ['talking behind my back.', 'unsafe.', 'illness and tragedy.'],
        loving: ['a beautiful part of life.', 'how special the mother feels.', ''],
        analytical: ['her to-do list.', 'the relationship the parents have.', ''],
      }
      return (
        <g>
          {[14, 22, 30, 38, 46, 54, 62, 70, 78, 86].map((v, i) => (
            <rect key={v} x={10} y={v} width={[70, 52, 78, 40, 66, 74, 34, 60, 48, 72][i]} height={2.4} fill={FAINT} />
          ))}
          <g key={state} className="ntmap-fade">
            {lines[state].map((t, i) =>
              t ? (
                <text key={i} x={10} y={26 + i * 24} fontSize={6.4} fill={INK} fontStyle="italic">
                  {t}
                </text>
              ) : null,
            )}
          </g>
        </g>
      )
    }
    case 'wrap': {
      const targets = ['me', 'partner', 'others', 'future', 'rivals', 'work']
      const center: Record<StateKey, string[]> = {
        agitated: ['Everything', 'sucks.'],
        fearful: ['People aren’t', 'trustworthy.'],
        loving: ['Life is', 'wonderful.'],
        analytical: ['It’s so', 'interesting.'],
      }
      return (
        <g>
          <circle cx={50} cy={50} r={40} fill="none" stroke={FAINT} strokeWidth={1} strokeDasharray="2 3" {...NS} />
          {targets.map((t, i) => {
            const a = (i / targets.length) * Math.PI * 2 - Math.PI / 2
            const x = r2(50 + Math.cos(a) * 32)
            const y = r2(50 + Math.sin(a) * 32)
            return (
              <g key={t}>
                <line x1={50} y1={50} x2={x} y2={y} stroke={DIM} strokeWidth={1} {...NS} />
                <circle cx={x} cy={y} r={7.5} fill={BG} stroke={INK} strokeWidth={1} {...NS} />
                <text x={x} y={y + 1.4} fontSize={3.6} fill={INK} textAnchor="middle">
                  {t}
                </text>
              </g>
            )
          })}
          <circle cx={50} cy={50} r={15} fill={INK} />
          <g key={state} className="ntmap-fade">
            {center[state].map((t, i) => (
              <text key={i} x={50} y={48.6 + i * 5.4} fontSize={4.4} fill={BG} textAnchor="middle" fontWeight={600}>
                {t}
              </text>
            ))}
          </g>
        </g>
      )
    }
    case 'action': {
      // A 6×6 field of possible responses; the state lights up the ones it reaches for.
      const lit: Record<StateKey, number[]> = {
        agitated: [1, 2, 8, 9, 14, 15, 21],
        fearful: [6, 7, 12, 13, 18, 19, 24, 25, 30],
        loving: [16, 17, 22, 23],
        analytical: [3, 4, 5, 10, 11, 28, 29, 34, 35],
      }
      return (
        <g>
          {Array.from({ length: 36 }, (_, i) => {
            const x = 12 + (i % 6) * 13
            const y = 12 + Math.floor(i / 6) * 13
            const on = lit[state].includes(i)
            return (
              <g key={i}>
                <rect x={x} y={y} width={9} height={9} fill={on ? INK : 'none'} stroke={on ? INK : DIM} strokeWidth={1} {...NS} style={{ transition: 'fill .5s' }} />
                <rect x={x + 2.5} y={y + 2.5} width={4} height={4} fill="none" stroke={on ? BG : FAINT} strokeWidth={1} {...NS} />
              </g>
            )
          })}
        </g>
      )
    }
    case 'outcome': {
      // The same situation, over and over.
      const glyph = (x: number, y: number) => {
        if (state === 'agitated') return <path d={`M${x - 2} ${y - 2} L${x + 2} ${y + 2} M${x + 2} ${y - 2} L${x - 2} ${y + 2}`} stroke={INK} strokeWidth={1} {...NS} />
        if (state === 'fearful') return <circle cx={x} cy={y} r={0.9} fill={INK} />
        if (state === 'loving') return <circle cx={x} cy={y} r={2.2} fill="none" stroke={INK} strokeWidth={1} {...NS} />
        return <rect x={x - 1.8} y={y - 1.8} width={3.6} height={3.6} fill="none" stroke={INK} strokeWidth={1} {...NS} />
      }
      return (
        <g>
          {Array.from({ length: 49 }, (_, i) => (
            <g key={i}>
              <line x1={4 + i * 2} y1={4} x2={4 + i * 2} y2={96} stroke={FAINT} strokeWidth={0.4} {...NS} />
            </g>
          ))}
          <g key={state} className="ntmap-fade">
            {Array.from({ length: 64 }, (_, i) => (
              <g key={i}>{glyph(15 + (i % 8) * 10, 15 + Math.floor(i / 8) * 10)}</g>
            ))}
          </g>
        </g>
      )
    }
  }
}

function Plane({ layer, state, cx, cy }: { layer: LayerKey; state: StateKey; cx: number; cy: number }) {
  return (
    <g>
      <polygon
        points={`${cx},${cy - H / 2} ${cx + W / 2},${cy} ${cx},${cy + H / 2} ${cx - W / 2},${cy}`}
        fill={BG}
        stroke={INK}
        strokeWidth={1}
        strokeOpacity={0.8}
      />
      <g transform={iso(cx, cy)}>
        <PlaneArt layer={layer} state={state} />
      </g>
    </g>
  )
}

/** Drops the source tag, e.g. " (KC)", which stays in the data for reference. */
const clean = (t: string) => t.replace(/ \([A-Z ,0-9]+\)$/, '')

function wrap(text: string, max: number): string[] {
  const out: string[] = []
  let line = ''
  for (const w of text.split(' ')) {
    if ((line + ' ' + w).trim().length > max) {
      out.push(line.trim())
      line = w
    } else line += ' ' + w
  }
  if (line.trim()) out.push(line.trim())
  return out
}

/* ---------- Desktop: one tall SVG ---------- */

const CX = 470
const TOP = 112
const GAP = 150
const VBW = 1000
const VBH = TOP + GAP * (LAYERS.length - 1) + 130

function Label({ layer, i, state, cy }: { layer: Layer; i: number; state: StateKey; cy: number }) {
  const x = 730
  const desc = wrap(clean(layer.text), 44)
  const now = layer.byState ? wrap(clean(layer.byState[state]), 44) : []
  const total = 1 + desc.length + now.length
  const y0 = cy - (total * 14) / 2 + 6
  return (
    <g>
      <line x1={704} y1={cy - 58} x2={704} y2={cy + 58} stroke={DIM} strokeWidth={1} />
      <line x1={704} y1={cy - 58} x2={712} y2={cy - 58} stroke={DIM} strokeWidth={1} />
      <line x1={704} y1={cy + 58} x2={712} y2={cy + 58} stroke={DIM} strokeWidth={1} />
      <line x1={CX + W / 2 + 14} y1={cy} x2={690} y2={cy} stroke={FAINT} strokeWidth={1} strokeDasharray="2 4" />
      <text x={x} y={y0} fontSize={11.5} fill={INK} letterSpacing={1.4}>
        <tspan fill={DIM}>{String(i + 1).padStart(2, '0')}</tspan>
        <tspan dx={10}>{layer.name.toUpperCase()}</tspan>
      </text>
      {desc.map((l, j) => (
        <text key={j} x={x} y={y0 + 16 + j * 14} fontSize={11} fill={TEXT_DIM}>
          {l}
        </text>
      ))}
      <g key={state} className="ntmap-fade">
        {now.map((l, j) => (
          <text key={j} x={x} y={y0 + 20 + (desc.length + j) * 14} fontSize={11.5} fill={INK}>
            {j === 0 ? '→ ' : '   '}
            {l}
          </text>
        ))}
      </g>
    </g>
  )
}

function Arrow({ fromY, toY, bend, id }: { fromY: number; toY: number; bend: number; id: string }) {
  const sx = CX - W / 2 - 12
  const ex = CX - W / 2 - 22
  const d = `M${sx} ${fromY} C${bend} ${fromY} ${bend} ${toY} ${ex - 10} ${toY}`
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={INK} stopOpacity={0.25} />
          <stop offset="1" stopColor={INK} stopOpacity={0.9} />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth={12} strokeLinecap="butt" />
      <polygon points={`${ex - 12},${toY - 15} ${ex + 10},${toY} ${ex - 12},${toY + 15}`} fill={INK} opacity={0.9} />
    </g>
  )
}

function DesktopMap({ state }: { state: StateKey }) {
  const cy = (i: number) => TOP + i * GAP
  const wrapI = LAYERS.findIndex((l) => l.key === 'wrap')
  const last = LAYERS.length - 1
  return (
    <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full h-auto" role="img" aria-labelledby="ntmap-title">
      <title id="ntmap-title">Narrative Theory, layer by layer: from the slice to outcomes</title>
      {/* Lower planes first so upper ones sit on top. */}
      {[...LAYERS].map((l, i) => ({ l, i })).reverse().map(({ l, i }) => (
        <g key={l.key} className="ntmap-rise" style={{ animationDelay: `${(LAYERS.length - i) * 70}ms` }}>
          <Plane layer={l.key} state={state} cx={CX} cy={cy(i)} />
        </g>
      ))}
      {LAYERS.map((l, i) => (
        <Label key={l.key} layer={l} i={i} state={state} cy={cy(i)} />
      ))}
      <Arrow id="ntmap-a1" fromY={cy(last)} toY={cy(0) - 14} bend={20} />
      <Arrow id="ntmap-a2" fromY={cy(wrapI)} toY={cy(0) + 16} bend={170} />
      {/* Arrow labels */}
      <g fontSize={10} letterSpacing={1}>
        <text x={112} y={(cy(0) + cy(last)) / 2 + 40} fill={INK}>
          {LOOP.outer.title.toUpperCase()}
        </text>
        {LOOP.outer.lines.map((t, j) => (
          <text key={t} x={112} y={(cy(0) + cy(last)) / 2 + 56 + j * 13} fill={TEXT_DIM} letterSpacing={0.3}>
            {t}
          </text>
        ))}
        <text x={222} y={(cy(0) + cy(wrapI)) / 2 + 40} fill={INK}>
          {LOOP.inner.title.toUpperCase()}
        </text>
        {LOOP.inner.lines.map((t, j) => (
          <text key={t} x={222} y={(cy(0) + cy(wrapI)) / 2 + 56 + j * 13} fill={TEXT_DIM} letterSpacing={0.3}>
            {t}
          </text>
        ))}
      </g>
    </svg>
  )
}

/* ---------- Phone: one plane per row ---------- */

function PhoneMap({ state }: { state: StateKey }) {
  return (
    <ol className="space-y-10">
      {LAYERS.map((l, i) => (
        <li key={l.key}>
          <svg viewBox={`0 0 ${W + 20} ${H + 20}`} className="w-full max-w-[360px] mx-auto h-auto" aria-hidden>
            <Plane layer={l.key} state={state} cx={(W + 20) / 2} cy={(H + 20) / 2} />
          </svg>
          <div className="mt-4 border-l border-white/30 pl-4">
            <div className="text-[12px] tracking-[0.14em] text-white">
              <span className="text-white/40 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {l.name.toUpperCase()}
            </div>
            <p className="mt-1.5 text-[14px] leading-snug text-white/55">{clean(l.text)}</p>
            {l.byState && <p key={state} className="ntmap-fade mt-1.5 text-[14px] leading-snug text-white">→ {clean(l.byState[state])}</p>}
          </div>
          {i < LAYERS.length - 1 && <div className="mx-auto mt-8 h-8 w-px bg-white/25" aria-hidden />}
        </li>
      ))}
      <li className="border border-white/25 rounded-2xl p-5 text-[14px] text-white/70">
        <span className="text-white tracking-[0.14em] text-[12px]">↺ {LOOP.outer.title.toUpperCase()}</span>
        <br />
        New stimuli resonating with the mode, and back to the slice.
      </li>
    </ol>
  )
}

export function NTMap() {
  const [state, setState] = useState<StateKey>('agitated')
  return (
    <div>
      <div
        className="sticky top-14 z-10 -mx-4 px-4 py-3 bg-[#0b0b0c]/90 backdrop-blur md:static md:mx-0 md:px-0 md:py-0 md:bg-transparent flex flex-wrap items-center gap-2"
        role="radiogroup"
        aria-label="Energy state"
      >
        <span className="text-[11px] uppercase tracking-[0.16em] text-white/50 mr-2">Energy state</span>
        {STATES.map((s) => (
          <button
            key={s.key}
            type="button"
            role="radio"
            aria-checked={state === s.key}
            onClick={() => setState(s.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              state === s.key ? 'bg-white text-black border-white' : 'border-white/30 text-white/80 hover:border-white/70'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-white/45">Same restaurant, same crying baby. Change the energy state and watch what changes underneath.</p>
      <div className="mt-8 hidden md:block">
        <DesktopMap state={state} />
      </div>
      <div className="mt-10 md:hidden">
        <PhoneMap state={state} />
      </div>
    </div>
  )
}
