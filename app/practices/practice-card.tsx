'use client'

import { useState } from 'react'
import type { Practice } from '@/lib/data/practices'

/** A practice you tap through one step at a time. */
export function PracticeCard({ practice: p }: { practice: Practice }) {
  // -1: closed, 0..n-1: showing steps up to i, n: finished
  const [i, setI] = useState(-1)
  const n = p.steps.length
  const open = i >= 0
  const done = i >= n - 1

  return (
    <section id={p.id} className="scroll-mt-24 rounded-3xl border bg-card p-6 sm:p-7 flex flex-col">
      <div className="flex items-start gap-3">
        <span className="mt-2 h-3 w-3 shrink-0 rounded-full" style={{ background: p.color }} />
        <div>
          <h2 className="font-display text-2xl leading-tight">{p.title}</h2>
          <p className="mt-1.5 text-[15px] text-muted-foreground leading-snug">{p.when}</p>
        </div>
      </div>

      {open && (
        <div className="mt-5 space-y-4">
          {p.intro && <p className="text-[15px] leading-relaxed text-foreground/75 italic">{p.intro}</p>}
          <ol className="space-y-3">
            {p.steps.slice(0, i + 1).map((s, k) => (
              <li
                key={k}
                className="flex gap-3 text-[16px] leading-relaxed"
                style={{ opacity: k === i ? 1 : 0.55, transition: 'opacity 300ms', animation: k === i ? 'nt-appear 400ms ease both' : undefined }}
              >
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: p.color }}
                >
                  {k + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          {done && p.outro && (
            <p className="text-[15px] leading-relaxed text-foreground/75 italic" style={{ animation: 'nt-appear 400ms ease both' }}>
              {p.outro}
            </p>
          )}
        </div>
      )}

      <div className="mt-auto pt-6 flex items-center gap-3">
        {!open && (
          <button type="button" onClick={() => setI(0)} className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
            Start
          </button>
        )}
        {open && !done && (
          <button
            type="button"
            onClick={() => setI(i + 1)}
            className="rounded-full px-4 py-2 text-sm text-white"
            style={{ background: p.color }}
          >
            Next step
          </button>
        )}
        {open && done && (
          <button type="button" onClick={() => setI(-1)} className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
            Done
          </button>
        )}
        {open && (
          <span className="text-xs text-muted-foreground tabular-nums">
            {Math.min(i + 1, n)} of {n}
          </span>
        )}
        {!open && (
          <button type="button" onClick={() => setI(n - 1)} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Show all
          </button>
        )}
      </div>
    </section>
  )
}
