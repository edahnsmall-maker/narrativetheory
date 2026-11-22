'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { families } from '@/lib/data/families'
import { catalog, DOINGS, ENERGIES, PULLS, type Doing, type Energy, type Pull } from '@/lib/data/catalog'

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${on ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'}`}
    >
      {children}
    </button>
  )
}

export function ModeCatalog() {
  const [q, setQ] = useState('')
  const [fam, setFam] = useState('')
  const [pull, setPull] = useState<Pull | ''>('')
  const [doing, setDoing] = useState<Doing | ''>('')
  const [energy, setEnergy] = useState<Energy | ''>('')

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase()
    return catalog
      .filter((m) => !fam || m.family === fam)
      .filter((m) => !pull || m.pull === pull || m.pull === 'either')
      .filter((m) => !doing || m.doing === doing)
      .filter((m) => !energy || m.energy === energy)
      .filter((m) => !s || [m.name, m.line, m.aka, m.thinking, m.world].some((v) => v?.toLowerCase().includes(s)))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [q, fam, pull, doing, energy])

  const any = q || fam || pull || doing || energy
  const label = 'text-[11px] uppercase tracking-widest text-muted-foreground w-24 shrink-0 pt-1.5'

  return (
    <div>
      <div className="space-y-3 rounded-3xl border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search modes…"
            aria-label="Search modes"
            className="rounded-full border bg-background px-4 py-2 text-[16px] sm:text-sm w-full sm:w-72"
          />
          <span className="text-sm text-muted-foreground tabular-nums">
            {shown.length} of {catalog.length} modes
          </span>
          {any && (
            <button type="button" className="text-sm underline underline-offset-4 text-muted-foreground" onClick={() => { setQ(''); setFam(''); setPull(''); setDoing(''); setEnergy('') }}>
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
          <div className={label}>Quality</div>
          <div className="flex flex-wrap gap-2">
            {PULLS.map((p) => <Chip key={p.key} on={pull === p.key} onClick={() => setPull(pull === p.key ? '' : p.key)}>{p.label}</Chip>)}
            <span className="w-px bg-border mx-1" aria-hidden />
            {DOINGS.map((d) => <Chip key={d.key} on={doing === d.key} onClick={() => setDoing(doing === d.key ? '' : d.key)}>{d.label}</Chip>)}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
          <div className={label}>Energy</div>
          <div className="flex flex-wrap gap-2">
            {ENERGIES.map((e) => <Chip key={e} on={energy === e} onClick={() => setEnergy(energy === e ? '' : e)}>{e}</Chip>)}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
          <div className={label}>Branch</div>
          <div className="flex flex-wrap gap-2">
            {families.map((f) => (
              <Chip key={f.slug} on={fam === f.name} onClick={() => setFam(fam === f.name ? '' : f.name)}>
                <span className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle" style={{ background: `oklch(0.72 0.15 ${f.hue})` }} />
                {f.name.split(' / ')[0]}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((m) => {
          const f = families.find((x) => x.name === m.family)
          return (
            <Link key={m.slug} href={`/modes/${m.slug}`} className="group rounded-2xl border bg-card p-4 flex gap-3.5 hover:shadow-[3px_4px_0_rgba(31,29,26,0.10)] transition-shadow">
              <span className="grid place-items-center h-12 w-12 shrink-0 rounded-full text-2xl" style={{ background: `oklch(0.95 0.04 ${f?.hue ?? 80})` }} aria-hidden>
                {m.sticker}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg leading-tight group-hover:underline underline-offset-4">{m.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground leading-snug line-clamp-2">{m.line}</span>
              </span>
            </Link>
          )
        })}
      </div>
      {!shown.length && <p className="mt-8 text-muted-foreground">Nothing matches. Maybe it’s a new one: add it below.</p>}
    </div>
  )
}
