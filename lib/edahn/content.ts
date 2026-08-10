/**
 * The deck. One slide per screen, few words each, in order.
 *
 * The copy is deliberately short — every slide should be readable in a breath,
 * with the depth tucked into asides that only open if someone wants them. The
 * voice is dry and warm and slightly self-deprecating; keep it that way when
 * editing, and cut before you add.
 */

export type Tone = 'paper' | 'ink'

export interface Aside {
  /** The word or phrase that opens it. */
  trigger: string
  title?: string
  paragraphs: string[]
}

export interface SlideLink {
  label: string
  href: string
  external?: boolean
}

export interface Slide {
  id: string
  /** Short label for the side rail. */
  nav: string
  tone: Tone
  /** Page colour while this slide is active. The deck cross-fades between them. */
  bg: string
  fg: string
  /** Accent for underlines and marks on this slide. */
  accent: string
  /** Short, punchy slides read better centred; text-heavy ones don't. */
  align?: 'left' | 'center'
  kind: 'open' | 'statement' | 'list' | 'self' | 'contact'
  eyebrow?: string
  headline: string
  /** Marked words in the headline get an animated underline. */
  marks?: string[]
  body?: string[]
  items?: string[]
  aside?: Aside
  link?: SlideLink
  note?: string
}

export const SLIDES: Slide[] = [
  {
    id: 'hello',
    nav: 'Hello',
    tone: 'paper',
    bg: 'oklch(0.968 0.008 85)',
    fg: 'oklch(0.18 0.015 280)',
    accent: 'var(--e-violet)',
    kind: 'open',
    headline: 'Hello. I’m Edahn.',
    body: [
      'What I aspire to, what I care about, and what I can’t stop wondering about.',
    ],
  },

  {
    id: 'values',
    nav: 'Values',
    tone: 'paper',
    bg: 'oklch(0.957 0.024 88)',
    fg: 'oklch(0.19 0.016 60)',
    accent: 'var(--e-amber)',
    kind: 'list',
    eyebrow: 'Start here',
    headline: 'What actually drives me.',
    items: [
      'Helping others',
      'Discovering truth',
      'Finding meaning and peace',
      'Joy, celebration, spirit',
      'Intelligence',
      'Harmony',
    ],
  },

  {
    id: 'wonder',
    nav: 'Wonder',
    tone: 'ink',
    bg: 'oklch(0.145 0.012 265)',
    fg: 'oklch(0.93 0.008 85)',
    accent: 'var(--e-blue)',
    kind: 'statement',
    eyebrow: 'Age thirteen',
    headline: 'I found black holes, and never quite recovered.',
    marks: ['black holes'],
    body: [
      'I like to wonder about reality. Why there’s anything at all, what it actually is underneath, and what that means for me and my small place in it.',
    ],
    aside: {
      trigger: 'How that happened',
      paragraphs: [
        'I went to religious day school. Somewhere around tenth grade I started turning to science for explanations about why things were the way they were, instead of to religion.',
        'That turned into a much deeper interest in science, and in cosmology in particular. The edge between physics and science fiction is still my favorite place to stand.',
      ],
    },
  },

  {
    id: 'zen',
    nav: 'Zen',
    tone: 'ink',
    bg: 'oklch(0.168 0.014 45)',
    fg: 'oklch(0.93 0.012 65)',
    accent: 'var(--e-clay)',
    kind: 'statement',
    eyebrow: 'Twenty years',
    headline: 'Then I sat down, and kept sitting.',
    marks: ['kept sitting'],
    body: [
      'I’m a dharma teacher in the Kwan Um School of Zen, a Korean tradition founded by Zen Master Seung Sahn. I still go on long retreats a few times a year.',
      'Zen is where I work out how to live — and how the mind quietly decides what other people are, what reality is, and who I’m supposed to be.',
    ],
  },

  {
    id: 'self',
    nav: 'The self',
    tone: 'ink',
    bg: 'oklch(0.128 0.011 300)',
    fg: 'oklch(0.93 0.01 60)',
    align: 'center',
    accent: 'var(--e-clay)',
    kind: 'self',
    eyebrow: 'The whole question',
    headline: 'When you say “I,” what are you pointing at?',
    aside: {
      trigger: 'What I’ve found',
      title: 'Inside and outside have become one.',
      paragraphs: [
        'We have an idea about who we are. We think we’re the thing animating the body, or the stream of thought that runs all day. But can you see it? Catch it? Hold it?',
        'When you try, you can’t. The moment you reach for it, it slips and becomes something else.',
        'In deep silence you can look straight at that question and watch impermanence run through everything, including you. Nothing is made out of itself. Everything is made of other things, and all of them are changing. You’re like that too.',
        'Eventually you can see that the “I” doing the perceiving and the world being perceived were never two. In Zen we say inside and outside have become one. Thinking about it won’t get you there — it has to be looked at from inside concentration and stillness. Though historically, there are exceptions.',
      ],
    },
  },

  {
    id: 'narrative-theory',
    nav: 'Theory',
    tone: 'paper',
    bg: 'oklch(0.949 0.021 350)',
    fg: 'oklch(0.19 0.02 350)',
    accent: 'var(--e-pink)',
    kind: 'statement',
    eyebrow: 'Where it led',
    headline: 'That question followed me into the therapy room.',
    marks: ['therapy room'],
    body: [
      'I’ve been building something I call Narrative Theory. The name just sort of happened.',
      'It’s a way to think systematically about the stories we construct — about ourselves, each other, the future, and whatever room we’re standing in — how to classify them, and how they collide with everyone else’s.',
    ],
    link: { label: 'Read the theory', href: '/' },
  },

  {
    id: 'not-only',
    nav: 'Not only',
    tone: 'paper',
    bg: 'oklch(0.955 0.031 68)',
    fg: 'oklch(0.2 0.024 50)',
    accent: 'var(--e-orange)',
    kind: 'statement',
    eyebrow: 'Disclaimer',
    headline: 'I’m not only a nerd. I promise.',
    marks: ['only a nerd'],
    body: [
      'Djembe at the Venice Beach drum circle. Yes, I’ve been to Burning Man. I have an enormous extended family and I adore every one of them.',
    ],
  },

  {
    id: 'uncle',
    nav: 'Uncle',
    tone: 'paper',
    bg: 'oklch(0.952 0.026 152)',
    fg: 'oklch(0.19 0.02 155)',
    align: 'center',
    accent: 'var(--e-green)',
    kind: 'statement',
    headline: 'I’m also a leading contender for World’s Best Uncle.',
    marks: ['World’s Best Uncle'],
    note: 'Results pending. Confidence high.',
  },

  {
    id: 'work',
    nav: 'Work',
    tone: 'paper',
    bg: 'oklch(0.951 0.021 238)',
    fg: 'oklch(0.19 0.02 250)',
    accent: 'var(--e-blue)',
    kind: 'statement',
    eyebrow: 'Lately',
    headline: 'AI, and what happens when it meets everything else.',
    marks: ['everything else'],
    body: [
      'Specifically therapy, Zen, art, and a good dataset. Nerd alert, again.',
    ],
  },

  {
    id: 'writing',
    nav: 'Writing',
    tone: 'paper',
    bg: 'oklch(0.949 0.022 348)',
    fg: 'oklch(0.19 0.02 340)',
    accent: 'var(--e-pink)',
    kind: 'statement',
    eyebrow: 'Also',
    headline: 'I write, without ever being sure I’m a writer.',
    marks: ['a writer'],
    body: [
      'Writing inside flow is one of the better feelings available to a person.',
    ],
    aside: {
      trigger: 'The back catalogue',
      paragraphs: [
        'An advice column. More blogs than I can defend.',
        'My favorite was short-lived: Darwin’s Mirror — animals and humans caught doing exactly the same thing. This was back when I was deep in human ethology.',
      ],
    },
  },

  {
    id: 'life',
    nav: 'Life',
    tone: 'paper',
    bg: 'oklch(0.949 0.023 300)',
    fg: 'oklch(0.19 0.022 295)',
    accent: 'var(--e-violet)',
    kind: 'statement',
    eyebrow: 'Practically speaking',
    headline: 'Los Angeles. Therapy online. Data design, and now AI.',
    marks: ['Los Angeles'],
    body: [
      'Also a recovering lawyer. It turns out I like spirited debate considerably more than I like fighting.',
    ],
  },

  {
    id: 'contact',
    nav: 'Say hi',
    tone: 'paper',
    bg: 'oklch(0.956 0.034 86)',
    fg: 'oklch(0.19 0.024 60)',
    align: 'center',
    accent: 'var(--e-amber)',
    kind: 'contact',
    headline: 'If any of this landed, I’d like to hear from you.',
    marks: ['hear from you'],
    body: ['Good conversation, therapy, or an argument about black holes. All welcome.'],
  },
]

/** Slide ids that sit on the dark half of the story. */
export const isDark = (slide: Slide) => slide.tone === 'ink'
