import { currentUser, isMember } from '@/lib/auth'
import { rules } from '@/lib/config'
import { store } from '@/lib/store'
import { SituationStart } from './situation-start'

export const metadata = { title: 'Bring a Situation — Narrative Theory' }

export default async function SituationPage() {
  const user = await currentUser()
  let remaining: number | null = null
  if (user && !isMember(user)) {
    const d = new Date()
    const monthStart = new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
    const used = (await store.listSessions(user.id)).filter((s) => s.kind === 'situation' && s.createdAt >= monthStart).length
    remaining = Math.max(0, rules.freeSituationsPerMonth - used)
  }
  return <SituationStart signedIn={!!user} remaining={remaining} />
}
