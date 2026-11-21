'use client'

import { useId, useState } from 'react'
import { C, Defs, Paper, Person, Scrap, Toggle, type Expression } from '@/components/home2/collage'

type StateKey = 'calm' | 'fearful' | 'combative' | 'collapsed'

const STATES: { key: StateKey; label: string; color: string; wash: string; expr: Expression; slump: number }[] = [
  { key: 'calm', label: 'Calm / Open', color: '#5f8fc4', wash: '#e8eef4', expr: 'soft', slump: 0 },
  { key: 'fearful', label: 'Fearful', color: '#d98a12', wash: '#f4ead2', expr: 'worried', slump: 0.5 },
  { key: 'combative', label: 'Combative', color: C.tomato, wash: '#f2dcd5', expr: 'angry', slump: 1 },
  { key: 'collapsed', label: 'Collapsed', color: '#8e7cc3', wash: '#e7e3ef', expr: 'frown', slump: 1 },
]

type NodeKey = 'me' | 'partner' | 'relationship' | 'achievements' | 'future' | 'situation' | 'others' | 'world'

const NODES: { key: NodeKey; label: string; angle: number }[] = [
  { key: 'me', label: 'Me', angle: -90 },
  { key: 'partner', label: 'My partner', angle: -45 },
  { key: 'relationship', label: 'My relationship', angle: 0 },
  { key: 'achievements', label: 'My achievements', angle: 45 },
  { key: 'future', label: 'The future', angle: 90 },
  { key: 'situation', label: 'This situation', angle: 135 },
  { key: 'others', label: 'Other people', angle: 180 },
  { key: 'world', label: 'The world', angle: -135 },
]

const COPY: Record<StateKey, Record<NodeKey, string>> = {
  calm: {
    me: 'I have space.',
    partner: 'They are complex.',
    relationship: 'We can meet here.',
    achievements: "It's coming along.",
    future: 'It can unfold.',
    situation: "I don't know yet.",
    others: 'I see common humanity.',
    world: 'I feel part of something.',
  },
  fearful: {
    me: 'I might not be safe.',
    partner: 'They might hurt me.',
    relationship: 'It could fall apart.',
    achievements: 'I might be exposed.',
    future: 'Something bad is coming.',
    situation: 'I need to prepare.',
    others: 'They could turn on me.',
    world: 'The ground is unsteady.',
  },
  combative: {
    me: 'I am right.',
    partner: 'They are the problem.',
    relationship: "I'm being mistreated.",
    achievements: 'I deserve more.',
    future: 'I need to win.',
    situation: 'I need to push back.',
    others: "They're in my way.",
    world: "It's a fight.",
  },
  collapsed: {
    me: 'I am failing.',
    partner: "They won't understand.",
    relationship: "There's no point.",
    achievements: 'Nothing I do matters.',
    future: 'Nothing will work.',
    situation: "I can't handle this.",
    others: 'No one sees me.',
    world: "It's too heavy.",
  },
}

const CX = 480
const CY = 330
const EYE: [number, number] = [488, 236]
const pos = (angle: number): [number, number] => {
  const r = (angle * Math.PI) / 180
  return [CX + Math.cos(r) * 350, CY + Math.sin(r) * 245]
}

export function StateField() {
  const id = useId().replace(/:/g, '')
  const [state, setState] = useState<StateKey>('calm')
  const s = STATES.find((x) => x.key === state)!

  return (
    <div className="rounded-3xl border bg-card p-5 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
        <div className="max-w-md">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Narrative field</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">One state. Many stories.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            An energy state doesn&rsquo;t just change one thought. It changes the whole field: how you see yourself, other people, the future, the
            situation, and the world.
          </p>
        </div>
        <Toggle
          label="Energy state"
          value={state}
          onChange={setState}
          options={STATES.map((x) => ({ value: x.key, label: x.label, color: x.color }))}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border" role="img" aria-label={`In a ${s.label} state, every target gets a different story`}>
        <svg viewBox="0 0 960 660" className="block w-full h-auto">
          <Defs id={id} />
          <Paper id={id} w={960} h={660} color={s.wash} />
          <Scrap id={id} d="M300,420 C360,380 600,380 660,420 C700,470 640,520 480,520 C320,520 260,470 300,420 Z" fill={s.color} opacity={0.18} pattern="dots" />

          {/* beams from the person to every target */}
          {NODES.map((n) => {
            const [x, y] = pos(n.angle)
            return <polygon key={n.key} points={`${EYE[0]},${EYE[1]} ${x - 22},${y} ${x + 22},${y}`} fill={s.color} opacity="0.13" style={{ transition: 'fill 500ms' }} />
          })}

          {/* the person in the middle, colored by the state */}
          <circle cx={CX} cy={CY + 40} r="92" fill={s.color} opacity="0.22" style={{ transition: 'fill 500ms' }} />
          <Person id={id} x={CX} y={CY + 120} s={1.25} skin={C.skin1} hair={C.hair1} hairStyle="short" shirt={s.color} expr={s.expr} slump={s.slump} />

          {/* targets: paper tags with typed labels */}
          {NODES.map((n, i) => {
            const [x, y] = pos(n.angle)
            return (
              <g key={n.key} transform={`translate(${x},${y}) rotate(${[-2, 1.5, -1, 2, -1.5, 1, -2, 1.5][i]})`}>
                <g filter={`url(#${id}-cut)`}>
                  <rect x="-115" y="-34" width="230" height="68" rx="6" fill={C.cream} />
                  <rect x="-115" y="-34" width="230" height="8" rx="3" fill={s.color} style={{ transition: 'fill 500ms' }} />
                </g>
                <text x="0" y="-6" textAnchor="middle" fontSize="15" fontWeight="600" fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
                  {n.label}
                </text>
                <text x="0" y="18" textAnchor="middle" fontSize="14" fill={C.ink} opacity="0.85" fontFamily="'Courier New', ui-monospace, monospace" fontWeight="600">
                  {COPY[state][n.key]}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <ul className="sm:hidden mt-4 grid gap-1.5 text-[14px]">
        {NODES.map((n) => (
          <li key={n.key}>
            <span className="text-muted-foreground">{n.label}: </span>
            <span className="font-mono">{COPY[state][n.key]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
