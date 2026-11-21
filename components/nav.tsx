'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useMe, refreshMe, type MeState } from '@/components/life/use-me'

const primary = [
  { href: '/theory', label: 'The Theory' },
  { href: '/modes', label: 'Modes' },
  { href: '/life', label: 'Life Instruction™' },
  { href: '/situation', label: 'Bring a Situation' },
  { href: '/writing', label: 'Writing' },
  { href: '/notebook', label: 'Notebook' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const me = useMe()

  // Close the mobile menu on navigation. Leaving a page that can change who is
  // signed in, their plan or their progress refreshes the shared /api/me data.
  const prevPath = useRef(pathname)
  useEffect(() => {
    setOpen(false)
    if (prevPath.current !== pathname && /^\/(signin|account|pricing|auth|session|checkout)/.test(prevPath.current)) {
      refreshMe()
    }
    prevPath.current = pathname
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--paper)_85%,transparent)] border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, #a78bfa, #ec4899, #fb923c, #60a5fa, #a78bfa)' }}
          />
          <span className="font-display text-[15px] tracking-tight">Narrative Theory</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm" aria-label="Main">
          {primary.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              aria-current={isActive(it.href) ? 'page' : undefined}
              className={`transition-colors whitespace-nowrap ${
                isActive(it.href) ? 'text-foreground font-medium' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {it.label}
            </Link>
          ))}
          <Link
            href="/program"
            className="rounded-full border border-foreground/20 px-3.5 py-1.5 text-[13px] whitespace-nowrap hover:bg-foreground hover:text-background transition-colors"
          >
            The Program
          </Link>
          <span className="h-5 w-px bg-border" aria-hidden />
          <Account me={me} />
        </nav>

        <div className="lg:hidden flex items-center gap-2">
          <Account me={me} compact />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="lg:hidden border-t bg-background">
          <nav className="px-4 sm:px-5 py-3 flex flex-col" aria-label="Main">
            {primary.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                aria-current={isActive(it.href) ? 'page' : undefined}
                className={`py-2.5 text-[15px] ${isActive(it.href) ? 'font-medium' : 'text-foreground/80'}`}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
            <Link href="/program" className="py-2.5 text-[15px] text-foreground/80" onClick={() => setOpen(false)}>
              The Program
            </Link>
            <div className="mt-2 pt-3 border-t flex items-center justify-between gap-3 text-sm">
              {me.loading ? (
                <span className="h-5" />
              ) : me.data.user ? (
                <>
                  <Link href="/account" className="truncate text-foreground/80" onClick={() => setOpen(false)}>
                    {me.data.user.email}
                  </Link>
                  {me.data.user.member ? (
                    <span className="chip shrink-0">Member</span>
                  ) : (
                    <Link href="/pricing" className="shrink-0 underline underline-offset-4" onClick={() => setOpen(false)}>
                      Upgrade
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/signin" className="underline underline-offset-4" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

/**
 * Right-side account control. A fixed-size placeholder holds the space while
 * /api/me loads so the bar doesn't jump.
 */
function Account({ me, compact = false }: { me: MeState; compact?: boolean }) {
  if (me.loading) {
    return <span className={`inline-block ${compact ? 'w-8' : 'w-[4.5rem]'} h-8`} aria-hidden />
  }
  const user = me.data.user
  if (!user) {
    return (
      <Link
        href="/signin"
        className="whitespace-nowrap text-sm text-foreground/80 hover:text-foreground rounded-full px-2 py-1"
      >
        Sign in
      </Link>
    )
  }
  const initial = (user.email.trim()[0] ?? '?').toUpperCase()
  return (
    <span className="inline-flex items-center gap-2.5">
      {!compact &&
        (user.member ? (
          <span className="chip">Member</span>
        ) : (
          <Link href="/pricing" className="text-[13px] whitespace-nowrap underline-offset-4 hover:underline" style={{ color: 'var(--accent-violet)' }}>
            Upgrade
          </Link>
        ))}
      <Link
        href="/account"
        aria-label={`Account (${user.email})`}
        title={user.email}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold text-white shadow-sm"
        style={{ background: 'conic-gradient(from 200deg, var(--accent-violet), var(--accent-pink), var(--accent-orange), var(--accent-blue), var(--accent-violet))' }}
      >
        <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">{initial}</span>
      </Link>
    </span>
  )
}
