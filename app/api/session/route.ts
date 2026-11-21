import { NextRequest } from 'next/server'
import { currentUser } from '@/lib/auth'
import { canStart } from '@/lib/entitlements'
import { newId, store } from '@/lib/store'
import { moduleSystem, openingLine, situationSystem } from '@/lib/guide/prompts'
import { ndjson } from '@/lib/guide/stream'
import { guideTurn } from '@/lib/guide/session'
import type { SessionRecord } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 120

interface Body {
  kind?: 'module' | 'situation'
  moduleId?: string
  start?: 'own' | 'example'
  text?: string
}

/** Starts a session and streams the guide's opening turn. */
export async function POST(req: NextRequest) {
  const user = await currentUser()
  if (!user) return Response.json({ error: 'Sign in to start a session.', reason: 'signin' }, { status: 401 })

  const body = (await req.json().catch(() => ({}))) as Body
  const kind = body.kind === 'situation' ? 'situation' : 'module'
  const start = body.start === 'example' ? 'example' : 'own'

  const access = await canStart(user, kind)
  if (!access.ok) return Response.json({ error: 'Not available on your plan.', reason: access.reason }, { status: 402 })

  const notes = await store.listNotebook(user.id)
  let built: { system: string; title: string } | null
  let moduleId: string
  let text = ''
  if (kind === 'situation') {
    text = (body.text ?? '').trim().slice(0, 6000)
    if (text.length < 10) return Response.json({ error: 'Tell the guide a little more about what happened.' }, { status: 400 })
    built = situationSystem(notes)
    moduleId = 'situation'
  } else {
    moduleId = String(body.moduleId ?? '')
    built = moduleSystem(moduleId, notes)
    if (!built) return Response.json({ error: 'Unknown module.' }, { status: 404 })
  }

  const now = new Date().toISOString()
  const session: SessionRecord = {
    id: newId(),
    userId: user.id,
    kind,
    moduleId,
    title: kind === 'situation' ? text.split(/[.!?\n]/)[0].slice(0, 70) || built.title : built.title,
    status: 'active',
    phase: 'arrive',
    system: built.system,
    apiMessages: [],
    log: kind === 'situation' ? [{ id: newId(), type: 'user', text }] : [],
    userReplies: 0,
    createdAt: now,
    updatedAt: now,
  }
  await store.createSession(session)

  return ndjson(async (emit) => {
    emit({ t: 'session', id: session.id })
    await guideTurn(user, session, openingLine(kind, start, text), emit)
  })
}

/** Lists the signed-in person's sessions (no transcripts). */
export async function GET() {
  const user = await currentUser()
  if (!user) return Response.json({ sessions: [] })
  const sessions = await store.listSessions(user.id)
  return Response.json({
    sessions: sessions.map((s) => ({ id: s.id, kind: s.kind, moduleId: s.moduleId, title: s.title, status: s.status, phase: s.phase, updatedAt: s.updatedAt })),
  })
}
