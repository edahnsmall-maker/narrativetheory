import Link from 'next/link'

/*
 * Sections under the map on /theory/map. Quotes are Edahn's (blog posts 2022–2024, and practice names on the site).
 * Structure (step-in table, two stacks, timescales) is from Deliverables/Notes for you/nt-revised.md.
 */

const STEP_IN: { layer: string; quote: string; href: string; tool: string }[] = [
  { layer: 'The slice', quote: 'What’s actually happening? What are the events?', href: '/practices/x-ray', tool: 'Narrative X-ray' },
  { layer: 'Cuts', quote: 'How and where is just a matter of convenience.', href: '/theory/concepts/cuts-clumps-sequences-modes-pattern', tool: 'Cuts, clumps, sequences' },
  { layer: 'Energy state', quote: 'Sometimes a walk or exercise can help reset your energy.', href: '/writing/2022-12-23-how-do-i-meditate', tool: 'How do I meditate?' },
  { layer: 'Mode', quote: 'We’re all in a mode.', href: '/practices#all-in-a-mode', tool: 'Practice' },
  { layer: 'Narrative flavor · Saran Wrap', quote: 'Unconscious narratives can be made conscious through introspection, dialogue, and reflection.', href: '/theory/concepts/thought-o-complete', tool: 'Thought-o-Complete' },
  { layer: 'Action sets', quote: 'Putting down the gloves.', href: '/practices#gloves', tool: 'Practice' },
  { layer: 'Outcomes', quote: 'When you reflect on the situations that abound in your life and find themes…', href: '/theory/concepts/life-review', tool: 'Life Review' },
  { layer: 'The whole loop', quote: 'We could define meditation as a state of not trying to get anywhere.', href: '/practices/give-up', tool: 'Lesson one. Give up.' },
]

const TIMESCALES: { span: string; what: string; quote: string; note?: string }[] = [
  { span: 'Seconds', what: 'A narrative', quote: 'A dry piece of steak could suddenly activate a world of thought.' },
  { span: 'Hours', what: 'An energy state, a mode', quote: 'Often passing through different flavors throughout the day.' },
  { span: 'Years', what: 'Your default narrative style', quote: 'Signature styles that are personal and unique to the individual.' },
  { span: 'A lifetime', what: 'Karma', quote: 'Based on habit and past conditioning, as well as our biology and genetics.' },
  { span: 'Across people', what: 'Species', quote: '', note: 'Modes many people share. See the Mode Catalog.' },
]

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] uppercase tracking-[0.16em] text-white/45">{children}</div>
)

function Stack({ cx, who }: { cx: number; who: string }) {
  const rows = ['slice', 'energy state', 'Saran Wrap', 'action sets']
  return (
    <g>
      <text x={cx} y={28} textAnchor="middle" fill="#f4f4f2" fontSize={20} letterSpacing={3}>
        {who.toUpperCase()}
      </text>
      {rows.map((r, i) => {
        const cy = 78 + i * 72
        return (
          <g key={r}>
            <path
              d={`M${cx - 92},${cy} L${cx},${cy - 30} L${cx + 92},${cy} L${cx},${cy + 30} Z`}
              fill="#0b0b0c"
              stroke="#f4f4f2"
              strokeOpacity={i === 0 || i === 3 ? 0.9 : 0.4}
              strokeWidth={1.3}
            />
            <text x={cx} y={cy + 6} textAnchor="middle" fill="#f4f4f2" fillOpacity={0.75} fontSize={19}>
              {r}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export function MapExtras() {
  return (
    <div className="mt-20 space-y-20">
      {/* WHERE YOU CAN STEP IN */}
      <section className="border-t border-white/15 pt-10">
        <Kicker>Where you can step in</Kicker>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Every layer has a way out</h2>
        <p className="mt-3 max-w-2xl text-white/60 leading-relaxed">
          The loop can be interrupted at any layer. The lower you step in, the more it changes: “After you’ve meditated for example,
          the things that usually make you frustrated or fearful or sad have less power over you.”
        </p>
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {STEP_IN.map((s) => (
            <div key={s.layer} className="grid gap-2 py-4 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-6">
              <div className="text-[13px] uppercase tracking-[0.12em] text-white/50">{s.layer}</div>
              <div className="text-[15px] text-white/90">“{s.quote}”</div>
              <Link href={s.href} className="text-sm text-white/60 underline underline-offset-4 hover:text-white md:text-right">
                {s.tool} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* TWO PEOPLE */}
      <section className="border-t border-white/15 pt-10 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <Kicker>Narrative dynamics</Kicker>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">What I do lands in your slice</h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            “Our point of view about things, including ourselves, don’t stay constant. They change with time as we relax and
            contract, and more interestingly, bump into other narratives.”
          </p>
          <p className="mt-4 text-white/60 leading-relaxed">
            “In some situations, narratives can harmonize with each other, such as with 2 members of an in-group. In other situations
            one narrative will yield to the other. The key factor in which narratives dominates in a contest is certainty, or its
            inverse, self-doubt.”
          </p>
          <p className="mt-4 text-white/60 leading-relaxed">
            “When we’re angry, people start pissing us off, and we start picking fights with people.”
          </p>
        </div>
        <svg viewBox="0 0 800 340" className="w-full h-auto" role="img" aria-label="Two stacks side by side. Each person's action sets feed into the other person's slice.">
          <defs>
            <marker id="tl-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#f4f4f2" />
            </marker>
          </defs>
          <Stack cx={170} who="me" />
          <Stack cx={630} who="you" />
          <path d="M262,294 C420,294 380,78 538,78" fill="none" stroke="#f4f4f2" strokeWidth={2} markerEnd="url(#tl-ah)" />
          <path d="M538,294 C380,294 420,78 262,78" fill="none" stroke="#f4f4f2" strokeOpacity={0.45} strokeWidth={2} markerEnd="url(#tl-ah)" />
          <text x={400} y={326} textAnchor="middle" fill="#f4f4f2" fillOpacity={0.6} fontSize={19}>
            each one’s action sets are part of the other’s slice
          </text>
        </svg>
      </section>

      {/* TIMESCALES */}
      <section className="border-t border-white/15 pt-10">
        <Kicker>How long it lasts</Kicker>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">The same thing, at different speeds</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {TIMESCALES.map((t) => (
            <div key={t.span} className="bg-[#0b0b0c] p-5">
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/45">{t.span}</div>
              <div className="mt-2 font-display text-xl">{t.what}</div>
              <p className="mt-3 text-sm text-white/60 leading-snug">{t.note ? <Link href="/modes" className="underline underline-offset-4 hover:text-white">{t.note}</Link> : <>“{t.quote}”</>}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
