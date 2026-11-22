import { currentUser, isAdmin } from '@/lib/auth'
import { newId, store } from '@/lib/store'

export const dynamic = 'force-dynamic'

const PREFER = ['Text', 'Email', 'Phone call', 'Doesn’t matter']
// A simple per-address limit so the form can't be used to flood the inbox.
const recent = new Map<string, number[]>()

/** GET → every message, for the owner's inbox (/studio/messages). */
export async function GET() {
  const user = await currentUser()
  if (!isAdmin(user)) return Response.json({ error: 'forbidden' }, { status: 403 })
  return Response.json({ messages: await store.listMessages() })
}

/** POST { name, email, phone?, prefer?, text, website? } — anyone can write in. */
export async function POST(req: Request) {
  let b: Record<string, string | undefined>
  try {
    b = await req.json()
  } catch {
    return Response.json({ error: 'bad request' }, { status: 400 })
  }
  // "website" is a hidden field people never see; bots fill it in.
  if (b.website) return Response.json({ ok: true })

  const name = (b.name ?? '').trim().slice(0, 120)
  const email = (b.email ?? '').trim().slice(0, 200)
  const phone = (b.phone ?? '').trim().slice(0, 40)
  const prefer = PREFER.includes(b.prefer ?? '') ? (b.prefer as string) : ''
  const text = (b.text ?? '').trim()
  if (!name) return Response.json({ error: 'Please add your name.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: 'That email doesn’t look right.' }, { status: 400 })
  if (text.length < 5) return Response.json({ error: 'Please add a message.' }, { status: 400 })
  if (text.length > 4000) return Response.json({ error: 'Keep it under 4,000 characters.' }, { status: 400 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 36e5)
  if (hits.length >= 5) return Response.json({ error: 'Got it already. I’ll be in touch.' }, { status: 429 })
  recent.set(ip, [...hits, now])

  await store.addMessage({ id: newId(), name, email, phone, prefer, text, createdAt: new Date().toISOString() })
  return Response.json({ ok: true })
}
