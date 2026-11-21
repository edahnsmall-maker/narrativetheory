import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About — Narrative Theory',
  description: 'Where Narrative Theory came from, in Edahn Small’s words.',
}

/**
 * About page, assembled from Edahn's own writing: the "One Pager" (the
 * 30-day retreat), the introduction to his book draft ("Lenses"), and the
 * goals paragraph. Typo fixes only.
 */

function P({ children }: { children: ReactNode }) {
  return <p className="text-[18px] md:text-[19px] leading-[1.7] text-foreground/90 mb-6">{children}</p>
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight pt-12 mb-5">{children}</h2>
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[44rem] px-4 sm:px-6 py-14 md:py-20">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">About</div>
      <h1 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight mb-8">Where this came from</h1>

      <P>
        It’s tricky to verbalize the fundamental point of Zen, because the fundamental point is experiencing the world without extra thinking.
        Zen is beyond or before thinking, while concepts, words, and explanations are the product of thinking. It’s for that reason that Zen is
        often described by mystics without words but with actions that call attention to the present moment, for without thinking, one finds
        themselves fully absorbed in this moment. There’s nothing else to be absorbed in because nothing else exists.
      </P>
      <P>
        This was the essence of my experience on my 30-day kyol che (silent retreat). After roughly 30 days of 16+ hours of meditation practice a
        day, my extra thinking began to dry up like water evaporating off a hot pan. I could still think abstractly when needed but much of the
        diffuse, background noise of thinking had evaporated. But that wasn’t all that changed: my relationships changed, my attitude towards
        myself changed, my optimism changed, my work changed, my love life changed, and my vulnerability changed. The way I felt, responded, and
        saw the world had shifted.
      </P>
      <P>
        But why? What explains all these changes? I found no adequate explanation in contemporary theories of psychology that have yet to
        integrate spirituality into their frameworks. Zen lore was too mystical and lacked the systematic nature of Western psychology theories.
      </P>

      <H2>Another lens</H2>
      <P>
        As a psychology major in university, we were required to take a variety of introductory psych courses. Each course was from a different
        area of psychology: cognitive, social, abnormal, behavioral, motivational, personality, and developmental psychology. I loved those
        classes because for one quarter, I was able to immerse myself in a mindset. In cognitive psychology, the world turned into thoughts,
        information, and memories. During social psychology, I observed the interaction of groups, persuasion, and human needs. In clinical,
        everyone had a diagnosis and I had multiple. I was surely the most fucked up person that was in school. I think everyone thought that.
        Each class offered a new lens with which to view the world, and I could change them at will.
      </P>
      <P>
        NT is another lens. It’s a way to divide the world up and see the fundamental units at play. It ushers in clarity. It’s a theory that’s
        designed to address the inadequacies I saw in explaining my own experience and challenges. Not just my own, but also that of others: my
        family whom I love, my therapy clients, friends, political and legal conflicts, and more.
      </P>

      <H2>What it’s for</H2>
      <P>
        The goal of Narrative Theory is both scientific understanding and quality of life. By examining and breaking down our personal narrative
        sets, we can disentangle our own perceptions from reality, undo our faulty assumptions, develop keen perception and wisdom, and improve
        our quality of life from moment to moment. This disentangling can also help us improve how we respond to the world and feel about
        ourselves. We can also better understand conflict in general. Finally, with sustained meditation practice, we can even come to understand
        our purpose in life.
      </P>
      <P>
        NT is a lens that I continue to develop as ideas take new shapes, make new alliances, and split off from each other. I encourage you to
        form a similar relationship to NT: let it inform your view of phenomena, and before you discard anything, make sure you understand it
        deeply, but then, feel empowered to modify, adapt, and grow it into your own personal lens. Good luck.
      </P>

      <div className="mt-12 border-t pt-8">
        <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
          Edahn Small is a therapist associate and a longtime Zen practitioner. He has been working on Narrative Theory for about twenty years.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="chip hover:border-foreground/40">The basics of NT</Link>
          <Link href="/writing" className="chip hover:border-foreground/40">Writing</Link>
          <Link href="/life/start-here-core-practice" className="chip hover:border-foreground/40">Try a guided session</Link>
        </div>
      </div>
    </article>
  )
}
