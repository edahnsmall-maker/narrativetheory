import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Narrative Theory on one page',
  description:
    'The whole of Narrative Theory on one page: the crying baby, narrative, energy state, key narratives, the Saran Wrap, outcomes, narrative dynamics and vectors. In Edahn’s words.',
}

const PDF = '/downloads/narrative-theory-on-one-page.pdf'
const PNG = '/downloads/narrative-theory-on-one-page.png'
const PNG_DARK = '/downloads/narrative-theory-on-one-page-dark.png'

// Every line on the poster is from Edahn's blog posts. Source: Deliverables/NT explained (one-pager)/nt-explained.html
export default function OnePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
      <Link href="/theory" className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
        ← Narrative Theory
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight">On one page</h1>
        <div className="flex flex-wrap gap-3">
          <a href={PDF} download className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90">
            Download PDF
          </a>
          <a href={PNG} download className="rounded-full border px-5 py-2.5 text-sm hover:bg-secondary">
            Image
          </a>
          <a href={PNG_DARK} download className="rounded-full border px-5 py-2.5 text-sm hover:bg-secondary">
            Image (dark)
          </a>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        The whole theory in eight panels, to read or to give to someone. Every line is from Edahn’s writing.
      </p>

      <a href={PDF} className="mt-10 block rounded-2xl border overflow-hidden bg-white">
        <picture>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PNG}
            width={3200}
            height={6414}
            className="w-full h-auto"
            alt="Narrative Theory on one page. 01 The crying baby: the same scene reads as annoying, a beautiful part of life, or her to-do list. 02 Narrative: the ideas we form in our mind about something. 03 Energy state: it animates narrative style, body-feeling and action sets. 04 Key narratives: me, partner, boss, family, friends, rivals and the future move together. 05 The Saran Wrap: the view we have is projected out onto the world. 06 Outcomes: the same view, the same responses, the same outcomes. 07 Narrative dynamics: narratives harmonize or yield; certainty decides. 08 Vectors: desires shrink until we are just there, just being."
          />
        </picture>
      </a>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/theory/map" className="rounded-full border px-4 py-2 text-sm hover:bg-secondary">
          The map, layer by layer →
        </Link>
        <Link href="/practices/give-up" className="rounded-full border px-4 py-2 text-sm hover:bg-secondary">
          Lesson one. Give up. →
        </Link>
      </div>
    </div>
  )
}
