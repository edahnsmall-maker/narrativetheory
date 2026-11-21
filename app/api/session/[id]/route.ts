import { currentUser } from '@/lib/auth'
import { store } from '@/lib/store'
import { accessFor, publicSession } from '@/lib/guide/session'

/** Loads a session for its owner. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await currentUser()
  if (!user) return Response.json({ error: 'Sign in to see this session.' }, { status: 401 })
  const session = await store.getSession(id)
  if (!session || session.userId !== user.id) return Response.json({ error: 'Session not found.' }, { status: 404 })
  return Response.json({ session: publicSession(session), access: await accessFor(user, session) })
}
