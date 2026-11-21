import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/config'
import type { Store } from './index'
import type { NotebookItem, SessionRecord, UserRecord } from '@/lib/types'

/**
 * Production store on Supabase Postgres. Uses the service-role key, so it must
 * only ever run on the server. Tables are created by supabase/schema.sql.
 */

let client: SupabaseClient | null = null
function db() {
  if (!client) client = createClient(env.supabaseUrl, env.supabaseServiceKey, { auth: { persistSession: false } })
  return client
}

type Row = Record<string, unknown>

const toUser = (r: Row): UserRecord => ({
  id: r.id as string,
  email: r.email as string,
  plan: (r.plan as UserRecord['plan']) ?? 'free',
  stripeCustomerId: (r.stripe_customer_id as string) ?? null,
  subscriptionStatus: (r.subscription_status as string) ?? null,
  currentPeriodEnd: (r.current_period_end as string) ?? null,
  createdAt: r.created_at as string,
})

const fromUser = (u: Partial<UserRecord>): Row => {
  const r: Row = {}
  if (u.email !== undefined) r.email = u.email
  if (u.plan !== undefined) r.plan = u.plan
  if (u.stripeCustomerId !== undefined) r.stripe_customer_id = u.stripeCustomerId
  if (u.subscriptionStatus !== undefined) r.subscription_status = u.subscriptionStatus
  if (u.currentPeriodEnd !== undefined) r.current_period_end = u.currentPeriodEnd
  return r
}

const toSession = (r: Row): SessionRecord => ({
  id: r.id as string,
  userId: r.user_id as string,
  kind: r.kind as SessionRecord['kind'],
  moduleId: r.module_id as string,
  title: r.title as string,
  status: r.status as SessionRecord['status'],
  phase: r.phase as SessionRecord['phase'],
  system: r.system as string,
  apiMessages: (r.api_messages as SessionRecord['apiMessages']) ?? [],
  log: (r.log as SessionRecord['log']) ?? [],
  userReplies: (r.user_replies as number) ?? 0,
  createdAt: r.created_at as string,
  updatedAt: r.updated_at as string,
})

const fromSession = (s: SessionRecord): Row => ({
  id: s.id,
  user_id: s.userId,
  kind: s.kind,
  module_id: s.moduleId,
  title: s.title,
  status: s.status,
  phase: s.phase,
  system: s.system,
  api_messages: s.apiMessages,
  log: s.log,
  user_replies: s.userReplies,
  created_at: s.createdAt,
  updated_at: s.updatedAt,
})

const toNote = (r: Row): NotebookItem => ({
  id: r.id as string,
  userId: r.user_id as string,
  kind: r.kind as NotebookItem['kind'],
  sessionId: r.session_id as string,
  moduleId: r.module_id as string,
  card: r.card as NotebookItem['card'],
  createdAt: r.created_at as string,
})

function check<T>(res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new Error(`[store] ${res.error.message}`)
  return res.data
}

export const supabaseStore: Store = {
  async getUser(id) {
    const data = check(await db().from('profiles').select('*').eq('id', id).maybeSingle())
    return data ? toUser(data) : null
  },
  async ensureUser(id, email) {
    const existing = await this.getUser(id)
    if (existing) return existing
    const data = check(await db().from('profiles').insert({ id, email, plan: 'free' }).select('*').single())
    return toUser(data)
  },
  async updateUser(id, patch) {
    const data = check(await db().from('profiles').update(fromUser(patch)).eq('id', id).select('*').maybeSingle())
    return data ? toUser(data) : null
  },
  async findUserByCustomer(customerId) {
    const data = check(await db().from('profiles').select('*').eq('stripe_customer_id', customerId).maybeSingle())
    return data ? toUser(data) : null
  },

  async createSession(s) {
    check(await db().from('sessions').insert(fromSession(s)))
  },
  async getSession(id) {
    const data = check(await db().from('sessions').select('*').eq('id', id).maybeSingle())
    return data ? toSession(data) : null
  },
  async saveSession(s) {
    check(await db().from('sessions').upsert(fromSession(s)))
  },
  async listSessions(userId) {
    const data = check(
      await db()
        .from('sessions')
        .select('id,user_id,kind,module_id,title,status,phase,user_replies,created_at,updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false }),
    )
    // The list view doesn't need transcripts.
    return (data ?? []).map((r: Row) => toSession({ ...r, system: '', api_messages: [], log: [] }))
  },

  async addNotebook(item) {
    check(
      await db().from('notebook').insert({
        id: item.id,
        user_id: item.userId,
        kind: item.kind,
        session_id: item.sessionId,
        module_id: item.moduleId,
        card: item.card,
        created_at: item.createdAt,
      }),
    )
  },
  async listNotebook(userId) {
    const data = check(
      await db().from('notebook').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    )
    return (data ?? []).map(toNote)
  },
  async deleteNotebook(userId, id) {
    check(await db().from('notebook').delete().eq('user_id', userId).eq('id', id))
  },

  async countRepliesSince(userId, since) {
    const res = await db()
      .from('replies')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', since)
    if (res.error) throw new Error(`[store] ${res.error.message}`)
    return res.count ?? 0
  },
  async recordReply(userId, sessionId) {
    check(await db().from('replies').insert({ user_id: userId, session_id: sessionId }))
  },
}
