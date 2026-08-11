'use client'

import { usePathname } from 'next/navigation'

/**
 * The personal site carries its own chrome — the deck has a spine and rail,
 * the inner pages have their own bar — so the Narrative Theory nav and footer
 * are suppressed across it. Everything under /narrative-theory, /theory,
 * /modes, /life, /program and friends keeps them.
 */
const BARE_EXACT = ['/']
const BARE_PREFIXES = ['/projects', '/therapy', '/ideas']

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // The root has to match exactly — startsWith('/') is every page on the site.
  const bare =
    BARE_EXACT.includes(pathname) || BARE_PREFIXES.some((route) => pathname.startsWith(route))

  if (bare) return null
  return <>{children}</>
}
