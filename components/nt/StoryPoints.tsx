'use client'

import { useState } from "react";

type StateKey = "calm" | "proud" | "fearful" | "combative" | "ashamed";

const STATES: { key: StateKey; label: string; token: string; story: string }[] = [
  {
    key: "calm",
    label: "Calm / Open",
    token: "var(--nt-state-calm)",
    story: "I'm a person in process. Some things are working; some things need care.",
  },
  {
    key: "proud",
    label: "Proud",
    token: "var(--nt-state-proud)",
    story: "I've built something. I'm capable.",
  },
  {
    key: "fearful",
    label: "Fearful",
    token: "var(--nt-state-fearful)",
    story: "Something is slipping. I need to fix this before it gets worse.",
  },
  {
    key: "combative",
    label: "Combative",
    token: "var(--nt-state-combative)",
    story: "I'm doing better than people realize. They don't get to judge me.",
  },
  {
    key: "ashamed",
    label: "Ashamed / Depressed",
    token: "var(--nt-state-ashamed)",
    story: "I'm behind. I'm failing. Other people are doing life better than me.",
  },
];

// 9 shared point labels (3x3 grid order)
const POINTS = [
  "I have a stable job",
  "I went to school",
  "I've handled hard things before",
  "I've made mistakes",
  "Some friends have better jobs",
  "Some friends have worse jobs",
  "I procrastinated this week",
  "Someone praised my work",
  "Someone didn't respond to me",
];

// Per state: which point indices light up (path order)
const PATHS: Record<StateKey, number[]> = {
  calm:      [0, 2, 3, 6],
  proud:     [0, 1, 2, 7],
  fearful:   [3, 6, 8, 4],
  combative: [0, 1, 5, 7],
  ashamed:   [3, 4, 6, 8],
};

export function StoryPoints() {
  const [state, setState] = useState<StateKey>("ashamed");
  const current = STATES.find((s) => s.key === state)!;
  const path = PATHS[state];
  const highlightSet = new Set(path);

  const cell = 110;
  const padX = 80;
  const padY = 60;
  const W = padX * 2 + cell * 2;
  const H = padY * 2 + cell * 2 + 40; // a bit more room for label text below
  const pos = (i: number) => ({
    x: padX + (i % 3) * cell,
    y: padY + Math.floor(i / 3) * cell,
  });

  return (
    <section>
      {/* Heading block above the card */}
      <div className="max-w-3xl mb-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Storypoints</div>
        <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">
          Same facts.<br />Different storypoints.
        </h2>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          An energy state highlights some facts and dims others.
          The facts stay the same, but the story path changes.
        </p>
      </div>

      <div className="rounded-3xl border bg-card p-6 md:p-8">
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Main interactive area */}
          <div className="lg:col-span-8">
            <div className="text-base md:text-lg font-medium">The narrative target: the self</div>

            {/* State pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {STATES.map((s) => {
                const active = s.key === state;
                return (
                  <button
                    key={s.key}
                    onClick={() => setState(s.key)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition ${
                      active
                        ? "border-foreground/60 bg-background shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                    style={
                      active
                        ? { boxShadow: `0 0 0 3px color-mix(in oklab, ${s.token} 25%, transparent)` }
                        : undefined
                    }
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: active ? s.token : `color-mix(in oklab, ${s.token} 55%, transparent)` }}
                    />
                    {s.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 border-t" />

            {/* Grid */}
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto mt-2">
              {/* connecting path */}
              <polyline
                key={state}
                points={path
                  .map((i) => {
                    const p = pos(i);
                    return `${p.x},${p.y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke={current.token}
                strokeOpacity={0.85}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "all 500ms ease" }}
              />
              {POINTS.map((label, i) => {
                const p = pos(i);
                const on = highlightSet.has(i);
                return (
                  <g key={i} style={{ transition: "all 400ms ease" }}>
                    {on && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={16}
                        fill={current.token}
                        opacity={0.18}
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 9 : 7}
                      fill={on ? current.token : "transparent"}
                      stroke={on ? current.token : "currentColor"}
                      strokeOpacity={on ? 1 : 0.25}
                      strokeWidth={on ? 0 : 1.25}
                      style={{ transition: "all 400ms ease" }}
                    />
                    {/* multi-line label below */}
                    {label.split(" ").reduce<string[][]>((rows, word) => {
                      const last = rows[rows.length - 1];
                      const tryLine = [...last, word].join(" ");
                      if (tryLine.length > 16) rows.push([word]);
                      else last.push(word);
                      return rows;
                    }, [[]]).map((line, li, arr) => (
                      <text
                        key={li}
                        x={p.x}
                        y={p.y + 26 + li * 14}
                        textAnchor="middle"
                        className={on ? "fill-foreground" : "fill-foreground/45"}
                        style={{
                          font: `${on ? 500 : 400} 12px var(--font-sans)`,
                          transition: "all 400ms ease",
                        }}
                      >
                        {line.join(" ")}
                      </text>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Resulting self-story */}
          <div className="lg:col-span-4">
            <div
              key={state}
              className="rounded-2xl border bg-background/60 p-6 h-full flex flex-col animate-in fade-in duration-300"
            >
              <div className="text-sm font-medium">Resulting self-story</div>

              <div className="relative mt-5 flex-1 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 60% 45%, ${current.token} 0%, transparent 60%)`,
                    opacity: 0.35,
                    filter: "blur(18px)",
                  }}
                />
                <blockquote className="relative font-display text-2xl md:text-[28px] leading-[1.2] tracking-tight text-foreground text-balance">
                  &ldquo;{current.story}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 text-xs text-muted-foreground">Same facts. Different emphasis.</div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full border border-foreground/20 bg-muted" />
                  available facts
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: current.token }} />
                  active story points
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
