import Link from 'next/link'
import { User, Swords, Heart, Sparkles, ShieldCheck, CloudRain, Fingerprint, AlertOctagon } from 'lucide-react'
import { GradientOrb } from '@/components/nt/GradientOrb'
import { ModeSpotlight } from '@/components/nt/ModeSpotlight'
import { StateField } from '@/components/nt/StateField'
import { StoryPoints } from '@/components/nt/StoryPoints'
import { BodyMatrix } from '@/components/nt/BodyMatrix'

const shelves = [
  {
    title: 'Loosen the Story',
    description: 'Counterexamples, rescripting, visualization, and perspective shifts.',
    href: '/life',
    tint: 'var(--nt-state-calm)',
  },
  {
    title: 'Meditation & Spaciousness',
    description: "Breath, body awareness, don't-know mind, and observing stories without believing them.",
    href: '/life',
    tint: 'var(--nt-state-collapsed)',
  },
  {
    title: 'Relationships & Conflict',
    description: 'Partner narratives, fighting, repair, attraction, and hidden background stories.',
    href: '/life',
    tint: 'var(--nt-state-combative)',
  },
  {
    title: 'The Self Shelf',
    description: 'Self-concept, self-worth, shame, anxiety, depression, and collapse.',
    href: '/life',
    tint: 'var(--nt-mind)',
  },
]

