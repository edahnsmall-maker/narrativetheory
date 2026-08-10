'use client'

import type { Visual as VisualKind } from '@/lib/edahn/content'

/**
 * The field that sits in the right column of a slide.
 *
 * All of these are drawn rather than photographed — the mockup used stock
 * imagery, and abstract marks in the deck's own two colours hold together far
 * better than a set of unrelated photos would. Each one is deliberately quiet:
 * it should register after the headline, never before.
 */

/** Deterministic, so server and client render identical markup. */
function prng(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

const STARS = (() => {
  const next = prng(20130)
  return Array.from({ length: 90 }, () => ({
    x: next() * 100,
    y: next() * 100,
    r: 0.16 + next() * 0.3,
    o: 0.25 + next() * 0.55,
    d: next() * 9,
  }))
})()

const LATTICE = (() => {
  const next = prng(7717)
  return Array.from({ length: 34 }, () => ({
    x: 8 + next() * 84,
    y: 8 + next() * 84,
    r: 0.7 + next() * 1.9,
  }))
})()

function Cosmos() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="ev-core" cx="50%" cy="50%">
          <stop offset="55%" stopColor="#000" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ev-disc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="38%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="55%" stopColor="var(--e-violet)" stopOpacity="0.75" />
          <stop offset="76%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {STARS.map((star, index) => (
        <circle
          key={index}
          className="ev-star"
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="currentColor"
          style={{ ['--o' as string]: star.o, animationDelay: `${star.d}s` }}
        />
      ))}

      <g className="ev-disc">
        <ellipse rx="34" ry="7.5" fill="none" stroke="url(#ev-disc)" strokeWidth="1.1" />
        <ellipse rx="24" ry="5" fill="none" stroke="url(#ev-disc)" strokeWidth="0.7" opacity="0.75" />
        <ellipse rx="44" ry="11" fill="none" stroke="url(#ev-disc)" strokeWidth="0.5" opacity="0.4" />
        <circle r="11" fill="url(#ev-core)" />
        <circle r="8" fill="#05060a" />
        <circle r="8.2" fill="none" stroke="var(--e-violet)" strokeWidth="0.3" opacity="0.7" />
      </g>
    </svg>
  )
}

/** A single brushed circle, left open at the top right the way an enso is. */
function Enso() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <path
        className="ev-enso"
        d="M70 22 C46 6, 14 22, 14 50 C14 78, 44 96, 66 84 C84 74, 90 52, 78 36 C70 25, 56 20, 46 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  )
}

/** Points and the connections between them — narrative dynamics, roughly. */
function Lattice() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g className="ev-lattice">
        {LATTICE.map((a, i) =>
          LATTICE.slice(i + 1).map((b, j) => {
            const distance = Math.hypot(a.x - b.x, a.y - b.y)
            if (distance > 21) return null
            return (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="currentColor"
                strokeWidth="0.22"
                opacity={0.5 - distance / 60}
              />
            )
          }),
        )}
        {LATTICE.map((node, index) => (
          <circle
            key={index}
            cx={node.x}
            cy={node.y}
            r={node.r / 2.6}
            fill={index % 7 === 0 ? 'var(--e-violet)' : 'currentColor'}
            opacity={index % 7 === 0 ? 0.95 : 0.5}
          />
        ))}
      </g>
    </svg>
  )
}

/** Concentric rings from one struck point. A drum, if you want it to be. */
function Ripples() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g className="ev-ripples">
        {Array.from({ length: 7 }, (_, index) => (
          <circle
            key={index}
            cx="50"
            cy="50"
            r={7 + index * 6.4}
            fill="none"
            stroke={index === 2 ? 'var(--e-violet)' : 'currentColor'}
            strokeWidth={index === 2 ? 0.7 : 0.4}
            opacity={0.75 - index * 0.09}
            style={{ animationDelay: `${index * 320}ms` }}
          />
        ))}
        <circle cx="50" cy="50" r="2.4" fill="var(--e-violet)" />
      </g>
    </svg>
  )
}

/** Nothing drawn — a slow tonal wash handled entirely in CSS. */
function Grain() {
  return <div className="ev-grain" aria-hidden />
}

export default function Visual({ kind }: { kind: VisualKind }) {
  return (
    <div className="e-visual" data-kind={kind} aria-hidden>
      {kind === 'cosmos' && <Cosmos />}
      {kind === 'enso' && <Enso />}
      {kind === 'lattice' && <Lattice />}
      {kind === 'ripples' && <Ripples />}
      {kind === 'grain' && <Grain />}
    </div>
  )
}
