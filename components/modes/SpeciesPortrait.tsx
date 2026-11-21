'use client'

import { useId } from 'react'
import { Defs, Person } from '@/components/home2/collage'
import type { Species } from '@/lib/data/fieldGuide'

/** A small cut-paper portrait of a mode, with its sticker. */
export function SpeciesPortrait({ s, size = 'md' }: { s: Pick<Species, 'portrait' | 'sticker' | 'name'>; size?: 'md' | 'lg' }) {
  const id = useId().replace(/:/g, '')
  const p = s.portrait
  return (
    <div className={`relative ${size === 'lg' ? 'w-56 sm:w-64' : 'w-full'}`} aria-hidden>
      <svg viewBox="0 0 240 180" className="block w-full h-auto rounded-2xl">
        <Defs id={id} />
        <rect width="240" height="180" fill={p.bg} />
        <rect width="240" height="180" fill={`url(#${id}-dots-lg)`} />
        <circle cx="120" cy="96" r="62" fill="#fffaf0" opacity="0.55" />
        <Person id={id} x={120} y={186} s={1.2} skin={p.skin} hair={p.hair} hairStyle={p.hairStyle} shirt={p.shirt} expr={p.expr} slump={p.slump ?? 0} />
      </svg>
      <span
        className={`absolute grid place-items-center rounded-full bg-[#fffaf0] shadow-[1px_2px_0_rgba(31,29,26,0.18)] rotate-[8deg] ${
          size === 'lg' ? 'right-1 top-1 h-14 w-14 text-3xl' : 'right-2 top-2 h-10 w-10 text-xl'
        }`}
      >
        {s.sticker}
      </span>
    </div>
  )
}
