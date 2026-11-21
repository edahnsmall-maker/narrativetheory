import { redirect } from 'next/navigation'
import { devAuth } from '@/lib/config'
import { currentUser } from '@/lib/auth'
import SignInForm from './signin-form'

export const metadata = {
  title: 'Sign in — Narrative Theory',
  description: 'Sign in with your email. No password needed.',
}

function safeNext(v: string | string[] | undefined) {
  const s = Array.isArray(v) ? v[0] : v
  return s && s.startsWith('/') && !s.startsWith('//') && !s.startsWith('/\\') ? s : '/account'
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const next = safeNext(sp.next)
  const user = await currentUser()
  if (user) redirect(next)

  return (
    <div className="mx-auto max-w-md px-5 lg:px-8 py-20">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Sign in</div>
      <h1 className="font-display text-4xl text-foreground mb-4 leading-tight">Welcome.</h1>
      <p className="text-muted-foreground leading-relaxed mb-10">
        Enter your email and we&rsquo;ll send you a link. No password to remember. Your sessions and
        notebook will be here when you come back.
      </p>
      <SignInForm devAuth={devAuth} next={next} linkError={sp.error === 'link'} />
    </div>
  )
}
