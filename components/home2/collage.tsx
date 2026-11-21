'use client'

import { createContext, useContext, type ReactNode } from 'react'

/**
 * Two drawing styles share this kit:
 * - 'line' (default): thin dark outlines, soft pastel fills, light ground, clean labels.
 * - 'collage': the original cut-paper look (rough edges, grain, halftone). Kept so the
 *   older drawings can still be seen, e.g. on /drawings/cut-paper.
 */
export type ArtStyle = 'line' | 'collage'
const ArtStyleCtx = createContext<ArtStyle>('line')
export function ArtStyleProvider({ style, children }: { style: ArtStyle; children: ReactNode }) {
  return <ArtStyleCtx.Provider value={style}>{children}</ArtStyleCtx.Provider>
}
export const useArtStyle = () => useContext(ArtStyleCtx)

/** Line style colors */
export const L = {
  ground: '#faf9f7',
  line: '#34323a',
  lavender: '#b9a2f0',
  halo: '#c9b6f7',
}

/**
 * A small cut-paper collage kit for the homepage illustrations: a palette,
 * SVG filters for rough hand-cut edges, paper grain and halftone, and a few
 * reusable cut-out figures. Everything is plain SVG so it stays crisp,
 * themeable, and animatable.
 */

export const C = {
  paper: '#f5f0e6',
  paper2: '#ece4d4',
  ink: '#1f1d1a',
  tomato: '#e0533d',
  cobalt: '#2f5bd3',
  mustard: '#e8b23a',
  sage: '#8fb39a',
  blush: '#f2b8b0',
  lavender: '#b9a7e6',
  sky: '#a9c8ef',
  teal: '#3f9b94',
  cream: '#fffaf0',
  skin1: '#f1c7a5',
  skin2: '#c98d63',
  skin3: '#8a5a3c',
  hair1: '#2b2420',
  hair2: '#7a4a2a',
  hair3: '#d9a44e',
}

/** Filters and patterns. Render once inside each <svg>, with a unique prefix. */
export function Defs({ id }: { id: string }) {
  const style = useArtStyle()
  if (style === 'line') return <LineDefs id={id} />
  return (
    <defs>
      {/* hand-cut paper edge */}
      <filter id={`${id}-cut`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d" />
        <feDropShadow in="d" dx="1.2" dy="1.8" stdDeviation="0.8" floodColor="#1f1d1a" floodOpacity="0.22" />
      </filter>
      {/* stronger torn edge for background scraps */}
      <filter id={`${id}-torn`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="8" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* paper grain overlay */}
      <filter id={`${id}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0.09 0" />
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
      <pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="3.5" cy="3.5" r="1.4" fill={C.ink} opacity="0.18" />
      </pattern>
      <pattern id={`${id}-dots-lg`} width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
        <circle cx="5.5" cy="5.5" r="2.6" fill={C.ink} opacity="0.12" />
      </pattern>
      <pattern id={`${id}-check`} width="22" height="22" patternUnits="userSpaceOnUse">
        <rect width="22" height="22" fill={C.cream} />
        <rect width="11" height="11" fill={C.tomato} opacity="0.85" />
        <rect x="11" y="11" width="11" height="11" fill={C.tomato} opacity="0.85" />
      </pattern>
      <pattern id={`${id}-lines`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
        <line x1="0" y1="0" x2="0" y2="6" stroke={C.ink} strokeWidth="1" opacity="0.14" />
      </pattern>
      <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
        <stop offset="0.35" stopColor="#fff" stopOpacity="0.08" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  )
}

/* Line style: same filter ids, different look. "cut" softens a shape's colors toward pastel
   (darks stay dark, so text stays readable) and draws a thin outline around it. "torn"
   only softens. Grain is a no-op. */
function Soften() {
  // wash light and mid colors toward white; leave darks (text, ink) alone
  return (
    <>
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.3 0.59 0.11 0 0" result="lum" />
      <feComponentTransfer in="lum" result="mask">
        <feFuncA type="table" tableValues="0 0.12 0.62 0.8 0.85" />
      </feComponentTransfer>
      <feComposite in="mask" in2="SourceGraphic" operator="atop" result="soft" />
    </>
  )
}
function LineDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-cut`} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <Soften />
        <feMorphology in="SourceAlpha" operator="dilate" radius="1.1" result="fat" />
        <feFlood floodColor={L.line} result="ink" />
        <feComposite in="ink" in2="fat" operator="in" result="outline" />
        <feMerge>
          <feMergeNode in="outline" />
          <feMergeNode in="soft" />
        </feMerge>
      </filter>
      <filter id={`${id}-torn`} colorInterpolationFilters="sRGB">
        <Soften />
      </filter>
      <filter id={`${id}-grain`}>
        <feFlood floodOpacity="0" />
      </filter>
      <radialGradient id={`${id}-halo`}>
        <stop offset="0" stopColor={L.halo} stopOpacity="0.55" />
        <stop offset="1" stopColor={L.halo} stopOpacity="0" />
      </radialGradient>
      <pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse" />
      <pattern id={`${id}-dots-lg`} width="11" height="11" patternUnits="userSpaceOnUse" />
      <pattern id={`${id}-lines`} width="6" height="6" patternUnits="userSpaceOnUse" />
      <pattern id={`${id}-check`} width="22" height="22" patternUnits="userSpaceOnUse">
        <rect width="22" height="22" fill="#fff" />
        <rect width="11" height="11" fill={L.lavender} opacity="0.35" />
        <rect x="11" y="11" width="11" height="11" fill={L.lavender} opacity="0.35" />
      </pattern>
      <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
        <stop offset="0.35" stopColor="#fff" stopOpacity="0.08" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  )
}

/** Mix a #rrggbb color toward white (t = 0 keeps it, 1 is white). */
export function wash(hex: string, t: number) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex)
  if (!m) return hex
  const n = parseInt(m[1], 16)
  const ch = (v: number) => Math.round(v + (255 - v) * t).toString(16).padStart(2, '0')
  return `#${ch(n >> 16)}${ch((n >> 8) & 255)}${ch(n & 255)}`
}

