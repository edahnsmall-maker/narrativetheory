'use client'

import { useId, useState } from 'react'
import { C, Defs, Figure, L, Paper, Person, Scrap, useArtStyle, wash } from '@/components/home2/collage'

/**
 * The Shift, from Edahn's "Lesson One. Give up." (Narrative Notes):
 * a capsule re-entering the atmosphere glows red because it's in conflict with
 * its surroundings; the mind is buzzing like millions of bees. "You win. You
 * win. You win. And your shoulders fall. And your breath appears."
 */

// heat per stage: red hot → cooled
const HEAT = [
  { body: '#e0533d', glow: '#ff7a3d', trail: 1 },
  { body: '#e07a3d', glow: '#ffae4a', trail: 0.65 },
  { body: '#d7a25a', glow: '#ffd47a', trail: 0.3 },
  { body: '#9aa6b8', glow: '#a9c8ef', trail: 0 },
]
// bees still buzzing at each stage
const BEES_LEFT = [36, 18, 6, 0]

// fixed, seeded positions around the head so server and client agree
const BEES = Array.from({ length: 36 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180
  const r = 58 + ((i * 53) % 90)
  return {
    x: Math.round(690 + Math.cos(a) * r * 1.25),
    y: Math.round(250 + Math.sin(a) * r * 0.85),
    rot: (i * 47) % 360,
    dur: 0.5 + ((i * 7) % 5) * 0.12,
    delay: -((i * 13) % 10) * 0.07,
    flee: { x: Math.round(Math.cos(a) * 260), y: -140 - ((i * 31) % 120) },
  }
})

const SAYS = ['', 'You win.', 'You win.', 'You win.']

