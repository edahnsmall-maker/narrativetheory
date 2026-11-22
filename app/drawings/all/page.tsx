import type { Metadata } from 'next'
import { CutPaperDrawings } from '../cut-paper/drawings'

export const metadata: Metadata = {
  title: 'All drawings — Narrative Theory',
  robots: { index: false },
}

/** Every drawing on the site in the current style, on one page. Not linked from the nav. */
export default function AllDrawingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 md:py-20">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Studio</div>
      <h1 className="font-display text-5xl leading-[1] tracking-tight mb-4">All the drawings</h1>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">Every illustration on the site, in the current style.</p>
      <CutPaperDrawings style="contour" />
    </div>
  )
}
