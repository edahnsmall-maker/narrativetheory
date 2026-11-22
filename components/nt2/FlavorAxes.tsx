'use client'

import { useState } from 'react'

/**
 * Flavors stay the everyday names; the axes are one way of thinking about them.
 * Axis ends and style descriptions are Edahn's words (Energy States, Karma & Conflict,
 * What do we mean by narrative?). Placements are rough, read from those descriptions.
 * Pick more than one style to make a pot of soup.
 */

type Axis = { key: 'open' | 'charge' | 'certainty' | 'aim'; left: string; right: string; from: string }

const AXES: Axis[] = [
  { key: 'open', left: 'tightly wound, strict, punitive', right: 'relaxed, open, flexible', from: 'what to consider' },
  { key: 'charge', left: 'barely charged', right: 'highly charged', from: 'what’s important' },
  { key: 'certainty', left: 'self-doubt', right: 'certainty', from: 'how to evaluate' },
  { key: 'aim', left: 'aimed at me', right: 'aimed at others', from: 'about what' },
]

type Style = { name: string; line: string; v: Record<Axis['key'], number> }

const STYLES: Style[] = [
  { name: 'Anger', line: 'black and white, severe, punitive, with frustration', v: { open: 0.1, charge: 0.92, certainty: 0.9, aim: 0.88 } },
  { name: 'Worry', line: 'overthinking and imagined negative consequences', v: { open: 0.18, charge: 0.8, certainty: 0.15, aim: 0.3 } },
  { name: 'Self-victimization', line: 'the self as the victim, unwanted, unloved', v: { open: 0.15, charge: 0.85, certainty: 0.75, aim: 0.1 } },
  { name: 'Playful', line: 'some energy states are playful', v: { open: 0.85, charge: 0.5, certainty: 0.45, aim: 0.55 } },
  { name: 'Analytical', line: 'theoretical, intellectual, and abstract', v: { open: 0.5, charge: 0.15, certainty: 0.55, aim: 0.5 } },
  { name: 'Loving', line: 'a beautiful part of life', v: { open: 0.88, charge: 0.75, certainty: 0.5, aim: 0.75 } },
]

export function FlavorAxes() {
  const [picked, setPicked] = useState<string[]>(['Anger'])
  const chosen = STYLES.filter((s) => picked.includes(s.name))
  const avg = (k: Axis['key']) => (chosen.length ? chosen.reduce((a, s) => a + s.v[k], 0) / chosen.length : 0.5)
  const toggle = (n: string) =>
    setPicked((p) => (p.includes(n) ? (p.length > 1 ? p.filter((x) => x !== n) : p) : [...p, n]))

  return (
    <div className="py-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">One way of thinking about flavors</div>
      <h2 className="mt-2 font-display text-3xl md:text-4xl">Four axes</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
        Narratives “form by making selections about what to consider, what’s important, and how to evaluate things.” Each
        selection is an axis. Pick a style to see roughly where it sits. Pick more than one for a pot of soup.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {STYLES.map((s) => {
          const on = picked.includes(s.name)
          return (
            <button
              key={s.name}
              onClick={() => toggle(s.name)}
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? 'bg-foreground text-background border-foreground' : 'hover:bg-secondary'}`}
            >
              {s.name}
            </button>
          )
        })}
      </div>

      <div className="mt-8 rounded-2xl border bg-card p-5 md:p-8 space-y-8">
        {AXES.map((a) => {
          const x = avg(a.key)
          return (
            <div key={a.key}>
              <div className="flex justify-between gap-4 text-[13px] md:text-sm">
                <span className="text-foreground/80">{a.left}</span>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground hidden sm:inline">{a.from}</span>
                <span className="text-foreground/80 text-right">{a.right}</span>
              </div>
              <div className="relative mt-3 h-6">
                <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
                <div className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-border" />
                {chosen.length > 1 &&
                  chosen.map((s) => (
                    <span
                      key={s.name}
                      className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/25 transition-[left] duration-500"
                      style={{ left: `${s.v[a.key] * 100}%` }}
                    />
                  ))}
                <span
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-card transition-[left] duration-500"
                  style={{ left: `${x * 100}%` }}
                />
              </div>
            </div>
          )
        })}
        <p className="text-sm text-muted-foreground border-t pt-5">
          {chosen.length > 1 ? (
            <>A pot of soup: {chosen.map((s) => s.name.toLowerCase()).join(' + ')}.</>
          ) : (
            <>
              <span className="text-foreground">{chosen[0].name}:</span> “{chosen[0].line}.”
            </>
          )}{' '}
          Placements are rough.
        </p>
      </div>
    </div>
  )
}
