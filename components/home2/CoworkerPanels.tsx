'use client'

import { useId } from 'react'
import { C, Defs, Figure, Paper, Person, Scrap, ThoughtCloud } from './collage'

/**
 * Two-panel strip for the coworker story in the Saran Wrap section.
 * The words are Edahn's, straight from the copy. Same meeting, same coworker;
 * the only thing that changes between panels is the story in his head.
 */

const W = 480
const H = 440

function Table({ id }: { id: string }) {
  return (
    <g filter={`url(#${id}-cut)`}>
      <rect x="-10" y="372" width={W + 20} height="80" fill={C.paper2} />
      <rect x="-10" y="372" width={W + 20} height="10" fill={C.ink} opacity="0.12" />
      {/* her laptop, my coffee */}
      <path d="M300,372 l14,-46 h70 l-10,46 z" fill="#9fa3a8" />
      <circle cx="342" cy="350" r="5" fill={C.cream} opacity="0.8" />
      <path d="M96,372 v-26 h26 v26 z" fill={C.cream} />
      <path d="M122,352 q10,0 10,8 q0,8 -10,8" stroke={C.cream} strokeWidth="4" fill="none" />
    </g>
  )
}

function SpeechBubble({ id, x, y, w, lines, tailTo, size = 17 }: { id: string; x: number; y: number; w: number; lines: string[]; tailTo: [number, number]; size?: number }) {
  const lh = size * 1.3
  const h = lines.length * lh + 28
  return (
    <g filter={`url(#${id}-cut)`}>
      <path d={`M${x + w * 0.62},${y + h - 2} L${tailTo[0]},${tailTo[1]} L${x + w * 0.8},${y + h - 2} Z`} fill={C.cream} />
      <rect x={x} y={y} width={w} height={h} rx="14" fill={C.cream} />
      <text x={x + w / 2} y={y + 18 + size * 0.5} textAnchor="middle" fontSize={size} fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
        {lines.map((l, i) => (
          <tspan key={i} x={x + w / 2} dy={i === 0 ? 0 : lh}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  )
}

function PanelLabel({ x, children }: { x: number; children: string }) {
  return (
    <text x={x} y="34" fontSize="13" letterSpacing="2" fill={C.ink} opacity="0.55" fontFamily="ui-sans-serif, system-ui, sans-serif">
      {children}
    </text>
  )
}

function Before({ id }: { id: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto">
      <Defs id={id} />
      <Paper id={id} w={W} h={H} color="#d6d7c8" />
      <Scrap id={id} d={`M0,0 H${W} V200 H0 Z`} fill="#c4c7b4" opacity={0.5} pattern="lines" />
      <PanelLabel x={24}>BEFORE</PanelLabel>

      {/* her, talking */}
      <Person id={id} x={360} y={372} s={1} skin={C.skin2} hair={C.hair1} hairStyle="bun" shirt={C.sage} expr="smile" look={-1} />
      <g stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
        <path d="M312,250 l-12,-6 M310,264 l-14,0 M312,278 l-12,6" />
      </g>

      {/* me, rolling my eyes */}
      <Person id={id} x={130} y={372} s={1.05} skin={C.skin1} hair={C.hair2} hairStyle="short" shirt={C.cobalt} expr="frown" slump={0.6}>
        {/* pupils pushed up over the normal ones: the eye roll */}
        <g transform="translate(0,4.8)">
          <circle cx="-8" cy="-93" r="5" fill={C.cream} />
          <circle cx="8" cy="-93" r="5" fill={C.cream} />
          <circle cx="-8" cy="-96" r="2.4" fill={C.ink} />
          <circle cx="8" cy="-96" r="2.4" fill={C.ink} />
        </g>
        <path d="M-20,-138 a22,10 0 1 1 40,0" stroke={C.tomato} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M20,-138 l-1,-9 m1,9 l-9,-2" stroke={C.tomato} strokeWidth="3" fill="none" strokeLinecap="round" />
      </Person>

      <Table id={id} />
      <ThoughtCloud id={id} x={22} y={58} w={270} lines={['What is she talking about?', 'Does she even work?', 'I should have HR', 'look at her resume.']} tailTo={[120, 205]} size={17} />
    </svg>
  )
}

function After({ id }: { id: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto">
      <Defs id={id} />
      <Paper id={id} w={W} h={H} color="#f6e2ae" />
      <Scrap id={id} d={`M0,0 H${W} V200 H0 Z`} fill="#f1d28a" opacity={0.5} pattern="lines" />
      <PanelLabel x={24}>AFTER</PanelLabel>

      <Person id={id} x={360} y={372} s={1} skin={C.skin2} hair={C.hair1} hairStyle="bun" shirt={C.sage} expr="worried" look={-1} />
      <Person id={id} x={130} y={372} s={1.05} skin={C.skin1} hair={C.hair2} hairStyle="short" shirt={C.cobalt} expr="smile" look={1} />

      {/* what's left of the old thought cloud */}
      <g filter={`url(#${id}-cut)`} fill={C.cream} opacity="0.75">
        <path d="M40,96 l26,-8 l6,20 l-24,6 z" transform="rotate(-18 56 100)" />
        <path d="M96,70 l20,4 l-4,18 l-20,-2 z" transform="rotate(24 106 80)" />
        <path d="M60,150 l18,-2 l2,14 l-18,4 z" transform="rotate(10 70 156)" />
        <circle cx="128" cy="132" r="7" />
      </g>
      <g stroke={C.mustard} strokeWidth="3" strokeLinecap="round">
        <path d="M88,118 l-14,-14 M96,104 v-18 M108,118 l14,-12 M84,134 h-18" />
      </g>

      <Table id={id} />
      <SpeechBubble id={id} x={196} y={56} w={262} lines={['I wasn’t talking about you!', 'I was talking about', 'someone else!']} tailTo={[340, 200]} />
    </svg>
  )
}

export function CoworkerPanels() {
  const id = useId().replace(/:/g, '')
  return (
    <Figure
      label="Two panels of the same meeting with the same coworker: before, eye-rolling at everything she says; after, learning she was talking about someone else"
      caption="Same meeting, same coworker. The narrative popped."
    >
      <div className="grid sm:grid-cols-2 gap-px bg-[#1f1d1a]/15">
        <Before id={`${id}a`} />
        <After id={`${id}b`} />
      </div>
    </Figure>
  )
}
