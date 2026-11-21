import { rules } from '@/lib/config'
import { isMember } from '@/lib/auth'
import { store } from '@/lib/store'
import type { SessionRecord, UserRecord } from '@/lib/types'

/**
 * The paywall, in one place. Enforced on the server for every request; the
 * same answers drive what the UI shows (locks, badges, upgrade prompts).
 */

export type Access =
  | { ok: true; taste?: { remaining: number } }
  | { ok: false; reason: 'signin' | 'taste' | 'situations' | 'program' | 'daily' }

export function isFreeModule(moduleId: string) {
  return rules.freeShelves.includes(moduleId.split('/')[0])
}

/** How a module's session is offered to this person, for the UI. */
export function moduleOffer(user: UserRecord | null, moduleId: string): 'free' | 'member' | 'taste' | 'signin' {
  if (isFreeModule(moduleId)) return user ? 'free' : 'signin'
  if (isMember(user)) return 'member'
  return user ? 'taste' : 'signin'
}

function startOfDay() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}
function startOfMonth() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
}

/** May this user start a new session of this kind? */
export async function canStart(user: UserRecord | null, kind: SessionRecord['kind']): Promise<Access> {
  if (!user) return { ok: false, reason: 'signin' }
  if (kind === 'situation' && !isMember(user)) {
    const used = (await store.listSessions(user.id)).filter(
      (s) => s.kind === 'situation' && s.createdAt >= startOfMonth(),
    ).length
    if (used >= rules.freeSituationsPerMonth) return { ok: false, reason: 'situations' }
  }
  return { ok: true }
}

/** May this user send another reply in this session? */
export async function canReply(user: UserRecord | null, session: SessionRecord): Promise<Access> {
  if (!user || user.id !== session.userId) return { ok: false, reason: 'signin' }
  const member = isMember(user)

  const cap = member ? rules.dailyReplyCap.member : rules.dailyReplyCap.free
  if ((await store.countRepliesSince(user.id, startOfDay())) >= cap) return { ok: false, reason: 'daily' }

  if (session.kind === 'module' && !member && !isFreeModule(session.moduleId)) {
    const remaining = rules.tasteReplies - session.userReplies
    if (remaining <= 0) return { ok: false, reason: 'taste' }
    return { ok: true, taste: { remaining } }
  }
  return { ok: true }
}
