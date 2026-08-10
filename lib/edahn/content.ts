/**
 * The deck. One slide per screen, in order.
 *
 * The copy here is Edahn's own, close to verbatim. Only outright typos have
 * been corrected. Do not "tighten" it — an earlier pass rewrote it into
 * something punchier and lost the voice. If a slide needs to be shorter, ask
 * him; don't edit it here.
 *
 * Colour is not per-slide any more. The deck runs on three grounds — ink,
 * paper, and a lavender used only for notes — with one violet accent
 * throughout. Notes are full slides rather than floating panels, so the long
 * material arrives by scrolling like everything else.
 */

export type Tone = 'ink' | 'paper' | 'lavender'

/** Abstract, generative fields. No photographs, nothing representational. */
export type Visual = 'grain' | 'cosmos' | 'enso' | 'lattice' | 'ripples'

export interface SlideLink {
  label: string
  href: string
}

export interface Slide {
  id: string
  /** Short label for the side rail. */
  nav: string
  tone: Tone
  kind: 'open' | 'statement' | 'list' | 'self' | 'note' | 'contact'
  visual?: Visual
  eyebrow?: string
  headline: string
  /** Phrases that get a flat violet rule. No hover behaviour. */
  marks?: string[]
  body?: string[]
  items?: string[]
  link?: SlideLink
  footnote?: string
}

