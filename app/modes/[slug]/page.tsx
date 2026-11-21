import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { sightings, sightingSlug, species, speciesBySlug } from '@/lib/data/fieldGuide'
import { modeBySlug, modeByName } from '@/lib/data/modes'
import { SpeciesPortrait } from '@/components/modes/SpeciesPortrait'
import { ModeStories } from '@/components/modes/ModeStories'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = speciesBySlug(slug)?.name ?? sightings.find((g) => sightingSlug(g.name) === slug)?.name ?? modeBySlug(slug)?.name
  return { title: name ? `${name} — Mode Field Guide` : 'Mode Field Guide' }
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[170px_1fr] gap-1 sm:gap-6 py-4 border-t border-black/10">
      <div className="text-[11px] uppercase tracking-[0.14em] text-black/45 pt-1">{label}</div>
      <div className="text-[16px] leading-relaxed text-black/85">{children}</div>
    </div>
  )
}

function Back() {
  return (
    <Link href="/modes" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
      ← Field guide
    </Link>
  )
}

export default async function ModePage({ params }: Props) {
  const { slug } = await params

  // 1) A described species
  const s = speciesBySlug(slug)
  if (s) {
    const related = s.related.map((r) => speciesBySlug(r)).filter(Boolean) as typeof species
    return (
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 md:py-16">
        <Back />
        <header className="mt-6 grid gap-8 md:grid-cols-[auto_1fr] items-center">
          <SpeciesPortrait s={s} size="lg" />
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Habitat: {s.habitat}</div>
            <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">{s.name}</h1>
            {s.aka && <div className="mt-2 text-muted-foreground">also: {s.aka}</div>}
            <p className="mt-5 font-display text-2xl leading-snug">{s.line}</p>
          </div>
        </header>

        {/* the specimen card */}
        <div className="mt-12 rounded-3xl border bg-[#f5f0e6] px-5 sm:px-8 pt-4 pb-6 text-[#1f1d1a]">
          <div className="flex items-center justify-between py-2">
            <div className="text-[11px] uppercase tracking-[0.16em] text-black/45">Field notes</div>
            <div className="text-2xl" aria-hidden>
              {s.sticker}
            </div>
          </div>
          {s.feel && <Field label="What it’s like">{s.feel}</Field>}
          {s.comesAfter && <Field label="Comes after">{s.comesAfter}</Field>}
          {s.thinking && <Field label="Thinking style">{s.thinking}</Field>}
          {s.body && <Field label="Body">{s.body}</Field>}
          {s.world && <Field label="How the world looks">{s.world}</Field>}
          {s.does && <Field label="What you do">{s.does}</Field>}
          {s.intensity && <Field label="Intensity">{s.intensity}</Field>}
          {s.duration && <Field label="How long it lasts">{s.duration}</Field>}
          {s.wayOut && <Field label="Way out">{s.wayOut}</Field>}
          {!s.feel && !s.thinking && !s.body && !s.world && (
            <Field label="Still mapping">
              This one is only partly described so far. If you know it from the inside, your story below helps fill it in.
            </Field>
          )}
          {s.quote && <p className="mt-4 border-l-2 border-black/30 pl-4 font-display text-xl leading-snug">“{s.quote}”</p>}
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Often seen near</div>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/modes/${r.slug}`} className="group rounded-2xl border bg-card p-2.5 pb-4">
                  <SpeciesPortrait s={r} />
                  <div className="px-1.5 pt-3 font-display text-lg leading-tight group-hover:underline underline-offset-4">{r.name}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16">
          <ModeStories slug={s.slug} name={s.name} />
        </div>
      </article>
    )
  }

  // 2) A sighting: named, not yet described
  const g = sightings.find((x) => sightingSlug(x.name) === slug)
  if (g) {
    return (
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <Back />
        <div className="mt-8 text-6xl" aria-hidden>
          {g.sticker}
        </div>
        <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Sighting · not yet described</div>
        <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">{g.name}</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          I’ve seen this one and written down its name, but I haven’t mapped it: the body, the thinking style, what the world looks
          like from inside it. Get the body right, get the content and scoring system right, and ask people to tell their stories of
          that mode so we can understand it.
        </p>
        <div className="mt-12">
          <ModeStories slug={slug} name={g.name} />
        </div>
      </article>
    )
  }

  // 3) A mode from the wider map
  const m = modeBySlug(slug)
  if (!m) notFound()
  const rel = m.related.map((n) => modeByName(n)).filter(Boolean)
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
      <Back />
      <div className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">The wider map · {m.family}</div>
      <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-tight">{m.name}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{m.tagline}</p>
      <div className="mt-10 rounded-3xl border bg-[#f5f0e6] px-5 sm:px-8 pt-2 pb-4 text-[#1f1d1a]">
        <Field label="Thinking style">{m.thinking}</Field>
        <Field label="The wrap">{m.saran}</Field>
        <Field label="Body">{m.body}</Field>
        <Field label="What you do">{m.behaviors}</Field>
        <Field label="How it unfolds">{m.sequence}</Field>
      </div>
      {rel.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {rel.map((r) => (
            <Link key={r!.slug} href={`/modes/${r!.slug}`} className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
              {r!.name}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
