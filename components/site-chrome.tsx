'use client'

import { usePathname } from 'next/navigation'

/**
 * The personal deck is a full-viewport scroll-snap surface with its own
 * wordmark and rail, so the Narrative Theory nav and footer would only be in
 * its way. Everything else on the site keeps them.
 */
const BARE_ROUTES = ['/edahn']

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (BARE_ROUTES.some((route) => pathname.startsWith(route))) return null
  return <>{children}</>
}
