import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/auth'

/** Where the emailed sign-in link lands. Exchanges the code for a session cookie. */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/account'
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/account'

  if (code) {
    const supabase = await supabaseServer()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(safeNext, url.origin))
  }
  return NextResponse.redirect(new URL('/signin?error=link', url.origin))
}
