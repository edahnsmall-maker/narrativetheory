/**
 * The Mode Field Guide: modes as species, in Edahn's words.
 *
 * "modes are species" … "we should be exploring mindstates like they were
 * species" … "it should be friendly, like Berne's games, not like how stars are
 * classified" (Narrative Notes). The card fields follow his own template, the
 * "NAILED IT" entry: preceding mindstate, narrative style, body state,
 * projective narratives, intensity, duration, related.
 *
 * Only fields his notes actually describe are filled in. Modes he named but
 * never described are listed as sightings instead of being invented.
 */

import type { Expression } from '@/components/home2/collage'

export type Habitat = 'Anywhere' | 'Social' | 'With a partner' | 'Solo'

export interface Species {
  slug: string
  name: string
  aka?: string
  sticker: string
  habitat: Habitat
  /** The one-line description, his words. */
  line: string
  feel?: string
  comesAfter?: string
  thinking?: string
  body?: string
  world?: string
  does?: string
  intensity?: string
  duration?: string
  wayOut?: string
  quote?: string
  related: string[]
  portrait: { expr: Expression; shirt: string; bg: string; hair: string; hairStyle: 'short' | 'long' | 'bun' | 'curly' | 'bald' | 'cap'; skin: string; slump?: number }
}

const P = {
  tomato: '#e0533d',
  cobalt: '#2f5bd3',
  mustard: '#e8b23a',
  sage: '#8fb39a',
  blush: '#f2b8b0',
  lavender: '#b9a7e6',
  sky: '#a9c8ef',
  teal: '#3f9b94',
  ink: '#1f1d1a',
  skin1: '#f1c7a5',
  skin2: '#c98d63',
  skin3: '#8a5a3c',
  hair1: '#2b2420',
  hair2: '#7a4a2a',
  hair3: '#d9a44e',
}

