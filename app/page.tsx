import Link from 'next/link'
import { GradientOrb } from '@/components/nt/GradientOrb'
import { ScrollStory } from '@/components/home/scroll/ScrollStory'
import { STAGES } from '@/lib/program/stages'

const STAGE_TINTS = [
  'var(--nt-state)',
  'var(--nt-action)',
  'var(--nt-reality)',
  'var(--nt-mind)',
  'var(--nt-body)',
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 md:pt-28 pb-16 relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8 relative z-10">
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tight">
                Introducing<br />Narrative Theory
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                How the mind builds the world you live in — and how to see it happening.
              </p>
            </div>
            <div className="md:col-span-4 relative flex justify-center md:justify-end">
              <GradientOrb variant="rainbow" size={300} />
            </div>
          </div>
        </div>
      </section>

      {/* Intro prose — the client story */}
      <section className="border-t">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 md:py-20">
          <div className="prose-nt space-y-5 text-[17px] leading-relaxed">
            <p>
              Years ago, a therapy client came in a week apart as two different people. Nothing in her life had
              changed — same job, same relationship, same apartment. The first week, all of it was good. The next
              week, none of it mattered.
            </p>
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">
              The facts held still. The story collapsed.
            </p>
            <p>
              That&apos;s the thing this site is about: you don&apos;t live in the world. You live in a construction of
              it — built from stories about yourself, other people, the future, and every situation you&apos;re in.
              The construction changes with your state, shows up in your body, and never announces itself. It
              always feels like plain reality.
            </p>
            <p>Scroll, and watch one get built.</p>
          </div>
        </div>
      </section>

      {/* The Construction — 12-stage scrollytelling diagram */}
      <ScrollStory />

      {/* Closing quote + CTA — the conclusion of Stage 12 */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-display text-2xl md:text-3xl leading-snug mb-10">Just this. That&apos;s the whole point.</div>
            <blockquote className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight">
              &ldquo;The whole world is created by mind alone.&rdquo;
            </blockquote>
            <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">— Avatamsaka Sutra</div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Link
                href="/program"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Find out what yours is
              </Link>
              <Link href="/theory" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Read the full theory →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Program */}
      <section className="border-t bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-10">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                The Program
              </div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl leading-tight">
                Five stages, one dream — yours
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                Everything above is the theory. This is the part you actually do. A guide listens,
                makes a case for what it thinks is running in your life, and builds you a map you can
                look at — then the practical work of living differently with it.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link href="/program" className="text-sm underline underline-offset-4">
                How it works →
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STAGES.map((stage, index) => (
              <Link
                key={stage.id}
                href="/program"
                className="group rounded-2xl border bg-card p-5 h-full flex flex-col gap-2.5 hover:border-foreground/40 transition"
              >
                <div className="relative h-12">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${STAGE_TINTS[index]} 0%, transparent 62%)`,
                      opacity: 0.75,
                      filter: 'blur(8px)',
                    }}
                  />
                </div>
                <div className="text-xs tabular-nums text-muted-foreground">{stage.id}</div>
                <div className="font-display text-lg leading-tight">{stage.name}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{stage.tagline}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/program/session"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start the first conversation
            </Link>
            <span className="ml-4 text-sm text-muted-foreground">
              No account. Stored in your browser.
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
