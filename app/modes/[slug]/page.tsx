import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { sightings, sightingSlug } from '@/lib/data/fieldGuide'
import { catalog, catalogBySlug, familyOf, DOINGS, PULLS } from '@/lib/data/catalog'
import { SpeciesPortrait } from '@/components/modes/SpeciesPortrait'
import { ModeStories } from '@/components/modes/ModeStories'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return [...catalog.map((m) => ({ slug: m.slug })), ...sightings.map((g) => ({ slug: sightingSlug(g.name) }))]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const m = catalogBySlug(slug)
  const name = m?.name ?? sightings.find((g) => sightingSlug(g.name) === slug)?.name
  return { title: name ? `${name} — The Mode Catalog` : 'The Mode Catalog', description: m?.line }
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-4 border-t border-black/10">
      <div className="text-[11px] uppercase tracking-[0.14em] text-black/45 pt-1">{label}</div>
      <div className="text-[16px] leading-relaxed text-black/85">{children}</div>
    </div>
  )
}

function Back() {
  return (
    <Link href="/modes#catalog" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
      ← The Mode Catalog
    </Link>
  )
}

export default async function ModePage({ params }: Props) {
  const { slug } = await params

  const m = catalogBySlug(slug)
  if (m) {
    const fam = familyOf(m)
    const related = m.related.map(catalogBySlug).filter(Boolean) as typeof catalog
    const pull = PULLS.find((p) => p.key === m.pull)
    const doing = DOINGS.find((d) => d.key === m.doing)
    const startsEnds = [m.comesAfter && m.sequence && !m.sequence.includes(m.comesAfter.slice(0, 20)) ? `Comes after: ${m.comesAfter}` : !m.sequence ? m.comesAfter : '', m.sequence]
      .filter(Boolean)
      .join(' ')
    const chip = 'rounded-full border px-3 py-1 text-xs'
    return (
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 md:py-16">
        <Back />
        <header className={`mt-6 grid gap-8 items-center ${m.portrait ? 'md:grid-cols-[auto_1fr]' : ''}`}>
          {m.portrait ? (
            <SpeciesPortrait s={{ portrait: m.portrait, sticker: m.sticker, name: m.name }} size="lg" />
          ) : null}
          <div>
            {!m.portrait && (
              <div className="mb-4 grid place-items-center h-20 w-20 rounded-full text-5xl" style={{ background: `oklch(0.94 0.05 ${fam?.hue ?? 80})` }} aria-hidden>
                {m.sticker}
              </div>
            )}
            <div className="flex flex-wrap gap-2 text-muted-foreground">
              <Link href="/modes#tree" className={`${chip} hover:text-foreground`}>
                <span className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle" style={{ background: `oklch(0.72 0.15 ${fam?.hue ?? 80})` }} />
                {m.family}
              </Link>
              {pull && pull.key !== 'either' && <span className={chip}>{pull.label}</span>}
              {doing && <span className={chip}>{doing.label === 'Doing states' ? 'Doing state' : 'Being'}</span>}
            </div>
            <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">{m.name}</h1>
            {m.aka && <div className="mt-2 text-muted-foreground">also: {m.aka}</div>}
            <p className="mt-5 font-display text-2xl leading-snug">{m.line}</p>
          </div>
        </header>

        {m.quote && (
          <figure className="mt-10 border-l-2 border-foreground/30 pl-5">
            <blockquote className="font-display text-xl md:text-2xl leading-snug">“{m.quote.text}”</blockquote>
            <figcaption className="mt-2 text-sm text-muted-foreground">— {m.quote.by}</figcaption>
          </figure>
        )}

        <div className="mt-10 rounded-3xl border bg-[#f5f0e6] px-5 sm:px-8 pt-4 pb-6 text-[#1f1d1a]">
          <div className="flex items-center justify-between py-2">
            <div className="text-[11px] uppercase tracking-[0.16em] text-black/45">The breakdown</div>
            <div className="text-2xl" aria-hidden>{m.sticker}</div>
          </div>
          {m.energy && <Field label="Energy state">{m.energy}</Field>}
          <Field label="Body">{m.body ?? <Missing />}</Field>
          <Field label="Thinking style">{m.thinking ?? <Missing />}</Field>
          <Field label="How the world looks">{m.world ?? <Missing />}</Field>
          <Field label="What you do">{m.does ?? <Missing />}</Field>
          {startsEnds && <Field label="How it starts and ends">{startsEnds}</Field>}
          {m.feel && <Field label="What it’s like">{m.feel}</Field>}
          {m.intensity && <Field label="Intensity">{m.intensity}</Field>}
          {m.duration && <Field label="How long it lasts">{m.duration}</Field>}
          {m.wayOut && <Field label="Way out">{m.wayOut}</Field>}
          {m.meme && <Field label="Picture it">{m.meme}</Field>}
          {m.hisQuote && <p className="mt-4 border-l-2 border-black/30 pl-4 font-display text-xl leading-snug">“{m.hisQuote}”</p>}
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Often seen near</div>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/modes/${r.slug}`} className="group rounded-2xl border bg-card p-4 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>{r.sticker}</span>
                  <span className="font-display text-lg leading-tight group-hover:underline underline-offset-4">{r.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16">
          <ModeStories slug={m.slug} name={m.name} />
        </div>
      </article>
    )
  }

  // A sighting: named, not yet described
  const g = sightings.find((x) => sightingSlug(x.name) === slug)
  if (!g) notFound()
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
      <Back />
      <div className="mt-8 text-6xl" aria-hidden>{g.sticker}</div>
      <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Sighting · not yet described</div>
      <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">{g.name}</h1>
      <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
        I’ve seen this one and written down its name, but I haven’t mapped it: the body, the thinking style, what the world looks like
        from inside it. Get the body right, get the content and scoring system right, and ask people to tell their stories of that mode
        so we can understand it.
      </p>
      <div className="mt-12">
        <ModeStories slug={slug} name={g.name} />
      </div>
    </article>
  )
}

function Missing() {
  return <span className="text-black/45">Still mapping. If you know it from the inside, tell your story below.</span>
}
