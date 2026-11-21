import type { ReactNode } from 'react'

/** Static (non-interactive) homepage panels: mode tree, mode table, narrative species, contest outcomes. */

const TREE = [
  { name: 'Relational', color: 'var(--accent-pink)', items: ['Fighting', 'Relating', 'Bonding', 'Gossiping'] },
  { name: 'Functional', color: 'var(--accent-blue)', items: ['Work', 'Driving', 'Showering'] },
  { name: 'Leisure', color: 'var(--accent-yellow)', items: ['Pontificating', 'Relaxing'] },
  { name: 'Emotional', color: 'var(--accent-orange)', items: ['Worrying', 'Anger'] },
]

export function ModeTree() {
  return (
    <figure className="my-12">
      <div className="rounded-3xl border bg-[#f5f0e6] p-6 sm:p-8">
        <div className="mx-auto w-fit rounded-xl bg-[#1f1d1a] px-5 py-2 font-display text-lg text-[#f5f0e6] -rotate-1">Modes</div>
        <div className="mx-auto h-6 w-px bg-[#1f1d1a]/40" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TREE.map((b, i) => (
            <div key={b.name} className="rounded-2xl bg-[#fffaf0] p-4 shadow-[1px_2px_0_rgba(31,29,26,0.15)]" style={{ transform: `rotate(${[-1.2, 0.8, -0.6, 1][i]}deg)` }}>
              <div className="mb-3 inline-block rounded-md px-2.5 py-1 text-[13px] font-semibold uppercase tracking-wider text-[#1f1d1a]" style={{ background: b.color }}>
                {b.name}
              </div>
              <ul className="space-y-1 text-[15px]">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">A first pass at a family tree of modes. Still thinking about this one.</figcaption>
    </figure>
  )
}

const MODE_ROWS = [
  ['Bar social mode', 'Socially aware, cultural norms influence', 'Relaxed or excited', 'Socializing in clubs or bars'],
  ['Relationship mode', 'Emotionally driven, reactive', 'Affectionate or tense', 'Interacting with a partner'],
  ['After-work-at-home mode', 'Decompressing, reflective', 'Relaxed, comfort-seeking', 'Home stuff after work'],
  ['Alert mode', 'Vigilant, potentially anxious', 'Tense, ready for action', 'Responding to threats or challenges'],
  ['Morning routine mode', 'Auto-pilot, habitual', 'Methodical', 'Rituals, breakfast, exercise'],
  ['Mom/dad/familiar role mode', 'Nurturing, responsible', 'Attentive, caring', 'Parenting, family responsibilities'],
  ['Discussion mode', 'Analytical, communicative', 'Engaged, expressive', 'Discussions, debates'],
]

export function ModeTable() {
  return (
    <div className="my-10 -mx-4 sm:mx-0 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b-2 border-foreground">
            {['Mode', 'Thinking style', 'Body style', 'Typical activities'].map((h) => (
              <th key={h} className="px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground first:pl-4 sm:first:pl-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MODE_ROWS.map((r) => (
            <tr key={r[0]} className="border-b">
              {r.map((c, i) => (
                <td key={i} className={`px-4 py-3 align-top first:pl-4 sm:first:pl-0 ${i === 0 ? 'font-display text-[16px]' : 'text-foreground/85'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SPECIES: { title: string; color: string; body?: ReactNode; tags: string[] }[] = [
  { title: 'Narratives about self (and the general other)', color: 'var(--accent-violet)', tags: ['Self-worth', 'Depression', 'Shyness and assertiveness', 'Rank', 'Locus of normal'] },
  { title: 'Narratives about my partner', color: 'var(--accent-pink)', tags: ['Resentment', 'Lack of closeness', 'Reacting to betrayal', 'Reacting to our own self-doubt, self-criticism and unease'] },
  { title: 'Narratives about situations and the future', color: 'var(--accent-orange)', tags: ['Anxiety', 'Mania', 'Thought-o-complete (filling in the blanks)'] },
  {
    title: 'Tribal narratives (narratives about “them”)',
    color: 'var(--accent-blue)',
    body: 'Rival tribe members absorb whatever stories we accumulate about them through media. The stories generate a caricature of the group, which steers our assumptions and then our interactions. Hostile interactions confirm the reciprocal narratives, which encourages more hostility.',
    tags: [],
  },
  {
    title: 'Metanarratives (how things go)',
    color: 'var(--accent-yellow)',
    body: 'Narratives about how things go. They aren’t our stories, but they guide our stories.',
    tags: ['Therapy', 'Relationships', 'Life challenges', 'Grief'],
  },
]

export function Species() {
  return (
    <div className="my-10 grid gap-4 sm:grid-cols-2">
      {SPECIES.map((s, i) => (
        <div key={s.title} className={`rounded-2xl border bg-card p-5 ${i === SPECIES.length - 1 && SPECIES.length % 2 ? 'sm:col-span-2' : ''}`}>
          <div className="mb-3 h-1.5 w-12 rounded-full" style={{ background: s.color }} />
          <h3 className="font-display text-xl leading-snug mb-2">{s.title}</h3>
          {s.body && <p className="text-[15px] leading-relaxed text-foreground/85 mb-3">{s.body}</p>}
          {s.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function ContestGrid() {
  const cell = 'rounded-2xl p-4 sm:p-5 min-h-[120px] flex flex-col justify-center'
  return (
    <figure className="my-12">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-2 sm:gap-3 text-[15px]">
        <div />
        <div className="px-2 pb-1 text-center text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Dominant</div>
        <div className="px-2 pb-1 text-center text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Submissive</div>

        <div className="flex items-center pr-1 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground [writing-mode:vertical-rl] rotate-180">Dominant</div>
        <div className={cell} style={{ background: 'color-mix(in oklab, var(--accent-pink) 22%, var(--card))' }}>
          <div className="font-display text-xl">Escalation</div>
          <div className="text-foreground/75">An altercation. No resolution. Both get louder and more certain.</div>
        </div>
        <div className={cell} style={{ background: 'color-mix(in oklab, var(--accent-blue) 16%, var(--card))' }}>
          <div className="font-display text-xl">Dom wins</div>
          <div className="text-foreground/75">One frame governs. The other person adopts it.</div>
        </div>

        <div className="flex items-center pr-1 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground [writing-mode:vertical-rl] rotate-180">Submissive</div>
        <div className={cell} style={{ background: 'color-mix(in oklab, var(--accent-blue) 16%, var(--card))' }}>
          <div className="font-display text-xl">Dom wins</div>
          <div className="text-foreground/75">Same thing, the other way around.</div>
        </div>
        <div className={cell} style={{ background: 'color-mix(in oklab, var(--accent-yellow) 22%, var(--card))' }}>
          <div className="font-display text-xl">Mutual deferment</div>
          <div className="text-foreground/75">Nobody leads. Drift.</div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Dominance here is wholly subjective. An intern can be more confident than a seasoned executive and win the contest, at least mentally and
        emotionally. The intern’s advice might not get taken, but the executive has adopted the intern’s narrative as true.
      </figcaption>
    </figure>
  )
}
