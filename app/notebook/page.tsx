import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { store } from '@/lib/store'
import { getModule, shelves } from '@/lib/data/lifeInstruction'
import { NotebookView, type NotebookEntry } from './notebook-view'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Notebook — Narrative Theory',
  description: 'Your modes, insights, practices and session summaries, saved by the guide as you work.',
}

function sourceFor(moduleId: string): NotebookEntry['source'] {
  if (moduleId === 'situation') return { label: 'Bring a Situation', href: '/situation', shelfIdx: 3 }
  const [shelfSlug, moduleSlug] = moduleId.split('/')
  const found = shelfSlug && moduleSlug ? getModule(shelfSlug, moduleSlug) : null
  if (!found) return null
  return {
    label: found.module.name,
    href: `/life/${found.shelf.slug}/${found.module.slug}`,
    shelfIdx: shelves.findIndex((s) => s.slug === found.shelf.slug),
  }
}

export default async function NotebookPage() {
  const user = await currentUser()
  if (!user) redirect('/signin?next=/notebook')

  const items = await store.listNotebook(user.id)
  const entries: NotebookEntry[] = items
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((i) => ({
      id: i.id,
      kind: i.kind,
      sessionId: i.sessionId,
      card: i.card,
      createdAt: i.createdAt,
      source: sourceFor(i.moduleId),
    }))

  return <NotebookView initial={entries} />
}
