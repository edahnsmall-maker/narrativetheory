'use client'

import { useId, useState } from 'react'
import { C, Defs, Figure, Paper, Person, Scrap, ThoughtCloud, Toggle } from './collage'

type Mood = 'great' | 'bad'

const COPY: Record<Mood, { lines: string[]; wash: string; bubbleTint: string; label: string }> = {
  bad: {
    lines: ['Who brings a baby to a', 'nice restaurant? Are they', 'kidding? Inconsiderate.', 'I would never do that.'],
    wash: '#d6d7c8',
    bubbleTint: C.tomato,
    label: 'Bad mood',
  },
  great: {
    lines: ['Oh, how beautiful. They', 'probably just had their baby', 'and want a normal night out.', 'Good for them. Good luck.'],
    wash: '#f6e2ae',
    bubbleTint: C.mustard,
    label: 'Great mood',
  },
}

function Baby({ id, x, y, devil }: { id: string; x: number; y: number; devil: boolean }) {
  const skin = devil ? '#e7735f' : C.skin1
  return (
    <g transform={`translate(${x},${y})`}>
      {/* wings / tail behind */}
      <g style={{ opacity: devil ? 0 : 1, transition: 'opacity 500ms' }} filter={`url(#${id}-cut)`}>
        <path d="M-30,-58 C-70,-90 -82,-40 -60,-22 C-72,-34 -50,-40 -30,-34 Z" fill={C.cream} />
        <path d="M30,-58 C70,-90 82,-40 60,-22 C72,-34 50,-40 30,-34 Z" fill={C.cream} />
        <path d="M-58,-60 q8,10 20,12 M-64,-46 q10,8 22,8 M58,-60 q-8,10 -20,12 M64,-46 q-10,8 -22,8" stroke={C.paper2} strokeWidth="2" fill="none" />
      </g>
      <g style={{ opacity: devil ? 1 : 0, transition: 'opacity 500ms' }} filter={`url(#${id}-cut)`}>
        <path d="M28,-14 C70,-4 64,30 92,18" stroke="#b5321f" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M88,10 l14,6 l-12,10 z" fill="#b5321f" />
      </g>

      {/* high chair */}
      <g filter={`url(#${id}-cut)`}>
        <path d="M-40,20 L-52,120 M40,20 L52,120 M-34,70 h68" stroke={C.mustard} strokeWidth="7" strokeLinecap="round" fill="none" />
        <rect x="-46" y="4" width="92" height="16" rx="6" fill={C.mustard} />
      </g>
      {/* body */}
      <g filter={`url(#${id}-cut)`}>
        <path d="M-26,8 C-28,-24 -16,-40 0,-40 C16,-40 28,-24 26,8 Z" fill={C.cream} />
        <ellipse cx="0" cy="-66" rx="31" ry="30" fill={skin} style={{ transition: 'fill 500ms' }} />
        <path d="M-4,-96 q6,-10 12,-2 q-8,-2 -6,6" fill={devil ? '#7a2416' : C.hair2} />
      </g>
      {/* face: crying in both moods — the facts don't change */}
      <path d="M-15,-74 q5,-4 10,0 M5,-74 q5,-4 10,0" stroke={C.ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="0" cy="-54" rx="10" ry="8" fill={C.ink} />
      <path d="M-16,-68 q-3,7 -1,11 M16,-68 q3,7 1,11" stroke={C.sky} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* halo / horns */}
      <g style={{ opacity: devil ? 0 : 1, transition: 'opacity 500ms' }}>
        <ellipse cx="0" cy="-108" rx="24" ry="7" fill="none" stroke={C.mustard} strokeWidth="5" filter={`url(#${id}-cut)`} />
        <ellipse cx="0" cy="-108" rx="34" ry="14" fill={C.mustard} opacity="0.15" />
      </g>
      <g style={{ opacity: devil ? 1 : 0, transition: 'opacity 500ms' }} filter={`url(#${id}-cut)`}>
        <path d="M-22,-88 l-6,-24 l16,14 z M22,-88 l6,-24 l-16,14 z" fill="#8e2414" />
      </g>
    </g>
  )
}

