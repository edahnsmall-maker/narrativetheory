'use client'

import { useId, useState } from 'react'
import { C, Defs, Figure, Paper, Person, Scrap, ThoughtCloud, Toggle, type Expression } from '@/components/home2/collage'

type Pos = 'high' | 'middle' | 'low'

/** Edahn's own answers to "qualities or associations of low see saw, high, and middle?" (Narrative Notes) */
const POS: Record<
  Pos,
  { label: string; color: string; tilt: number; me: Expression; them: Expression; slumpMe: number; slumpThem: number; lines: string[]; full: string }
> = {
  high: {
    label: 'You’re up',
    color: '#6f6bd8',
    tilt: 9,
    me: 'flat',
    them: 'worried',
    slumpMe: 0,
    slumpThem: 0.5,
    lines: ['I’m better.', 'I’m smart-ER.', 'Not worth my energy.'],
    full: 'I’m better. I’m just above. I’m smart-ER. This person is not as good, not worth my energy and investment.',
  },
  middle: {
    label: 'Middle',
    color: C.teal,
    tilt: 0,
    me: 'soft',
    them: 'soft',
    slumpMe: 0,
    slumpThem: 0,
    lines: ['No hierarchy.', 'Just two people', 'who get along.'],
    full: 'That’s regulated. No hierarchy, but there’s still a sense of compatibility.',
  },
  low: {
    label: 'They’re up',
    color: C.tomato,
    tilt: -9,
    me: 'worried',
    them: 'flat',
    slumpMe: 0.8,
    slumpThem: 0,
    lines: ['They have it together.', 'I have nothing.', 'I need their approval.'],
    full: 'Imposter syndrome: this person has their shit together socially and life-wise. I have nothing. I need their approval. Can’t really relax.',
  },
}

const PIVOT: [number, number] = [480, 470]
const ARM = 290

export function RankSeesaw({ zone = true }: { zone?: boolean }) {
  const id = useId().replace(/:/g, '')
  const [pos, setPos] = useState<Pos>('low')
  const p = POS[pos]
  const rad = (p.tilt * Math.PI) / 180
  // positive tilt = left (you) end goes up
  const meY = PIVOT[1] - ARM * Math.sin(rad) - 10
  const themY = PIVOT[1] + ARM * Math.sin(rad) - 10

  return (
    <Figure
      label="A see-saw with you on one end and another person on the other; the inner monologue changes with who's up"
      controls={
        <Toggle
          label="Where you are on the see-saw"
          value={pos}
          onChange={setPos}
          options={(['high', 'middle', 'low'] as Pos[]).map((k) => ({ value: k, label: POS[k].label, color: POS[k].color }))}
        />
      }
      mobile={<p className="font-mono text-[14px]">{p.full}</p>}
      caption={
        <>
          <span className="text-foreground">“{p.full}”</span>{zone && (<> Most people are in your zone, especially friends, and in your zone you
          don’t react. As someone moves out of it, you start to. Too low and you flatten them into a perception. Too high and you
          fear them and go into alert mode.</>)}
        </>
      }
    >
      <svg viewBox="0 0 960 560" className="block w-full h-auto">
        <Defs id={id} />
        <Paper id={id} w={960} h={560} color={pos === 'middle' ? '#e6efe9' : pos === 'low' ? '#f3e2dc' : '#e9e6f4'} />
        <Scrap id={id} d="M0,500 H960 V560 H0 Z" fill={C.paper2} pattern="dots" />
        <Scrap id={id} d="M660,60 C740,30 860,50 890,100 C910,140 820,170 740,150 C690,138 630,100 660,60 Z" fill="#fff" opacity={0.5} pattern="dots-lg" />

        {/* fulcrum */}
        <g filter={`url(#${id}-cut)`}>
          <path d={`M${PIVOT[0] - 46},500 L${PIVOT[0]},${PIVOT[1] + 6} L${PIVOT[0] + 46},500 Z`} fill={C.mustard} />
        </g>

        {/* plank */}
        <g
          style={{
            transformBox: 'view-box',
            transformOrigin: `${PIVOT[0]}px ${PIVOT[1]}px`,
            transform: `rotate(${p.tilt}deg)`,
            transition: 'transform 600ms cubic-bezier(.3,1.4,.5,1)',
          }}
        >
          <g filter={`url(#${id}-cut)`}>
            <rect x={PIVOT[0] - ARM - 50} y={PIVOT[1] - 8} width={(ARM + 50) * 2} height="16" rx="6" fill={C.hair2} />
          </g>
        </g>

        {/* you and them ride the ends */}
        <Person id={id} x={PIVOT[0] - ARM} y={meY} s={1.15} skin={C.skin1} hair={C.hair2} hairStyle="curly" shirt={C.cobalt} expr={p.me} look={1} slump={p.slumpMe} />
        <Person id={id} x={PIVOT[0] + ARM} y={themY} s={1.15} skin={C.skin3} hair={C.hair1} hairStyle="long" shirt={C.blush} expr={p.them} look={-1} slump={p.slumpThem} />

        <text x={PIVOT[0] - ARM} y={Math.max(meY, themY) + 70} textAnchor="middle" fontSize="12" letterSpacing="2" fill={C.ink} opacity="0.55" fontFamily="Inter, sans-serif" style={{ transition: 'all 600ms' }}>
          YOU
        </text>
        <text x={PIVOT[0] + ARM} y={Math.max(meY, themY) + 70} textAnchor="middle" fontSize="12" letterSpacing="2" fill={C.ink} opacity="0.55" fontFamily="Inter, sans-serif" style={{ transition: 'all 600ms' }}>
          THEM
        </text>

        {/* your inner monologue */}
        <g key={pos} style={{ animation: 'nt-appear 500ms ease both' }}>
          <ThoughtCloud id={id} x={PIVOT[0] - ARM - 20} y={meY - 330} w={260} lines={p.lines} tailTo={[PIVOT[0] - ARM + 10, meY - 180]} size={17} />
        </g>

        {pos === 'low' && (
          <g style={{ animation: 'nt-appear 600ms ease 200ms both' }}>
            <g transform={`translate(${PIVOT[0] + 40},90) rotate(2)`} filter={`url(#${id}-cut)`}>
              <rect x="0" y="0" width="300" height="62" fill={C.cream} />
              <rect x="0" y="0" width="6" height="62" fill={C.tomato} />
              <text x="16" y="24" fontSize="11" letterSpacing="1.5" fill={C.tomato} fontFamily="Inter, sans-serif" fontWeight="700">
                ALERT MODE
              </text>
              <text x="16" y="46" fontSize="15" fill={C.ink} fontFamily="'Courier New', ui-monospace, monospace" fontWeight="600">
                Somebody else is the center.
              </text>
            </g>
          </g>
        )}
      </svg>
    </Figure>
  )
}
