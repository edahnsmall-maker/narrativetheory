import Link from 'next/link'
import { User, Swords, Compass, Sparkles, ShieldCheck, CloudRain, Fingerprint, AlertOctagon } from 'lucide-react'
import { concepts } from '@/lib/data/concepts'
import { deepTopics } from '@/lib/data/deepTopics'
import { disorderFamilies } from '@/lib/data/disorders'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { StateField } from '@/components/nt/StateField'
import { StoryPoints } from '@/components/nt/StoryPoints'
import { BodyMatrix } from '@/components/nt/BodyMatrix'
import { ModeSpotlight } from '@/components/nt/ModeSpotlight'
import { PeelWrap } from '@/components/nt2/PeelWrap'
import { AutoComplete } from '@/components/nt2/AutoComplete'
import { RankSeesaw } from '@/components/nt2/RankSeesaw'

const ACCENTS = ['violet', 'pink', 'orange', 'blue', 'yellow'] as const
const accentVar = (i: number) => `var(--accent-${ACCENTS[i % ACCENTS.length]})`

function Eyebrow({ label }: { label: string }) {
  return <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
}

// Card text is Edahn's own words from his notes (narrative notes and apple notes), typos fixed.
// Sources with line numbers: Narrative Theory for Claude/vetting/writing-candidates/reinterp.md
const reinterp = [
  {
    slug: "the-self",
    name: "The Self",
    blurb: "It's just a story you're always telling, always abstracting.",
    text: "It's just a cloud that we identify with. That cloud is the narrative. It comes and goes. It's not always there.\n\nYour narratives about yourself—they're not the same. We think they're the same, but that's the secret. They just have similar themes. It's a new thought every time. How can you build a house on quicksand? The foundation itself is always changing. Your house is your ego.",
    Icon: User,
    tint: 'var(--nt-mind)',
  },
  {
    slug: "conflict",
    name: "Conflict",
    blurb: "Conflict is simply the desire to reject what's already here and opt for a different state.",
    text: "From the inside, conflict feels all-absorbing. Tense. Oppositional. Me vs. you. We jump into our minds. We jump into sides. Whether it's a friend, a coworker, a lover, political opponents, we develop a story about this person that's very narrow. And it's all mind generated.\n\nDon't think of conflict as a thing between you and someone else; think of it as a relationship you have with something.",
    Icon: Swords,
    tint: 'var(--nt-state-combative)',
  },
  {
    slug: "meaning",
    name: "Meaning",
    blurb: "The meaning of things is all hallucinated.",
    text: "Even meaning in life—whether things are good or bad—it's all hallucinated. It's all fucking delusion. The significance of action, how we interpret them—it's all hallucinated.\n\nYou don't know if it's right. You just kind of make that up. That's the creepiest thing, really, realizing that it's really not real. That's just your perception.",
    Icon: Compass,
    tint: 'var(--nt-state-fearful)',
  },
  {
    slug: "charisma",
    name: "Charisma",
    blurb: "I think people with charisma maybe bring you into their world.",
    text: "Maybe people who are really persuasive have a way of resolving your thoughts in line with theirs. It's like the energy field morphs to match theirs. You can see what they say, you're tracking them, and you're also following their scoring system.\n\nJust fun to be around energy. Playful. Best when not trying to take.",
    Icon: Sparkles,
    tint: 'var(--nt-state-proud)',
  },
  {
    slug: "certainty",
    name: "Certainty",
    blurb: "Maybe certainty is just a lack of fear.",
    text: "The qualities don't necessarily belong to the thought, but are associated with any kind of thinking in that moment. One of the most important qualities is certainty. Certainty leads to narrative lock: resistance to a competing narrative that is incompatible.\n\nAnyone who's certain about their purpose is dumb. How can you have certainty in a world of pointlessness?",
    Icon: ShieldCheck,
    tint: 'var(--nt-action)',
  },
  {
    slug: "depression-anxiety",
    name: "Depression & Anxiety",
    blurb: "Depression and anxiety are flavors. You can have both. But ultimately they're a way of thinking.",
    text: "Maybe depression is remembering negative things. Or looking for negative things. It's a skew. It's not a word. It's a pattern of seeing the world.\n\nAnxiety is a projection of fear on things. It's saran. It's a flavor of thinking: a type, species, or genre of anticipation. It's still all thinking. It's patterns.",
    Icon: CloudRain,
    tint: 'var(--nt-state-ashamed)',
  },
  {
    slug: "personality",
    name: "Personality",
    blurb: "Personality and default narrative style is the same thing. But personality really changes.",
    text: "People act, think and feel in patterns. And in flavors. The type of patterns, the set of patterns and their distribution, and the flowchart of patterns (their interactions) are unique to people.\n\nMBTI is a parlor trick psychology. People really aren't 4 dimensions. They're much more complicated. Look at them, not at the test, to see how personality works. It really is more like melodies.",
    Icon: Fingerprint,
    tint: 'var(--nt-body)',
  },
  {
    slug: "disorders",
    name: "Disorders",
    blurb: "We really need to be careful about calling them disorders, because that's saran too.",
    text: "They aren't things that exist out there in a discrete form with value. They are just events.\n\nNarrative might actually be the disorder. The disorders could be narrative disorders with body components, and when they cluster behaviorally they become modes.\n\nThis isn't a replacement for clinical care.",
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
            What is Narrative Theory?
          </h1>
          <div className="mt-8 max-w-2xl text-[17px] leading-relaxed space-y-5 text-foreground/80">
            <p>
              To be quite honest, Narrative Theory is just the way I&rsquo;ve come to see the world and how I&rsquo;ve been able to
              reconcile those insights into one coherent model. It&rsquo;s my response to my confusion about the nature of feelings,
              thoughts, how they shift, how they determine other parts of our experience and perspective, and even what they actually
              are.
            </p>
            <p>
              Narrative Theory is a blend of animal behavior, Zen, psychology, and psychotherapy. It is a model for human experience as
              well as a guide for &ldquo;adjusting&rdquo; that experience to usher in more peace of mind, balance, and clarity. In that
              sense it flirts with the boundary between science and therapy.
            </p>
            <p>
              The bulk of NT is a model, which is to say, it&rsquo;s a way of making sense of things, cleaning out junk, and dividing the
              world up in ways that make more sense than the way they are currently divided up. Ultimately, the best way to think of
              Narrative Theory is a lens with which to supplement and even replace the lens with which we view the world and ourselves.
            </p>
            <p className="text-[15px] text-muted-foreground">Below: the vocabulary, a few diagrams to play with, and the deeper stuff.</p>
          </div>
        </div>
      </header>

      {/* JUMP NAV */}
      <nav aria-label="Jump to section" className="border-b bg-secondary/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-foreground/60">Jump to</span>
          <span aria-hidden className="h-3 w-px bg-border" />
          <Link href="/theory/one-page" className="text-foreground hover:underline underline-offset-4">
            On one page
          </Link>
          <span aria-hidden className="h-3 w-px bg-border" />
          <Link href="/theory/map" className="text-foreground hover:underline underline-offset-4">
            The map
          </Link>
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
          <div className="mb-8 rounded-2xl border bg-card p-5 md:p-6">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">One word per level, in order</div>
            <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px]">
              {['Slice', 'Cuts', 'Energy state', 'Mode', 'Narrative style (flavor)', 'Key narratives', 'Saran Wrap', 'Action sets', 'Outcomes'].map(
                (w, i, all) => (
                  <li key={w} className="flex items-center gap-2">
                    <span className="rounded-full border px-3 py-1">{w}</span>
                    {i < all.length - 1 && <span aria-hidden className="text-muted-foreground">→</span>}
                  </li>
                ),
              )}
            </ol>
            <dl className="mt-5 grid gap-x-8 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                ['Mood', 'energy state'],
                ['Mindstate, mode-world', 'mode'],
                ['Thinking style, flavor', 'narrative style'],
                ['Worldview, the dream', 'Saran Wrap'],
                ['Karma', '“the animating energy behind the mental, behavioral, and body-feeling patterns”'],
                ['Species', 'a mode many people share'],
              ].map(([old, now]) => (
                <div key={old} className="flex gap-2">
                  <dt className="text-foreground/80 shrink-0">{old}</dt>
                  <dd>= {now}</dd>
                </div>
              ))}
            </dl>
            <Link href="/theory/map" className="mt-5 inline-block text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground">
              See them stacked on the map →
            </Link>
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
              Some of the ideas, as diagrams you can play with.
            </p>
          </div>

          <Link
            href="/theory/one-page"
            className="group block rounded-3xl border px-6 py-8 md:px-10 md:py-10 mb-6 grid md:grid-cols-[1fr_auto] gap-6 items-center hover:bg-secondary/40"
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">The whole thing on one page</div>
              <div className="mt-2 font-display text-3xl md:text-4xl">Narrative Theory on one page</div>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Eight panels, from the crying baby to vectors. To read, print, or give to someone.
              </p>
            </div>
            <span className="rounded-full border px-4 py-2 text-sm group-hover:bg-foreground group-hover:text-background justify-self-start">
              Open it →
            </span>
          </Link>

          <Link
            href="/theory/map"
            className="group block rounded-3xl bg-[#0b0b0c] text-white px-6 py-8 md:px-10 md:py-10 grid md:grid-cols-[1fr_auto] gap-6 items-center"
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/45">Layer by layer</div>
              <div className="mt-2 font-display text-3xl md:text-4xl">The map</div>
              <p className="mt-2 text-white/60 max-w-xl">
                The slice, cuts, energy state, mode, narrative flavor, Saran Wrap, action sets, outcomes. Pick an energy state and
                watch every layer change.
              </p>
            </div>
            <span className="rounded-full border border-white/40 px-4 py-2 text-sm group-hover:bg-white group-hover:text-black justify-self-start">
              Open the map →
            </span>
          </Link>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Illustrates: Saran Wrap has layers
            </div>
            <PeelWrap />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Illustrates: Thoughtocomplete
            </div>
            <AutoComplete />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Illustrates: Rank · Locus of Normal
            </div>
            <RankSeesaw />
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