export function BabyScene() {
  const id = useId().replace(/:/g, '')
  const [mood, setMood] = useState<Mood>('bad')
  const m = COPY[mood]
  const bad = mood === 'bad'

  return (
    <Figure
      label="A baby crying in a restaurant, seen in a bad mood and a great mood"
      controls={
        <Toggle
          label="Your mood"
          value={mood}
          onChange={setMood}
          options={[
            { value: 'bad', label: 'Bad mood', color: C.tomato },
            { value: 'great', label: 'Great mood', color: '#c58a12' },
          ]}
        />
      }
      caption="Same restaurant, same parents, same crying baby. The only thing that changed is the state of the person watching."
      mobile={<p className="font-display text-lg">“{m.lines.join(' ')}”</p>}
    >
      <svg viewBox="0 0 960 600" className="block w-full h-auto">
        <Defs id={id} />
        <Paper id={id} w={960} h={600} color={m.wash} />

        {/* restaurant: wall scraps, window, lamp */}
        <Scrap id={id} d="M0,0 H960 V250 H0 Z" fill={bad ? '#c4c7b4' : '#f1d28a'} opacity={0.55} pattern="lines" />
        <Scrap id={id} d="M520,40 h170 v130 h-170 z" fill={bad ? '#9fa9a6' : C.sky} opacity={0.85} />
        <path d="M605,40 v130 M520,105 h170" stroke={C.cream} strokeWidth="6" />
        <g filter={`url(#${id}-cut)`}>
          <line x1="820" y1="0" x2="820" y2="60" stroke={C.ink} strokeWidth="2" />
          <path d="M790,60 h60 l-12,26 h-36 z" fill={C.ink} />
        </g>
        <ellipse cx="820" cy="96" rx="46" ry="16" fill={bad ? '#fff' : C.mustard} opacity={bad ? 0.15 : 0.45} style={{ transition: 'all 600ms' }} />

        {/* table */}
        <g filter={`url(#${id}-cut)`}>
          <rect x="-10" y="500" width="980" height="110" fill={`url(#${id}-check)`} />
        </g>

        {/* the parents + baby, in their bubble */}
        <g>
          <circle cx="700" cy="370" r="190" fill={m.bubbleTint} opacity="0.18" filter={`url(#${id}-torn)`} style={{ transition: 'fill 600ms' }} />
          <circle cx="700" cy="370" r="190" fill={`url(#${id}-dots)`} opacity={bad ? 1 : 0.4} />
          <Person id={id} x={600} y={500} s={1.05} skin={C.skin2} hair={C.hair1} hairStyle="curly" shirt={C.teal} expr="worried" look={1} />
          <Person id={id} x={810} y={500} s={1.1} skin={C.skin1} hair={C.hair3} hairStyle="long" shirt={C.lavender} expr="worried" look={-1} />
          <Baby id={id} x={705} y={430} devil={bad} />
          {/* the cry: same sound, read two ways */}
          <g style={{ opacity: bad ? 1 : 0, transition: 'opacity 400ms' }} stroke={C.tomato} strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M640,300 l-18,-14 l10,-4 l-20,-14" />
            <path d="M770,300 l18,-14 l-10,-4 l20,-14" />
            <path d="M705,250 l0,-22 l8,6 l0,-22" />
          </g>
          <g style={{ opacity: bad ? 0 : 1, transition: 'opacity 400ms' }} fill={C.tomato} opacity="0.7">
            <path d="M630,288 c-6,-10 -20,-2 -10,8 l10,9 l10,-9 c10,-10 -4,-18 -10,-8z" opacity="0.65" />
            <path d="M780,280 c-5,-8 -16,-2 -8,6 l8,7 l8,-7 c8,-8 -3,-14 -8,-6z" opacity="0.65" />
            <text x="705" y="236" textAnchor="middle" fontSize="22" fill={C.ink} opacity="0.55" fontFamily="Bricolage Grotesque, Georgia, serif">♪</text>
          </g>
        </g>

        {/* me, in my bubble */}
        <g>
          <circle cx="200" cy="420" r="140" fill={bad ? '#9aa39f' : C.cream} opacity="0.55" filter={`url(#${id}-torn)`} style={{ transition: 'fill 600ms' }} />
          <Person id={id} x={200} y={520} s={1.25} skin={C.skin1} hair={C.hair2} hairStyle="short" shirt={C.cobalt} expr={bad ? 'angry' : 'soft'} look={1} slump={bad ? 1 : 0} />
          {/* fork & glass on the table */}
          <g filter={`url(#${id}-cut)`}>
            <path d="M320,470 q10,40 0,60 h20 q-10,-20 0,-60 z" fill={C.sky} opacity="0.9" />
          </g>
        </g>

        <ThoughtCloud id={id} x={36} y={34} w={360} lines={m.lines} tailTo={[180, 330]} size={19} />

      </svg>
    </Figure>
  )
}