const reinterp = [
  {
    slug: 'the-self',
    name: 'The Self',
    blurb: 'The self as a constructed narrative, not a fixed essence.',
    text: 'The self is not a thing you find. It is a story your mind keeps building from memory, mood, and situation. Different states produce different selves — each one feels like the real you while it lasts.\n\nSeeing the self as constructed does not erase it. It loosens it.',
    Icon: User,
    tint: 'var(--nt-mind)',
  },
  {
    slug: 'conflict',
    name: 'Conflict',
    blurb: 'Two narrative fields colliding, each defending its own reality.',
    text: 'Conflict is rarely about the facts. It is two people defending the world their minds have built. Each feels correct. Each feels attacked. Each is arguing with a construction the other cannot see.\n\nThe move out of conflict is rarely winning the frame. It is making contact with the person under it.',
    Icon: Swords,
    tint: 'var(--nt-state-combative)',
  },
  {
    slug: 'attraction',
    name: 'Attraction',
    blurb: 'A narrative engine that builds a whole person from a sliver of evidence.',
    text: "Attraction is a story the mind generates fast — a glance, a tone, an absence — and projects forward into a whole person, a whole future, a whole loss.\n\nWhat looks like seeing the other is often projecting onto them. Naming the frame doesn't kill the attraction. It stops the frame from running the person.",
    Icon: Heart,
    tint: 'var(--nt-state-fearful)',
  },
  {
    slug: 'charisma',
    name: 'Charisma',
    blurb: 'The narrative gravity a person carries into a room.',
    text: "Charisma is partly the strength and stability of someone's narrative field. A confident person walking into an anxious room shifts the room's gravity. People feel pulled into a steadier story about themselves.\n\nIt is less a trait than a state someone can hold long enough to share.",
    Icon: Sparkles,
    tint: 'var(--nt-state-proud)',
  },
  {
    slug: 'certainty',
    name: 'Certainty',
    blurb: 'A felt quality of the state, not a property of the facts.',
    text: 'Certainty is how a narrative feels from inside a charged state, not a measurement of how true it is. The same person, in a different state, finds the previous certainty puzzling.\n\nMost overconfidence is state-confidence mistaken for evidence.',
    Icon: ShieldCheck,
    tint: 'var(--nt-action)',
  },
  {
    slug: 'depression-anxiety',
    name: 'Depression & Anxiety',
    blurb: 'Sustained states that lock in narratives about self, future, and world.',
    text: 'Anxiety is a future-heavy narrative running on a body braced for threat. Depression is a collapsed state running narratives of closure, defeat, and pointlessness.\n\nThese are not just feelings. They are stable arrangements of mind, body, and story that mistake themselves for truth.',
    Icon: CloudRain,
    tint: 'var(--nt-state-ashamed)',
  },
  {
    slug: 'personality',
    name: 'Personality',
    blurb: 'A recurring distribution of modes across time and contexts.',
    text: "Personality is not a fixed essence. It is the distribution of modes a person tends to land in. The 'anxious person' lives more in Anxiety Mode. The 'driven person' in Progress Mode. The 'avoidant person' has worn grooves into Avoidance.\n\nA person is not identical to their patterns. They are the field in which patterns appear and dissolve.",
    Icon: Fingerprint,
    tint: 'var(--nt-body)',
  },
  {
    slug: 'disorders',
    name: 'Disorders',
    blurb: 'Modes that have become rigid, frequent, and self-reinforcing.',
    text: 'Many disorders can be read as modes that lost their flexibility. A pattern that once protected the system stays on, organizes more and more of life, and becomes hard to step out of.\n\nThis framing does not replace clinical care. It offers a way to see the pattern as a pattern, not as identity.',
    Icon: AlertOctagon,
    tint: 'var(--nt-state-fearful)',
  },
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
                A framework for seeing how the mind builds self, other, future, and world — and how
                energy states make those stories feel real.
              </p>
            </div>
            <div className="md:col-span-4 relative flex justify-center md:justify-end">
              <GradientOrb variant="rainbow" size={300} />
            </div>
          </div>
        </div>
      </section>

      {/* Intro prose */}
      <section className="border-t">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 md:py-20">
          <div className="prose-nt space-y-5 text-[17px] leading-relaxed">
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">
              You are not one fixed thing.
            </p>
            <p>
              You move through shifting narratives about yourself, other people, your future, your situation,
              and the world. In one state, you feel capable. In another, you feel worthless. In another,
              everyone seems threatening. In another, the future opens up again.
            </p>
            <p>The facts may not have changed.</p>
            <p>What changed is the story your mind is building from them.</p>
          </div>
        </div>
      </section>

      {/* One state. Many stories. */}
      <section className="border-t bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <StateField />
        </div>
      </section>

      {/* Story points */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <StoryPoints />
        </div>
      </section>

      {/* Body matrix */}
      <section className="border-t bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <BodyMatrix />
        </div>
      </section>

      {/* Modes spotlight */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mb-10">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Modes</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl leading-tight">
              Modes are recurring patterns of mind and body.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              When the same narrative, body state, and action pattern keeps returning, that pattern is a mode.
            </p>
          </div>
          <ModeSpotlight />
          <div className="mt-8">
            <Link
              href="/modes"
              className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm hover:border-foreground/40"
            >
              Explore all modes →
            </Link>
          </div>
        </div>
      </section>

      {/* Life Instruction */}
      <section className="border-t bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-10">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Practice</div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl leading-tight">Life Instruction™</h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                Narrative Theory has two sides. The descriptive side shows how the mind constructs experience.
                The prescriptive side asks what to do once you see it.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link href="/life" className="text-sm underline underline-offset-4">
                Browse all modules →
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shelves.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group rounded-2xl border bg-card p-6 h-full flex flex-col gap-3 hover:border-foreground/40 transition"
              >
                <div className="relative h-20">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${s.tint} 0%, transparent 60%)`,
                      opacity: 0.7,
                      filter: 'blur(8px)',
                    }}
                  />
                </div>
                <div className="font-display text-xl leading-tight">{s.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reinterpretation cards */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Reinterpretation</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl leading-tight">
              How Narrative Theory Reinterprets Things
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed">
              Narrative Theory cuts familiar experiences in a different way. It shows how many problems are
              shaped by the stories, states, and modes that organize them.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {reinterp.map((t) => {
              const Icon = t.Icon
              return (
                <article
                  key={t.slug}
                  className="group relative rounded-2xl border bg-card p-6 md:p-7 flex flex-col gap-3 transition hover:border-foreground/40 hover:shadow-sm overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-60"
                    style={{
                      background: `radial-gradient(circle, ${t.tint} 0%, transparent 65%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                  <div
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{
                      background: `color-mix(in oklab, ${t.tint} 18%, transparent)`,
                      borderColor: `color-mix(in oklab, ${t.tint} 40%, transparent)`,
                      color: t.tint,
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-2xl leading-tight">{t.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground italic leading-snug">{t.blurb}</p>
                  </div>
                  <div className="relative space-y-2.5 text-[14.5px] leading-relaxed text-foreground/85">
                    {t.text.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 md:col-start-2">
            <blockquote className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              &ldquo;The whole world is created by mind alone.&rdquo;
            </blockquote>
            <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">— Zen saying</div>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <GradientOrb variant="pink" size={180} />
          </div>
        </div>
      </section>
    </div>
  )
}
