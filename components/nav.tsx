'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

const primary = [
  { href: '/theory', label: 'The Theory' },
  { href: '/modes', label: 'Modes' },
  { href: '/life', label: 'Life Instruction™' },
  { href: '/about', label: 'About' },
  { href: '/studio', label: 'Studio' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--paper)_85%,transparent)] border-b">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, #a78bfa, #ec4899, #fb923c, #60a5fa, #a78bfa)' }}
          />
          <span className="font-display text-[15px] tracking-tight">Narrative Theory</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {primary.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`transition-colors ${
                pathname.startsWith(it.href) ? 'text-foreground font-medium' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {it.label}
            </Link>
          ))}
          <Link
            href="/situation"
            className="rounded-full border border-foreground/20 px-3.5 py-1.5 text-[13px] hover:bg-foreground hover:text-background transition-colors"
          >
            Bring a Situation
          </Link>
          <SignedOut>
            <Link href="/sign-in" className="text-foreground/70 hover:text-foreground transition-colors">
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
          </SignedIn>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} />
          </SignedIn>
          <button className="text-sm" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="px-5 py-3 flex flex-col gap-3">
            {primary.map((it) => (
              <Link key={it.href} href={it.href} className="text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <Link href="/situation" className="text-sm" onClick={() => setOpen(false)}>
              Bring a Situation
            </Link>
            <SignedOut>
              <Link href="/sign-in" className="text-sm" onClick={() => setOpen(false)}>Sign in</Link>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  )
}
