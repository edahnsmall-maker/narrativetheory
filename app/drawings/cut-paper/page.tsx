import type { Metadata } from 'next'
import { CutPaperDrawings } from './drawings'

export const metadata: Metadata = {
  title: 'Cut-paper drawings — Narrative Theory',
  robots: { index: false },
}

/** The original cut-paper versions of the site's drawings, kept for reference. Not linked from the nav. */
export default function CutPaperPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 md:py-20">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Archive</div>
      <h1 className="font-display text-5xl leading-[1] tracking-tight mb-4">The cut-paper drawings</h1>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        The first version of the site’s illustrations, before the switch to line drawings. Same scenes, same buttons. Kept here so
        they don’t disappear.
      </p>
      <CutPaperDrawings />
    </div>
  )
}