export const species: Species[] = [
  {
    slug: 'alert-mode',
    name: 'Alert Mode',
    sticker: '👀',
    habitat: 'Anywhere',
    line: 'When dogs in a park see a strange dog, they go into alert mode.',
    body: 'The body doesn’t move. The eyes focus on the source of the threat.',
    thinking: 'Assessing. Do I need to escalate the situation, or react?',
    world:
      'Everything becomes monitoring your own progress, with the assumption that you’re failing, and often that it’s something they’re doing. Your own activity is no longer the locus of normal. Somebody else becomes the center.',
    does: 'Humans do the same thing. When someone is yelling in a restaurant, everyone’s eyes fix on the source of the sound.',
    wayOut: 'Just relax. Let your mind go and see how your outcomes change.',
    related: ['performance-mode', 'bonding-mode', 'anger-mode'],
    portrait: { expr: 'worried', shirt: P.mustard, bg: '#f4ead2', hair: P.hair1, hairStyle: 'short', skin: P.skin1 },
  },
  {
    slug: 'anger-mode',
    name: 'Anger Mode',
    sticker: '😤',
    habitat: 'Anywhere',
    line: 'When I’m angry, I think in an angry way.',
    comesAfter: 'Pre-anger: dissembling, ramping up, still trying to escape the state.',
    thinking: 'Black and white, simplified, me-vs.-them, victim/aggressor.',
    body: 'My breathing gets shallow. My gaze becomes intense and confrontational. I smile less. I don’t laugh.',
    does: 'I make noise. I start slamming things. I interrupt more, curse more, and speak louder, in shorter, declarative sentences with less hedging.',
    feel:
      'When someone starts getting angry, you see changes in their body language right away, then their attitude, their face, their eye contact, then their language, the way they start thinking and seeing the world, and finally their activity set.',
    wayOut: 'Putting down the gloves. See Post-Fight Warmth.',
    related: ['post-fight-warmth', 'victim-mode', 'outgroup-mode'],
    portrait: { expr: 'angry', shirt: P.tomato, bg: '#f1dcd4', hair: P.hair2, hairStyle: 'short', skin: P.skin2 },
  },
  {
    slug: 'performance-mode',
    name: 'Performance Mode',
    sticker: '🎭',
    habitat: 'With a partner',
    line: 'We say what we think we’re supposed to.',
    feel:
      'When you’re with your partner, do you feel calm and connected? Or on edge? Are you quietly in alert mode? Trying to say what’s right? Trying to avoid the deafening awkwardness of silence? Do you exhale only when you’re finally alone again?',
    comesAfter: 'Goal mode, where the goal is connection.',
    body: 'Internally frozen.',
    thinking: 'Operating just from a mental place, where we form ideas and say things to fill a role.',
    world: 'Inside we feel like we have to score points, because we’re always going back to nothing.',
    wayOut: 'Going for connection through experience and honesty (by accident), instead of through thinking and strategy.',
    related: ['boyfriend-mode', 'goal-mode', 'alert-mode'],
    portrait: { expr: 'smile', shirt: P.lavender, bg: '#ebe7f3', hair: P.hair1, hairStyle: 'long', skin: P.skin3 },
  },
  {
    slug: 'boyfriend-mode',
    name: 'Boyfriend Mode',
    sticker: '🤵',
    habitat: 'With a partner',
    line: 'I enjoy the beginning, but then snap into Boyfriend Mode, where I’m acting the way I think I’m supposed to act.',
    thinking: 'I drift into a role. I don’t hold onto my frame.',
    feel: 'In general I have a hard time staying myself. It happens at work too.',
    related: ['performance-mode', 'bonding-mode', 'evaluation-mode'],
    portrait: { expr: 'flat', shirt: P.cobalt, bg: '#e3e9f6', hair: P.hair2, hairStyle: 'curly', skin: P.skin1 },
  },
  {
    slug: 'bonding-mode',
    name: 'Bonding Mode',
    sticker: '🫂',
    habitat: 'Social',
    line: 'I go into bonding mode, and I can’t connect there.',
    world: 'There’s a fear behind it: not wanting to disappoint people. That’s the essence of it. That’s why criticism is so tough.',
    related: ['promoter-mode', 'boyfriend-mode', 'alert-mode'],
    portrait: { expr: 'worried', shirt: P.blush, bg: '#f6e3df', hair: P.hair3, hairStyle: 'bun', skin: P.skin1 },
  },
  {
    slug: 'promoter-mode',
    name: 'Promoter Mode',
    sticker: '📣',
    habitat: 'Social',
    line: 'I like to resolve people’s discomfort.',
    thinking: 'It’s an act, because it has a certain motivation and summary. It’s like a dossier.',
    feel: 'There’s a guard who watches, and prevents me from feeling and relaxing and not being in promoter mode.',
    related: ['bonding-mode', 'flex-mode', 'management-mode'],
    portrait: { expr: 'bigsmile', shirt: P.mustard, bg: '#f4ead2', hair: P.hair1, hairStyle: 'cap', skin: P.skin2 },
  },
  {
    slug: 'evaluation-mode',
    name: 'Evaluation Mode',
    sticker: '📋',
    habitat: 'With a partner',
    line: 'Going into evaluation mode on dates, because you’re making an acquisition.',
    world: 'So the whole Saran world is activated. Disappointing people is the Saran fear.',
    thinking: 'When you meet someone you have to classify them, and that’s all narrative. It’s not real. Real is when you’re just friends.',
    related: ['performance-mode', 'boyfriend-mode', 'flex-mode'],
    portrait: { expr: 'flat', shirt: P.teal, bg: '#dfeeec', hair: P.hair1, hairStyle: 'long', skin: P.skin2 },
  },
  {
    slug: 'goal-mode',
    name: 'Goal Mode',
    sticker: '🎯',
    habitat: 'Anywhere',
    line: 'Goal mode is: I’m gonna focus and get something.',
    comesAfter: 'You freak out when you think you’re not there. You get tight, and you go back into goal mode.',
    thinking:
      'There’s a physical, flow kind and a mental kind that leads to heat and friction. The difference is the energy and attachment behind it, the way it impacts our self-worth.',
    world: 'If self-worth is intact, goal mode can lead to flow. Otherwise it can lead to internal friction and heat.',
    related: ['management-mode', 'progress-mode', 'searching-mode'],
    portrait: { expr: 'frown', shirt: P.tomato, bg: '#f1dcd4', hair: P.hair2, hairStyle: 'short', skin: P.skin1 },
  },
  {
    slug: 'management-mode',
    name: 'Management Mode',
    aka: 'Self-Management Mode',
    sticker: '🗂️',
    habitat: 'Anywhere',
    line: 'Generally our minds are busy. They’re in management mode.',
    thinking: 'Goal achievement, done in service of not trying to look weird.',
    feel: 'It gets paired with whatever other modes the moment calls for. We don’t even realize all those thoughts are active.',
    duration: 'Almost always active.',
    wayOut: 'You can take a break from it. You don’t realize you’re actually pushing it. You’re lugging it around.',
    related: ['goal-mode', 'promoter-mode', 'rest-mode'],
    portrait: { expr: 'flat', shirt: P.sky, bg: '#e3ecf6', hair: P.hair1, hairStyle: 'bun', skin: P.skin3 },
  },
  {
    slug: 'searching-mode',
    name: 'Searching Mode',
    aka: 'Waiting-to-Warp Mind',
    sticker: '🔦',
    habitat: 'Solo',
    line: 'I’m always searching. Searching is my default mode.',
    thinking: 'Lots of people are waiting to warp. They’re just in waiting-to-warp mind.',
    wayOut: 'You can’t try hard to be here by trying to warp.',
    related: ['goal-mode', 'progress-mode', 'rest-mode'],
    portrait: { expr: 'worried', shirt: P.sage, bg: '#e4eee6', hair: P.hair2, hairStyle: 'curly', skin: P.skin2 },
  },
  {
    slug: 'progress-mode',
    name: 'Progress Mode',
    sticker: '📈',
    habitat: 'Solo',
    line: 'I think a lot of us have life progress modes.',
    world: 'Worrying about my life and being alone. It’s a constant worry. As well as my career and progress and life progress.',
    related: ['goal-mode', 'searching-mode', 'flex-mode'],
    portrait: { expr: 'worried', shirt: P.cobalt, bg: '#e3e9f6', hair: P.hair1, hairStyle: 'short', skin: P.skin1, slump: 0.6 },
  },
  {
    slug: 'flex-mode',
    name: 'Flex Mode',
    sticker: '💪',
    habitat: 'Social',
    line: 'Any kind of social mode with something to prove or achieve.',
    related: ['promoter-mode', 'evaluation-mode', 'progress-mode'],
    portrait: { expr: 'smile', shirt: P.tomato, bg: '#f1dcd4', hair: P.hair1, hairStyle: 'cap', skin: P.skin3 },
  },
  {
    slug: 'nailed-it',
    name: 'Nailed It',
    sticker: '🙌',
    habitat: 'Anywhere',
    line: 'The feeling like you met your expectations that were within reach but took some skill and effort.',
    comesAfter: 'Focus.',
    feel: 'Usually starts with a fist pump or some celebratory gesture: waving your arms, an exclamation, a loud high-pitched sound (whew!).',
    thinking: 'Positive, happy, optimistic, things can happen to me. Can lead to acts that require bravery: asking someone out, asking for a raise, even singing karaoke at a bar.',
    body: 'Relaxed and lightly buzzing.',
    world: 'Creating and positive.',
    intensity: 'Usually medium to high.',
    duration: '1–4 days without interruption. Tapers off after day 1.',
    related: ['goal-mode', 'deep-chill-mode'],
    portrait: { expr: 'bigsmile', shirt: P.mustard, bg: '#f4ead2', hair: P.hair3, hairStyle: 'long', skin: P.skin1 },
  },
  {
    slug: 'victim-mode',
    name: 'Victim Mode',
    aka: 'The victim and resenter position',
    sticker: '🥀',
    habitat: 'With a partner',
    line: 'The victim and resenter position is very sticky.',
    feel: 'People settle into conversational and emotional patterns, or dances. Once it’s established, it takes conscious effort to break.',
    world:
      'People enjoy it on different levels: the power trip, the division of self and other, the tragedy, the way it simplifies complex situations, the rejection of the other. All incentives.',
    related: ['anger-mode', 'outgroup-mode', 'post-fight-warmth'],
    portrait: { expr: 'frown', shirt: P.lavender, bg: '#ebe7f3', hair: P.hair2, hairStyle: 'long', skin: P.skin2, slump: 0.7 },
  },
  {
    slug: 'outgroup-mode',
    name: 'Outgroup Mode',
    aka: 'Rejection / outgroup interaction',
    sticker: '🧱',
    habitat: 'Social',
    line: 'Being with someone you can’t stand, and rejecting them from your group.',
    thinking: 'Opposing narrative generation.',
    world: 'Losing trust. Stranger. No empathy.',
    related: ['anger-mode', 'victim-mode', 'alert-mode'],
    portrait: { expr: 'flat', shirt: P.ink, bg: '#e6e2da', hair: P.hair1, hairStyle: 'short', skin: P.skin1 },
  },
  {
    slug: 'post-fight-warmth',
    name: 'Post-Fight Warmth',
    aka: 'Putting down the gloves',
    sticker: '🕊️',
    habitat: 'With a partner',
    line: 'You know that moment when you’re tired of fighting and your voice shifts?',
    comesAfter: 'A fight. Anger mode.',
    thinking: 'Nice thoughts. Communication gestures. Gentleness.',
    body: 'Your eyes and face relax. Your voice relaxes. Your movements slow down. Your focus sharpens. The eyes look a certain way.',
    does: 'You aren’t an asshole, but you’re 0% a pushover. You aren’t needy.',
    quote: 'That is honesty. That is meditation. They’re the same thing.',
    related: ['anger-mode', 'deep-chill-mode', 'victim-mode'],
    portrait: { expr: 'soft', shirt: P.sage, bg: '#e4eee6', hair: P.hair1, hairStyle: 'curly', skin: P.skin3 },
  },
  {
    slug: 'deep-chill-mode',
    name: 'Deep Chill Mode',
    sticker: '🌊',
    habitat: 'Anywhere',
    line: 'Calm, connected to body and breath, helpful, fluid, orderly.',
    related: ['rest-mode', 'post-fight-warmth', 'nailed-it'],
    portrait: { expr: 'soft', shirt: P.teal, bg: '#dfeeec', hair: P.hair3, hairStyle: 'bun', skin: P.skin2 },
  },
  {
    slug: 'rest-mode',
    name: 'Rest Mode',
    sticker: '🍵',
    habitat: 'Anywhere',
    line: 'Rest mode is an exception, because it’s not a doing state.',
    thinking: 'The thinking, body and action all have less magnetism, and rest predominates.',
    feel: 'In Zen this is just working, just eating, just talking to a friend, just sitting.',
    related: ['deep-chill-mode', 'management-mode', 'searching-mode'],
    portrait: { expr: 'soft', shirt: P.blush, bg: '#f6e3df', hair: P.hair1, hairStyle: 'bald', skin: P.skin1 },
  },
]

