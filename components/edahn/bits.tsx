'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { Aside as AsideData } from '@/lib/edahn/content'

/**
 * A word wearing a coloured rule. At rest it's a straight line; on hover the
 * line redraws itself as a squiggle. The underline is the whole visual system
 * of this site, so it earns real behaviour rather than a colour swap.
 */
export function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="e-mark">
      {children}
      <svg className="e-mark-line" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
        <path className="e-mark-straight" d="M0.5,5 L99.5,5" />
        {/* pathLength normalises the dash animation across any word width. */}
        <path
          className="e-mark-squiggle"
          pathLength={1}
          d="M0.5,5 C12,0.6 20,9.4 33,5 C46,0.6 54,9.4 67,5 C80,0.6 88,9.4 99.5,5"
        />
      </svg>
    </span>
  )
}

/**
 * Splits a line so the phrases listed in `marks` come back wrapped. Matching is
 * literal and first-occurrence, which is all the copy needs.
 */
export function marked(text: string, marks?: string[]): React.ReactNode {
  if (!marks?.length) return text

  const remaining = [...marks]
  const out: React.ReactNode[] = []
  let rest = text
  let key = 0

  while (remaining.length) {
    const phrase = remaining.shift()!
    const at = rest.indexOf(phrase)
    if (at === -1) continue
    if (at > 0) out.push(rest.slice(0, at))
    out.push(<Mark key={key++}>{phrase}</Mark>)
    rest = rest.slice(at + phrase.length)
  }

  if (rest) out.push(rest)
  return out
}

/**
 * The long material, kept off the slide entirely — it opens as a card that
 * scales up over the top, so the slide underneath stays one breath long and
 * never grows tall enough to fight the deck's snap points.
 *
 * Non-modal on purpose: it's an aside, not a decision. Escape closes it, a
 * click anywhere outside closes it, and focus moves to the card on open so
 * keyboard users land inside rather than behind it.
 */
export function Aside({ aside }: { aside: AsideData }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const cardRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    cardRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      // Beat the deck's own arrow/space handlers to the punch.
      event.stopPropagation()
      setOpen(false)
      triggerRef.current?.focus()
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (cardRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown, true)
    // Deferred so the click that opened the card doesn't immediately close it.
    const id = window.setTimeout(() => window.addEventListener('pointerdown', onPointerDown), 0)

    return () => {
      window.clearTimeout(id)
      window.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div className="e-aside">
      <button
        ref={triggerRef}
        type="button"
        className="e-aside-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{aside.trigger}</span>
        <span aria-hidden>&rsaquo;</span>
      </button>

      <div
        id={panelId}
        ref={cardRef}
        className="e-card"
        data-open={open}
        role="dialog"
        aria-label={aside.title ?? aside.trigger}
        aria-hidden={!open}
        tabIndex={-1}
      >
        <button
          type="button"
          className="e-card-close"
          onClick={() => {
            setOpen(false)
            triggerRef.current?.focus()
          }}
          aria-label="Close"
          tabIndex={open ? 0 : -1}
        >
          &times;
        </button>

        <div className="e-card-body">
          {aside.title && <h3>{aside.title}</h3>}
          {aside.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
