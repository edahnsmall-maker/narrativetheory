export type TargetKey = 'partner' | 'situation' | 'me'
export type StateKey = 'calm' | 'fearful' | 'combative' | 'collapsed'

export const TARGET_LABELS: Record<TargetKey, string> = {
  partner: 'My Partner',
  situation: 'A Situation',
  me: 'Me',
}

export const STATE_LABELS: Record<StateKey, string> = {
  calm: 'Calm / Open',
  fearful: 'Fearful',
  combative: 'Combative',
  collapsed: 'Collapsed',
}

export const STATE_COLORS: Record<StateKey, string> = {
  calm: 'var(--nt-state-calm)',
  fearful: 'var(--nt-state-fearful)',
  combative: 'var(--nt-state-combative)',
  collapsed: 'var(--nt-state-collapsed)',
}

// Stage 2-3 aura fragments, per target
export const AURA_LABELS: Record<TargetKey, string[]> = {
  partner: ['late again', "doesn't care", 'always like this', 'what this means for me'],
  situation: ['this always happens', 'should have seen it coming', "won't work out", 'what this means for me'],
  me: ["I'm behind", 'should be further along', 'this is who I am', 'what this means for my worth'],
}

// Stage 4: state re-tints the whole scene. Illustrated with the partner target.
export const STATE_STORY: Record<StateKey, string[]> = {
  calm: ["they're complex", 'we can meet here'],
  fearful: ['they might hurt me'],
  combative: ["they're the problem"],
  collapsed: ["they won't understand"],
}

// Stage 5: three-zone descriptors + action tag, per state
export const ZONE_DESCRIPTORS: Record<StateKey, { head: string; chest: string; belly: string; action: string }> = {
  calm: { head: 'open, unhurried', chest: 'charge: low, warm', belly: 'slow breath · body at ease', action: 'leans in' },
  fearful: { head: 'scanning, rehearsing', chest: 'charge: high, sour', belly: 'shallow breath · tight, braced', action: 'checks phone' },
  combative: { head: 'building the case', chest: 'charge: high, hot', belly: 'jaw set · forward lean', action: 'pushes back' },
  collapsed: { head: 'flat, far away', chest: 'charge: low, heavy', belly: 'shallow breath · limbs heavy', action: 'withdraws' },
}

export const MODE_NAMES: Record<StateKey, string> = {
  calm: 'Open Mode',
  fearful: 'Anxious Mode',
  combative: 'Combative Mode',
  collapsed: 'Collapse Mode',
}

export interface DayPanel {
  context: string
  mode: string
  narrative: string
  body: string
  action: string
}

export const DAY_PANELS: DayPanel[] = [
  { context: 'commute', mode: 'Hurry Mode', narrative: "I'm behind already", body: 'tight shoulders, quick breath', action: 'checks the time' },
  { context: 'work', mode: 'Performance Mode', narrative: 'they need to see I have this', body: 'held posture, controlled voice', action: 'polishes, overprepares' },
  { context: 'family dinner', mode: 'Old-Role Mode', narrative: "I'm the one who has to keep the peace", body: 'shrinking, soft voice', action: 'smooths things over' },
  { context: 'alone at night', mode: 'Reflective Mode', narrative: 'what actually happened today', body: 'slower breath, settled weight', action: 'replays, reconsiders' },
]

export const THINNING_TAGS = ['about me', 'about others', 'about the future', 'about situations']

export interface Stage {
  heading: string
  copy: string
}

export const STAGES: Stage[] = [
  { heading: 'Start with two things.', copy: 'A person, and something the person is looking at. A partner. A situation. Sometimes the target is yourself.' },
  { heading: 'Thinking adds a layer.', copy: 'The mind starts generating — meanings, motives, predictions, judgments. Each thought adds new information onto the target. An aura begins to form.' },
  { heading: "Then it sticks. That's Saran Wrap.", copy: "The layer stops feeling like thinking and starts feeling like the target itself. You don't see the wrap — you see through it. What the mind added now looks like plain fact." },
  { heading: 'One state. A different story.', copy: "Which story gets generated isn't decided by the facts. It's decided by your energy state. Change the state and the mind auto-completes the same target a completely different way." },
  { heading: "It's never only mental.", copy: 'Every narrative state comes with a body state and an action set. Posture, breath, tension, behavior — they move together, as one package.' },
  { heading: 'A repeating package is a mode.', copy: "When the same narrative, energy, body state, and actions keep arriving together, that combination is a mode. Any combination that repeats. You don't just think anxious — the whole system enters anxious." },
  { heading: 'You move through modes all day.', copy: "Different contexts summon different modes — work modes, relational modes, family modes, solitude modes. Each one arrives with its own story, body, and behavior, and each one feels like 'just how things are' while it's running." },
  { heading: 'Sometimes one state runs underneath them all.', copy: 'A dominant energy state — worried, depressive, elated — can color every mode in the day. Different rooms, different roles, same undertone. That baseline is usually the real thing to work with, not any single incident.' },
  { heading: 'Now add a second flashlight.', copy: "Two people, one event, two wraps. Each person argues with the world the other's mind has built — and neither can see the other's beam, or their own. Both feel correct. Both feel attacked." },
  { heading: 'When the wrap hardens, that’s lock.', copy: "A story defended long enough stops feeling like a story. It locks — onto the event, onto the other person, onto who you are in it. From inside a lock, certainty feels like clarity. It's usually just grip." },
  { heading: 'The practice is subtraction.', copy: 'The stories about yourself get more forgiving. The stories about others get more open — less beholden to the past. The future stops being a verdict and becomes room: room to breathe, room for optimism, room to lay down new tracks. Nothing was added to get here. Things were put down.' },
  { heading: 'Just this.', copy: "That's the whole point." },
]
