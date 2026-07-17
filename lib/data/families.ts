export type FamilyKey =
  | "Threat / Protection"
  | "Rank / Worth"
  | "Attachment / Connection"
  | "Control / Future"
  | "Meaning / Analysis"
  | "Role / Persona"
  | "Collapse / Withdrawal"
  | "Appetite / Stimulation"
  | "Natural Function / Being";

export interface Family {
  name: FamilyKey;
  slug: string;
  blurb: string;
  accent: string; // CSS color
  hue: number; // for orb gradients
}

export const families: Family[] = [
  { name: "Threat / Protection", slug: "threat-protection", accent: "var(--accent-pink)", hue: 5,
    blurb: "Mind treats the situation as a possible danger. Body braces; story scans for risk." },
  { name: "Rank / Worth", slug: "rank-worth", accent: "var(--accent-violet)", hue: 295,
    blurb: "Life becomes a scoreboard. The self is measured against others and against an internal ideal." },
  { name: "Attachment / Connection", slug: "attachment-connection", accent: "var(--accent-pink)", hue: 350,
    blurb: "The bond becomes the world. Closeness, distance, and signals are read with high charge." },
  { name: "Control / Future", slug: "control-future", accent: "var(--accent-blue)", hue: 240,
    blurb: "Mind tries to manage what hasn't happened. Steering replaces being." },
  { name: "Meaning / Analysis", slug: "meaning-analysis", accent: "var(--accent-blue)", hue: 220,
    blurb: "Thinking about thinking. Frameworks, theories, and explanations multiply." },
  { name: "Role / Persona", slug: "role-persona", accent: "var(--accent-orange)", hue: 55,
    blurb: "A package of self is assembled for a context: work-self, family-self, dating-self." },
  { name: "Collapse / Withdrawal", slug: "collapse-withdrawal", accent: "var(--accent-violet)", hue: 270,
    blurb: "Energy folds inward. The story shrinks the world; engagement falls." },
  { name: "Appetite / Stimulation", slug: "appetite-stimulation", accent: "var(--accent-orange)", hue: 35,
    blurb: "Wanting and seeking. The mind reaches toward stimulation as relief or escape." },
  { name: "Natural Function / Being", slug: "natural-function-being", accent: "var(--accent-yellow)", hue: 90,
    blurb: "Modes of clear contact and natural function. Less story between action and situation." },
];

export const familyBySlug = (slug: string) => families.find((f) => f.slug === slug);
export const familyByName = (name: string) => families.find((f) => f.name === name);
