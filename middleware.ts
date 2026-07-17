import { clerkMiddleware } from '@clerk/nextjs/server'

// No routes are gated right now — the whole site is guest-accessible.
// Sign in / Get started remain available in the nav for whenever saved
// progress, badges, or submitted modules need an actual account.
export default clerkMiddleware()

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}
