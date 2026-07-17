import Link from 'next/link'
import { notFound } from 'next/navigation'
import { concepts, conceptBySlug } from '@/lib/data/concepts'
import { GradientOrb } from '@/components/nt/GradientOrb'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ConceptPage({ params }: Props) {
  const { slug } = await params
  const concept = conceptBySlug(slug)
  if (!concept) notFound()

  return (
    <article>
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-14 grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <Link href="/theory" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">← Theory</Link>
            <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95]">{concept.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{concept.shortDef}</p>
          </div>
          <div className="flex justify-center"><GradientOrb variant="violet" size={220} /></div>
        </div>
      </header>
      <section>
        <div className="mx-auto max-w-2xl px-5 lg:px-8 py-12 prose-nt text-[17px]">
          {concept.text.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>
      {concept.related.length > 0 && (
        <section className="border-t">
          <div className="mx-auto max-w-2xl px-5 lg:px-8 py-10">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Related concepts</div>
            <div className="flex flex-wrap gap-2">
              {concept.related.map((relSlug) => {
                const c = concepts.find((x) => x.slug === relSlug)
                if (!c) return null
                return (
                  <Link
                    key={relSlug}
                    href={`/theory/concepts/${relSlug}`}
                    className="text-xs text-muted-foreground border rounded-full px-3 py-1 hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    {c.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
