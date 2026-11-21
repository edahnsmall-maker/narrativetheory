import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { currentUser, isMember } from '@/lib/auth'
import { UpgradeButton } from '@/app/account/billing-buttons'
import ProgramSession from './program-session'

export const metadata = { title: 'The Program — Narrative Theory' }

/** The Program is the members-only deep track. */
export default async function ProgramSessionPage() {
  const user = await currentUser()
  if (!user) redirect('/signin?next=/program/session')
  if (!isMember(user)) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card">
          <Lock size={17} />
        </div>
        <h1 className="font-display text-3xl mb-3">The Program is for members</h1>
        <p className="text-muted-foreground leading-relaxed mb-7">
          Five long conversations that find the dream your thinking has built, map it, and loosen its grip. It&rsquo;s the deep track
          of Narrative Theory, and it&rsquo;s included with membership.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <UpgradeButton returnTo="/program/session" />
          <Link href="/program" className="text-sm text-muted-foreground underline underline-offset-4">
            About the Program
          </Link>
        </div>
      </div>
    )
  }
  return <ProgramSession />
}
