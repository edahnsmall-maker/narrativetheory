// Content for the Narrative Theory map (/theory/map).
// Every line is Edahn's, from his old blog posts (edahnsmall.com, 2023) and notes:
//   EP  = "Energy States" (2023-04-08)          DS = "Our Default Narrative Style" (2023-04-21)
//   KC  = "On Karma & Conflict" (2023-02-23)    WN = "What do we mean by narrative?" (2023-07-03)
//   VDI = "Vectors, Desire, and Intimacy" (2024-03-19)
//   OV  = edahn-overview-2024-03.txt            AN/NN = Apple Notes / Narrative Notes
// Small trims for length; nothing added except the layer names.

export type StateKey = 'agitated' | 'fearful' | 'loving' | 'analytical'

export const STATES: { key: StateKey; label: string }[] = [
  { key: 'agitated', label: 'Agitated' },
  { key: 'fearful', label: 'Fearful' },
  { key: 'loving', label: 'Loving' },
  { key: 'analytical', label: 'Analytical' },
]

export type LayerKey = 'slice' | 'cuts' | 'energy' | 'mode' | 'flavor' | 'wrap' | 'action' | 'outcome'

export type Layer = {
  key: LayerKey
  name: string
  /** The static explanation, in his words. */
  text: string
  /** What this layer looks like in each energy state (null = same for all). */
  byState: Record<StateKey, string> | null
}

export const LAYERS: Layer[] = [
  {
    key: 'slice',
    name: 'The slice',
    text: 'Everything happening right now. Slices are the only things that ever exist. (AN)',
    byState: null,
  },
  {
    key: 'cuts',
    name: 'Cuts',
    text: 'Cuts of now. We divide the slice into things, but how and where is just a matter of convenience. (NN)',
    byState: null,
  },
  {
    key: 'energy',
    name: 'Energy state',
    text: 'Something that flows through the entire organism. It animates the body as well as the mind. (EP)',
    byState: {
      agitated: 'Tightly wound, strict, punitive, demanding.',
      fearful: 'Overthinking and imagined negative consequences.',
      loving: 'Relaxed, open, flexible.',
      analytical: 'Organizing.',
    },
  },
  {
    key: 'mode',
    name: 'Mode',
    text: 'Narrative, body-feeling, action and energy work in unison. N(anger) comes with B(anger), A(anger) and E(anger). The combination is M(anger). (OV)',
    byState: {
      agitated: 'M(agitated): shoulders so stressed, frowning.',
      fearful: 'M(fearful).',
      loving: 'M(loving).',
      analytical: 'M(analytical).',
    },
  },
  {
    key: 'flavor',
    name: 'Narrative flavor',
    text: 'The style of the narrative. A feeling is a combination of a thinking style and a body state, and it is only that. (WN)',
    byState: {
      agitated: 'Black and white, severe, punitive. Curse words. The crying baby is annoying; we start to wonder about the parents.',
      fearful: 'It’s not me who’s become untrusting, it’s my friends who are probably talking behind my back. (KC)',
      loving: 'Poetry. The crying baby is a beautiful part of life; we imagine how special the mother feels.',
      analytical: 'Abstract precise words. We reflect on the tasks the mother must have on her to-do list.',
    },
  },
  {
    key: 'wrap',
    name: 'Saran Wrap · key narratives',
    text: 'Me, my partner, others, the future, rivals, work. These narratives move together as a unit, and the view is always projected out onto the world. (DS, EP)',
    byState: {
      agitated: '“Everything sucks.” I can’t stand her sometimes. Others are incompetent and rival-like.',
      fearful: 'We twist things to make them unsafe. People aren’t trustworthy.',
      loving: '“Life is wonderful.”',
      analytical: '“It’s so interesting.” Me: efficient, competent, worthy. Others: the same.',
    },
  },
  {
    key: 'action',
    name: 'Action sets',
    text: 'We respond to what we perceive, and what we perceive is dependent on our energy state. (EP)',
    byState: {
      agitated: 'Slamming things, shouting, more aggressive language.',
      fearful: 'Checking, worrying, occupying the mind. (AN)',
      loving: 'Gentleness.',
      analytical: 'Precision.',
    },
  },
  {
    key: 'outcome',
    name: 'Outcomes',
    text: 'If you consistently see the world in the same way, you tend to have consistent situations arise with consistent outcomes. (KC)',
    byState: {
      agitated: 'People start pissing us off, and we start picking fights with people.',
      fearful: 'We collect things that reinforce our fear: news stories, stories of illness and tragedy.',
      loving: 'Intimacy just happens. More natural compassion. (VDI)',
      analytical: 'Consistent situations, consistent outcomes.',
    },
  },
]

export const LOOP = {
  outer: { title: 'The loop', lines: ['New stimuli', 'resonating', 'with the mode'], src: 'NN 4463' },
  inner: { title: 'Saran Wrap', lines: ['Projected out', 'onto the world'], src: 'EP' },
}
