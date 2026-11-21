import { isMember } from '@/lib/auth'
import { canReply, isFreeModule } from '@/lib/entitlements'
import { practiceAI, rules } from '@/lib/config'
import { newId, store } from '@/lib/store'
import type { Card, NotebookKind, SessionRecord, StreamEvent, UserRecord } from '@/lib/types'
import { friendlyError, runTurn } from './run'

/** Shared turn handling for starting a session and replying in one. */

export async function saveNotebook(user: UserRecord, session: SessionRecord, cards: Card[]) {
  for (const card of cards) {
    const kind: NotebookKind | null =
      card.kind === 'insight' ? 'insight' : card.kind === 'mode' ? 'mode' : card.kind === 'practice' ? 'practice' : card.kind === 'summary' ? 'summary' : null
    if (!kind) continue
    await store.addNotebook({ id: newId(), userId: user.id, kind, sessionId: session.id, moduleId: session.moduleId, card, createdAt: new Date().toISOString() })
  }
}

export async function guideTurn(user: UserRecord, session: SessionRecord, content: string, emit: (e: StreamEvent) => void) {
  try {
    const { notebook } = await runTurn(session, content, emit)
    await saveNotebook(user, session, notebook)
  } catch (err) {
    console.error('[session] turn failed:', err)
    const item = { id: newId(), type: 'error' as const, text: friendlyError(err) }
    session.log.push(item)
    emit({ t: 'item', item })
  } finally {
    session.updatedAt = new Date().toISOString()
    await store.saveSession(session)
  }
}

/** After a free member's reply on a locked module, close the taste when it runs out. */
/** Returns true when it closed the taste (the session needs saving). */
export function maybeCloseTaste(user: UserRecord, session: SessionRecord, emit: (e: StreamEvent) => void): boolean {
  if (session.kind !== 'module' || isMember(user) || isFreeModule(session.moduleId)) return false
  if (session.userReplies < rules.tasteReplies) return false
  if (session.log.some((l) => l.type === 'paywall')) return false
  const item = { id: newId(), type: 'paywall' as const, reason: 'taste' as const }
  session.log.push(item)
  session.status = 'locked'
  emit({ t: 'item', item })
  emit({ t: 'status', status: 'locked' })
  return true
}

/** The access summary the session screen needs. */
export async function accessFor(user: UserRecord, session: SessionRecord) {
  const access = await canReply(user, session)
  return {
    member: isMember(user),
    practice: practiceAI,
    canReply: access.ok,
    blockedReason: access.ok ? null : access.reason,
    tasteRemaining: access.ok && access.taste ? access.taste.remaining : null,
  }
}

/** What the browser is allowed to see of a session. */
export function publicSession(s: SessionRecord) {
  return { id: s.id, kind: s.kind, moduleId: s.moduleId, title: s.title, status: s.status, phase: s.phase, log: s.log, createdAt: s.createdAt }
}
