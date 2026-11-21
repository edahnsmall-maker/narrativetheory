'use client'

import { useId } from 'react'
import { C, Defs } from './collage'

/** Hero collage: the apple in Saran Wrap. You don't see the wrap until you look for it. */
export function HeroApple() {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 420 420" className="w-full h-auto" role="img" aria-label="An apple wrapped tightly in clear plastic wrap">
      <Defs id={id} />
      {/* paper scraps behind */}
      <g filter={`url(#${id}-torn)`}>
        <circle cx="210" cy="220" r="170" fill={C.mustard} opacity="0.35" />
        <path d="M40,300 C90,250 180,280 230,330 C260,360 200,410 120,400 C60,392 10,340 40,300 Z" fill={C.cobalt} opacity="0.25" />
        <rect x="250" y="40" width="130" height="90" fill={`url(#${id}-dots-lg)`} />
      </g>
      {/* the apple */}
      <g filter={`url(#${id}-cut)`}>
        <path d="M210,120 C150,90 80,130 86,215 C92,300 150,350 210,330 C270,350 328,300 334,215 C340,130 270,90 210,120 Z" fill={C.tomato} />
        <path d="M150,160 C120,190 118,240 140,280" stroke="#f08a74" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M208,124 C206,100 214,82 226,70" stroke={C.hair2} strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M222,92 C250,70 286,78 296,96 C266,110 240,108 222,92 Z" fill={C.sage} />
      </g>
      {/* the wrap: tight, glossy, nearly invisible */}
      <path d="M210,112 C146,80 70,124 76,215 C82,310 146,362 210,342 C274,362 338,310 344,215 C350,124 274,80 210,112 Z" fill={`url(#${id}-gloss)`} opacity="0.85" />
      <path d="M210,112 C146,80 70,124 76,215 C82,310 146,362 210,342 C274,362 338,310 344,215 C350,124 274,80 210,112 Z" fill="none" stroke="#fff" strokeWidth="2" opacity="0.7" />
      <path d="M110,170 C120,140 150,120 180,116" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M300,250 C296,280 280,300 260,314" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M196,108 l-6,-14 M224,108 l8,-12 M204,104 l2,-16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      {/* typed label */}
      <g transform="translate(232,352) rotate(-3)" filter={`url(#${id}-cut)`}>
        <rect x="0" y="0" width="168" height="34" fill={C.cream} />
        <text x="10" y="22" fontSize="15" fill={C.ink} fontFamily="'Courier New', ui-monospace, monospace" fontWeight="600">
          fig. 1: an apple?
        </text>
      </g>
    </svg>
  )
}
