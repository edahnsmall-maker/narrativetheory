import Link from 'next/link'
import type { Metadata } from 'next'
import { practices } from '@/lib/data/practices'
import { PracticeCard } from './practice-card'

export const metadata: Metadata = {
  title: 'Practices — Narrative Theory',
  description: 'Short things to do in the moment, from Edahn Small’s notes, plus the Narrative X-ray worksheet.',
}

export default function PracticesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 md:py-20">
      <header className="max-w-2xl mb-12">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Practices</div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight mb-5">Pocket practices</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Short things to do in the moment, pulled from my notes. Most of them are about stopping something rather than doing
          something. Don’t try to create a certain state. Or do, but not so desperately.
        </p>
      </header>

      <Link
        href="/practices/x-ray"
        className="group mb-12 grid gap-6 md:grid-cols-[1fr_auto] items-center rounded-3xl border bg-[#f5f0e6] p-6 sm:p-8 hover:shadow-[3px_4px_0_rgba(31,29,26,0.12)] transition-shadow"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">Worksheet · about 10 minutes</div>
          <div className="font-display text-3xl md:text-4xl leading-tight">The Narrative X-ray</div>
          <p className="mt-3 max-w-xl text-[16px] text-foreground/80 leading-relaxed">
            Take one sentence your mind keeps saying and look inside it: what actually happened, who it’s about, what it assumes,
            what it gets you, and how locked in it is. No account needed. It stays on your device.
          </p>
        </div>
        <span className="justify-self-start md:justify-self-end rounded-full bg-foreground text-background px-5 py-2.5 text-sm group-hover:opacity-90">
          Start an X-ray →
        </span>
      </Link>

      <div className="grid gap-5 md:grid-cols-2">
        {practices.map((p) => (
          <PracticeCard key={p.id} practice={p} />
        ))}
      </div>

      <p className="mt-14 max-w-2xl text-sm text-muted-foreground leading-relaxed">
        These are practices, not treatment. If you’re in crisis or something feels unsafe, please reach out to a professional or a
        local emergency line.
      </p>
    </div>
  )
}
