import Link from 'next/link'
import { notFound } from 'next/navigation'
import { disorderFamilies, getFamily } from '@/lib/data/disorders'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function FamilyPage({ params }: Props) {
  const { slug } = await params
  const family = getFamily(slug)
  if (!family) notFound()

  const hasArticle = family.intro.length > 0

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-16 md:py-20">
          <Link href="/theory" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            ← Applied NT · Disorders as Mode-Worlds
          </Link>
          <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.02]">{family.title}</h1>
          <p className="mt-5 text-[19px] md:text-xl leading-relaxed text-foreground/75 max-w-2xl">
            {family.subtitle}
          </p>
        </div>
      </header>

      {hasArticle ? (
        <>
          <section className="border-b">
            <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14 space-y-5 text-[17px] leading-relaxed">
              {family.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          <section className="border-b bg-secondary/30">
            <div className="mx-auto max-w-4xl px-5 lg:px-8 py-12">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Disorders in this family</div>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">Jump to a section</h2>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-[15px]">
                {family.disorders.map((d) => (
                  <li key={d.slug}>
                    <a href={`#${d.slug}`} className="underline underline-offset-4 hover:text-foreground/70">
                      {d.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="border-b">
            <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">The basic mode-world</div>
              <div className="mt-4 space-y-4 text-[17px] leading-relaxed">
                {family.basicModeWorld.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">Common N/B/E/A pattern</div>
              <dl className="mt-4 grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border">
                {(
                  [
                    ['Narrative', family.pattern.narrative],
                    ['Body', family.pattern.body],
                    ['Energy', family.pattern.energy],
                    ['Action', family.pattern.action],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="bg-card p-5">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="border-b">
            <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14 space-y-16">
              {family.disorders.map((d) => (
                <article key={d.slug} id={d.slug} className="scroll-mt-24">
                  <h2 className="font-display text-3xl md:text-4xl">{d.name}</h2>
                  <div className="mt-5 space-y-4 text-[17px] leading-relaxed">
                    {d.intro.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>

                  <div className="mt-7 text-xs uppercase tracking-widest text-muted-foreground">NT breakdown</div>
                  <dl className="mt-3 divide-y border rounded-2xl overflow-hidden">
                    {(
                      [
                        ['Target', d.breakdown.target],
                        ['Thinking style', d.breakdown.nState],
                        ['Body-state', d.breakdown.bodyState],
                        ['Energy-state', d.breakdown.energyState],
                        ['Action-set', d.breakdown.actionSet],
                        ['Feedback loop', d.breakdown.feedbackLoop],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label} className="grid grid-cols-12 gap-4 p-4 bg-card">
                        <dt className="col-span-12 sm:col-span-3 text-xs uppercase tracking-widest text-muted-foreground pt-0.5">
                          {label}
                        </dt>
                        <dd className="col-span-12 sm:col-span-9 text-[15px] leading-relaxed">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">NT lens</div>
                  <p className="mt-2 text-[16px] leading-relaxed">{d.intervention}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Common NT lenses</div>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">For this family</h2>
              <p className="mt-3 text-sm text-foreground/70 italic">
                These are lenses, not treatment. Real disorders deserve real care.
              </p>
              <ul className="mt-6 space-y-2 text-[16px] leading-relaxed list-disc pl-5 marker:text-muted-foreground">
                {family.commonInterventions.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>
          </section>
        </>
      ) : (
        <section className="border-b">
          <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14">
            <div className="rounded-2xl border bg-card p-6 text-[15px] leading-relaxed text-muted-foreground">
              The full article for this family is being written. The overview, target, and pattern below
              are part of the Mode-World Overview on the Theory page.
            </div>

            <div className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">Targets</div>
            <p className="mt-2 text-[16px] leading-relaxed">{family.targets}</p>

            <div className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">Includes</div>
            <p className="mt-2 text-[16px] leading-relaxed">{family.includes}</p>

            <div className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">Common N/B/E/A pattern</div>
            <dl className="mt-4 grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border">
              {(
                [
                  ['Narrative', family.pattern.narrative],
                  ['Body', family.pattern.body],
                  ['Energy', family.pattern.energy],
                  ['Action', family.pattern.action],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="bg-card p-5">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="border-t bg-secondary/30">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-12">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Other families</div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border">
            {disorderFamilies
              .filter((f) => f.slug !== family.slug)
              .map((f) => (
                <Link
                  key={f.slug}
                  href={`/theory/disorders/${f.slug}`}
                  className="block bg-card p-5 hover:bg-secondary transition-colors"
                >
                  <div className="font-display text-lg">{f.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
