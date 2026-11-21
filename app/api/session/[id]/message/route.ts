import { NextRequest } from 'next/server'
import { currentUser } from '@/lib/auth'
import { canReply } from '@/lib/entitlements'
import { newId, store } from '@/lib/store'
import { ndjson } from '@/lib/guide/stream'
import { guideTurn, maybeCloseTaste } from '@/lib/guide/session'

export const runtime = 'nodejs'
export const maxDuration = 120

interface Body {
  text?: string
  /** When the reply answers a quick-check card. */
  check?: { itemId: string; index: number }
}

/** Sends the person's reply and streams the guide's response. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await currentUser()
  if (!user) return Response.json({ error: 'Sign in to continue.' }, { status: 401 })
  const session = await store.getSession(id)
  if (!session || session.userId !== user.id) return Response.json({ error: 'Session not found.' }, { status: 404 })

  const body = (await req.json().catch(() => ({}))) as Body
  let text = (body.text ?? '').trim().slice(0, 4000)

  // Record a quick-check answer on its card so it stays answered on reload.
  if (body.check) {
    const item = session.log.find((l) => l.id === body.check!.itemId)
    if (item?.type === 'card' && item.card.kind === 'check' && item.card.chosen === undefined) {
      const idx = Number(body.check.index)
      if (Number.isInteger(idx) && idx >= 0 && idx < item.card.options.length) {
        item.card.chosen = idx
        text = `(Quick check: I chose "${item.card.options[idx]}".)`
      }
    }
  }
  if (!text) return Response.json({ error: 'Nothing to send.' }, { status: 400 })

  const access = await canReply(user, session)

  return ndjson(async (emit) => {
    if (!access.ok) {
      const item =
        access.reason === 'daily'
          ? { id: newId(), type: 'limit' as const, text: "You've reached today's fair-use limit for guided replies. Your session is saved; pick it up tomorrow." }
          : { id: newId(), type: 'paywall' as const, reason: 'taste' as const }
      emit({ t: 'item', item })
      return
    }

    const userItem = { id: newId(), type: 'user' as const, text: body.check ? text.replace(/^\(Quick check: I chose "(.*)"\.\)$/, '$1') : text }
    session.log.push(userItem)
    emit({ t: 'item', item: userItem })
    session.userReplies += 1
    if (session.status === 'locked') session.status = 'active'
    await store.recordReply(user.id, session.id)

    await guideTurn(user, session, text, emit)
    if (maybeCloseTaste(user, session, emit)) await store.saveSession(session)
  })
}
