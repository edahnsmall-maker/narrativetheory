import Link from 'next/link'
import { Lock, Sparkles, User, BookOpenText, ArrowRight } from 'lucide-react'
import { rules } from '@/lib/config'

/**
 * The "start a guided session" panel on a module page. Server component: the
 * page passes in how this module is offered to the visitor and any session in
 * progress.
 */
export function SessionLauncher({
  moduleId,
  moduleName,
  offer,
  existing,
}: {
  moduleId: string
  moduleName: string
  offer: 'free' | 'member' | 'taste' | 'signin'
  existing?: { id: string; status: string } | null
}) {
  const startHref = (start: 'own' | 'example') => `/session/new?module=${encodeURIComponent(moduleId)}&start=${start}`
  const signinHref = (start: 'own' | 'example') => `/signin?next=${encodeURIComponent(startHref(start))}`
  const href = (start: 'own' | 'example') => (offer === 'signin' ? signinHref(start) : startHref(start))

  return (
    <div className="nt-card nt-shift p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <Sparkles size={13} /> Guided session
        </div>
        {offer === 'free' && <span className="chip">Free</span>}
        {offer === 'member' && <span className="chip">Member</span>}
        {offer === 'taste' && (
          <span className="chip">
            <Lock size={11} /> Members · first {rules.tasteReplies} replies free
          </span>
        )}
      </div>
      <h3 className="font-display text-2xl sm:text-3xl leading-tight mb-2">Work through {moduleName} with the guide</h3>
      <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl mb-6">
        About fifteen minutes. The guide teaches this idea through one real moment from your life, shows you what's happening as you go,
        and leaves you with one small thing to notice. Everything you find is saved to your notebook.
      </p>

      {existing && existing.status !== 'complete' && (
        <Link href={`/session/${existing.id}`} className="mb-4 flex items-center justify-between rounded-xl border bg-card px-4 py-3 hover:border-[var(--accent-violet)] transition-colors">
          <span className="text-[15px]">Continue where you left off</span>
          <ArrowRight size={16} />
        </Link>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <Link href={href('own')} className="group rounded-xl border bg-card p-4 hover:border-[var(--accent-violet)] transition-colors">
          <User size={16} className="mb-2 text-muted-foreground" />
          <div className="font-medium">Use something from my life</div>
          <div className="text-sm text-muted-foreground">Bring one recent moment.</div>
        </Link>
        <Link href={href('example')} className="group rounded-xl border bg-card p-4 hover:border-[var(--accent-violet)] transition-colors">
          <BookOpenText size={16} className="mb-2 text-muted-foreground" />
          <div className="font-medium">Show me an example first</div>
          <div className="text-sm text-muted-foreground">Learn it on someone else's moment.</div>
        </Link>
      </div>

      <p className="mt-5 text-xs text-muted-foreground/80">
        {offer === 'signin' ? 'Free account needed — sign in with just your email. ' : ''}
        Education, not therapy. Don't share identifying details about other people.
      </p>
    </div>
  )
}
