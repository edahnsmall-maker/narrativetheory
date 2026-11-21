import Link from 'next/link'
import type { Metadata } from 'next'
import { RichText } from '@/components/rich-text'
import { formatDate, listPosts, showDrafts } from '@/lib/writing'

export const metadata: Metadata = {
  title: 'Writing — Narrative Theory',
  description: 'Essays and notes by Edahn Small on Narrative Theory, Zen, and how the mind works.',
}

function Draft() {
  return <span className="chip ml-2 align-middle text-[10px] uppercase tracking-wider">Draft</span>
}

export default async function WritingPage({ searchParams }: { searchParams: Promise<{ drafts?: string }> }) {
  const sp = await searchParams
  const drafts = showDrafts(sp.drafts)
  const essays = listPosts('essays', drafts)
  const notes = listPosts('notes', drafts)

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 md:py-20">
      <header className="max-w-2xl mb-14">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Writing</div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight mb-5">Notes and essays</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The essays are the longer stuff. The notes are whatever I wrote down that day, usually about meditation, the mind, or something I noticed
          about people.
        </p>
      </header>

      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <section aria-labelledby="essays">
          <h2 id="essays" className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Essays
          </h2>
          {essays.length === 0 ? (
            <p className="text-muted-foreground">Nothing here yet.</p>
          ) : (
            <ul className="divide-y border-y">
              {essays.map((e) => (
                <li key={e.slug}>
                  <Link href={`/writing/${e.slug}`} className="group block py-5">
                    <div className="text-xs text-muted-foreground mb-1">{formatDate(e.date)}</div>
                    <div className="font-display text-2xl leading-snug group-hover:underline underline-offset-4">
                      {e.title}
                      {e.draft && <Draft />}
                    </div>
                    {e.summary && <p className="mt-1.5 text-[15px] text-muted-foreground leading-relaxed">{e.summary}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="notes">
          <h2 id="notes" className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Notes
          </h2>
          {notes.length === 0 ? (
            <p className="text-muted-foreground">Nothing here yet.</p>
          ) : (
            <div className="space-y-4">
              {notes.map((n) => (
                <article key={n.slug} id={n.slug} className="rounded-2xl border bg-card p-5 scroll-mt-24">
                  <div className="font-display text-xl leading-snug text-foreground [&_p]:!text-[19px] [&_p]:!leading-snug [&_p]:font-display">
                    <RichText text={n.body} className="!space-y-3" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Link href={`/writing/notes/${n.slug}`} className="hover:text-foreground underline-offset-4 hover:underline">
                      {formatDate(n.date)}
                    </Link>
                    {n.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                    {n.draft && <Draft />}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
