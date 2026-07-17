import raw from "./modes.json";
import { families } from "./families";

export interface Mode {
  slug: string;
  name: string;
  tagline: string;
  meme: string;
  family: string;
  related: string[];
  thinking: string;
  saran: string;
  body: string;
  behaviors: string;
  sequence: string;
}

export const modes: Mode[] = raw as Mode[];
export const modeBySlug = (slug: string) => modes.find((m) => m.slug === slug);
export const modeByName = (name: string) => modes.find((m) => m.name === name);

export const modesByFamily = (familyName: string) =>
  modes.filter((m) => m.family === familyName);

export const familyOrder = families.map((f) => f.name);