/** A full-bleed paper ground with grain. */
export function Paper({ id, w, h, color = C.paper }: { id: string; w: number; h: number; color?: string }) {
  if (useArtStyle() === 'line')
    return <rect width={w} height={h} fill={wash(color, 0.82)} style={{ transition: 'fill 600ms ease' }} />
  return (
    <g>
      <rect width={w} height={h} fill={color} style={{ transition: 'fill 600ms ease' }} />
      <rect width={w} height={h} fill={color} filter={`url(#${id}-grain)`} />
    </g>
  )
}

export type Expression = 'smile' | 'soft' | 'flat' | 'frown' | 'angry' | 'worried' | 'cry' | 'bigsmile'
export type HairStyle = 'short' | 'long' | 'bun' | 'curly' | 'bald' | 'cap'

function Face({ e, look = 0 }: { e: Expression; look?: number }) {
  const ex = look * 2
  const brows: Record<Expression, string> = {
    smile: 'M-13,-103 q5,-3 9,0 M4,-103 q5,-3 9,0',
    bigsmile: 'M-13,-104 q5,-4 9,0 M4,-104 q5,-4 9,0',
    soft: 'M-13,-102 q5,-2 9,0 M4,-102 q5,-2 9,0',
    flat: 'M-13,-102 h9 M4,-102 h9',
    frown: 'M-13,-104 q5,2 9,3 M4,-101 q5,-1 9,-3',
    angry: 'M-14,-106 l10,5 M4,-101 l10,-5',
    worried: 'M-13,-101 l9,-4 M4,-105 l9,4',
    cry: 'M-13,-101 l9,-4 M4,-105 l9,4',
  }
  const mouths: Record<Expression, ReactNode> = {
    smile: <path d="M-8,-80 q8,7 16,0" stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />,
    bigsmile: <path d="M-10,-82 q10,13 20,0 z" fill={C.ink} />,
    soft: <path d="M-6,-80 q6,4 12,0" stroke={C.ink} strokeWidth="2" fill="none" strokeLinecap="round" />,
    flat: <path d="M-7,-80 h14" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" />,
    frown: <path d="M-8,-77 q8,-6 16,0" stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />,
    angry: <path d="M-9,-77 q9,-5 18,0 l-2,2 q-7,-3 -14,0 z" fill={C.ink} />,
    worried: <path d="M-7,-78 q3,-3 7,0 q4,3 7,0" stroke={C.ink} strokeWidth="2" fill="none" strokeLinecap="round" />,
    cry: <ellipse cx="0" cy="-79" rx="7" ry="6" fill={C.ink} />,
  }
  return (
    <g>
      <circle cx={-8 + ex} cy="-93" r="2.4" fill={C.ink} />
      <circle cx={8 + ex} cy="-93" r="2.4" fill={C.ink} />
      <path d={brows[e]} stroke={C.ink} strokeWidth="2" fill="none" strokeLinecap="round" />
      {mouths[e]}
      {(e === 'smile' || e === 'bigsmile' || e === 'soft') && (
        <>
          <circle cx="-15" cy="-84" r="4.5" fill={C.tomato} opacity="0.25" />
          <circle cx="15" cy="-84" r="4.5" fill={C.tomato} opacity="0.25" />
        </>
      )}
      {e === 'cry' && <path d="M-11,-89 q-2,6 0,9 M11,-89 q2,6 0,9" stroke={C.sky} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
    </g>
  )
}

function Hair({ style, color }: { style: HairStyle; color: string }) {
  switch (style) {
    case 'short':
      return <path d="M-25,-96 C-27,-124 25,-128 25,-98 C18,-110 -10,-114 -25,-96 Z" fill={color} />
    case 'long':
      return <path d="M-27,-92 C-32,-130 32,-130 27,-92 L30,-62 L18,-66 L20,-96 C10,-110 -12,-112 -20,-96 L-18,-66 L-30,-62 Z" fill={color} />
    case 'bun':
      return (
        <g fill={color}>
          <circle cx="0" cy="-128" r="11" />
          <path d="M-25,-95 C-27,-126 25,-126 25,-95 C16,-112 -16,-112 -25,-95 Z" />
        </g>
      )
    case 'curly':
      return (
        <g fill={color}>
          {[-22, -11, 0, 11, 22].map((x, i) => (
            <circle key={i} cx={x} cy={-114 + Math.abs(x) * 0.25} r="11" />
          ))}
        </g>
      )
    case 'cap':
      return (
        <g>
          <path d="M-25,-100 C-25,-126 25,-126 25,-100 Z" fill={color} />
          <path d="M5,-102 h34 q-4,6 -34,6 z" fill={color} />
        </g>
      )
    default:
      return null
  }
}

/** A cut-out person, base of the torso at (0,0), ~150 units tall at scale 1. */
export function Person({
  id,
  x,
  y,
  s = 1,
  skin = C.skin1,
  hair = C.hair1,
  hairStyle = 'short',
  shirt = C.cobalt,
  expr = 'flat',
  look = 0,
  slump = 0,
  children,
}: {
  id: string
  x: number
  y: number
  s?: number
  skin?: string
  hair?: string
  hairStyle?: HairStyle
  shirt?: string
  expr?: Expression
  look?: number
  /** 0 upright … 1 hunched (shoulders up, head down) */
  slump?: number
  children?: ReactNode
}) {
  const sh = slump * 8
  if (useArtStyle() === 'line') {
    const sw = 1.7 / s
    const torso = `M-46,0 C-46,${-40 - sh} -32,${-60 - sh} 0,${-60 - sh * 0.4} C32,${-60 - sh} 46,${-40 - sh} 46,0`
    return (
      <g transform={`translate(${x},${y}) scale(${s})`} style={{ transition: 'transform 500ms ease' }}>
        <circle cx="0" cy={-90 + sh} r="56" fill={`url(#${id}-halo)`} />
        <g stroke={L.line} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d={torso + ' Z'} fill="#fff" stroke="none" />
          <path d={torso + ' Z'} fill={shirt} opacity="0.22" stroke="none" style={{ transition: 'fill 500ms' }} />
          <path d={torso} fill="none" />
          <path d={`M-12,${-58 - sh * 0.4} q12,12 24,0`} fill="none" />
          <path d={`M-7,${-70 + sh} V${-59 - sh * 0.4} M7,${-70 + sh} V${-59 - sh * 0.4}`} fill="none" />
        </g>
        <g transform={`translate(0,${sh})`}>
          {/* outline only the outer silhouette of head + hair: stroke underneath, fills on top */}
          <g stroke={L.line} strokeWidth={sw * 2} strokeLinejoin="round">
            <ellipse cx="0" cy="-93" rx="25" ry="28" fill="#fff" />
            <Hair style={hairStyle} color="#fff" />
          </g>
          <ellipse cx="0" cy="-93" rx="25" ry="28" fill="#fff" />
          <Hair style={hairStyle} color={wash(hair, 0.4)} />
          <Face e={expr} look={look} />
        </g>
        {children}
      </g>
    )
  }
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} style={{ transition: 'transform 500ms ease' }}>
      <g filter={`url(#${id}-cut)`}>
        <path d={`M-46,0 C-46,${-40 - sh} -32,${-60 - sh} 0,${-60 - sh * 0.4} C32,${-60 - sh} 46,${-40 - sh} 46,0 Z`} fill={shirt} style={{ transition: 'fill 500ms' }} />
        <path d={`M-12,${-58 - sh * 0.4} q12,14 24,0`} fill={C.cream} opacity="0.85" />
        <rect x="-8" y={-72 + sh} width="16" height="16" fill={skin} />
      </g>
      <g transform={`translate(0,${sh})`}>
        <g filter={`url(#${id}-cut)`}>
          <ellipse cx="0" cy="-93" rx="25" ry="28" fill={skin} />
          <Hair style={hairStyle} color={hair} />
        </g>
        <Face e={expr} look={look} />
      </g>
      {children}
    </g>
  )
}

