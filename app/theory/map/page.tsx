import type { Metadata } from 'next'
import Link from 'next/link'
import { NTMap } from '@/components/nt2/NTMap'
import { MapExtras } from '@/components/nt2/MapExtras'

export const metadata: Metadata = {
  title: 'The map — Narrative Theory',
  description: 'Narrative Theory layer by layer: the slice, cuts, energy state, mode, narrative flavor, Saran Wrap, action sets and outcomes.',
}

export default function MapPage() {
  return (
    <div className="bg-[#0b0b0c] text-white -mb-24 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-16">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Link href="/theory" className="text-[11px] uppercase tracking-[0.16em] text-white/45 hover:text-white">
              ← Narrative Theory
            </Link>
            <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1] tracking-tight">The map</h1>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/60 md:text-right md:pt-8">
            From the slice to the outcome.
            <br />
            <span className="text-white/40">Each layer is in Edahn’s words, from his writing.</span>
          </p>
        </div>

        <div className="mt-10">
          <NTMap />
        </div>

        <MapExtras />

        <div className="mt-16 grid gap-6 md:grid-cols-2 border-t border-white/15 pt-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/45">The way out</div>
            <p className="mt-3 font-display text-2xl md:text-3xl leading-snug">
              “Moments where we stop chasing create gaps in the dream, or moments of wakefulness.”
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end md:justify-end">
            <Link href="/practices/give-up" className="rounded-full border border-white/40 px-4 py-2 text-sm hover:bg-white hover:text-black">
              Lesson one. Give up. →
            </Link>
            <Link href="/theory#core-vocabulary" className="rounded-full border border-white/40 px-4 py-2 text-sm hover:bg-white hover:text-black">
              The vocabulary →
            </Link>
            <Link href="/modes" className="rounded-full border border-white/40 px-4 py-2 text-sm hover:bg-white hover:text-black">
              Mode Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
