'use client'

import Link from 'next/link'
import { Check, Lock, CircleDot } from 'lucide-react'
import { artStyle, ArtLines } from './shelf-art'
import type { ModuleCardData } from './library-data'
import type { MeState } from './use-me'

type Badge = { label: string; icon?: 'lock' | 'check' | 'dot'; tone: 'free' | 'member' | 'done' | 'active' } | null

/**
 * Before /api/me answers we render the signed-out view (Free / Member), which
 * is also what most first-time visitors see, so the badge rarely changes.
 */
export function badgeFor(card: ModuleCardData, me: MeState): Badge {
  const progress = me.data?.progress[card.id]
  if (progress?.status === 'complete') return { label: 'Done', icon: 'check', tone: 'done' }
  if (progress?.status === 'active') return { label: 'In progress', icon: 'dot', tone: 'active' }
  if (card.free) return { label: 'Free', tone: 'free' }
  if (me.data?.user?.member) return null
  return { label: 'Member', icon: 'lock', tone: 'member' }
}

const toneClass: Record<NonNullable<Badge>['tone'], string> = {
  free: 'bg-card/90 text-foreground',
  member: 'bg-card/80 text-foreground/80',
  done: 'bg-foreground text-background',
  active: 'bg-card/95 text-foreground',
}

export function BadgePill({ badge }: { badge: Badge }) {
  if (!badge) return null
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.04)] ${toneClass[badge.tone]}`}
    >
      {badge.icon === 'lock' && <Lock size={10} aria-hidden />}
      {badge.icon === 'check' && <Check size={11} aria-hidden />}
      {badge.icon === 'dot' && <CircleDot size={10} aria-hidden style={{ color: 'var(--accent-violet)' }} />}
      {badge.label}
    </span>
  )
}

export function ModuleCard({
  card,
  me,
  showShelf = false,
  className = '',
}: {
  card: ModuleCardData
  me: MeState
  showShelf?: boolean
  className?: string
}) {
  const badge = badgeFor(card, me)
  return (
    <Link
      href={card.href}
      style={{ borderRadius: 16 }}
      className={`group flex flex-col rounded-2xl border bg-card p-2.5 transition-colors hover:border-foreground/30 focus-visible:border-foreground/30 ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl" style={artStyle(card.shelfIdx, card.id)}>
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          <ArtLines seed={card.id} />
        </div>
        <div className="absolute left-2.5 top-2.5 min-h-[22px]">
          <BadgePill badge={badge} />
        </div>
      </div>
      <div className="px-1.5 pb-1.5 pt-3">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">
          {showShelf ? card.shelfName : card.clusterName}
        </div>
        <div className="mt-1 font-display text-[17px] leading-tight text-foreground">{card.name}</div>
        {card.hook && <p className="mt-1.5 text-[13px] leading-snug text-muted-foreground line-clamp-2">{card.hook}</p>}
      </div>
    </Link>
  )
}
