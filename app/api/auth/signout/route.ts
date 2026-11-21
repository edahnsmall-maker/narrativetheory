import { NextResponse } from 'next/server'
import { devAuth } from '@/lib/config'
import { DEV_COOKIE, supabaseServer } from '@/lib/auth'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  if (devAuth) {
    res.cookies.delete(DEV_COOKIE)
  } else {
    const supabase = await supabaseServer()
    await supabase.auth.signOut()
  }
  return res
}
