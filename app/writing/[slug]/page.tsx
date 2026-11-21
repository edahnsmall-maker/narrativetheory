import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { RichText } from '@/components/rich-text'
import { formatDate, getPost, showDrafts } from '@/lib/writing'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ drafts?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPost('essays', slug)
  return { title: post ? `${post.title} — Narrative Theory` : 'Writing — Narrative Theory', description: post?.summary }
}

export default async function EssayPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams
  const post = getPost('essays', slug)
  if (!post || (post.draft && !showDrafts(sp.drafts))) notFound()

  return (
    <article className="mx-auto max-w-[42rem] px-4 sm:px-6 py-14 md:py-20">
      <Link href="/writing" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={12} /> Writing
      </Link>
      <div className="text-sm text-muted-foreground mb-3">
        {formatDate(post.date)}
        {post.draft && <span className="chip ml-2 text-[10px] uppercase tracking-wider">Draft</span>}
      </div>
      <h1 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight mb-6">{post.title}</h1>
      {post.summary && <p className="text-xl text-muted-foreground leading-relaxed mb-10">{post.summary}</p>}
      <div className="[&_p]:!text-[18px] md:[&_p]:!text-[19px] [&_p]:!leading-[1.75]">
        <RichText text={post.body} />
      </div>
      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t pt-6">
          {post.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
