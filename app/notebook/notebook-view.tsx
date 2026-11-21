'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Trash2 } from 'lucide-react'
import { CardView } from '@/components/session/cards'
import { GradientOrb } from '@/components/nt/GradientOrb'
import { artStyle } from '@/components/life/shelf-art'
import type { Card, NotebookKind } from '@/lib/types'

export interface NotebookEntry {
  id: string
  kind: NotebookKind
  sessionId: string
  card: Card
  createdAt: string
  source: { label: string; href: string; shelfIdx: number } | null
}

const SECTIONS: { kind: NotebookKind; title: string; tab: string; blurb: string }[] = [
  {
    kind: 'mode',
    title: 'Your modes',
    tab: 'Modes',
    blurb:
      'The packages you keep falling into: the story, what your body does, what you do. The sooner you recognize one, the less it runs you.',
  },
  {
    kind: 'insight',
    title: 'Insights',
    tab: 'Insights',
    blurb: 'Lines worth keeping: moments in a session when something came clear.',
  },
  {
    kind: 'practice',
    title: 'Practices',
    tab: 'Practices',
    blurb: 'Small things to try between sessions.',
  },
  {
    kind: 'summary',
    title: 'Session summaries',
    tab: 'Summaries',
    blurb: 'What you took away from each session you finished.',
  },
]

type Filter = 'all' | NotebookKind

export function NotebookView({ initial }: { initial: NotebookEntry[] }) {
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState<Filter>('all')
  const [error, setError] = useState<string | null>(null)

  const counts = Object.fromEntries(SECTIONS.map((s) => [s.kind, items.filter((i) => i.kind === s.kind).length])) as Record<
    NotebookKind,
    number
  >

  async function remove(id: string) {
    const prev = items
    setItems((xs) => xs.filter((x) => x.id !== id))
    setError(null)
    try {
      const r = await fetch(`/api/notebook?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!r.ok) throw new Error(String(r.status))
    } catch {
      setItems(prev)
      setError('That didn’t delete. Please try again.')
    }
  }

  const visible = SECTIONS.filter((s) => (filter === 'all' ? counts[s.kind] > 0 : s.kind === filter))

  return (
    <div className="overflow-x-clip">
      <header className="relative border-b overflow-hidden">
        <div className="absolute -right-24 -top-24 opacity-50 hidden sm:block" aria-hidden><GradientOrb variant="violet" size={360} /></div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-5 lg:px-8 pt-12 pb-8 md:pt-16">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Notebook</div>
          <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[0.95]">What you’ve seen.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
            When you do a guided session, the guide saves the good stuff here. Modes you figured out, things you
            realized, and anything it suggested you try.
          </p>

          {items.length > 0 && (
            <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 w-max" role="group" aria-label="Filter notebook">
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label="All" count={items.length} />
                {SECTIONS.map((s) => (
                  <FilterButton
                    key={s.kind}
                    active={filter === s.kind}
                    onClick={() => setFilter(s.kind)}
                    label={s.tab}
                    count={counts[s.kind]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {error && (
        <div role="alert" className="mx-auto max-w-5xl px-4 sm:px-5 lg:px-8 pt-6 text-sm text-destructive">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mx-auto max-w-5xl px-4 sm:px-5 lg:px-8 py-10 space-y-16">
          {visible.map((s) => {
            const list = items.filter((i) => i.kind === s.kind)
            return (
              <section key={s.kind} id={s.kind} aria-labelledby={`h-${s.kind}`} className="scroll-mt-24">
                <div className="mb-6 max-w-2xl">
                  <h2 id={`h-${s.kind}`} className="font-display text-2xl md:text-3xl">
                    {s.title} <span className="text-muted-foreground text-lg align-middle">{list.length}</span>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.blurb}</p>
                </div>
                {list.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nothing here yet.</p>
                ) : (
                  <div className={s.kind === 'summary' ? 'grid gap-5' : 'grid gap-5 md:grid-cols-2'}>
                    {list.map((item) => (
                      <Entry key={item.id} item={item} onDelete={() => remove(item.id)} />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{ borderRadius: 9999 }}
      className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors whitespace-nowrap ${
        active ? 'bg-foreground text-background border-foreground' : 'bg-card text-foreground/80 hover:border-foreground/40'
      }`}
    >
      {label} <span className={active ? 'opacity-70' : 'text-muted-foreground'}>{count}</span>
    </button>
  )
}

function DateText({ iso }: { iso: string }) {
  const d = new Date(iso)
  const text = isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {text}
    </time>
  )
}

function Entry({ item, onDelete }: { item: NotebookEntry; onDelete: () => void }) {
  const [confirming, setConfirming] = useState(false)
  return (
    <article className="flex flex-col gap-2">
      <CardView card={item.card} compact />
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
          {item.source && (
            <>
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={artStyle(item.source.shelfIdx, 'swatch')} aria-hidden />
              <Link href={item.source.href} className="text-foreground/80 hover:text-foreground underline-offset-4 hover:underline truncate">
                {item.source.label}
              </Link>
              <span aria-hidden>·</span>
            </>
          )}
          <span>
            {item.kind === 'practice' ? 'Started ' : ''}
            <DateText iso={item.createdAt} />
          </span>
          {item.kind === 'summary' && item.sessionId && (
            <>
              <span aria-hidden>·</span>
              <Link href={`/session/${item.sessionId}`} className="hover:text-foreground underline-offset-4 hover:underline">
                Revisit session
              </Link>
            </>
          )}
        </div>
        {confirming ? (
          <span className="inline-flex items-center gap-2">
            <span>Remove?</span>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-full border border-destructive/40 px-2.5 py-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Remove
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="rounded-full border px-2.5 py-1 hover:text-foreground">
              Keep
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:text-foreground hover:bg-muted"
            aria-label={`Remove this ${item.kind} from your notebook`}
          >
            <Trash2 size={13} aria-hidden /> <span className="hidden sm:inline">Remove</span>
          </button>
        )}
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-5 lg:px-8 py-14">
      <div className="rounded-2xl border bg-card p-6 md:p-10 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Nothing saved yet</div>
          <h2 className="mt-2 font-display text-3xl leading-tight">Your notebook fills itself as you work.</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            In a guided session, the guide saves the important pieces for you. Over time it turns into a pretty good
            map of how your mind works.
          </p>
          <Link
            href="/life/start-here-core-practice"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:opacity-90"
          >
            Start Here: free sessions <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <ul className="md:col-span-5 grid gap-3 text-sm">
          {SECTIONS.map((s) => (
            <li key={s.kind} className="rounded-xl border px-4 py-3">
              <div className="font-display text-base">{s.title}</div>
              <div className="text-muted-foreground text-[13px] leading-snug mt-0.5">{s.blurb}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
