'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SLIDES } from '@/lib/edahn/content'
import { marked } from './bits'
import UncatchableSelf from './UncatchableSelf'
import Visual from './Visual'

/**
 * The whole site is one scroll-snap column. Snapping is handled by CSS rather
 * than by intercepting wheel events — native snap keeps trackpads, keyboards,
 * touch and screen readers all behaving correctly, which hijacked scroll never
 * quite manages.
 *
 * Structure comes from three fixed pieces that persist across slides: the
 * number column down the left, the wordmark, and the section rail on the
 * right. Only the ground colour and the content change underneath them.
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

  return (
    <div ref={scrollerRef} className="e-deck" data-tone={slide.tone}>
      {/* Fixed spine. The number is the only thing in it that changes. */}
      <div className="e-spine" aria-hidden>
        <span className="e-spine-num">{String(active + 1).padStart(2, '0')}</span>
        <span className="e-spine-total">/ {String(SLIDES.length).padStart(2, '0')}</span>
      </div>

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

      {SLIDES.map((item, index) => {
        // A visual owns the right column outright — washing it behind body copy
        // makes a solid mark like the enso fight the text. So when a slide
        // carries a field, the body moves left under the headline; when it
        // doesn't, the body takes the right column instead.
        const hasVisual = Boolean(item.visual)
        const bodyLeft = hasVisual
        const hasRight = hasVisual || Boolean(item.body || item.items) || item.kind === 'self'

        const body = item.body && (
          <div className="e-body">
            {item.body.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </div>
        )

        return (
          <section
            key={item.id}
            id={item.id}
            data-kind={item.kind}
            data-tone={item.tone}
            data-active={index === active}
            className="e-slide"
            ref={(element) => {
              slideRefs.current[index] = element
            }}
          >
            <div className="e-slide-grid" data-split={hasRight}>
              <div className="e-col-left">
                {item.eyebrow && <p className="e-eyebrow">{item.eyebrow}</p>}
                <h2 className="e-headline">{marked(item.headline, item.marks)}</h2>

                {bodyLeft && body}
                {bodyLeft && item.footnote && <p className="e-footnote">{item.footnote}</p>}

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

              {hasRight && (
                <div className="e-col-right">
                  {item.visual && <Visual kind={item.visual} />}

                  {item.items && (
                    <ul className="e-list">
                      {item.items.map((value, valueIndex) => (
                        <li key={value} style={{ transitionDelay: `${180 + valueIndex * 80}ms` }}>
                          {value}
                        </li>
                      ))}
                    </ul>
                  )}

                  {!bodyLeft && body}
                  {!bodyLeft && item.footnote && <p className="e-footnote">{item.footnote}</p>}

                  {item.kind === 'self' && <UncatchableSelf />}
                </div>
              )}
            </div>
          </section>
        )
      })}

    </div>
  )
}
