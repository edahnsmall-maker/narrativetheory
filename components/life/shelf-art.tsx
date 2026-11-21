import type { CSSProperties } from 'react'

/**
 * Deterministic, image-free art for Life Instruction cards. Each shelf gets a
 * fixed trio of design tokens (by its position in the library); each module
 * shifts the gradient's light sources slightly so a row doesn't look stamped.
 * No data imports here, so client components can use it cheaply.
 */

const PALETTES: [string, string, string][] = [
  ['--accent-violet', '--accent-pink', '--accent-yellow'], // Start Here
  ['--accent-blue', '--accent-violet', '--nt-reality'],
  ['--accent-pink', '--accent-orange', '--accent-yellow'],
  ['--nt-reality', '--accent-pink', '--accent-violet'],
  ['--accent-orange', '--nt-reality', '--accent-yellow'],
  ['--nt-mind', '--accent-blue', '--accent-yellow'],
  ['--nt-body', '--nt-mind', '--accent-violet'],
  ['--accent-yellow', '--nt-action', '--nt-mind'],
  ['--nt-body', '--accent-violet', '--nt-state-calm'],
  ['--nt-action', '--accent-orange', '--accent-pink'],
  ['--accent-violet', '--nt-body', '--nt-mind'],
]

export function shelfPalette(shelfIdx: number) {
  return PALETTES[((shelfIdx % PALETTES.length) + PALETTES.length) % PALETTES.length]
}

function hash(s: string) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0
  return Math.abs(h)
}

export function artStyle(shelfIdx: number, seed = ''): CSSProperties {
  const [a, b, c] = shelfPalette(shelfIdx)
  const h = hash(`${shelfIdx}:${seed}`)
  const x1 = 15 + (h % 30)
  const y1 = 18 + ((h >> 3) % 30)
  const x2 = 58 + ((h >> 6) % 30)
  const y2 = 52 + ((h >> 9) % 30)
  const x3 = 25 + ((h >> 12) % 50)
  return {
    background: [
      `radial-gradient(60% 75% at ${x1}% ${y1}%, color-mix(in oklab, var(${a}) 85%, transparent) 0%, transparent 70%)`,
      `radial-gradient(55% 70% at ${x2}% ${y2}%, color-mix(in oklab, var(${b}) 80%, transparent) 0%, transparent 70%)`,
      `radial-gradient(50% 60% at ${x3}% 100%, color-mix(in oklab, var(${c}) 70%, transparent) 0%, transparent 70%)`,
      `color-mix(in oklab, var(${a}) 14%, var(--card))`,
    ].join(', '),
  }
}

/** The faint orbit lines from GradientOrb, laid over card art. */
export function ArtLines({ seed = '' }: { seed?: string }) {
  const r = hash(seed) % 50
  return (
    <svg
      className="absolute inset-0 h-full w-full text-white"
      viewBox="0 0 160 120"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <ellipse cx="80" cy="60" rx="74" ry="22" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.5" transform={`rotate(${12 + r} 80 60)`} />
      <ellipse cx="80" cy="60" rx="60" ry="15" stroke="currentColor" strokeOpacity="0.38" strokeWidth="0.5" transform={`rotate(${-22 - r / 2} 80 60)`} />
    </svg>
  )
}
