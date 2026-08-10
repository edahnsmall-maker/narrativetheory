'use client'

import type {
  CheckinStatus,
  Mission,
  Observation,
  ObservationCategory,
  Practice,
  ManagementPlan,
} from '@/lib/program/types'

/**
 * The non-diagram halves of the person's record. Each panel is read-only —
 * everything here is written by the guide during conversation, and revised by
 * saying so rather than by editing in place.
 */

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center px-8 py-16">
      <p className="max-w-xs text-center text-sm text-[var(--muted-foreground)]">{children}</p>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[0.68rem] uppercase tracking-[0.09em] text-[var(--muted-foreground)]">
      {children}
    </h3>
  )
}

/* ------------------------------------------------------------------ */

const CATEGORY_LABEL: Record<ObservationCategory, string> = {
  ailment: 'What aches',
  relationship: 'People',
  outlook: 'How the world looks',
  history: 'Earlier',
  strength: 'What works',
  contradiction: 'Where it strains',
}

const CATEGORY_ORDER: ObservationCategory[] = [
  'ailment',
  'relationship',
  'outlook',
  'history',
  'strength',
  'contradiction',
]

export function ObservationList({ observations }: { observations: Observation[] }) {
  if (!observations.length) {
    return (
      <Empty>
        What the guide picks up collects here as you talk. If something looks wrong, say so &mdash;
        an inaccurate picture is worse than an empty one.
      </Empty>
    )
  }

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: observations.filter((o) => o.category === category),
  })).filter((g) => g.items.length)

  return (
    <div className="space-y-7 px-6 py-6">
      {groups.map(({ category, items }) => (
        <section key={category}>
          <SectionTitle>{CATEGORY_LABEL[category]}</SectionTitle>
          <ul className="space-y-2.5">
            {items.map((item) => (
              <li key={item.id} className="text-sm leading-relaxed">
                <span>{item.text}</span>
                {item.basis && (
                  <span className="mt-0.5 block text-xs italic text-[var(--muted-foreground)]">
                    from: {item.basis}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function PlanBoard({ plan }: { plan: ManagementPlan }) {
  if (!plan.issues.length && !plan.anticipations.length) {
    return (
      <Empty>
        The working plan builds here: the situations that keep coming round, what to do in them,
        and the ways this is likely to go wrong.
      </Empty>
    )
  }

  return (
    <div className="space-y-8 px-6 py-6">
      {plan.issues.map((issue) => (
        <article key={issue.id} className="rounded-xl border border-[var(--rule)] bg-[var(--card)]">
          <header className="border-b border-[var(--rule)] px-4 py-3">
            <h3 className="font-display text-[0.95rem] leading-snug">{issue.title}</h3>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Shows up when {issue.showsUpWhen}
            </p>
          </header>

          {issue.responsibility && (
            <div className="border-b border-[var(--rule)] px-4 py-3">
              <SectionTitle>Yours to do</SectionTitle>
              <p className="text-sm leading-relaxed">{issue.responsibility}</p>
            </div>
          )}

          {issue.responses.length > 0 && (
            <div className="border-b border-[var(--rule)] px-4 py-3">
              <SectionTitle>Options</SectionTitle>
              <table className="w-full text-sm">
                <tbody>
                  {issue.responses.map((response, index) => (
                    <tr key={index} className="align-top">
                      <td className="w-1/2 py-1.5 pr-4 leading-relaxed">{response.text}</td>
                      <td className="py-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                        {response.caveat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {issue.protocols.length > 0 && (
            <div className="px-4 py-3">
              <SectionTitle>If &rarr; then</SectionTitle>
              <ul className="space-y-2">
                {issue.protocols.map((protocol, index) => (
                  <li key={index} className="text-sm leading-relaxed">
                    <span className="text-[var(--muted-foreground)]">If</span> {protocol.when}{' '}
                    <span className="text-[var(--muted-foreground)]">&rarr;</span> {protocol.then}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}

      {plan.anticipations.length > 0 && (
        <section>
          <SectionTitle>What will probably go wrong</SectionTitle>
          <ul className="space-y-4">
            {plan.anticipations.map((anticipation) => (
              <li key={anticipation.id} className="border-l-2 border-[var(--rule)] pl-4">
                <p className="text-sm font-medium leading-relaxed">
                  &ldquo;{anticipation.objection}&rdquo;
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {anticipation.reply}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */

const CHECKIN_LABEL: Record<CheckinStatus, string> = {
  'went-well': 'went well',
  mixed: 'mixed',
  'did-not-happen': "didn't happen",
  'harder-than-expected': 'harder than expected',
}

export function MissionList({ missions }: { missions: Mission[] }) {
  if (!missions.length) {
    return (
      <Empty>
        Missions are small experiments run in real life. The point is finding out whether the map is
        right, not achieving anything.
      </Empty>
    )
  }

  const active = missions.filter((m) => m.active)
  const retired = missions.filter((m) => !m.active)

  const render = (mission: Mission) => (
    <article
      key={mission.id}
      className={`rounded-xl border border-[var(--rule)] bg-[var(--card)] px-4 py-3.5 ${
        mission.active ? '' : 'opacity-55'
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[0.95rem] leading-snug">{mission.title}</h3>
        {mission.cadence && <span className="chip shrink-0">{mission.cadence}</span>}
      </div>

      {mission.why && (
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {mission.why}
        </p>
      )}

      {mission.successLooksLike && (
        <p className="mt-2 text-sm leading-relaxed">
          <span className="text-[var(--muted-foreground)]">Done when: </span>
          {mission.successLooksLike}
        </p>
      )}

      {mission.checkins.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-[var(--rule)] pt-3">
          {mission.checkins.map((checkin) => (
            <li key={checkin.id} className="text-xs leading-relaxed">
              <span className="text-[var(--muted-foreground)]">
                {CHECKIN_LABEL[checkin.status]} &middot;{' '}
              </span>
              {checkin.note}
            </li>
          ))}
        </ul>
      )}
    </article>
  )

  return (
    <div className="space-y-3 px-6 py-6">
      {active.map(render)}
      {retired.length > 0 && (
        <>
          <SectionTitle>Retired</SectionTitle>
          {retired.map(render)}
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function PracticeList({ practices }: { practices: Practice[] }) {
  if (!practices.length) {
    return (
      <Empty>
        Practices for catching the film while it&rsquo;s on, rather than afterwards. They arrive in
        the last stage.
      </Empty>
    )
  }

  return (
    <div className="space-y-3 px-6 py-6">
      {practices.map((practice) => (
        <article
          key={practice.id}
          className="rounded-xl border border-[var(--rule)] bg-[var(--card)] px-4 py-3.5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[0.95rem]">{practice.name}</h3>
            {practice.duration && <span className="chip shrink-0">{practice.duration}</span>}
          </div>
          {practice.aimedAt && (
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Loosens: {practice.aimedAt}
            </p>
          )}
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
            {practice.instructions}
          </p>
        </article>
      ))}
    </div>
  )
}
