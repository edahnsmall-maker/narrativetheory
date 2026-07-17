import Link from 'next/link'
import { User, Swords, Heart, Sparkles, ShieldCheck, CloudRain, Fingerprint, AlertOctagon } from 'lucide-react'
import { concepts } from '@/lib/data/concepts'
import { deepTopics } from '@/lib/data/deepTopics'
import { disorderFamilies } from '@/lib/data/disorders'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { StateField } from '@/components/nt/StateField'
import { StoryPoints } from '@/components/nt/StoryPoints'
import { BodyMatrix } from '@/components/nt/BodyMatrix'
import { ModeSpotlight } from '@/components/nt/ModeSpotlight'

const ACCENTS = ['violet', 'pink', 'orange', 'blue', 'yellow'] as const
const accentVar = (i: number) => `var(--accent-${ACCENTS[i % ACCENTS.length]})`

function Eyebrow({ label }: { label: string }) {
  return <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
}

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

export default function TheoryIndex() {
  return (
    <div>
      {/* HEADER */}
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-20">
          <Eyebrow label="The Theory" />
          <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">
            A theory of how mind becomes world.
          </h1>
          <div className="mt-8 max-w-2xl text-[17px] leading-relaxed space-y-5 text-foreground/80">
            <p>
              Narrative Theory studies how experience is constructed. Most of what we call &ldquo;reality&rdquo; arrives already
              wrapped in story: memory, meaning, expectation, rank, fear, desire, and self-image. This invisible layer is
              what NT calls Saran Wrap. It clings so tightly to what is happening that we mostly mistake it for the thing
              itself.
            </p>
            <p>
              The framework draws from Zen practice, cognitive psychology, ethology, psychotherapy, and patient
              observation of one&apos;s own mind. Its claim is simple: when the wrap becomes visible, the situation becomes
              workable. A delayed text stops being rejection. A quiet partner stops being contempt. A room stops being a
              hierarchy. What looked like the world resolves back into the world, plus a mind constructing a version of it.
            </p>
            <p>
              In a meeting where you feel small, the smallness is rarely in the room — it&apos;s in a scoring system the mind
              is running underneath. In a fight that won&apos;t end, what feels like the truth is usually a locked narrative on
              both sides. In attraction, what looks like seeing the other is often a frame projected onto a sliver of
              evidence. These are not failures of perception. They are how perception works until it&apos;s seen.
            </p>
          </div>
        </div>
      </header>

      {/* JUMP NAV */}
      <nav aria-label="Jump to section" className="border-b bg-secondary/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-foreground/60">Jump to</span>
          <span aria-hidden className="h-3 w-px bg-border" />
          <a href="#core-vocabulary" className="hover:text-foreground underline-offset-4 hover:underline">
            Core vocabulary
          </a>
          <span aria-hidden className="h-3 w-px bg-border" />
          <a href="#diagrams" className="hover:text-foreground underline-offset-4 hover:underline">
            The diagrams
          </a>
          <span aria-hidden className="h-3 w-px bg-border" />
          <a href="#deeper-theory" className="hover:text-foreground underline-offset-4 hover:underline">
            Deeper theory
          </a>
          <span aria-hidden className="h-3 w-px bg-border" />
          <a href="#reinterpretation" className="hover:text-foreground underline-offset-4 hover:underline">
            Reinterpretation
          </a>
          <span aria-hidden className="h-3 w-px bg-border" />
          <a href="#disorders" className="hover:text-foreground underline-offset-4 hover:underline">
            Disorders as mode-worlds
          </a>
        </div>
      </nav>

      {/* CORE VOCABULARY */}
      <section id="core-vocabulary" className="border-b scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8 gap-6">
            <div>
              <Eyebrow label="The big ideas" />
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Core vocabulary</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border">
            {concepts.map((c, i) => {
              const color = accentVar(i)
              return (
                <Link
                  key={c.slug}
                  href={`/theory/concepts/${c.slug}`}
                  className="group relative block bg-card p-5 hover:bg-secondary/60 transition-colors"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px] opacity-70 group-hover:opacity-100 group-hover:w-1.5 transition-all"
                    style={{ background: color }}
                  />
                  <div className="font-display text-xl">{c.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.shortDef}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* THE DIAGRAMS */}
      <section id="diagrams" className="border-b scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16 space-y-20">
          <div className="max-w-2xl">
            <Eyebrow label="See it in practice" />
            <h2 className="mt-2 font-display text-3xl md:text-4xl">The diagrams</h2>
            <p className="mt-3 text-muted-foreground">
              The home page shows one thing evolving. These go deeper on four pieces of it.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Illustrates: Body + Energy States · Thought-o-Complete
            </div>
            <StateField />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Illustrates: Narrative · Storypoints · Expectation Narrative
            </div>
            <StoryPoints />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Illustrates: Thinking · Body · Action
            </div>
            <BodyMatrix />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Illustrates: Mode — see also the{' '}
              <Link href="/modes" className="underline underline-offset-4 hover:text-foreground">
                modes library
              </Link>
            </div>
            <ModeSpotlight />
          </div>
        </div>
      </section>

      {/* DEEPER THEORY */}
      <section id="deeper-theory" className="scroll-mt-20 bg-secondary/15">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16">
          <Eyebrow label="Deeper theory" />
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Where it gets interesting</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Open any topic to read more. These are the directions NT extends in: personality, self, conflict, confidence,
            Zen, dynamics between people, attraction, projective power.
          </p>
          <Accordion type="multiple" className="mt-8 border-y">
            {deepTopics.map((t, i) => {
              const color = accentVar(i)
              return (
                <AccordionItem key={t.slug} value={t.slug}>
                  <AccordionTrigger className="py-5 hover:no-underline">
                    <div className="text-left grid grid-cols-12 gap-4 w-full pr-4 items-start">
                      <div className="col-span-12 md:col-span-5 flex items-baseline gap-3">
                        <span className="font-mono text-xs tabular-nums tracking-widest text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-xl leading-tight">{t.name}</span>
                      </div>
                      <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground">{t.blurb}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="pb-6 md:pl-[calc(5/12*100%)] space-y-3 text-[15px] leading-relaxed border-l-2 ml-2 pl-4 md:ml-0"
                      style={{ borderColor: color }}
                    >
                      {t.text.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </section>

      {/* REINTERPRETATION */}
      <section id="reinterpretation" className="border-t scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow label="Reinterpretation" />
            <h2 className="mt-2 font-display text-3xl md:text-4xl">How Narrative Theory reinterprets things</h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
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

      {/* DISORDERS */}
      <section id="disorders" className="relative border-t bg-secondary/20 scroll-mt-20 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 right-[-10%] h-[380px] w-[380px] rounded-full opacity-30 orb-base"
          style={{ background: 'var(--accent-pink)' }}
        />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8 py-20">
          <Eyebrow label="Applied NT" />
          <h2 className="mt-2 font-display text-3xl md:text-5xl leading-tight">Disorders as Mode-Worlds</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-[16px] leading-relaxed text-foreground/80">
            <p>
              Modern diagnosis tends to group disorders by visible symptom clusters. Narrative Theory starts somewhere
              else.
            </p>
            <p>
              The DSM is useful in places, but also haphazard: somewhat arbitrary, symptom-clustered,
              and lacking a clear starting point. NT tries to bring more order, clarity, and simplicity by asking what
              kind of world a person enters when a disorder-mode is activated.
            </p>
            <p>
              A disorder, in NT language, can be understood as a repeating mode-world: a patterned combination of
              narrative, Saran Wrap, body-state, energy-state, target, action set, and feedback loop.
            </p>
            <p>Instead of beginning with &ldquo;What diagnosis is this?&rdquo; NT asks:</p>
            <ul className="space-y-2 pl-0">
              {[
                'What world does the person enter?',
                'What becomes real inside that world?',
                'What is the Saran Wrap hallucination?',
                'What is the target: the future, the body, the self, another person, the relationship, the social room, or reality itself?',
                'What body-state comes online?',
                'What root energy animates the mode?',
                'What actions become automatic?',
                'How do those actions feed back into the narrative and keep it alive?',
              ].map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-2 inline-block h-px w-3 bg-border shrink-0" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p>
              This is not mainly a theory of origins. Some patterns may involve trauma, genetics, temperament, biology,
              culture, karma, or causes we do not understand. NT is more interested in mapping what is happening now: the
              active world, the active body, the active energy, the active script, and the loop that keeps repeating.
            </p>
            <p className="text-sm text-foreground/70 italic">
              A few diagnoses appear in more than one family below — health anxiety in both Threat and Control &amp;
              Certainty, some eating-disorder patterns in both Shame &amp; Rank and Control &amp; Certainty. That&apos;s
              deliberate: the same label can run on more than one underlying mode-world.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border">
            {disorderFamilies.map((f, i) => {
              const color = accentVar(i)
              return (
                <Link
                  key={f.slug}
                  href={`/theory/disorders/${f.slug}`}
                  className="group relative block bg-card p-6 hover:bg-secondary/60 transition-colors scroll-mt-24 overflow-hidden"
                >
                  <span aria-hidden className="absolute top-0 left-0 h-1 w-full" style={{ background: color }} />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity orb-base"
                    style={{ background: color }}
                  />
                  <div className="relative">
                    <div className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color }}>
                      Family {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="font-display text-xl leading-snug">{f.title}</div>
                    <p className="mt-2 text-sm text-foreground/70">{f.description}</p>
                    <dl className="mt-4 space-y-2 text-xs">
                      <div>
                        <dt className="uppercase tracking-widest text-muted-foreground">Includes</dt>
                        <dd className="mt-1 text-foreground/80">{f.includes}</dd>
                      </div>
                    </dl>
                    <div className="mt-5 text-sm underline underline-offset-4 group-hover:no-underline">
                      Read family →
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-20">
            <Eyebrow label="Mode-World Overview" />
            <h3 className="mt-2 font-display text-2xl md:text-3xl">The organizing logic at a glance</h3>
            <p className="mt-3 max-w-2xl text-muted-foreground text-[15px]">
              The table below shows the organizing logic. NT does not begin with the diagnosis. It begins with the active
              world.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-foreground/70 italic">
              These are lenses, not treatment. Real disorders deserve real care.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border bg-card">
              <table className="w-full text-left text-[13px] leading-relaxed border-collapse min-w-[1100px]">
                <thead>
                  <tr className="border-b bg-secondary/40">
                    {[
                      'Family', 'Core Saran Wrap', 'Target', 'Thinking Style', 'Body Pattern',
                      'Root Energy', 'Action Set', 'Feedback Loop', 'NT Lens',
                    ].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] uppercase tracking-widest text-muted-foreground font-medium align-bottom">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {disorderFamilies.map((f, i) => {
                    const color = accentVar(i)
                    return (
                      <tr key={f.slug} className="border-b last:border-b-0 align-top hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-4 font-display text-[15px] w-[160px] border-l-[3px]" style={{ borderLeftColor: color }}>
                          <Link href={`/theory/disorders/${f.slug}`} className="hover:underline underline-offset-4">
                            {f.title}
                          </Link>
                        </td>
                        <td className="px-4 py-4">{f.table.coreSaranWrap}</td>
                        <td className="px-4 py-4">{f.table.target}</td>
                        <td className="px-4 py-4">{f.table.nState}</td>
                        <td className="px-4 py-4">{f.table.bodyPattern}</td>
                        <td className="px-4 py-4">{f.table.rootEnergy}</td>
                        <td className="px-4 py-4">{f.table.actionSet}</td>
                        <td className="px-4 py-4">{f.table.feedbackLoop}</td>
                        <td className="px-4 py-4">{f.table.intervention}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
