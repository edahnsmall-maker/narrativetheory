import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getShelf } from '@/lib/data/lifeInstruction'

interface Props {
  params: Promise<{ shelf: string }>
}

export default async function ShelfPage({ params }: Props) {
  const { shelf: shelfSlug } = await params
  const shelf = getShelf(shelfSlug)
  if (!shelf) notFound()

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-12">
          <Link href="/life" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">← Life Instruction™</Link>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{shelf.name}</h1>
        </div>
      </header>
      <section>
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-12 space-y-12">
          {shelf.clusters.map((c) => (
            <div key={c.slug}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Cluster · {c.name}</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {c.modules.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/life/${shelf.slug}/${m.slug}`}
                    className="rounded-2xl border bg-card p-5 hover:border-foreground/40"
                  >
                    <div className="font-display text-lg leading-tight">{m.name}</div>
                    {m.sections.Article && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{m.sections.Article.slice(0, 160)}…</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
