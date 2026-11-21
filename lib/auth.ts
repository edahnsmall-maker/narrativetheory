import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { devAuth, env } from '@/lib/config'
import { store } from '@/lib/store'
import type { UserRecord } from '@/lib/types'

/**
 * Who is signed in. Production: Supabase email-link auth (session in cookies).
 * Local development: a "dev sign-in" cookie holding just an email address.
 * Server-only.
 */

export const DEV_COOKIE = 'nt_dev_user'

export async function supabaseServer() {
  const jar = await cookies()
  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => jar.set(name, value, options))
        } catch {
          // Called from a Server Component, where cookies are read-only; the
          // middleware-free setup refreshes sessions in route handlers instead.
        }
      },
    },
  })
}

export function devUserId(email: string) {
  let h = 0
  for (const c of email.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) | 0
  return `dev-${Math.abs(h).toString(36)}`
}

/** The signed-in user's record, or null. Creates the profile row on first sight. */
export async function currentUser(): Promise<UserRecord | null> {
  if (devAuth) {
    const jar = await cookies()
    const email = jar.get(DEV_COOKIE)?.value
    if (!email) return null
    const decoded = decodeURIComponent(email)
    return store.ensureUser(devUserId(decoded), decoded)
  }
  const supabase = await supabaseServer()
  const { data } = await supabase.auth.getUser()
  if (!data.user?.email) return null
  return store.ensureUser(data.user.id, data.user.email)
}

export function isMember(u: UserRecord | null): boolean {
  if (!u) return false
  if (u.plan !== 'member') return false
  if (u.currentPeriodEnd && new Date(u.currentPeriodEnd).getTime() < Date.now() - 3 * 864e5) return false
  return true
}

/**
 * The site owner(s), from NT_ADMIN_EMAILS. In local development with no list
 * set, any dev sign-in counts, so the owner pages can be tried out.
 */
export function isAdmin(u: UserRecord | null): boolean {
  if (!u) return false
  const admins = (process.env.NT_ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  if (admins.length === 0) return devAuth
  return admins.includes(u.email.toLowerCase())
}
