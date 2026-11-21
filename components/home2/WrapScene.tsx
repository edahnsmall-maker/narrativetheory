'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { C, Defs, Figure, Paper, Person, Scrap, Toggle } from './collage'

type State = 'reflective' | 'anxious' | 'combative'

const STATES: Record<State, { label: string; color: string; wash: string; expr: 'soft' | 'worried' | 'angry'; slump: number }> = {
  reflective: { label: 'Reflective', color: '#6f6bd8', wash: '#ebe7f3', expr: 'soft', slump: 0 },
  anxious: { label: 'Anxious', color: '#d98a12', wash: '#f4ead2', expr: 'worried', slump: 0.6 },
  combative: { label: 'Combative', color: C.tomato, wash: '#f1dcd4', expr: 'angry', slump: 1 },
}

type Target = 'ocean' | 'stranger' | 'baby'

const STORIES: Record<State, Record<Target, string>> = {
  reflective: { ocean: 'So big. My problems shrink.', stranger: "Probably has a whole story.", baby: 'Brand new lungs. Good for him.' },
  anxious: { ocean: 'Rip currents. Was that a fin?', stranger: 'Is he looking at me?', baby: "Something's wrong. Why won't it stop?" },
  combative: { ocean: 'Overrated. And crowded.', stranger: "What's this guy's problem?", baby: 'Somebody shut that kid up.' },
}

/** Where each target sits, for the beam and the wrap. */
const BOX: Record<Target, { x: number; y: number; w: number; h: number; label: [number, number] }> = {
  ocean: { x: 470, y: 70, w: 450, h: 170, label: [600, 64] },
  stranger: { x: 690, y: 300, w: 170, h: 250, label: [640, 286] },
  baby: { x: 410, y: 380, w: 190, h: 170, label: [372, 366] },
}

const EYE: [number, number] = [178, 412]