export function TheShift() {
  const id = useId().replace(/:/g, '')
  const [stage, setStage] = useState(0)
  const h = HEAT[stage]
  const done = stage === 3
  const left = BEES_LEFT[stage]
  const line = useArtStyle() === 'line'
  const sky = (c: string, t = 0.8) => (line ? wash(c, t) : c)
  // labels: crisp text, outlined pill in line style
  const tagRect = line ? { stroke: L.lavender, strokeWidth: 1.5, rx: 8 } : {}
  const tagFilter = line ? undefined : `url(#${id}-cut)`

  return (
    <Figure
      label="A capsule glowing red as it re-enters the atmosphere, and a person sitting with bees buzzing around their head. Each 'You win' cools the capsule and clears the bees."
      controls={
        <>
          <button
            type="button"
            onClick={() => setStage((s) => Math.min(3, s + 1))}
            disabled={done}
            className="rounded-full bg-foreground text-background px-4 py-2 text-sm disabled:opacity-40"
          >
            {done ? 'Nothing to hold onto' : 'Say “You win.”'}
          </button>
          <button
            type="button"
            onClick={() => setStage(0)}
            disabled={stage === 0}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-40 disabled:no-underline"
          >
            Try to get it back
          </button>
          <span className="text-xs text-muted-foreground tabular-nums">{left} bees</span>
        </>
      }
      mobile={
        <p className="font-display text-lg">
          {stage === 0 && 'All we can see is bees.'}
          {stage > 0 && !done && Array(stage).fill('You win.').join(' ')}
          {done && 'You win. You win. You win. And your shoulders fall. And your breath appears.'}
        </p>
      }
      caption={
        stage === 0
          ? 'Fighting with things, wanting to arrange them, generates heat. Press the button when you’re ready to stop.'
          : done
            ? 'And your head is just quiet, for a second. Maybe 5 seconds, maybe 10 seconds. Try to get it back and see what happens: all striving is more resistance. More bees.'
            : 'Not in a dramatic way. You’re just stopping the striving.'
      }
    >
      <svg viewBox="0 0 960 600" className="block w-full h-auto">
        <Defs id={id} />
        <style>{`
          @keyframes ${id}-buzz { 0%{transform:translate(0,0)} 25%{transform:translate(5px,-4px)} 50%{transform:translate(-3px,3px)} 75%{transform:translate(4px,4px)} 100%{transform:translate(0,0)} }
          @keyframes ${id}-flicker { 0%,100%{opacity:.9} 50%{opacity:.55} }
          @keyframes ${id}-breath { 0%{opacity:0;transform:translate(0,0)} 40%{opacity:.7} 100%{opacity:0;transform:translate(14px,-6px)} }
          @media (prefers-reduced-motion: reduce) { .${id}-m { animation: none !important } }
        `}</style>
        <Paper id={id} w={960} h={600} color={done ? '#f3efe4' : '#efe9dd'} />

        {/* ---- fig. 1: re-entry ---- */}
        <g>
          <clipPath id={`${id}-sky`}>
            <rect x="30" y="30" width="360" height="500" rx="18" />
          </clipPath>
          <g clipPath={`url(#${id}-sky)`}>
            <rect x="30" y="30" width="360" height="500" fill={sky('#1f2a44', 0.86)} />
            <rect x="30" y="230" width="360" height="300" fill={sky('#2f5bd3')} opacity="0.55" />
            <rect x="30" y="360" width="360" height="170" fill={sky(C.sky, 0.5)} opacity="0.7" />
            {[[70, 70], [150, 110], [320, 60], [250, 160], [90, 190], [350, 200]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.8" fill={line ? L.lavender : '#fff'} opacity="0.8" />
            ))}
            <g transform="translate(225 300) rotate(-35)">
              {/* plasma trail, fades as the heat goes */}
              <g className={`${id}-m`} style={{ animation: `${id}-flicker 0.35s ease-in-out infinite` }}>
                <path
                  d="M-34,-40 C-60,-150 -20,-240 0,-300 C20,-240 60,-150 34,-40 Z"
                  fill={h.glow}
                  style={{ opacity: h.trail * 0.85, transition: 'opacity 900ms ease, fill 900ms' }}
                />
              </g>
              <path
                d="M-22,-40 C-34,-110 -10,-170 0,-210 C10,-170 34,-110 22,-40 Z"
                fill="#fff2c4"
                style={{ opacity: h.trail, transition: 'opacity 900ms ease' }}
              />
              {/* heat shield glow */}
              <ellipse cx="0" cy="-38" rx="58" ry="20" fill={h.glow} style={{ opacity: h.trail * 0.7 + 0.05, transition: 'opacity 900ms, fill 900ms' }} />
              {/* capsule */}
              <g filter={`url(#${id}-cut)`}>
                <path d="M-40,-40 L-22,40 L22,40 L40,-40 Z" fill={h.body} style={{ transition: 'fill 900ms' }} />
                <rect x="-46" y="-48" width="92" height="12" rx="4" fill={C.ink} opacity="0.8" />
                <circle cx="0" cy="4" r="9" fill={C.cream} opacity="0.85" />
              </g>
            </g>
          </g>
          <rect x="30" y="30" width="360" height="500" rx="18" fill="none" stroke={C.ink} strokeOpacity="0.15" />
          <g transform="translate(46 548) rotate(-1.5)" filter={tagFilter}>
            <rect x="0" y="-18" width="328" height="30" fill={C.cream} {...tagRect} />
            <text x="12" y="2" fontSize="11" letterSpacing="1" fill={C.ink} opacity="0.65" fontFamily="Inter, sans-serif">
              FIG. 1: IN CONFLICT WITH ITS SURROUNDINGS
            </text>
          </g>
        </g>

        {/* ---- fig. 2: bees ---- */}
        <g>
          {/* the wall you're looking at, and the floor */}
          <Scrap id={id} d="M430,30 H930 V470 H430 Z" fill={C.paper2} opacity={0.7} />
          <Scrap id={id} d="M430,470 H930 V530 H430 Z" fill={C.paper2} pattern="dots" />
          {/* cushion */}
          <g filter={`url(#${id}-cut)`}>
            <ellipse cx="690" cy="482" rx="96" ry="26" fill={C.tomato} opacity="0.85" />
            <ellipse cx="690" cy="476" rx="96" ry="16" fill={C.blush} opacity="0.6" />
          </g>
          {/* crossed legs */}
          <g filter={`url(#${id}-cut)`}>
            <path d="M600,470 C620,440 690,446 690,462 C690,446 760,440 780,470 C760,482 620,482 600,470 Z" fill={line ? "#fff" : C.ink} opacity={line ? 1 : 0.82} />
          </g>
          <Person
            id={id}
            x={690}
            y={462}
            s={1.7}
            skin={C.skin1}
            hair={C.hair2}
            hairStyle="curly"
            shirt={done ? C.sage : C.cobalt}
            expr={done ? 'soft' : stage === 0 ? 'worried' : 'flat'}
            slump={done ? 0 : 1 - stage * 0.3}
          />
          {/* breath appears */}
          {done &&
            [0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${712 + i * 4},${312 + i * 9} q10,-4 18,0`}
                stroke={C.sky}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className={`${id}-m`}
                style={{ animation: `${id}-breath 3.2s ease-in-out ${i * 0.5}s infinite`, opacity: 0 }}
              />
            ))}

          {/* the bees */}
          {BEES.map((b, i) => {
            const gone = i >= left
            return (
              <g
                key={i}
                style={{
                  transform: gone ? `translate(${b.flee.x}px, ${b.flee.y}px)` : 'translate(0,0)',
                  opacity: gone ? 0 : 1,
                  transition: `transform 1100ms cubic-bezier(.3,.6,.2,1) ${(i % 6) * 60}ms, opacity 900ms ease ${(i % 6) * 60}ms`,
                }}
              >
                <g
                  className={`${id}-m`}
                  style={{ animation: `${id}-buzz ${b.dur}s linear ${b.delay}s infinite` }}
                >
                  <g transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}>
                    <ellipse cx="-2" cy="-7" rx="6" ry="4" fill="#fff" opacity="0.75" />
                    <ellipse cx="4" cy="-7" rx="6" ry="4" fill="#fff" opacity="0.75" />
                    <ellipse cx="0" cy="0" rx="9" ry="6" fill={C.mustard} />
                    <path d="M-3,-5.5 v11 M3,-5.5 v11" stroke={C.ink} strokeWidth="2.4" />
                  </g>
                </g>
              </g>
            )
          })}

          {/* You win. */}
          {stage > 0 && (
            <g key={stage} style={{ animation: 'nt-appear 500ms ease both' }}>
              <g transform={`translate(${470} ${70 + (stage - 1) * 44}) rotate(${stage % 2 ? -2 : 1.5})`} filter={tagFilter}>
                <rect x="0" y="-22" width="120" height="36" fill={C.cream} {...tagRect} />
                <text x="14" y="3" fontSize="20" fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
                  {SAYS[stage]}
                </text>
              </g>
            </g>
          )}
          {stage > 1 &&
            Array.from({ length: stage - 1 }, (_, k) => (
              <g key={k} transform={`translate(${470} ${70 + k * 44}) rotate(${(k + 1) % 2 ? -2 : 1.5})`} filter={tagFilter} opacity="0.75">
                <rect x="0" y="-22" width="120" height="36" fill={C.cream} {...tagRect} />
                <text x="14" y="3" fontSize="20" fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
                  You win.
                </text>
              </g>
            ))}

          {done && (
            <g style={{ animation: 'nt-appear 900ms ease 400ms both' }}>
              <text x="780" y="230" fontSize="19" fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
                <tspan x="780" dy="0">And your</tspan>
                <tspan x="780" dy="24">shoulders fall.</tspan>
              </text>
            </g>
          )}

          <g transform="translate(446 548) rotate(1.2)" filter={tagFilter}>
            <rect x="0" y="-18" width="230" height="30" fill={C.cream} {...tagRect} />
            <text x="12" y="2" fontSize="11" letterSpacing="1" fill={C.ink} opacity="0.65" fontFamily="Inter, sans-serif">
              FIG. 2: ALL WE CAN SEE IS BEES
            </text>
          </g>
        </g>
      </svg>
    </Figure>
  )
}
