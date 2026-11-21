'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/** A superscript note marker that opens the note in place (hover on desktop, tap anywhere). */
export function Fn({ n, children }: { n: number; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Note ${n}`}
        onClick={() => setOpen((o) => !o)}
        className="align-super text-[0.68em] font-semibold text-[var(--accent-violet)] px-0.5 hover:underline"
      >
        {n}
      </button>
      {open && (
        <span
          role="note"
          className="absolute left-1/2 top-full z-30 mt-2 w-[min(18rem,80vw)] -translate-x-1/2 rounded-xl border bg-card p-3 text-[14px] leading-snug text-foreground shadow-lg"
        >
          {children}
        </span>
      )}
    </span>
  )
}
