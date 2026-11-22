import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { RichText } from '@/components/rich-text'
import { PostFooter } from '@/components/writing/PostFooter'
import { formatDate, getPost, showDrafts } from '@/lib/writing'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ drafts?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPost('questions', slug)
  return { title: post ? `${post.title} — Narrative Theory` : 'Questions — Narrative Theory', description: post?.summary }
}

export default async function QuestionPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams
  const drafts = showDrafts(sp.drafts)
  const post = getPost('questions', slug)
  if (!post || (post.draft && !drafts)) notFound()

  return (
    <article className="mx-auto max-w-[42rem] px-4 sm:px-6 py-14 md:py-20">
      <Link href="/writing?type=questions" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={12} /> Questions
      </Link>
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Someone asked</div>
      <h1 className="font-display text-3xl md:text-5xl leading-[1.08] tracking-tight mb-10">
        {post.title}
        {post.draft && <span className="chip ml-3 align-middle text-[10px] uppercase tracking-wider">Draft</span>}
      </h1>
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Edahn</div>
      <div className="[&_p]:!text-[18px] md:[&_p]:!text-[19px] [&_p]:!leading-[1.75]">
        <RichText text={post.body} />
      </div>
      <div className="mt-8 text-sm text-muted-foreground">{formatDate(post.date)}</div>
      <PostFooter post={post} drafts={drafts} />
    </article>
  )
}
