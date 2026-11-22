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

  // kind "mode": a suggestion for the Mode Catalog, where name and email are optional.
  const isMode = b.kind === 'mode'
  const name = (b.name ?? '').trim().slice(0, 120) || (isMode ? 'Someone' : '')
  const email = (b.email ?? '').trim().slice(0, 200)
  const phone = (b.phone ?? '').trim().slice(0, 40)
  const prefer = PREFER.includes(b.prefer ?? '') ? (b.prefer as string) : ''
  const text = (isMode ? '[Mode suggestion]\n' : '') + (b.text ?? '').trim()
  if (!name) return Response.json({ error: 'Please add your name.' }, { status: 400 })
  if ((email || !isMode) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: 'That email doesn’t look right.' }, { status: 400 })
  if (text.length < 5) return Response.json({ error: 'Please add a message.' }, { status: 400 })
  if (text.length > 4000) return Response.json({ error: 'Keep it under 4,000 characters.' }, { status: 400 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 36e5)
  if (hits.length >= 5) return Response.json({ error: 'Got it already. I’ll be in touch.' }, { status: 429 })
  recent.set(ip, [...hits, now])

  // Save it (shows in /studio/messages when a database is set up), and email it to Edahn.
  // Either one succeeding is enough; the person shouldn't see an error because one side isn't configured.
  const saved = await store
    .addMessage({ id: newId(), name, email, phone, prefer, text, createdAt: new Date().toISOString() })
    .then(() => true)
    .catch((e) => (console.error('contact: save failed', e), false))
  const mailed = await sendEmail(req, { name, email, phone, prefer, text, subject: isMode ? `Mode suggestion from ${name}` : `New message from ${name}` })
  if (!saved && !mailed) return Response.json({ error: 'Something went wrong. Try again in a minute.' }, { status: 500 })
  return Response.json({ ok: true })
}

/** Where messages go. Override with CONTACT_EMAIL in the environment. */
const TO = process.env.CONTACT_EMAIL || 'edahn.small@gmail.com'

/**
 * Sends the message by email. With RESEND_API_KEY set it uses Resend (resend.com).
 * Without it, it uses FormSubmit (formsubmit.co), which needs no account: the very first
 * message sends Edahn a one-time "activate this form" email, and every message after that arrives normally.
 */
async function sendEmail(req: Request, m: { name: string; email: string; phone: string; prefer: string; text: string; subject: string }) {
  const lines = [`From: ${m.name}${m.email ? ` <${m.email}>` : ''}`, m.phone && `Phone: ${m.phone}`, m.prefer && `Prefers: ${m.prefer}`, '', m.text]
  const body = lines.filter((l) => typeof l === 'string').join('\n')
  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || 'Narrative Theory <onboarding@resend.dev>',
          to: [TO],
          reply_to: m.email || undefined,
          subject: m.subject,
          text: body,
        }),
      })
      return r.ok
    }
    const origin = req.headers.get('origin') || new URL(req.url).origin
    const r = await fetch(`https://formsubmit.co/ajax/${TO}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: origin, Referer: origin + '/contact' },
      body: JSON.stringify({
        _subject: m.subject,
        _replyto: m.email || undefined,
        _template: 'box',
        _captcha: 'false',
        name: m.name,
        email: m.email || "-",
        phone: m.phone || '-',
        prefers: m.prefer || '-',
        message: m.text,
      }),
    })
    return r.ok
  } catch (e) {
    console.error('contact: email failed', e)
    return false
  }
}
