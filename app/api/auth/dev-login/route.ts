import { NextRequest, NextResponse } from 'next/server'
import { devAuth } from '@/lib/config'
import { DEV_COOKIE } from '@/lib/auth'

/** Local development only: "sign in" as any email, no link sent. */
export async function POST(req: NextRequest) {
  if (!devAuth) return NextResponse.json({ error: 'Not available' }, { status: 404 })
  const { email } = (await req.json().catch(() => ({}))) as { email?: string }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(DEV_COOKIE, encodeURIComponent(email.trim().toLowerCase()), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
