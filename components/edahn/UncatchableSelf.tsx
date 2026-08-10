'use client'

import { useCallback, useRef, useState } from 'react'

/**
 * The site's one real argument, made operable.
 *
 * "As soon as you try to grab it, it slips away and becomes something else."
 * So: a word that evades the cursor and changes pronoun every time you reach
 * for it. It cannot be caught — there is no success state, because the point
 * is that there isn't one. After enough attempts it stops running and says so.
 *
 * Accessibility matters more than the gag here: the word is a real button, it
 * can be reached by keyboard, and there is always a plain way to skip to the
 * text. Under prefers-reduced-motion the chase is replaced by the same idea
 * stated directly.
 */

const PRONOUNS = ['I', 'me', 'my', 'mine', 'myself', 'this', 'I']
const ATTEMPTS_UNTIL_REST = 6

interface Props {
  /** Rendered once the chase resolves. */
  children: React.ReactNode
}

export default function UncatchableSelf({ children }: Props) {
  const [attempts, setAttempts] = useState(0)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const wordRef = useRef<HTMLButtonElement>(null)
  const lockedUntil = useRef(0)

  const resolved = attempts >= ATTEMPTS_UNTIL_REST
  const word = PRONOUNS[Math.min(attempts, PRONOUNS.length - 1)]

  const flee = useCallback(() => {
    if (resolved) return

    // One jump per animation, or a single sweep of the cursor burns the whole
    // sequence in a few frames.
    const now = Date.now()
    if (now < lockedUntil.current) return
    lockedUntil.current = now + 260

    setAttempts((n) => n + 1)
    setPosition((current) => {
      // Jump somewhere inside the field that isn't where we already are, so a
      // fast cursor can't accidentally sit still on top of it.
      for (let tries = 0; tries < 12; tries++) {
        const x = 18 + Math.random() * 64
        const y = 22 + Math.random() * 56
        if (Math.hypot(x - current.x, y - current.y) > 26) return { x, y }
      }
      return { x: 100 - current.x, y: 100 - current.y }
    })
  }, [resolved])

  const reveal = useCallback(() => setAttempts(ATTEMPTS_UNTIL_REST), [])

  return (
    <div>
      {!resolved && (
        <div
          className="e-catch"
          // Proximity rather than pointerenter: once the word slides out from
          // under a stationary cursor the browser keeps it as the pointer
          // target, so no further enter events arrive and the chase dies after
          // a single jump.
          onPointerMove={(event) => {
            const box = wordRef.current?.getBoundingClientRect()
            if (!box) return
            const dx = event.clientX - (box.left + box.width / 2)
            const dy = event.clientY - (box.top + box.height / 2)
            if (Math.hypot(dx, dy) < Math.max(90, box.width * 0.75)) flee()
          }}
        >
          <button
            ref={wordRef}
            type="button"
            className="e-catch-word"
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onPointerDown={(event) => {
              // Touch never fires a hover before the tap, so the word would be
              // trivially catchable on a phone without this.
              event.preventDefault()
              flee()
            }}
            onFocus={flee}
            aria-label={`The word ${word}. It moves away when you reach for it.`}
          >
            {word}
          </button>

          <p className="e-catch-hint" aria-hidden>
            {attempts === 0
              ? 'Try to catch it'
              : attempts < 3
                ? 'Again'
                : 'You see where this is going'}
          </p>
        </div>
      )}

      {resolved ? (
        <div>
          <p className="e-catch-resolved">
            You can&rsquo;t catch it. Not because you&rsquo;re slow &mdash; because there&rsquo;s
            nothing there to catch.
          </p>
          {children}
        </div>
      ) : (
        <button
          type="button"
          className="e-aside-trigger"
          style={{ marginTop: '2.75rem' }}
          onClick={reveal}
        >
          <span>Skip the chase</span>
          <span aria-hidden>&rsaquo;</span>
        </button>
      )}
    </div>
  )
}
