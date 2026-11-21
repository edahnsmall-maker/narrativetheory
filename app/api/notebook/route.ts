import { currentUser } from '@/lib/auth'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'

/** The signed-in person's notebook: everything the guide saved in their sessions. */
export async function GET() {
  const user = await currentUser()
  if (!user) return Response.json({ error: 'signin' }, { status: 401 })
  const items = await store.listNotebook(user.id)
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return Response.json({ items })
}

/** DELETE /api/notebook?id=… — removes one of the current user's own items. */
export async function DELETE(req: Request) {
  const user = await currentUser()
  if (!user) return Response.json({ error: 'signin' }, { status: 401 })
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return Response.json({ error: 'missing id' }, { status: 400 })
  const owned = (await store.listNotebook(user.id)).some((i) => i.id === id)
  if (!owned) return Response.json({ error: 'not found' }, { status: 404 })
  await store.deleteNotebook(user.id, id)
  return Response.json({ ok: true })
}
