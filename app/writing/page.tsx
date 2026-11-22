import Link from 'next/link'
import type { Metadata } from 'next'
import { RichText } from '@/components/rich-text'
import { KINDS, TOPICS, formatDate, listPosts, postHref, showDrafts, tagFromSlug, tagSlug, type Kind, type Post } from '@/lib/writing'

export const metadata: Metadata = {
  title: 'Writing — Narrative Theory',
  description: 'Essays, notes and questions by Edahn Small on Narrative Theory, Zen, meditation, and how the mind works.',
}

type SP = { drafts?: string; type?: string; tag?: string }

function href(sp: SP, change: Partial<SP>) {
  const next = { ...sp, ...change }
  const q = new URLSearchParams()
  if (next.type) q.set('type', next.type)
  if (next.tag) q.set('tag', next.tag)
  if (next.drafts) q.set('drafts', next.drafts)
  const s = q.toString()
  return s ? `/writing?${s}` : '/writing'
}

function Draft() {
  return <span className="chip ml-2 align-middle text-[10px] uppercase tracking-wider">Draft</span>
}

function Tags({ post, sp }: { post: Post; sp: SP }) {
  return (
    <>
      {post.tags.map((t) => (
        <Link key={t} href={href(sp, { tag: tagSlug(t) })} className="chip hover:text-foreground">
          {t}
        </Link>
      ))}
    </>
  )
}

function EssayItem({ post, sp }: { post: Post; sp: SP }) {
  return (
    <li className="py-5">
      <Link href={postHref(post)} className="group block">
        <div className="text-xs text-muted-foreground mb-1">{formatDate(post.date)}</div>
        <div className="font-display text-2xl leading-snug group-hover:underline underline-offset-4">
          {post.title}
          {post.draft && <Draft />}
        </div>
        {post.summary && <p className="mt-1.5 text-[15px] text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>}
      </Link>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Tags post={post} sp={sp} />
        </div>
      )}
    </li>
  )
}

function QuestionItem({ post, sp }: { post: Post; sp: SP }) {
  return (
    <li className="py-5">
      <Link href={postHref(post)} className="group grid grid-cols-[auto_1fr] gap-x-4">
        <span aria-hidden className="font-display text-3xl leading-none text-muted-foreground/60 pt-0.5">Q</span>
        <span>
          <span className="block font-display text-xl md:text-2xl leading-snug group-hover:underline underline-offset-4">
            {post.title}
            {post.draft && <Draft />}
          </span>
          {post.summary && <span className="mt-1.5 block text-[15px] text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</span>}
        </span>
      </Link>
      {post.tags.length > 0 && (
        <div className="mt-3 ml-10 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Tags post={post} sp={sp} />
        </div>
      )}
    </li>
  )
}

function NoteItem({ post, sp }: { post: Post; sp: SP }) {
  return (
    <article id={post.slug} className="mb-4 break-inside-avoid rounded-2xl border bg-card p-5 scroll-mt-24">
      <div className="font-display text-xl leading-snug text-foreground [&_p]:!text-[19px] [&_p]:!leading-snug [&_p]:font-display">
        <RichText text={post.body} className="!space-y-3" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link href={postHref(post)} className="hover:text-foreground underline-offset-4 hover:underline">
          {formatDate(post.date)}
        </Link>
        <Tags post={post} sp={sp} />
        {post.draft && <Draft />}
      </div>
    </article>
  )
}

function Section({ kind, posts, sp, limit }: { kind: Kind; posts: Post[]; sp: SP; limit?: number }) {
  const meta = KINDS.find((k) => k.kind === kind)!
  const shown = limit ? posts.slice(0, limit) : posts
  if (posts.length === 0) return null
  return (
    <section aria-labelledby={kind} className="scroll-mt-24" id={kind}>
      <div className="flex items-baseline justify-between gap-4 mb-2 border-b pb-3">
        <h2 id={kind} className="font-display text-3xl">
          {meta.label}
        </h2>
        {limit && posts.length > limit && (
          <Link href={href(sp, { type: kind })} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
            All {posts.length} →
          </Link>
        )}
      </div>
      {kind === 'notes' ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 pt-4">
          {shown.map((p) => (
            <NoteItem key={p.slug} post={p} sp={sp} />
          ))}
        </div>
      ) : (
        <ul className={`divide-y ${kind === 'essays' ? 'md:grid md:grid-cols-2 md:gap-x-10 md:divide-y-0 md:[&>li]:border-b' : ''}`}>
          {shown.map((p) => (kind === 'essays' ? <EssayItem key={p.slug} post={p} sp={sp} /> : <QuestionItem key={p.slug} post={p} sp={sp} />))}
        </ul>
      )}
      {limit && posts.length > limit && (
        <Link href={href(sp, { type: kind })} className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
          See all {posts.length} {meta.label.toLowerCase()} →
        </Link>
      )}
    </section>
  )
}

