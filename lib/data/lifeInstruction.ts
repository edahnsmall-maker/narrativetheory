import rawData from './lifeInstruction.json'

export interface ModulePart {
  name: string
  goal: string
  sampleLines?: string[]
}

export interface Module {
  slug: string
  name: string
  sections: {
    Article?: string
    Exercise?: string
    [key: string]: string | undefined
  }
  issueCategory?: string
  relatedConcepts?: string[]
  parts?: ModulePart[]
  subPrompt?: string
}

export interface Cluster {
  slug: string
  name: string
  modules: Module[]
}

export interface Shelf {
  slug: string
  name: string
  clusters: Cluster[]
}

export const shelves: Shelf[] = rawData as Shelf[]

export function getShelf(slug: string): Shelf | undefined {
  return shelves.find((s) => s.slug === slug)
}

export function getModule(shelfSlug: string, moduleSlug: string) {
  const shelf = getShelf(shelfSlug)
  if (!shelf) return null
  for (const cluster of shelf.clusters) {
    const mod = cluster.modules.find((m) => m.slug === moduleSlug)
    if (mod) return { shelf, cluster, module: mod }
  }
  return null
}

export function allModules(): Array<{ shelf: Shelf; cluster: Cluster; module: Module }> {
  const result = []
  for (const shelf of shelves) {
    for (const cluster of shelf.clusters) {
      for (const mod of cluster.modules) {
        result.push({ shelf, cluster, module: mod })
      }
    }
  }
  return result
}

export function shelfModules(shelfSlug: string): Module[] {
  const shelf = getShelf(shelfSlug)
  if (!shelf) return []
  return shelf.clusters.flatMap((c) => c.modules)
}