export const SLIDES: Slide[] = [
  {
    id: 'hello',
    nav: 'Hello',
    tone: 'ink',
    kind: 'open',
    visual: 'grain',
    headline: 'Hello, I’m Edahn.',
    body: [
      'This website is about me both professionally and personally. What I aspire to, what I care about deeply, and what I wonder about.',
    ],
  },

  {
    id: 'values',
    nav: 'Values',
    tone: 'paper',
    kind: 'list',
    headline: 'Let’s start with what I think really drives me, my values.',
    items: [
      'Helping others',
      'Discovering truth',
      'Finding meaning and peace',
      'Joy, celebration, and spirit',
      'Intelligence',
      'Harmony',
    ],
  },

  {
    id: 'wonder',
    nav: 'Wonder',
    tone: 'ink',
    kind: 'statement',
    visual: 'cosmos',
    headline: 'I wonder a lot about a lot of things.',
    body: [
      'When I was 13 I became fascinated with space and black holes and the edge between science and science fiction. That never stopped.',
      'I like to wonder about reality: why it exists at all, what it really is, deep down, and what that means for me, my life and my relationship to the whole.',
    ],
  },

  {
    id: 'wonder-note',
    nav: 'How it started',
    tone: 'lavender',
    kind: 'note',
    headline: 'Where that started',
    body: [
      'I attended religious day school but sometime in 10th grade started turning to science for explanations about why things were the way they were instead of religion. That led to a deeper interest in science and cosmology specifically.',
    ],
  },

  {
    id: 'zen',
    nav: 'Zen',
    tone: 'paper',
    kind: 'statement',
    visual: 'enso',
    headline: 'I’m also interested in Zen, and have practiced for about 20 years.',
    body: [
      'I’m currently a dharma teacher in the Kwan Um School of Zen, a Korean-American tradition founded by Zen Master Seung Sahn. Zen is a place where I explore how to live, and how the mind influences our ideas about others and reality and even notions of who or what we are. I attend long retreats semi-regularly to explore these questions carefully.',
      'Zen practice has deeply influenced how I understand notions of self, my role in life, and the nature of intimacy, spirituality, and peace.',
    ],
  },

  {
    id: 'self',
    nav: 'The self',
    tone: 'ink',
    kind: 'self',
    eyebrow: 'The fundamental inquiry',
    headline:
      'When you say “I have” or “give it to me,” what are the I/me pronouns actually referring to?',
  },

  {
    id: 'self-note',
    nav: 'What you find',
    tone: 'lavender',
    kind: 'note',
    headline: 'What you find',
    body: [
      'We have an idea about who we are. We think we’re the thing that’s animating the body, or the ongoing stream of thoughts that dominates our consciousness. But can you see it? Can you catch it? Hold it? When you try you find it impossible. As soon as you try to grab it it slips away and becomes something else.',
      'In deep silence you can look directly at that question and see the impermanence that pervades the entire universe and you too. You can see that nothing is actually made up of itself. It’s made up of different things that are changing. Your self is like that too. What I see is not me but the world outside, just like what I see and touch, and it’s all changing.',
      'Ultimately one can perceive that the I/me (subject) that’s separate from what’s perceived (the object) is just a hallucination. There is no distinction. In Zen we say “inside and outside have become one.” If you try to think about it, it won’t make sense. It has to be viewed in the context of concentration and inner silence, though historically there are exceptions.',
    ],
  },

  {
    id: 'narrative-theory',
    nav: 'Theory',
    tone: 'paper',
    kind: 'statement',
    visual: 'lattice',
    headline:
      'Zen has also influenced my views on psychotherapy and psychology, not from dogma but my own experiences.',
    body: [
      'I’ve been developing my own theory called Narrative Theory. (The name just kinda happened.)',
      'In a nutshell, it’s a way to systematically think about how we construct stories (narratives) about ourselves, others, the future, and situations, how to document and classify those stories, and how those stories interact with other stories (narrative dynamics).',
    ],
    link: { label: 'Read more about Narrative Theory', href: '/' },
  },

  {
    id: 'not-just-a-nerd',
    nav: 'Not just',
    tone: 'ink',
    kind: 'statement',
    visual: 'ripples',
    headline: 'I’m not just a nerd, I promise.',
    marks: ['just a nerd'],
    body: [
      'I like celebration, humor, and creativity. I’m a regular at the Venice Beach drum circle (I play djembe) and yes, I’ve attended Burning Man.',
      'I also love my family. We have a very large extended family who I adore.',
    ],
  },

  {
    id: 'ai',
    nav: 'AI',
    tone: 'paper',
    kind: 'statement',
    visual: 'lattice',
    headline:
      'I’m into AI and tech, and am curious about the intersection of AI and everything.',
    body: ['But specifically therapy, Zen, art, and data analysis (nerd alert again!).'],
    link: { label: 'Some of my recent projects', href: '/edahn/projects' },
  },

  {
    id: 'writing',
    nav: 'Writing',
    tone: 'ink',
    kind: 'statement',
    headline:
      'I like to write, even though I never really considered myself a good writer.',
    body: ['Writing within flow is incredibly enjoyable.'],
    link: { label: 'Ideas and opinions', href: '/edahn/ideas' },
  },

  {
    id: 'writing-note',
    nav: 'Back catalogue',
    tone: 'lavender',
    kind: 'note',
    headline: 'The back catalogue',
    body: [
      'I’ve had an advice column and countless blogs. My favorite was a short-lived one called Darwin’s Mirror, about animals and humans engaged in the same behavior, back when I was very into human ethology.',
    ],
  },

  {
    id: 'uncle',
    nav: 'Uncle',
    tone: 'paper',
    kind: 'statement',
    headline: 'I’m also a contender for the world’s best uncle.',
    marks: ['world’s best uncle'],
  },

  {
    id: 'life',
    nav: 'Work',
    tone: 'ink',
    kind: 'statement',
    headline: 'I live in Los Angeles and practice therapy online.',
    body: [
      'My main work is in data design and now AI. I’m an ex-lawyer as well. Didn’t enjoy fighting as much as I enjoy spirited debate, apparently.',
    ],
    link: { label: 'About my therapy practice', href: '/edahn/therapy' },
  },

  {
    id: 'contact',
    nav: 'Reach out',
    tone: 'paper',
    kind: 'contact',
    headline:
      'If you want to learn more, have a good conversation, and talk therapy, please reach out.',
    body: ['I’d love to hear from you.'],
  },
]