export function WrapScene() {
  const id = useId().replace(/:/g, '')
  const [state, setState] = useState<State>('reflective')
  // 0: wrapped (resting) · 1: beams out · 2: wrapping · 3: beams fading
  const [step, setStep] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const s = STATES[state]

  const play = () => {
    timers.current.forEach(clearTimeout)
    setStep(1)
    timers.current = [setTimeout(() => setStep(2), 700), setTimeout(() => setStep(3), 1500), setTimeout(() => setStep(0), 2400)]
  }
  useEffect(() => {
    play()
    return () => timers.current.forEach(clearTimeout)
  }, [state])

  const beamsOn = step === 1 || step === 2
  const wrapsOn = step === 0 || step === 2 || step === 3

  return (
    <Figure
      label="A person projecting a story onto the ocean, a stranger and a crying baby; the story changes with their energy state"
      controls={
        <>
          <Toggle
            label="Energy state"
            value={state}
            onChange={setState}
            options={(Object.keys(STATES) as State[]).map((k) => ({ value: k, label: STATES[k].label, color: STATES[k].color }))}
          />
          <button type="button" onClick={play} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Watch it happen again
          </button>
        </>
      }
      mobile={
        <ul className="space-y-1.5 font-mono text-[14px]">
          {(Object.keys(BOX) as Target[]).map((t) => (
            <li key={t}>
              <span className="text-muted-foreground">{t === 'ocean' ? 'The ocean' : t === 'stranger' ? 'The stranger' : 'The baby'}: </span>
              {STORIES[state][t]}
            </li>
          ))}
        </ul>
      }
      caption="The story starts in the person and travels out. Then it sticks to whatever it lands on, and from then on it looks like a property of the thing itself. That's the Saran Wrap."
    >
      <svg viewBox="0 0 960 620" className="block w-full h-auto">
        <Defs id={id} />
        <Paper id={id} w={960} h={620} color={s.wash} />

        {/* ground + horizon scraps */}
        <Scrap id={id} d="M0,560 H960 V620 H0 Z" fill={C.paper2} pattern="dots" />
        <Scrap id={id} d="M440,236 C600,226 760,252 960,238 L960,262 C760,276 600,250 440,262 Z" fill="#e9d7ae" />
        <Scrap id={id} d="M30,90 C90,60 170,70 210,110 C240,150 160,190 90,170 C40,156 0,130 30,90 Z" fill="#fff" opacity={0.45} pattern="dots-lg" />

        {/* the ocean */}
        <g filter={`url(#${id}-cut)`}>
          <rect x="470" y="70" width="450" height="170" rx="10" fill={C.cobalt} />
          <rect x="470" y="70" width="450" height="60" rx="10" fill={C.sky} />
          <circle cx="860" cy="108" r="24" fill={C.mustard} />
        </g>
        <g stroke={C.cream} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M500,170 q20,-14 40,0 t40,0 t40,0" />
          <path d="M650,200 q20,-14 40,0 t40,0 t40,0 t40,0" />
          <path d="M560,222 q20,-12 40,0 t40,0" />
        </g>

        {/* the baby, in a stroller, crying */}
        <g filter={`url(#${id}-cut)`}>
          <path d="M420,470 a90,70 0 0 1 170,0 z" fill={C.sage} />
          <rect x="416" y="466" width="178" height="40" rx="12" fill={C.sage} />
          <circle cx="450" cy="530" r="16" fill={C.ink} />
          <circle cx="560" cy="530" r="16" fill={C.ink} />
          <circle cx="450" cy="530" r="6" fill={C.paper} />
          <circle cx="560" cy="530" r="6" fill={C.paper} />
          <circle cx="506" cy="452" r="30" fill={C.skin1} />
        </g>
        <path d="M492,446 q5,-4 9,0 M511,446 q5,-4 9,0" stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <ellipse cx="506" cy="465" rx="8" ry="6.5" fill={C.ink} />

        {/* the stranger */}
        <Person id={id} x={775} y={555} s={1.2} skin={C.skin3} hair={C.ink} hairStyle="cap" shirt={C.mustard} expr="flat" look={-1} />

        {/* the beams: the story leaving the person */}
        <g style={{ opacity: beamsOn ? 1 : 0, transition: 'opacity 450ms ease' }}>
          {(Object.keys(BOX) as Target[]).map((t) => {
            const b = BOX[t]
            return (
              <polygon
                key={t}
                points={`${EYE[0]},${EYE[1]} ${b.x},${b.y + 10} ${b.x},${b.y + b.h - 10}`}
                fill={s.color}
                opacity="0.22"
                style={{ transition: 'fill 500ms' }}
              />
            )
          })}
        </g>

        {/* the wraps: the story stuck to the thing */}
        {(Object.keys(BOX) as Target[]).map((t, i) => {
          const b = BOX[t]
          return (
            <g key={t} style={{ opacity: wrapsOn ? 1 : 0, transition: `opacity 500ms ease ${i * 90}ms` }}>
              <rect x={b.x - 10} y={b.y - 10} width={b.w + 20} height={b.h + 20} rx="26" fill={s.color} opacity="0.2" style={{ transition: 'fill 500ms' }} />
              <rect x={b.x - 10} y={b.y - 10} width={b.w + 20} height={b.h + 20} rx="26" fill={`url(#${id}-gloss)`} opacity="0.7" />
              <rect x={b.x - 10} y={b.y - 10} width={b.w + 20} height={b.h + 20} rx="26" fill="none" stroke={s.color} strokeWidth="2" opacity="0.6" style={{ transition: 'stroke 500ms' }} />
              <path d={`M${b.x + 12},${b.y + 18} q${b.w * 0.2},-16 ${b.w * 0.42},-6`} stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />
              {/* typed-tape label */}
              <g transform={`translate(${b.label[0]},${b.label[1]}) rotate(${i % 2 ? 2 : -2})`} filter={`url(#${id}-cut)`}>
                <rect x="-6" y="-22" width={STORIES[state][t].length * 8.6 + 22} height="32" fill={C.cream} />
                <text x="5" y="0" fontSize="16" fill={C.ink} fontFamily="'Courier New', ui-monospace, monospace" fontWeight="600">
                  {STORIES[state][t]}
                </text>
              </g>
            </g>
          )
        })}

        {/* me, with the energy state glowing in the chest */}
        <circle cx="140" cy="490" r="70" fill={s.color} opacity={beamsOn ? 0.35 : 0.18} style={{ transition: 'all 500ms' }} />
        <Person id={id} x={140} y={560} s={1.45} skin={C.skin1} hair={C.hair2} hairStyle="short" shirt={C.cobalt} expr={s.expr} look={1} slump={s.slump} />
        <circle cx="140" cy="512" r="13" fill={s.color} stroke={C.cream} strokeWidth="3" style={{ transition: 'fill 500ms' }} />
        <text x="140" y="604" textAnchor="middle" fontSize="13" letterSpacing="2" fill={C.ink} opacity="0.6" fontFamily="Inter, sans-serif">
          ENERGY STATE: {s.label.toUpperCase()}
        </text>
      </svg>
    </Figure>
  )
}
