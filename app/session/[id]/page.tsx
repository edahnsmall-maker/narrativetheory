import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { SessionView } from '@/components/session/session-view'

export const metadata = { title: 'Guided session — Narrative Theory' }

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ module?: string; start?: string }>
}

/** /session/<id> resumes a session; /session/new?module=<shelf/module>&start=own|example starts one. */
export default async function SessionPage({ params, searchParams }: Props) {
  const { id } = await params
  const sp = await searchParams
  const here = id === 'new' ? `/session/new?module=${encodeURIComponent(sp.module ?? '')}&start=${sp.start ?? 'own'}` : `/session/${id}`
  if (!(await currentUser())) redirect(`/signin?next=${encodeURIComponent(here)}`)

  if (id === 'new') {
    if (!sp.module) redirect('/life')
    return <SessionView start={{ kind: 'module', moduleId: sp.module, start: sp.start === 'example' ? 'example' : 'own' }} />
  }
  return <SessionView id={id} />
}
