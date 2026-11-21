import type { Metadata } from 'next'
import Link from 'next/link'
import { XRay } from './x-ray'

export const metadata: Metadata = {
  title: 'Narrative X-ray — Narrative Theory',
  description: 'A free worksheet for looking inside one narrative: what happened, what it assumes, what holds it in place.',
}

export default function XRayPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 md:py-20">
      <Link href="/practices" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
        ← Practices
      </Link>
      <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1] tracking-tight mb-5">The Narrative X-ray</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl">
        This is the way I do narrative analysis. Pick one thing your mind keeps saying and go through it step by step. Short answers are
        fine. Everything stays in this browser.
      </p>
      <XRay />
    </div>
  )
}
