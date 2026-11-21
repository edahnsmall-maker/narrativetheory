'use client'

import { ModuleCard } from './module-card'
import { useMe } from './use-me'
import type { ModuleCardData } from './library-data'

export function ShelfGrid({ clusters }: { clusters: { slug: string; name: string; modules: ModuleCardData[] }[] }) {
  const me = useMe()
  const single = clusters.length === 1
  return (
    <div className="space-y-12">
      {clusters.map((c) => (
        <div key={c.slug}>
          {!single && (
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.name}</span>
              <span className="hairline flex-1" aria-hidden />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.modules.map((m) => (
              <ModuleCard key={m.id} card={m} me={me} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
