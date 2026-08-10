'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SLIDES } from '@/lib/edahn/content'
import { NoteBlock, marked } from './bits'
import UncatchableSelf from './UncatchableSelf'
import Cosmos from './Cosmos'

/**
 * The whole site is one scroll-snap column. Snapping is handled by CSS rather
 * than by intercepting wheel events — native snap keeps trackpads, keyboards,
 * touch and screen readers all behaving correctly, which hijacked scroll never
 * quite manages.
 */
export default function Deck() {
  const [active, setActive] = useState(0)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  const slide = SLIDES[active]

  const goTo = useCallback((index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = slideRefs.current.indexOf(entry.target as HTMLElement)
          if (index >= 0) setActive(index)
        }
      },
      { root: scrollerRef.current, threshold: 0.55 },
    )

    for (const element of slideRefs.current) {
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      if (['ArrowDown', 'PageDown', 'j', ' '].includes(event.key)) {
        event.preventDefault()
        goTo(Math.min(SLIDES.length - 1, active + 1))
      } else if (['ArrowUp', 'PageUp', 'k'].includes(event.key)) {
        event.preventDefault()
        goTo(Math.max(0, active - 1))
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(SLIDES.length - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, goTo])

  const dark = slide.tone === 'ink'

  return (
    <div
      ref={scrollerRef}
      className="e-deck"
      style={
        {
          '--e-bg': slide.bg,
          '--e-fg': slide.fg,
          '--e-accent': slide.accent,
        } as React.CSSProperties
      }
    >
      <Cosmos visible={dark} />

      <Link href="/" className="e-wordmark">
        Edahn Small
      </Link>

      <nav className="e-rail" aria-label="Sections">
        {SLIDES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            data-active={index === active}
            onClick={() => goTo(index)}
            aria-current={index === active ? 'true' : undefined}
          >
            <span className="e-rail-label">{item.nav}</span>
            <span className="e-rail-tick" aria-hidden />
          </button>
        ))}
      </nav>

      <p className="e-scroll-cue" data-hidden={active > 0}>
        Scroll
      </p>

      {SLIDES.map((item, index) => (
        <section
          key={item.id}
          id={item.id}
          data-kind={item.kind}
          data-align={item.align ?? 'left'}
          data-active={index === active}
          data-has-note={Boolean(item.note)}
          className="e-slide"
          ref={(element) => {
            slideRefs.current[index] = element
          }}
        >
          <div className="e-slide-main">
            {item.eyebrow && <p className="e-eyebrow">{item.eyebrow}</p>}

            <h2 className="e-headline">{marked(item.headline, item.marks)}</h2>

            {item.items && (
              <ul className="e-list">
                {item.items.map((value, valueIndex) => (
                  <li key={value} style={{ transitionDelay: `${160 + valueIndex * 85}ms` }}>
                    {value}
                  </li>
                ))}
              </ul>
            )}

            {item.body && (
              <div className="e-body">
                {item.body.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            )}

            {item.footnote && <p className="e-footnote">{item.footnote}</p>}

            {item.kind === 'self' && <UncatchableSelf />}

            {item.link && (
              <Link href={item.link.href} className="e-link">
                <span>{item.link.label}</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            )}

            {item.kind === 'contact' && (
              <div className="e-contact">
                {/* TODO(edahn): swap in the address you actually want public. */}
                <a href="mailto:hello@edahnsmall.com">Email me</a>
              </div>
            )}
          </div>

          {item.note && <NoteBlock note={item.note} />}
        </section>
      ))}
    </div>
  )
}