/** A comic thought cloud with up to ~4 short lines of text. */
export function ThoughtCloud({
  id,
  x,
  y,
  w,
  lines,
  tailTo,
  fill = C.cream,
  size = 15,
}: {
  id: string
  x: number
  y: number
  w: number
  lines: string[]
  tailTo?: [number, number]
  fill?: string
  size?: number
}) {
  const lh = size * 1.3
  const h = lines.length * lh + 34
  const r = 18
  if (useArtStyle() === 'line') {
    return (
      <g>
        {tailTo && (
          <g fill="#fff" stroke={L.lavender} strokeWidth="1.5">
            <circle cx={x + (tailTo[0] - x) * 0.55} cy={y + h + (tailTo[1] - y - h) * 0.45} r="6" />
            <circle cx={x + (tailTo[0] - x) * 0.8} cy={y + h + (tailTo[1] - y - h) * 0.75} r="3.5" />
          </g>
        )}
        <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={r + 4} fill={L.halo} opacity="0.25" />
        <rect x={x} y={y} width={w} height={h} rx={r} fill="#fff" stroke={L.lavender} strokeWidth="1.5" />
        <text x={x + w / 2} y={y + 22 + size * 0.4} textAnchor="middle" fontSize={size * 0.95} fill={L.line}>
          {lines.map((l, i) => (
            <tspan key={i} x={x + w / 2} dy={i === 0 ? 0 : lh}>
              {l}
            </tspan>
          ))}
        </text>
      </g>
    )
  }
  return (
    <g>
      {tailTo && (
        <g fill={fill} filter={`url(#${id}-cut)`}>
          <circle cx={x + (tailTo[0] - x) * 0.55} cy={y + h + (tailTo[1] - y - h) * 0.45} r="9" />
          <circle cx={x + (tailTo[0] - x) * 0.8} cy={y + h + (tailTo[1] - y - h) * 0.75} r="5.5" />
        </g>
      )}
      <g filter={`url(#${id}-cut)`}>
        <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} style={{ transition: 'fill 500ms' }} />
        {Array.from({ length: Math.ceil(w / 34) }).map((_, i) => (
          <circle key={`t${i}`} cx={x + 18 + i * 34} cy={y + 4} r="16" fill={fill} style={{ transition: 'fill 500ms' }} />
        ))}
        {Array.from({ length: Math.ceil(w / 34) }).map((_, i) => (
          <circle key={`b${i}`} cx={x + 18 + i * 34} cy={y + h - 4} r="16" fill={fill} style={{ transition: 'fill 500ms' }} />
        ))}
      </g>
      <text x={x + w / 2} y={y + 22 + size * 0.4} textAnchor="middle" fontSize={size} fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
        {lines.map((l, i) => (
          <tspan key={i} x={x + w / 2} dy={i === 0 ? 0 : lh}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  )
}

/** A rough paper scrap (background decoration). */
export function Scrap({ id, d, fill, opacity = 1, pattern }: { id: string; d: string; fill: string; opacity?: number; pattern?: 'dots' | 'dots-lg' | 'lines' }) {
  if (useArtStyle() === 'line')
    return (
      <g opacity={opacity}>
        <path d={d} fill={wash(fill, 0.72)} style={{ transition: 'fill 600ms' }} />
      </g>
    )
  return (
    <g filter={`url(#${id}-torn)`} opacity={opacity}>
      <path d={d} fill={fill} style={{ transition: 'fill 600ms' }} />
      {pattern && <path d={d} fill={`url(#${id}-${pattern})`} />}
    </g>
  )
}

/** Pill toggle group used by every interactive figure. */
export function Toggle<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string; color: string }[]
  value: T
  onChange: (v: T) => void
  label: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1.5 rounded-full border bg-card p-1">
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors"
            style={on ? { background: o.color, color: '#fff' } : undefined}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: on ? '#fff' : o.color }} />
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** Frame for a figure: art, controls, caption. */
export function Figure({
  children,
  controls,
  caption,
  label,
  mobile,
}: {
  children: ReactNode
  controls?: ReactNode
  caption?: ReactNode
  label?: string
  /** Readable version of the text inside the art, shown on phones where the SVG text gets tiny. */
  mobile?: ReactNode
}) {
  const line = useArtStyle() === 'line'
  return (
    <figure className={`my-12 md:my-16 -mx-4 sm:mx-0 ${line ? 'art-line' : ''}`}>
      {controls && <div className="mb-4 px-4 sm:px-0 flex flex-wrap items-center gap-3">{controls}</div>}
      <div className={`overflow-hidden sm:rounded-3xl border-y sm:border shadow-[0_1px_0_rgba(0,0,0,0.04)] ${line ? 'bg-[#faf9f7]' : 'bg-[#f5f0e6]'}`} aria-label={label} role="img">
        {children}
      </div>
      {mobile && <div className="sm:hidden px-4 pt-3 text-[15px] leading-snug">{mobile}</div>}
      {caption && <figcaption className="mt-3 px-4 sm:px-0 text-sm text-muted-foreground leading-relaxed">{caption}</figcaption>}
    </figure>
  )
}
