'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ModeNetwork } from '@/components/nt/ModeNetwork'
import { families, familyByName } from '@/lib/data/families'
import { modes } from '@/lib/data/modes'

export default function ModesIndex() {
  const [q, setQ] = useState('')
  const [family, setFamily] = useState<string>('')
  const filtered = modes.filter(
    (m) =>
      (!family || m.family === family) &&
      (!q || m.name.toLowerCase().includes(q.toLowerCase()) || m.tagline.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Field guide</div>
            <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[0.95]">Mode Library</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Modes are combinations of narrative styles, body styles, and action styles. A mode is just a repeated combo.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/practices#all-in-a-mode" className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
              Practice: we’re all in a mode →
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14 prose-nt space-y-5 text-[17px] leading-relaxed">
          <p className="font-display text-2xl leading-snug text-foreground">
            When I’m angry, I think in an angry way: black and white, simplified, me-vs.-them.
          </p>
          <p>
            My body does characteristic things too. My breathing gets shallow. My gaze becomes intense and confrontational. I smile
            less. And my actions shift. I interrupt more, curse more, and speak louder, in shorter sentences with less hedging.
            Congratulations, you’re in anger mode.
          </p>
          <p>
            Everyone’s modes look a little different, but there’s consistency in how a mode is expressed by an individual. Unpacking
            your modes, and your partner’s modes, is pretty much what therapy is all about.
          </p>
          <p>
            I think we should be exploring mindstates like they were species: discovering, classifying, and doing that human thing we
            do. This page is the start of that.
          </p>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
          <p className="text-sm text-muted-foreground italic mb-6 max-w-2xl">
            Each mode is given a name. Spiky Mode. Connecty Mode. Even assigned an image or meme. It sounds silly, but it really
            helps you spot it.
          </p>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Network</div>
          <ModeNetwork />
          <p className="mt-3 text-xs text-muted-foreground">Hover to label, click for the four-row definition.</p>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Families</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {families.map((f) => (
              <div key={f.slug} className="group rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: `oklch(0.75 0.18 ${f.hue})` }} />
                  <div className="font-display text-lg">{f.name}</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{f.blurb}</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  {modes.filter((m) => m.family === f.name).length} modes
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mr-2">All modes</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search modes..."
              className="rounded-full border bg-card px-4 py-2 text-sm w-64"
            />
            <select
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="rounded-full border bg-card px-3 py-2 text-sm"
            >
              <option value="">All families</option>
              {families.map((f) => (
                <option key={f.slug} value={f.name}>{f.name}</option>
              ))}
            </select>
            <span className="text-xs text-muted-foreground">{filtered.length} of {modes.length}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((m) => {
              const f = familyByName(m.family)
              return (
                <div key={m.slug} className="rounded-2xl border bg-card p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: `oklch(0.75 0.18 ${f?.hue ?? 280})` }} />
                    {m.family}
                  </div>
                  <div className="mt-2 font-display text-lg leading-tight">{m.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground italic">{m.tagline}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
