import { shelves, type Module, type Shelf } from '@/lib/data/lifeInstruction'
import { plainText } from '@/components/rich-text'
import { rules } from '@/lib/config'

/**
 * Plain, serializable card data built on the server, so the library's client
 * components never ship the full module JSON (only a lowercased search string).
 */

export interface ModuleCardData {
  /** "shelf/module" — the key used by /api/me progress. */
  id: string
  href: string
  shelfSlug: string
  shelfName: string
  shelfIdx: number
  clusterName: string
  name: string
  hook: string
  free: boolean
}

export interface ShelfRowData {
  slug: string
  name: string
  idx: number
  modules: ModuleCardData[]
}

/** First sentence of the article, markdown stripped, for one-line hooks. */
export function moduleHook(m: Module, max = 150): string {
  const text = plainText(m.sections.Article || '')
  if (!text) return ''
  const first = text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text
  return first.length > max ? first.slice(0, max - 1).replace(/\s+\S*$/, '') + '…' : first
}

export function shelfCards(shelf: Shelf): ModuleCardData[] {
  const idx = shelves.findIndex((s) => s.slug === shelf.slug)
  return shelf.clusters.flatMap((c) =>
    c.modules.map((m) => ({
      id: `${shelf.slug}/${m.slug}`,
      href: `/life/${shelf.slug}/${m.slug}`,
      shelfSlug: shelf.slug,
      shelfName: shelf.name,
      shelfIdx: idx,
      clusterName: c.name,
      name: m.name,
      hook: moduleHook(m),
      free: rules.freeShelves.includes(shelf.slug),
    })),
  )
}

export function libraryRows(): ShelfRowData[] {
  return shelves.map((s, idx) => ({ slug: s.slug, name: s.name, idx, modules: shelfCards(s) }))
}

/** Search text per module id: name, cluster, shelf and article, lowercased. */
export function searchIndex(): Record<string, string> {
  const out: Record<string, string> = {}
  for (const s of shelves)
    for (const c of s.clusters)
      for (const m of c.modules)
        out[`${s.slug}/${m.slug}`] = [m.name, c.name, s.name, m.sections.Article || ''].join(' ').toLowerCase()
  return out
}