/** Modes Edahn named in his notes but never described. Readers can tell their stories. */
export const sightings: { name: string; sticker: string }[] = [
  { name: 'Leaving Mode', sticker: '🚪' },
  { name: 'Passenger Mode', sticker: '🚗' },
  { name: 'No-Fucks-to-Give-and-Ready-to-Walk-Away Mode', sticker: '🫡' },
  { name: 'Inconsolable Rage', sticker: '🌋' },
  { name: 'Dawww', sticker: '🥹' },
  { name: 'Lottery Win', sticker: '🎰' },
  { name: 'Too Easy', sticker: '😎' },
  { name: 'Didn’t Try', sticker: '🤷' },
  { name: 'Love Mode', sticker: '💘' },
  { name: 'Honest Mode', sticker: '🫶' },
  { name: 'Bar / Prowl Mode', sticker: '🍸' },
  { name: 'Browsing Mode', sticker: '🛒' },
  { name: 'Looking-for-Something-to-Watch Mode', sticker: '📺' },
  { name: 'Meeting New People Mode', sticker: '🤝' },
  { name: 'Driving Mode', sticker: '🛣️' },
  { name: 'Spiky Mode', sticker: '🌵' },
  { name: 'Connecty Mode', sticker: '🔌' },
  { name: 'Ruminating', sticker: '🌀' },
  { name: 'Planning and Futurecasting', sticker: '🔮' },
]

export const speciesBySlug = (slug: string) => species.find((s) => s.slug === slug)
export const sightingSlug = (name: string) =>
  'sighting-' +
  name
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const HABITATS: Habitat[] = ['Anywhere', 'Social', 'With a partner', 'Solo']