export default async function WritingPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const drafts = showDrafts(sp.drafts)
  const type = KINDS.some((k) => k.kind === sp.type) ? (sp.type as Kind) : undefined
  const tag = sp.tag ? tagFromSlug(sp.tag) : null

  const all: Record<Kind, Post[]> = {
    essays: listPosts('essays', drafts),
    notes: listPosts('notes', drafts),
    questions: listPosts('questions', drafts),
  }
  const byTag = (ps: Post[]) => (tag ? ps.filter((p) => p.tags.includes(tag)) : ps)
  const filtered: Record<Kind, Post[]> = { essays: byTag(all.essays), notes: byTag(all.notes), questions: byTag(all.questions) }

  const pool = type ? all[type] : [...all.essays, ...all.notes, ...all.questions]
  const counts = Object.fromEntries(TOPICS.map((t) => [t, pool.filter((p) => p.tags.includes(t)).length]))
  const total = (type ? [type] : (['essays', 'questions', 'notes'] as Kind[])).reduce((n, k) => n + filtered[k].length, 0)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 md:py-20">
      <header className="max-w-2xl mb-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Writing</div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight mb-5">Notes, essays, questions</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The essays are the longer stuff. The notes are whatever I wrote down that day, usually about meditation, the mind, or something I noticed
          about people. The questions are things people have asked me.
        </p>
      </header>

      {/* FILTERS */}
      <nav aria-label="Filter writing" className="mb-12 space-y-4 border-y py-5">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="w-14 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Kind</span>
          {[{ kind: undefined as Kind | undefined, label: 'Everything' }, ...KINDS].map((k) => {
            const on = type === k.kind
            return (
              <Link
                key={k.label}
                href={href(sp, { type: k.kind })}
                aria-current={on ? 'page' : undefined}
                className={`rounded-full border px-3.5 py-1.5 transition-colors ${on ? 'bg-foreground text-background border-foreground' : 'hover:bg-secondary'}`}
              >
                {k.label}
                {k.kind && <span className={`ml-1.5 text-xs ${on ? 'opacity-70' : 'text-muted-foreground'}`}>{all[k.kind].length}</span>}
              </Link>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="w-14 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Topic</span>
          <Link
            href={href(sp, { tag: undefined })}
            aria-current={!tag ? 'page' : undefined}
            className={`rounded-full border px-3.5 py-1.5 transition-colors ${!tag ? 'bg-foreground text-background border-foreground' : 'hover:bg-secondary'}`}
          >
            All
          </Link>
          {TOPICS.filter((t) => counts[t] > 0).map((t) => {
            const on = tag === t
            return (
              <Link
                key={t}
                href={href(sp, { tag: on ? undefined : tagSlug(t) })}
                aria-current={on ? 'page' : undefined}
                className={`rounded-full border px-3.5 py-1.5 transition-colors ${on ? 'bg-foreground text-background border-foreground' : 'hover:bg-secondary'}`}
              >
                {t}
                <span className={`ml-1.5 text-xs ${on ? 'opacity-70' : 'text-muted-foreground'}`}>{counts[t]}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {total === 0 ? (
        <p className="text-muted-foreground">
          Nothing here yet.{' '}
          <Link href="/writing" className="underline underline-offset-4">
            See everything
          </Link>
        </p>
      ) : type ? (
        <Section kind={type} posts={filtered[type]} sp={sp} />
      ) : (
        <div className="space-y-20">
          <Section kind="essays" posts={filtered.essays} sp={sp} limit={tag ? 10 : 8} />
          <Section kind="notes" posts={filtered.notes} sp={sp} limit={tag ? 12 : 9} />
          <Section kind="questions" posts={filtered.questions} sp={sp} limit={tag ? 10 : 8} />
        </div>
      )}
    </div>
  )
}
