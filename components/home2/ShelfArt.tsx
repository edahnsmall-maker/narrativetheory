'use client'

import { useId, type ReactNode } from 'react'
import { C, Defs, Person, Scrap, useArtStyle, type Expression, type HairStyle } from './collage'

/**
 * Small cut-paper header art for Life Instruction module pages: one cut-out
 * figure plus a prop and a couple of paper scraps, varied by shelf. Meant to
 * sit quietly in the corner of the header, not to explain anything.
 */

type Art = {
  ground: string
  shirt: string
  expr: Expression
  look?: number
  prop: (id: string) => ReactNode
  second?: boolean
}

const ART: Record<string, Art> = {
  'start-here-core-practice': {
    ground: C.mustard,
    shirt: C.cobalt,
    expr: 'soft',
    look: 1,
    prop: (id) => (
      <g transform="translate(160,120)">
        <g filter={`url(#${id}-cut)`}>
          <circle r="16" fill={C.tomato} />
          <path d="M0,-16 q2,-8 8,-10" stroke={C.ink} strokeWidth="2.5" fill="none" />
          <path d="M2,-20 q10,-8 16,0 q-8,4 -16,0z" fill={C.sage} />
        </g>
        <path d="M-12,-10 q8,-8 14,-4" stroke="#fff" strokeWidth="3" opacity="0.8" fill="none" strokeLinecap="round" />
        <circle r="19" fill="#fff" opacity="0.18" />
      </g>
    ),
  },
  'how-you-see-yourself': {
    ground: C.blush,
    shirt: C.teal,
    expr: 'flat',
    look: 1,
    prop: (id) => (
      <g filter={`url(#${id}-cut)`}>
        <rect x="140" y="50" width="44" height="72" rx="20" fill={C.mustard} />
        <rect x="146" y="56" width="32" height="60" rx="15" fill={C.sky} />
        <path d="M152,70 l10,-8 M152,82 l18,-14" stroke="#fff" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
      </g>
    ),
  },
  'social-anxiety-and-social-life': {
    ground: C.sky,
    shirt: C.mustard,
    expr: 'worried',
    look: -1,
    prop: (id) => (
      <g filter={`url(#${id}-cut)`} opacity="0.55">
        <circle cx="30" cy="92" r="11" fill={C.ink} />
        <path d="M14,130 q16,-34 32,0z" fill={C.ink} />
        <circle cx="172" cy="88" r="11" fill={C.ink} />
        <path d="M156,128 q16,-34 32,0z" fill={C.ink} />
      </g>
    ),
  },
  relationships: {
    ground: C.blush,
    shirt: C.cobalt,
    expr: 'smile',
    look: 1,
    second: true,
    prop: () => null,
  },
  'anger-and-conflict': {
    ground: C.tomato,
    shirt: C.ink,
    expr: 'angry',
    prop: () => (
      <g stroke={C.mustard} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44,40 l-10,-10 l8,-2 l-10,-12" />
        <path d="M156,40 l10,-10 l-8,-2 l10,-12" />
      </g>
    ),
  },
  'zen-and-letting-go': {
    ground: C.sage,
    shirt: C.paper2,
    expr: 'soft',
    prop: () => <path d="M70,66 a40,40 0 1 1 6,58" stroke={C.ink} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />,
  },
  'letting-go': {
    ground: C.lavender,
    shirt: C.teal,
    expr: 'soft',
    look: 1,
    prop: (id) => (
      <g>
        <path d="M138,104 C150,80 140,60 158,40" stroke={C.ink} strokeWidth="1.5" fill="none" />
        <g filter={`url(#${id}-cut)`}>
          <ellipse cx="160" cy="26" rx="15" ry="18" fill={C.tomato} />
          <path d="M156,44 l4,-2 l4,2z" fill={C.tomato} />
        </g>
      </g>
    ),
  },
  'flow-and-natural-function': {
    ground: C.teal,
    shirt: C.mustard,
    expr: 'smile',
    prop: () => (
      <g stroke={C.cream} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M10,40 q14,-12 28,0 t28,0" />
        <path d="M134,30 q14,-12 28,0 t28,0" />
        <path d="M20,70 q14,-12 28,0" />
      </g>
    ),
  },
  'grief-and-loss': {
    ground: '#b8b9c9',
    shirt: C.cobalt,
    expr: 'frown',
    prop: (id) => (
      <g>
        <g filter={`url(#${id}-cut)`} fill={C.cream}>
          <circle cx="58" cy="26" r="14" />
          <circle cx="78" cy="20" r="18" />
          <circle cx="98" cy="28" r="13" />
          <rect x="52" y="26" width="52" height="14" rx="7" />
        </g>
        <g stroke={C.cobalt} strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
          <path d="M62,50 l-3,8 M78,48 l-3,8 M94,50 l-3,8" />
        </g>
      </g>
    ),
  },
  'meaning-and-service': {
    ground: C.mustard,
    shirt: C.sage,
    expr: 'smile',
    look: 1,
    prop: (id) => (
      <g filter={`url(#${id}-cut)`}>
        <path d="M162,92 c-8,-16 -30,-4 -16,12 l16,14 l16,-14 c14,-16 -8,-28 -16,-12z" fill={C.tomato} />
      </g>
    ),
  },
  'disorders-through-an-nt-lens': {
    ground: C.lavender,
    shirt: C.cobalt,
    expr: 'flat',
    look: 1,
    prop: (id) => (
      <g>
        <g filter={`url(#${id}-cut)`} fill={C.cream}>
          <rect x="128" y="14" width="64" height="40" rx="18" />
          <circle cx="132" cy="64" r="5" />
          <circle cx="124" cy="76" r="3" />
        </g>
        <path d="M140,34 c6,-10 10,10 16,0 s10,10 16,0 s8,8 12,2" stroke={C.ink} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
}

const SKINS = [C.skin1, C.skin2, C.skin3]
const HAIRS = [C.hair1, C.hair2, C.hair3]
const STYLES: HairStyle[] = ['short', 'long', 'bun', 'curly', 'cap', 'bald']
const MOODS: Expression[] = ['soft', 'smile', 'flat', 'worried', 'bigsmile']
function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/** seed: vary the person (skin, hair, mood, which way they look) so cards on one shelf aren't copies. */
export function ShelfArt({ shelf, className, seed }: { shelf: string; className?: string; seed?: string }) {
  const id = useId().replace(/:/g, '')
  const a = ART[shelf] ?? ART['start-here-core-practice']
  const contour = useArtStyle() === 'contour'
  const pick = (salt: string, n: number) => (seed ? hash(seed + salt) % n : 0)
  const v = seed
    ? { skin: SKINS[pick('s', 3)], hair: HAIRS[pick('h', 3)], style: STYLES[pick('y', STYLES.length)], expr: a.expr === 'frown' || a.expr === 'worried' || a.expr === 'angry' ? a.expr : MOODS[pick('e', MOODS.length)], look: pick('l', 3) - 1 }
    : null
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <Defs id={id} />
      {!contour && (
        <>
          <Scrap id={id} d="M18,30 C40,6 150,0 184,26 C204,60 196,140 172,160 H26 C6,130 0,60 18,30 Z" fill={a.ground} opacity={0.55} />
          <Scrap id={id} d="M120,100 l60,-14 l14,60 l-62,10 z" fill={C.paper2} opacity={0.8} pattern="dots" />
        </>
      )}
      {a.prop(id)}
      {a.second ? (
        <>
          <Person id={id} x={66} y={160} s={0.62} skin={C.skin1} hair={C.hair2} hairStyle="short" shirt={a.shirt} expr={a.expr} look={1} />
          <Person id={id} x={136} y={160} s={0.6} skin={C.skin3} hair={C.hair1} hairStyle="long" shirt={C.tomato} expr="smile" look={-1} />
        </>
      ) : (
        <Person id={id} x={96} y={160} s={0.7} skin={v?.skin ?? C.skin1} hair={v?.hair ?? C.hair2} hairStyle={v?.style ?? 'short'} shirt={a.shirt} expr={v?.expr ?? a.expr} look={v?.look ?? a.look ?? 0} />
      )}
    </svg>
  )
}
