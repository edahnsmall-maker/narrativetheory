import { currentUser, isMember } from '@/lib/auth'
import { store } from '@/lib/store'
import { rules } from '@/lib/config'

/** The signed-in person, their plan, and per-module progress for the library. */
export async function GET() {
  const user = await currentUser()
  if (!user) return Response.json({ user: null })
  const sessions = await store.listSessions(user.id)
  const progress: Record<string, { status: string; sessionId: string }> = {}
  for (const s of sessions) {
    if (s.kind !== 'module') continue
    const prev = progress[s.moduleId]
    // prefer a completed session, then the most recent one
    if (!prev || (s.status === 'complete' && prev.status !== 'complete')) {
      progress[s.moduleId] = { status: s.status, sessionId: s.id }
    }
  }
  return Response.json({
    user: { email: user.email, plan: user.plan, member: isMember(user) },
    progress,
    freeShelves: rules.freeShelves,
  })
}
