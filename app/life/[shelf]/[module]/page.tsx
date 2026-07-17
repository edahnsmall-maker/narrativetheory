import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getModule } from '@/lib/data/lifeInstruction'
import ModuleAI from '@/components/module-ai'
import { GradientOrb } from '@/components/nt/GradientOrb'

interface Props {
  params: Promise<{ shelf: string; module: string }>
}

function Block({ text }: { text: string }) {
  const parts: { type: 'code' | 'p'; content: string }[] = []
  const segs = text.split(/```(?:text)?\n([\s\S]*?)```/)
  segs.forEach((s, i) => {
    if (!s.trim()) return
    if (i % 2 === 1) {
      parts.push({ type: 'code', content: s.trim() })
    } else {
      s.split(/\n\n+/).forEach((p) => {
        if (p.trim()) parts.push({ type: 'p', content: p.trim() })
      })
    }
  })
  return (
    <div className="space-y-5">
      {parts.map((p, i) =>
        p.type === 'code' ? (
          <pre key={i} className="code-block">{p.content}</pre>
        ) : (
          <p key={i} className="prose-nt text-[17px] leading-relaxed whitespace-pre-line">{p.content}</p>
        )
      )}
    </div>
  )
}

export default async function ModulePage({ params }: Props) {
  const { shelf: shelfSlug, module: moduleSlug } = await params
  const found = getModule(shelfSlug, moduleSlug)
  if (!found) notFound()

  const { shelf, cluster, module: mod } = found

  return (
    <article>
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-12 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-9">
            <Link
              href={`/life/${shelf.slug}`}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mb-4"
            >
              <ArrowLeft size={13} /> {shelf.name}
            </Link>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Cluster · {cluster.name}</div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">{mod.name}</h1>
          </div>
          <div className="md:col-span-3 flex justify-end">
            <GradientOrb variant="violet" size={140} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-5 lg:px-8 py-14 space-y-14">
        {/* Article */}
        {mod.sections.Article ? (
          <section>
            <Block text={mod.sections.Article} />
          </section>
        ) : (
          <p className="text-muted-foreground italic text-sm">Article in progress.</p>
        )}

        {/* Exercise */}
        {mod.sections.Exercise && (
          <section>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Exercise</div>
            <div className="rounded-2xl border bg-card p-6">
              <Block text={mod.sections.Exercise} />
            </div>
          </section>
        )}

        {/* AI Walkthrough */}
        <section>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">AI Walkthrough</div>
          <ModuleAI
            shelfSlug={shelfSlug}
            moduleSlug={moduleSlug}
            moduleName={mod.name}
          />
        </section>

        {/* Navigation hint */}
        <div className="border-t pt-8 text-xs text-muted-foreground">
          Part of{' '}
          <Link href={`/life/${shelf.slug}`} className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
            {shelf.name}
          </Link>
        </div>
      </div>
    </article>
  )
}
