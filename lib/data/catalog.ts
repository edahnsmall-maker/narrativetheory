/**
 * The Mode Catalog: every mode in one list, with the same fields on every card.
 *
 * Sources, in priority order:
 *   1. fieldGuide.ts: modes in Edahn's own words (his "NAILED IT" template).
 *   2. modeFills.json: fields those modes were missing, from his notes where possible
 *      (sources: Narrative Theory for Claude/vetting/mode-fills.json).
 *   3. modes.json: the wider map of 60 modes.
 *   4. modeExtras.json: icon, quote, energy state, and two qualities (together/apart, doing/being).
 */
import raw from './modes.json'
import extrasRaw from './modeExtras.json'
import fillsRaw from './modeFills.json'
import { families, type FamilyKey } from './families'
import { species, type Species } from './fieldGuide'

export type Energy = 'Agitated' | 'Fearful' | 'Loving' | 'Analytical' | 'Low' | 'Calm'
export type Pull = 'together' | 'apart' | 'either'
export type Doing = 'doing' | 'being'

export interface CatalogMode {
  slug: string
  name: string
  aka?: string
  sticker: string
  /** One line: what it is. */
  line: string
  family: FamilyKey
  energy?: Energy
  pull?: Pull
  doing?: Doing
  body?: string
  thinking?: string
  world?: string
  does?: string
  comesAfter?: string
  sequence?: string
  feel?: string
  intensity?: string
  duration?: string
  wayOut?: string
  meme?: string
  /** Edahn's own line about this mode, when he has one. */
  hisQuote?: string
  quote?: { text: string; by: string }
  related: string[]
  portrait?: Species['portrait']
  /** Written up in his field guide (his words), vs. the wider map. */
  fieldGuide: boolean
}

type Extra = { sticker?: string; quote?: { text: string; by: string }; energy?: Energy; pull?: Pull; doing?: Doing }
type Fill = Partial<Record<'body' | 'thinking' | 'world' | 'does' | 'sequence' | 'meme', { text: string } | string>>
const extras = extrasRaw as Record<string, Extra>
const fills = fillsRaw as Record<string, Fill>
const fill = (slug: string, k: keyof Fill) => {
  const v = fills[slug]?.[k]
  return typeof v === 'string' ? v : v?.text
}

interface WideMode {
  slug: string
  name: string
  tagline: string
  meme: string
  family: string
  related: string[]
  thinking: string
  saran: string
  body: string
  behaviors: string
  sequence: string
}
// Substance Mode is left out: addiction stays off the site.
const HIDDEN = ['substance-mode']
const wide = (raw as WideMode[]).filter((m) => !HIDDEN.includes(m.slug))

/** Which branch of the tree each field-guide mode sits on. */
const SPECIES_FAMILY: Record<string, FamilyKey> = {
  'alert-mode': 'Threat / Protection',
  'anger-mode': 'Threat / Protection',
  'outgroup-mode': 'Threat / Protection',
  'performance-mode': 'Rank / Worth',
  'progress-mode': 'Rank / Worth',
  'flex-mode': 'Rank / Worth',
  'nailed-it': 'Rank / Worth',
  'bonding-mode': 'Attachment / Connection',
  'evaluation-mode': 'Attachment / Connection',
  'victim-mode': 'Attachment / Connection',
  'post-fight-warmth': 'Attachment / Connection',
  'boyfriend-mode': 'Role / Persona',
  'promoter-mode': 'Role / Persona',
  'goal-mode': 'Control / Future',
  'management-mode': 'Control / Future',
  'searching-mode': 'Control / Future',
  'deep-chill-mode': 'Correct Function / Being',
  'rest-mode': 'Correct Function / Being',
}

const slugOfName = (n: string) => wide.find((m) => m.name === n)?.slug ?? species.find((s) => s.name === n)?.slug

function fromSpecies(s: Species): CatalogMode {
  const w = wide.find((m) => m.slug === s.slug)
  const x = extras[s.slug] ?? {}
  return {
    slug: s.slug,
    name: s.name,
    aka: s.aka,
    sticker: s.sticker,
    line: s.line,
    family: SPECIES_FAMILY[s.slug] ?? ((w?.family as FamilyKey) || 'Control / Future'),
    energy: x.energy,
    pull: x.pull,
    doing: x.doing,
    body: s.body ?? fill(s.slug, 'body') ?? w?.body,
    thinking: s.thinking ?? fill(s.slug, 'thinking') ?? w?.thinking,
    world: s.world ?? fill(s.slug, 'world') ?? w?.saran,
    does: s.does ?? fill(s.slug, 'does') ?? w?.behaviors,
    comesAfter: s.comesAfter,
    sequence: fill(s.slug, 'sequence') ?? w?.sequence,
    feel: s.feel,
    intensity: s.intensity,
    duration: s.duration,
    wayOut: s.wayOut,
    meme: fill(s.slug, 'meme') ?? w?.meme,
    hisQuote: s.quote,
    quote: x.quote,
    related: s.related,
    portrait: s.portrait,
    fieldGuide: true,
  }
}

function fromWide(m: WideMode): CatalogMode {
  const x = extras[m.slug] ?? {}
  return {
    slug: m.slug,
    name: m.name,
    sticker: x.sticker ?? '•',
    line: m.tagline,
    family: m.family as FamilyKey,
    energy: x.energy,
    pull: x.pull,
    doing: x.doing,
    body: m.body,
    thinking: m.thinking,
    world: m.saran,
    does: m.behaviors,
    sequence: m.sequence,
    meme: m.meme,
    quote: x.quote,
    related: m.related.map(slugOfName).filter((x): x is string => !!x),
    fieldGuide: false,
  }
}

export const catalog: CatalogMode[] = [
  ...species.map(fromSpecies),
  ...wide.filter((m) => !species.some((s) => s.slug === m.slug)).map(fromWide),
]

export const catalogBySlug = (slug: string) => catalog.find((m) => m.slug === slug)
export const familyOf = (m: CatalogMode) => families.find((f) => f.name === m.family)

export const ENERGIES: Energy[] = ['Agitated', 'Fearful', 'Analytical', 'Low', 'Loving', 'Calm']
export const PULLS: { key: Pull; label: string; blurb: string }[] = [
  { key: 'together', label: 'Togetherness', blurb: 'Pulls you toward people.' },
  { key: 'apart', label: 'Separation', blurb: 'Me vs. them, distance, withdrawal.' },
]
export const DOINGS: { key: Doing; label: string; blurb: string }[] = [
  { key: 'doing', label: 'Doing states', blurb: 'Striving, managing, getting somewhere.' },
  { key: 'being', label: 'Being', blurb: 'Less story between you and the moment.' },
]

/** Spotlighted at the top of the catalog. */
export const SPOTLIGHT = ['goal-mode', 'performance-mode', 'post-fight-warmth', 'deep-chill-mode']
