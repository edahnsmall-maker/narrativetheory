type StateKey = "calm" | "fearful" | "combative" | "collapsed";
type RowKey = "posture" | "breath" | "tension" | "attention" | "action";

const STATES: { key: StateKey; label: string; token: string }[] = [
  { key: "calm", label: "Calm / Open", token: "var(--nt-state-calm)" },
  { key: "fearful", label: "Fearful", token: "var(--nt-state-fearful)" },
  { key: "combative", label: "Combative", token: "var(--nt-state-combative)" },
  { key: "collapsed", label: "Collapsed", token: "var(--nt-state-collapsed)" },
];

const ROWS: { key: RowKey; label: string }[] = [
  { key: "posture", label: "Posture" },
  { key: "breath", label: "Breath" },
  { key: "tension", label: "Tension" },
  { key: "attention", label: "Attention" },
  { key: "action", label: "Action" },
];

const COPY: Record<RowKey, Record<StateKey, string>> = {
  posture: {
    calm: "Upright, settled",
    fearful: "Braced, small",
    combative: "Forward, leaning in",
    collapsed: "Heavy, sinking",
  },
  breath: {
    calm: "Slow, full",
    fearful: "Shallow, held",
    combative: "Sharp, fast",
    collapsed: "Flat, sighing",
  },
  tension: {
    calm: "Soft",
    fearful: "Chest, jaw",
    combative: "Shoulders, fists",
    collapsed: "Slack, absent",
  },
  attention: {
    calm: "Open, present",
    fearful: "Scanning, narrow",
    combative: "Locked on target",
    collapsed: "Inward, dull",
  },
  action: {
    calm: "Engage, respond",
    fearful: "Avoid, prepare",
    combative: "Push back, escalate",
    collapsed: "Withdraw, stop",
  },
};

function BreathGlyph({ state, color }: { state: StateKey; color: string }) {
  const s = { stroke: color, strokeWidth: 1.4, fill: "none" as const, strokeLinecap: "round" as const };
  const wrap = (children: React.ReactNode) => (
    <svg viewBox="0 0 60 20" className="h-5 w-16 mx-auto mt-1.5 opacity-80">{children}</svg>
  );
  if (state === "calm") return wrap(<path d="M3 10 Q15 2 27 10 T51 10 L57 10" {...s} />);
  if (state === "fearful") return wrap(<path d="M3 10 L10 10 M16 10 L22 10 M28 10 L34 10 M40 10 L46 10 M52 10 L57 10" {...s} />);
  if (state === "combative") return wrap(<path d="M3 16 L12 4 L21 16 L30 4 L39 16 L48 4 L57 16" {...s} />);
  return wrap(<path d="M3 10 Q20 12 30 11 T57 10" {...s} />);
}

export function BodyMatrix() {
  return (
    <div className="rounded-3xl border bg-card p-6 md:p-10">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">The body</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">
            The body changes with the story.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Narratives move with posture, breath, tension, attention, and action.
          </p>
        </div>
        <div className="md:col-span-9 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-xs text-muted-foreground font-normal py-3 pr-3"></th>
                {STATES.map((s) => (
                  <th key={s.key} className="py-3 px-3 text-left">
                    <div className="inline-flex items-center gap-2 text-xs font-medium">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.token }} />
                      {s.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, ri) => (
                <tr key={r.key} className={ri > 0 ? "border-t" : ""}>
                  <td className="py-4 pr-3 text-xs text-muted-foreground w-24 align-top">{r.label}</td>
                  {STATES.map((s) => (
                    <td key={s.key} className="py-4 px-3 align-top text-sm">
                      <div>{COPY[r.key][s.key]}</div>
                      {r.key === "breath" && (
                        <BreathGlyph state={s.key} color={`color-mix(in oklab, ${s.token} 85%, var(--ink) 15%)`} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
