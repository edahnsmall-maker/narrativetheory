'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * A horizontal, snap-scrolling row. Swipe on touch, arrow buttons on desktop,
 * and the track itself is focusable so arrow keys scroll it.
 */
export function ScrollRow({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const page = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <div className="relative group/row">
      <div
        ref={ref}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain px-4 sm:px-5 lg:px-8 scroll-px-4 sm:scroll-px-5 lg:scroll-px-8 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-offset-[-2px]"
      >
        {children}
        {/* trailing spacer so the last card can snap clear of the edge */}
        <div className="shrink-0 w-px" aria-hidden />
      </div>
      <ArrowButton side="left" show={canPrev} onClick={() => page(-1)} label={`Scroll ${label} back`} />
      <ArrowButton side="right" show={canNext} onClick={() => page(1)} label={`Scroll ${label} forward`} />
    </div>
  )
}

function ArrowButton({
  side,
  show,
  onClick,
  label,
}: {
  side: 'left' | 'right'
  show: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      tabIndex={-1}
      disabled={!show}
      className={`hidden md:inline-flex absolute top-[calc(50%-2.5rem)] ${
        side === 'left' ? 'left-2 lg:left-3' : 'right-2 lg:right-3'
      } h-10 w-10 items-center justify-center rounded-full border bg-card/95 shadow-sm backdrop-blur transition-opacity hover:bg-card disabled:pointer-events-none ${
        show ? 'opacity-70 group-hover/row:opacity-100' : 'opacity-0'
      }`}
    >
      {side === 'left' ? <ChevronLeft size={18} aria-hidden /> : <ChevronRight size={18} aria-hidden />}
    </button>
  )
}
