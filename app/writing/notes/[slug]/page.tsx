import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { RichText } from '@/components/rich-text'
import { formatDate, getPost, showDrafts } from '@/lib/writing'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ drafts?: string }>
}

export const metadata = { title: 'A note — Narrative Theory' }

export default async function NotePage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams
  const note = getPost('notes', slug)
  if (!note || (note.draft && !showDrafts(sp.drafts))) notFound()

  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 py-20 md:py-28">
      <Link href="/writing#notes" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-10">
        <ArrowLeft size={12} /> All notes
      </Link>
      <div className="[&_p]:!font-display [&_p]:!text-3xl md:[&_p]:!text-4xl [&_p]:!leading-[1.2] [&_p]:!text-foreground">
        <RichText text={note.body} />
      </div>
      <div className="mt-10 text-sm text-muted-foreground">
        {formatDate(note.date)} · Edahn Small
        {note.draft && <span className="chip ml-2 text-[10px] uppercase tracking-wider">Draft</span>}
      </div>
    </article>
  )
}
