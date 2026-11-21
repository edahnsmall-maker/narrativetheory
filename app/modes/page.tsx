'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ModeNetwork } from '@/components/nt/ModeNetwork'
import { familyByName } from '@/lib/data/families'
import { modes } from '@/lib/data/modes'
import { HABITATS, sightings, sightingSlug, species, type Habitat } from '@/lib/data/fieldGuide'
import { SpeciesPortrait } from '@/components/modes/SpeciesPortrait'

export default function ModesIndex() {
  const [habitat, setHabitat] = useState<Habitat | ''>('')
  const [q, setQ] = useState('')
  const shown = species.filter((s) => !habitat || s.habitat === habitat)
  const more = modes.filter((m) => !species.some((s) => s.slug === m.slug))
  const filtered = more.filter(
    (m) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.tagline.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Field guide</div>
            <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[0.95]">The Mode Field Guide</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Modes are combinations of narrative styles, body styles, and action styles. A mode is just a repeated combo.
            </p>
          </div>
          <Link href="/practices#all-in-a-mode" className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
            Practice: we’re all in a mode →
          </Link>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-12 space-y-5 text-[17px] leading-relaxed">
          <p className="font-display text-2xl leading-snug text-foreground">
            I think we should be exploring mindstates like they were species: discovering, classifying, and doing that human thing we
            do.
          </p>
          <p>
            Everyone’s modes look a little different, but there’s consistency in how a mode is expressed by an individual. You can
            identify a mode because it’s always got the same vibe. Unpacking your modes, and your partner’s modes, is pretty much what
            therapy is all about.
          </p>
          <p>
            It should be friendly, like Berne’s <em>Games People Play</em>, not like how stars are classified. Each mode gets a name,
            even an image or a meme. It sounds silly, but it really helps you spot it.
          </p>
        </div>
      </section>

      {/* the species */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs uppercase tracking-widest text-muted-foreground mr-2">Habitat</span>
            {(['', ...HABITATS] as (Habitat | '')[]).map((h) => (
              <button
                key={h || 'all'}
                type="button"
                aria-pressed={habitat === h}
                onClick={() => setHabitat(h)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  habitat === h ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'
                }`}
              >
                {h || 'All'}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted-foreground tabular-nums">{shown.length} species</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((s) => (
              <Link
                key={s.slug}
                href={`/modes/${s.slug}`}
                className="group rounded-3xl border bg-card p-3 pb-5 hover:shadow-[3px_4px_0_rgba(31,29,26,0.12)] transition-shadow"
              >
                <SpeciesPortrait s={s} />
                <div className="px-2 pt-4">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span>{s.habitat}</span>
                    {s.aka && <span className="normal-case tracking-normal truncate">· {s.aka}</span>}
                  </div>
                  <div className="mt-1 font-display text-2xl leading-tight group-hover:underline underline-offset-4">{s.name}</div>
                  <p className="mt-1.5 text-[15px] text-muted-foreground leading-snug">{s.line}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* sightings */}
      <section className="border-b bg-[#f5f0e6]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Sightings</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">Spotted, not yet described</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Modes I’ve written down a name for but haven’t mapped yet. If you’ve been in one, tell the story. That’s how they get
              described.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {sightings.map((g) => (
              <Link
                key={g.name}
                href={`/modes/${sightingSlug(g.name)}`}
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-black/30 bg-[#fffaf0] px-4 py-2 text-[15px] hover:border-black/60 hover:-rotate-1 transition-transform"
              >
                <span>{g.sticker}</span>
                {g.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* the wider map: the earlier, broader catalogue */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
          <div className="max-w-2xl mb-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">The wider map</div>
            <h2 className="mt-2 font-display text-3xl leading-tight">How modes connect</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A broader, rougher catalogue. Hover to label, click for the short definition.
            </p>
          </div>
          <ModeNetwork />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mr-2">More modes</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search modes..."
              className="rounded-full border bg-card px-4 py-2 text-sm w-64"
            />
            <span className="text-xs text-muted-foreground">
              {filtered.length} of {more.length}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((m) => {
              const f = familyByName(m.family)
              return (
                <Link key={m.slug} href={`/modes/${m.slug}`} className="rounded-2xl border bg-card p-4 hover:bg-accent/40 transition-colors">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: `oklch(0.75 0.18 ${f?.hue ?? 280})` }} />
                    {m.family}
                  </div>
                  <div className="mt-2 font-display text-lg leading-tight">{m.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground italic">{m.tagline}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
