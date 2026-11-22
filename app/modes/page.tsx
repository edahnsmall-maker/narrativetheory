import type { Metadata } from 'next'
import Link from 'next/link'
import { ModeNetwork } from '@/components/nt/ModeNetwork'
import { SpeciesPortrait } from '@/components/modes/SpeciesPortrait'
import { StimulusDemo } from '@/components/modes/StimulusDemo'
import { ModeCatalog } from '@/components/modes/ModeCatalog'
import { AddMode } from '@/components/modes/AddMode'
import { catalog, catalogBySlug, SPOTLIGHT } from '@/lib/data/catalog'
import { sightings, sightingSlug } from '@/lib/data/fieldGuide'

export const metadata: Metadata = {
  title: 'The Mode Catalog — Narrative Theory',
  description: 'Modes are repeated combinations of body, thinking and action. A catalog of the modes we all slip into, and how each one colors the world.',
}

const kicker = 'text-xs uppercase tracking-widest text-muted-foreground'
const wrap = 'mx-auto max-w-7xl px-4 sm:px-5 lg:px-8'

const INGREDIENTS = [
  { k: 'Body', v: 'Breath, posture, face, tension. The body goes first.' },
  { k: 'Energy', v: 'The charge underneath: agitated, fearful, analytical, low, loving, calm.' },
  { k: 'Thinking', v: 'The narrative style. What you notice, what you expect, what it means.' },
  { k: 'Action', v: 'What you end up doing, and how it lands on everyone else.' },
]

export default function ModesIndex() {
  const spot = SPOTLIGHT.map(catalogBySlug).filter((m) => m && m.portrait)
  return (
    <div>
      <header className="border-b">
        <div className={`${wrap} py-14 flex flex-wrap items-end justify-between gap-6`}>
          <div>
            <div className={kicker}>Modes</div>
            <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[0.95]">The Mode Catalog</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Modes are combinations of narrative styles, body styles, and action styles. A mode is just a repeated combo. Here are {catalog.length} of them, and room for yours.
            </p>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm" aria-label="On this page">
            {[['#how', 'How modes work'], ['#catalog', 'Catalog'], ['#tree', 'Mode tree'], ['#add', 'Add a mode']].map(([h, l]) => (
              <a key={h} href={h} className="rounded-full border px-3.5 py-1.5 hover:bg-accent">{l}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* how modes work */}
      <section id="how" className="border-b scroll-mt-20">
        <div className={`${wrap} py-14 grid gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div className="space-y-5 text-[17px] leading-relaxed">
            <div className={kicker}>How modes work</div>
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">
              A mode hijacks how you see the world. Your body and mind are operating in unison, and it colors how you see things, how you interpret them, and how you respond to them.
            </p>
            <p>
              Everyone’s modes look a little different, but there’s consistency in how a mode is expressed by an individual. You can identify a mode because it’s always got the same vibe. Unpacking your modes, and your partner’s modes, is pretty much what therapy is all about.
            </p>
            <p>
              It should be friendly, like Berne’s <em>Games People Play</em>, not like how stars are classified. Each mode gets a name, even an image or a meme. It sounds silly, but it really helps you spot it.
            </p>
            <Link href="/practices#all-in-a-mode" className="inline-block text-sm underline underline-offset-4">Practice: we’re all in a mode →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 self-start">
            {INGREDIENTS.map((x, i) => (
              <div key={x.k} className="rounded-3xl border bg-card p-5">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{String(i + 1).padStart(2, '0')}</div>
                <div className="mt-1 font-display text-2xl">{x.k}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-snug">{x.v}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-3xl bg-foreground text-background p-5 text-center font-display text-xl">
              Body + Energy + Thinking + Action, together, again and again = a mode
            </div>
          </div>
        </div>
      </section>

      {/* one moment, different modes */}
      <section className="border-b bg-[#f5f0e6] text-[#1f1d1a]">
        <div className={`${wrap} py-14`}>
          <div className={kicker}>One moment, different modes</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight max-w-2xl">The facts don’t change. The mode decides what they mean.</h2>
          <div className="mt-8">
            <StimulusDemo />
          </div>
        </div>
      </section>

      {/* spotlight */}
      <section className="border-b">
        <div className={`${wrap} py-14`}>
          <div className={kicker}>Spotlight</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">Four worth knowing</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {spot.map((m) => (
              <Link key={m!.slug} href={`/modes/${m!.slug}`} className="group rounded-3xl border bg-card p-3 pb-5 flex flex-col hover:shadow-[3px_4px_0_rgba(31,29,26,0.12)] transition-shadow">
                <SpeciesPortrait s={{ portrait: m!.portrait!, sticker: m!.sticker, name: m!.name }} />
                <div className="px-2 pt-4 flex-1 flex flex-col">
                  <div className="font-display text-2xl leading-tight group-hover:underline underline-offset-4">{m!.name}</div>
                  <p className="mt-1.5 text-[15px] text-muted-foreground leading-snug">{m!.line}</p>
                  {m!.quote && (
                    <p className="mt-auto pt-4 text-sm italic leading-snug">
                      “{m!.quote.text}” <span className="not-italic text-muted-foreground">— {m!.quote.by}</span>
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* catalog */}
      <section id="catalog" className="border-b scroll-mt-20">
        <div className={`${wrap} py-14`}>
          <div className={kicker}>The catalog</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">Every mode</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Sort them by what they do to you: whether they pull you toward people or apart, whether they’re a doing state or closer to just being, and the energy underneath.
          </p>
          <div className="mt-8">
            <ModeCatalog />
          </div>
        </div>
      </section>

      {/* tree */}
      <section id="tree" className="border-b scroll-mt-20">
        <div className={`${wrap} py-14`}>
          <div className="max-w-2xl mb-6">
            <div className={kicker}>The mode tree</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">How modes connect</h2>
            <p className="mt-2 text-muted-foreground">
              Each branch is a family of modes. Correct function sits in the middle: modes with less story between you and what’s happening. Hover to label, click for the short version.
            </p>
          </div>
          <ModeNetwork />
        </div>
      </section>

      {/* add */}
      <section id="add" className="scroll-mt-20 bg-[#f5f0e6] text-[#1f1d1a]">
        <div className={`${wrap} py-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]`}>
          <div>
            <div className={kicker}>Add to the catalog</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">Spotted one that isn’t here?</h2>
            <p className="mt-3 text-black/70 leading-relaxed">
              I think we should be exploring mindstates like they were species: discovering, classifying, and doing that human thing we do. Get the body right, the thinking style, what you end up doing. Tell the story of a time you were in it.
            </p>
            <div className="mt-8 text-[11px] uppercase tracking-widest text-black/50">Named, not yet described</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sightings.map((g) => (
                <Link
                  key={g.name}
                  href={`/modes/${sightingSlug(g.name)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-black/30 bg-[#fffaf0] px-3.5 py-1.5 text-sm hover:border-black/60"
                >
                  <span aria-hidden>{g.sticker}</span>
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
          <AddMode />
        </div>
      </section>
    </div>
  )
}
