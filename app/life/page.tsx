'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { shelves, allModules } from '@/lib/data/lifeInstruction'
import { GradientOrb } from '@/components/nt/GradientOrb'

const orbVariants = ['violet', 'pink', 'orange', 'blue', 'yellow', 'violet', 'pink', 'orange', 'blue', 'yellow'] as const

export default function LifeIndex() {
  const [q, setQ] = useState('')
  const flat = useMemo(() => allModules(), [])
  const results = q.trim()
    ? flat.filter(({ shelf, cluster, module }) =>
        [module.name, cluster.name, shelf.name, module.sections.Article || ''].join(' ').toLowerCase().includes(q.toLowerCase())
      )
    : null

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Practical library</div>
          <div className="grid md:grid-cols-12 gap-8 items-end mt-3">
            <h1 className="md:col-span-7 font-display text-5xl md:text-6xl leading-[0.95]">Life Instruction™</h1>
            <p className="md:col-span-5 text-muted-foreground">
              Modules that apply the theory to real situations: confidence, conflict, relationships, anxiety,
              grief, meditation, meaning. Read the article. Try the exercise. Loosen the pattern.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Life Instruction…"
              className="w-full md:w-[28rem] rounded-full border bg-card px-5 py-3 text-sm"
            />
            <span className="text-xs text-muted-foreground">{flat.length} modules across {shelves.length} shelves</span>
          </div>
        </div>
      </header>

      {results ? (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{results.length} results</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map(({ shelf, cluster, module }) => (
              <Link
                key={shelf.slug + module.slug}
                href={`/life/${shelf.slug}/${module.slug}`}
                className="rounded-2xl border bg-card p-4 hover:border-foreground/40"
              >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{shelf.name} · {cluster.name}</div>
                <div className="mt-1 font-display text-lg">{module.name}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <>
          {shelves.map((shelf, i) => (
            <section key={shelf.slug} className="border-b">
              <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
                <div className="flex items-end justify-between mb-5 gap-4">
                  <div className="flex items-center gap-4">
                    <GradientOrb variant={orbVariants[i % orbVariants.length]} size={64} />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Shelf {i + 1}</div>
                      <h2 className="font-display text-2xl md:text-3xl leading-tight">{shelf.name}</h2>
                    </div>
                  </div>
                  <Link href={`/life/${shelf.slug}`} className="text-sm underline underline-offset-4 shrink-0">
                    View shelf →
                  </Link>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
                  {shelf.clusters.flatMap((c) =>
                    c.modules.map((m) => (
                      <Link
                        key={c.slug + m.slug}
                        href={`/life/${shelf.slug}/${m.slug}`}
                        className="snap-start shrink-0 w-64 rounded-2xl border bg-card p-4 hover:border-foreground/40 flex flex-col gap-2"
                      >
                        <div className="aspect-[4/3] rounded-xl relative overflow-hidden">
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(at 30% 30%, oklch(0.85 0.15 ${(i * 40 + m.name.length * 7) % 360}) 0%, transparent 60%),
                                           radial-gradient(at 70% 70%, oklch(0.8 0.18 ${(i * 80 + m.slug.length * 11) % 360}) 0%, transparent 60%)`,
                            }}
                          />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.name}</div>
                        <div className="font-display text-base leading-tight">{m.name}</div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  )
}
