import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getShelf, shelves } from '@/lib/data/lifeInstruction'
import { shelfCards } from '@/components/life/library-data'
import { artStyle, ArtLines } from '@/components/life/shelf-art'
import { ShelfGrid } from '@/components/life/shelf-grid'
import { rules } from '@/lib/config'

interface Props {
  params: Promise<{ shelf: string }>
}

export function generateStaticParams() {
  return shelves.map((s) => ({ shelf: s.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { shelf: slug } = await params
  const shelf = getShelf(slug)
  return { title: shelf ? `${shelf.name} — Life Instruction` : 'Life Instruction' }
}

export default async function ShelfPage({ params }: Props) {
  const { shelf: shelfSlug } = await params
  const shelf = getShelf(shelfSlug)
  if (!shelf) notFound()

  const idx = shelves.findIndex((s) => s.slug === shelf.slug)
  const cards = shelfCards(shelf)
  const byCluster = shelf.clusters.map((c) => ({
    slug: c.slug,
    name: c.name,
    modules: cards.filter((m) => m.clusterName === c.name),
  }))
  const free = rules.freeShelves.includes(shelf.slug)
  const prev = shelves[idx - 1]
  const next = shelves[idx + 1]

  return (
    <div className="overflow-x-clip">
      <header className="relative border-b overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={artStyle(idx, 'hero')} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--paper)_55%,transparent)] to-[var(--paper)]" aria-hidden />
        <div className="absolute -right-10 -top-6 h-64 w-80 opacity-60 hidden sm:block" aria-hidden>
          <ArtLines seed={shelf.slug} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-5 lg:px-8 pt-10 pb-12 md:pt-14 md:pb-14">
          <Link
            href="/life"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={12} aria-hidden /> Life Instruction™
          </Link>
          <div className="mt-6 text-[10px] uppercase tracking-widest text-muted-foreground">
            Shelf {idx + 1} of {shelves.length}
          </div>
          <h1 className="mt-2 font-display text-4xl md:text-6xl leading-[0.98] max-w-3xl">{shelf.name}</h1>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
            {cards.length} {cards.length === 1 ? 'module' : 'modules'}
            {shelf.clusters.length > 1 ? ` in ${shelf.clusters.length} parts` : ''}. Every article and exercise is free to read.{' '}
            {free
              ? 'Guided sessions on this shelf are free too: just sign in.'
              : `Guided sessions are part of membership, and you can try the first ${rules.tasteReplies} replies of any session free.`}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {shelf.clusters.map((c) => (
              <span key={c.slug} className="chip">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-8 py-12">
        <ShelfGrid clusters={byCluster} />
      </section>

      <nav className="border-t" aria-label="Other shelves">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-8 py-8 grid grid-cols-2 gap-4 text-sm">
          <div>
            {prev && (
              <Link href={`/life/${prev.slug}`} className="group inline-flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Previous shelf</span>
                <span className="font-display text-base group-hover:underline underline-offset-4">{prev.name}</span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/life/${next.slug}`} className="group inline-flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Next shelf</span>
                <span className="font-display text-base group-hover:underline underline-offset-4">{next.name}</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
