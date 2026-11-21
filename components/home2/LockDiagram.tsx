'use client'

import { useId, useState } from 'react'
import { C, Defs, Figure, Paper, Person } from './collage'

/** Narrative lock: as the charge rises the wrap thickens, until new information bounces off. */

const LEVELS = [
  { max: 25, label: 'Loose', story: 'Did he slam it? Or just close it?', color: '#6f6bd8' },
  { max: 55, label: 'Sticky', story: 'He slammed the door. He was annoyed.', color: '#d98a12' },
  { max: 80, label: 'Glued', story: 'He slammed it. He always does this.', color: '#d9622f' },
  { max: 101, label: 'Locked', story: "He slammed it because he doesn't respect me. End of story.", color: C.tomato },
]

const INFO = ['“I just closed it.”', 'Your friend: “Sounded normal to me.”', 'He apologizes anyway.']

export function LockDiagram() {
  const id = useId().replace(/:/g, '')
  const [charge, setCharge] = useState(15)
  const level = LEVELS.find((l) => charge < l.max)!
  const locked = level.label === 'Locked'
  const layers = 1 + Math.floor(charge / 22)

  return (
    <Figure
      label="A narrative getting more locked as emotional charge rises"
      controls={
        <label className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted-foreground">Charge</span>
          <input
            type="range"
            min={0}
            max={100}
            value={charge}
            onChange={(e) => setCharge(Number(e.target.value))}
            className="w-56 accent-[var(--accent-pink)]"
            aria-valuetext={level.label}
          />
          <span className="chip" style={{ background: level.color, color: '#fff', borderColor: level.color }}>
            {level.label}
          </span>
        </label>
      }
      mobile={<p className="font-mono text-[14px]">{level.story}</p>}
      caption="The more charged we are, the harder the wrap sets. At some point nothing gets through: any contradicting information is dismissed, rationalized, or disputed."
    >
      <svg viewBox="0 0 960 460" className="block w-full h-auto">
        <Defs id={id} />
        <Paper id={id} w={960} h={460} />

        {/* incoming information */}
        {INFO.map((t, i) => {
          const y = 120 + i * 110
          const pathIn = `M60,${y} L520,${y}`
          const pathBounce = `M60,${y} L470,${y} L330,${y + (i - 1) * 60 - 20}`
          return (
            <g key={i}>
              <text x="40" y={y - 16} fontSize="15" fill={C.ink} opacity="0.75" fontFamily="'Courier New', ui-monospace, monospace" fontWeight="600">
                {t}
              </text>
              <line x1="40" y1={y} x2={locked ? 470 : 520} y2={y} stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 6" opacity="0.3" />
              <circle key={`${locked}`} r="8" fill={C.cobalt}>
                <animateMotion dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite" path={locked ? pathBounce : pathIn} />
                <animate attributeName="opacity" values={locked ? '1;1;0' : '1;1;0'} keyTimes="0;0.8;1" dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* the wrap, in layers */}
        {Array.from({ length: layers }).map((_, i) => (
          <rect
            key={i}
            x={510 - i * 12}
            y={70 - i * 10}
            width={330 + i * 24}
            height={320 + i * 20}
            rx={60}
            fill={level.color}
            opacity={0.1 + (locked ? 0.08 : 0.04) * i}
            stroke={level.color}
            strokeWidth={locked && i === layers - 1 ? 5 : 2}
            strokeOpacity={0.5}
            style={{ transition: 'all 400ms ease' }}
          />
        ))}
        <rect x="510" y="70" width="330" height="320" rx="60" fill={`url(#${id}-gloss)`} opacity="0.6" />

        {/* the partner, who just closed a car door */}
        <Person id={id} x={675} y={360} s={1.35} skin={C.skin2} hair={C.hair1} hairStyle="short" shirt={C.sage} expr="flat" look={-1} />

        {/* the story label */}
        <g transform="translate(540,100) rotate(-1.5)" filter={`url(#${id}-cut)`}>
          <rect x="0" y="0" width="290" height="62" fill={C.cream} />
          <foreignObject x="10" y="6" width="272" height="54">
            <div style={{ font: "600 15px/1.25 'Courier New', ui-monospace, monospace", color: C.ink }}>{level.story}</div>
          </foreignObject>
        </g>

        {/* padlock */}
        <g style={{ opacity: locked ? 1 : 0, transform: locked ? 'none' : 'translateY(-10px)', transition: 'all 400ms ease' }} filter={`url(#${id}-cut)`}>
          <path d="M858,72 v-18 a20,20 0 0 1 40,0 v18" stroke={C.ink} strokeWidth="8" fill="none" />
          <rect x="846" y="70" width="64" height="52" rx="8" fill={C.tomato} />
          <circle cx="878" cy="92" r="6" fill={C.ink} />
          <rect x="875" y="94" width="6" height="14" fill={C.ink} />
        </g>
      </svg>
    </Figure>
  )
}
