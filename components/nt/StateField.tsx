'use client'

import { useState } from "react";

type StateKey = "calm" | "fearful" | "combative" | "collapsed";

const STATES: { key: StateKey; label: string; token: string }[] = [
  { key: "calm", label: "Calm / Open", token: "var(--nt-state-calm)" },
  { key: "fearful", label: "Fearful", token: "var(--nt-state-fearful)" },
  { key: "combative", label: "Combative", token: "var(--nt-state-combative)" },
  { key: "collapsed", label: "Collapsed", token: "var(--nt-state-collapsed)" },
];

type NodeKey =
  | "me" | "partner" | "relationship" | "achievements"
  | "future" | "situation" | "others" | "world";

const NODES: { key: NodeKey; label: string; angle: number }[] = [
  { key: "me", label: "Me", angle: -90 },
  { key: "partner", label: "My Partner", angle: -45 },
  { key: "relationship", label: "My Relationship", angle: 0 },
  { key: "achievements", label: "My Achievements", angle: 45 },
  { key: "future", label: "The Future", angle: 90 },
  { key: "situation", label: "This Situation", angle: 135 },
  { key: "others", label: "Other People", angle: 180 },
  { key: "world", label: "The World", angle: -135 },
];

const COPY: Record<StateKey, Record<NodeKey, string>> = {
  calm: {
    me: "I have space.",
    partner: "They are complex.",
    relationship: "We can meet here.",
    achievements: "It's coming along.",
    future: "It can unfold.",
    situation: "I don't know yet.",
    others: "I see common humanity.",
    world: "I feel part of something larger.",
  },
  fearful: {
    me: "I might not be safe.",
    partner: "They might hurt me.",
    relationship: "It could fall apart.",
    achievements: "I might be exposed.",
    future: "Something bad could happen.",
    situation: "I need to prepare.",
    others: "They could turn on me.",
    world: "The ground is unsteady.",
  },
  combative: {
    me: "I am right.",
    partner: "They are the problem.",
    relationship: "I'm being mistreated.",
    achievements: "I deserve more.",
    future: "I need to win.",
    situation: "I need to push back.",
    others: "They're in my way.",
    world: "It's a fight.",
  },
  collapsed: {
    me: "I am failing.",
    partner: "They won't understand.",
    relationship: "There's no point.",
    achievements: "Nothing I do matters.",
    future: "Nothing will work.",
    situation: "I can't handle this.",
    others: "No one sees me.",
    world: "It's too heavy.",
  },
};

export function StateField() {
  const [state, setState] = useState<StateKey>("calm");
  const current = STATES.find((s) => s.key === state)!;

  return (
    <div className="rounded-3xl border bg-card p-6 md:p-10">
      {/* Header + selector */}
      <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
        <div className="max-w-md">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Narrative field</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">One state. Many stories.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A thinking style or energy state does not only change one thought. It changes the whole field:
            how you see yourself, others, the future, the situation, and the world.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATES.map((s) => {
            const active = s.key === state;
            return (
              <button
                key={s.key}
                onClick={() => setState(s.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition ${
                  active ? "bg-foreground text-background border-foreground" : "bg-card hover:border-foreground/40"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: s.token }} />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagram */}
      <div className="relative mx-auto" style={{ maxWidth: 880 }}>
        <div className="relative w-full" style={{ aspectRatio: "16 / 11" }}>
          {/* edges */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 550" fill="none">
            {NODES.map((n) => {
              const rad = (n.angle * Math.PI) / 180;
              const cx = 400, cy = 275;
              const r = 230;
              const x = cx + Math.cos(rad) * r;
              const y = cy + Math.sin(rad) * (r * 0.7);
              return (
                <line
                  key={n.key}
                  x1={cx} y1={cy} x2={x} y2={y}
                  stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.8}
                  strokeDasharray="2 3"
                />
              );
            })}
          </svg>

          {/* center orb */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div
                className="absolute -inset-10 rounded-full transition-all duration-700 ease-out"
                style={{
                  background: `radial-gradient(circle, ${current.token} 0%, transparent 65%)`,
                  opacity: 0.6,
                  filter: "blur(20px)",
                }}
              />
              <div className="relative rounded-full border bg-card/90 backdrop-blur px-6 py-5 text-center w-44">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Energy State</div>
                <div
                  key={state}
                  className="mt-1 font-display text-base leading-tight animate-in fade-in duration-500"
                >
                  {current.label}
                </div>
              </div>
            </div>
          </div>

          {/* nodes */}
          {NODES.map((n) => {
            const rad = (n.angle * Math.PI) / 180;
            const xPct = 50 + Math.cos(rad) * 38;
            const yPct = 50 + Math.sin(rad) * 36;
            const copy = COPY[state][n.key];
            const above = n.angle < 0;
            return (
              <div
                key={n.key}
                className="absolute z-20"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  {!above && (
                    <div className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-sm">
                      {n.label}
                    </div>
                  )}
                  <div
                    key={state}
                    className="text-[11px] text-muted-foreground text-center max-w-[140px] leading-snug animate-in fade-in duration-500"
                  >
                    {copy}
                  </div>
                  {above && (
                    <div className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-sm order-first">
                      {n.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
