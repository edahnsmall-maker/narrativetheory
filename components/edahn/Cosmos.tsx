'use client'

/**
 * A fixed backdrop that fades in across the dark middle of the deck — the
 * wonder / Zen / self run.
 *
 * Deliberately restrained. The SVG uses a 100x100 viewBox with `slice`, so on a
 * wide screen one unit is roughly 14 device pixels — radii here are tiny on
 * purpose, and anything above ~0.1 reads as a blob rather than a star. This
 * should register as atmosphere a second *after* you notice the words.
 */

/** Deterministic so server and client render identical markup. */
function stars(count: number) {
  let seed = 20130
  const next = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return Array.from({ length: count }, () => ({
    x: next() * 100,
    y: next() * 100,
    r: 0.028 + next() * 0.055,
    o: 0.25 + next() * 0.5,
    delay: next() * 9,
  }))
}

const FIELD = stars(150)

export default function Cosmos({ visible }: { visible: boolean }) {
  return (
    <div className="e-cosmos" data-visible={visible} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="e-core" cx="50%" cy="50%">
            <stop offset="55%" stopColor="#000" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="e-disc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.7 0.16 235)" stopOpacity="0" />
            <stop offset="32%" stopColor="oklch(0.78 0.13 250)" stopOpacity="0.4" />
            <stop offset="52%" stopColor="oklch(0.92 0.06 90)" stopOpacity="0.55" />
            <stop offset="72%" stopColor="oklch(0.72 0.15 40)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="oklch(0.6 0.18 20)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {FIELD.map((star, index) => (
          <circle
            key={index}
            className="e-star"
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#fff"
            style={
              { '--o': star.o, animationDelay: `${star.delay}s` } as React.CSSProperties
            }
          />
        ))}

        {/* Tucked into the lower right so it never fights the headline. */}
        <g className="e-disc-group">
          <ellipse rx="11.5" ry="2.6" fill="none" stroke="url(#e-disc)" strokeWidth="0.5" />
          <ellipse rx="8" ry="1.7" fill="none" stroke="url(#e-disc)" strokeWidth="0.32" opacity="0.7" />
          <ellipse rx="15" ry="3.5" fill="none" stroke="url(#e-disc)" strokeWidth="0.24" opacity="0.4" />
          <circle r="3.4" fill="url(#e-core)" />
          <circle r="2.5" fill="#000" />
          <circle r="2.55" fill="none" stroke="oklch(0.85 0.09 80)" strokeWidth="0.12" opacity="0.45" />
        </g>
      </svg>
    </div>
  )
}
