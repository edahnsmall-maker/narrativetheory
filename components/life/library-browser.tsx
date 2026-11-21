'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, X, Play } from 'lucide-react'
import { GradientOrb } from '@/components/nt/GradientOrb'
import { ModuleCard } from './module-card'
import { ScrollRow } from './scroll-row'
import { artStyle, ArtLines } from './shelf-art'
import { useMe } from './use-me'
import type { ModuleCardData, ShelfRowData } from './library-data'

const CARD_W = 'snap-start shrink-0 w-[78vw] max-w-[18rem] sm:w-[17rem]'

export function LibraryBrowser({ rows, search }: { rows: ShelfRowData[]; search: Record<string, string> }) {
  const me = useMe()
  const [q, setQ] = useState('')
  const flat = useMemo(() => rows.flatMap((r) => r.modules), [rows])
  const byId = useMemo(() => new Map(flat.map((c) => [c.id, c])), [flat])

  const query = q.trim().toLowerCase()
  const results = query ? flat.filter((c) => (search[c.id] ?? '').includes(query)) : null

  const continuing: { card: ModuleCardData; sessionId: string }[] = []
  if (me.data?.user) {
    for (const c of flat) {
      const p = me.data.progress[c.id]
      if (p?.status === 'active') continuing.push({ card: c, sessionId: p.sessionId })
    }
  }

  return (
    <div className="overflow-x-clip">
      <header className="relative border-b overflow-hidden">
        <div className="absolute -right-24 -top-28 opacity-60 hidden sm:block" aria-hidden><GradientOrb variant="rainbow" size={420} /></div>
        <div className="absolute -right-16 -top-16 opacity-50 sm:hidden" aria-hidden><GradientOrb variant="violet" size={220} /></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Life Instruction™</div>
          <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">Pick a thread.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
            {flat.length} short pieces on self-worth, conflict, dating, anxiety, grief, meditation and more. Read the
            article, try the exercise, and if you want, work it through on your own life with the guide.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="relative w-full sm:w-[28rem]">
              <span className="sr-only">Search Life Instruction</span>
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search modules, shelves, ideas…"
                style={{ borderRadius: 9999 }}
                className="w-full rounded-full border bg-card py-3 pl-11 pr-11 text-sm outline-none focus-visible:border-foreground/40 [&::-webkit-search-cancel-button]:hidden"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X size={15} aria-hidden />
                </button>
              )}
            </label>
            <span className="text-xs text-muted-foreground">
              {flat.length} modules · {rows.length} shelves · articles free to read
            </span>
          </div>
        </div>
      </header>

      {results ? (
        <section className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 py-10" aria-live="polite">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-5">
            {results.length} {results.length === 1 ? 'result' : 'results'} for “{q.trim()}”
          </div>
          {results.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((c) => (
                <ModuleCard key={c.id} card={c} me={me} showShelf />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Nothing matches that yet. Try a feeling (“anxious”, “angry”) or a situation (“breakup”, “work”).
            </p>
          )}
        </section>
      ) : (
        <div className="py-6 md:py-8">
          {continuing.length > 0 && (
            <section className="py-6 md:py-8">
              <RowHeader eyebrow="Pick up where you left off" title="Continue" />
              <ScrollRow label="Continue">
                {continuing.map(({ card, sessionId }) => (
                  <ContinueCard key={card.id} card={card} sessionId={sessionId} />
                ))}
              </ScrollRow>
            </section>
          )}

          {rows.map((row) => (
            <section key={row.slug} className="py-6 md:py-8" aria-labelledby={`shelf-${row.slug}`}>
              <RowHeader
                id={`shelf-${row.slug}`}
                eyebrow={`Shelf ${row.idx + 1} · ${row.modules.length} ${row.modules.length === 1 ? 'module' : 'modules'}${
                  row.modules[0]?.free ? ' · Sessions free' : ''
                }`}
                title={row.name}
                swatch={row.idx}
                href={`/life/${row.slug}`}
              />
              <ScrollRow label={row.name}>
                {row.modules.map((c) => (
                  <ModuleCard key={c.id} card={c} me={me} className={CARD_W} />
                ))}
              </ScrollRow>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function RowHeader({
  id,
  eyebrow,
  title,
  swatch,
  href,
}: {
  id?: string
  eyebrow: string
  title: string
  swatch?: number
  href?: string
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 mb-3 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {swatch !== undefined && (
          <span className="h-9 w-9 shrink-0 rounded-full border" style={artStyle(swatch, 'swatch')} aria-hidden />
        )}
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{eyebrow}</div>
          <h2 id={id} className="font-display text-2xl md:text-3xl leading-tight">
            {title}
          </h2>
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground underline-offset-4 hover:underline"
        >
          <span className="hidden sm:inline">View shelf</span>
          <span className="sm:hidden">All</span>
          <ArrowRight size={14} aria-hidden />
        </Link>
      )}
    </div>
  )
}

function ContinueCard({ card, sessionId }: { card: ModuleCardData; sessionId: string }) {
  return (
    <Link
      href={`/session/${sessionId}`}
      style={{ borderRadius: 16 }}
      className={`group ${CARD_W} flex items-center gap-3 rounded-2xl border bg-card p-2.5 pr-4 hover:border-foreground/30`}
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl" style={artStyle(card.shelfIdx, card.id)}>
        <ArtLines seed={card.id} />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-sm transition-transform group-hover:scale-110">
            <Play size={13} className="ml-0.5" aria-hidden />
          </span>
        </span>
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">{card.shelfName}</div>
        <div className="font-display text-[16px] leading-tight line-clamp-2">{card.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">Resume session</div>
      </div>
    </Link>
  )
}
