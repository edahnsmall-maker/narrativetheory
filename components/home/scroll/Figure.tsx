'use client'

export type ZoneKey = 'head' | 'chest' | 'belly'

export interface ZoneState {
  color?: string
  label?: string
  sublabel?: string
  active?: boolean
}

export interface FigureProps {
  cx: number
  cy: number
  scale?: number
  mirrored?: boolean
  dimmed?: boolean
  zones?: Partial<Record<ZoneKey, ZoneState>>
  actionLabel?: string
  actionSide?: 'left' | 'right'
  showConnectors?: boolean
  nameplate?: string
}

const ZONE_OFFSETS: Record<ZoneKey, { y: number; r: number }> = {
  head: { y: -58, r: 16 },
  chest: { y: -28, r: 11 },
  belly: { y: 2, r: 11 },
}

export function Figure({
  cx,
  cy,
  scale = 1,
  mirrored = false,
  dimmed = false,
  zones = {},
  actionLabel,
  actionSide = 'right',
  showConnectors = false,
  nameplate,
}: FigureProps) {
  const flip = mirrored ? -1 : 1
  const baseOpacity = dimmed ? 0.28 : 1
  const strokeColor = 'currentColor'

  const headY = cy + ZONE_OFFSETS.head.y * scale
  const chestY = cy + ZONE_OFFSETS.chest.y * scale
  const bellyY = cy + ZONE_OFFSETS.belly.y * scale
  const hipY = cy + 20 * scale
  const handY = cy + 8 * scale
  const handX = cx + flip * 34 * scale
  const footX = cx + flip * 16 * scale
  const footY = cy + 78 * scale

  return (
    <g style={{ opacity: baseOpacity, transition: 'opacity 500ms ease' }}>
      {/* connectors between zones (mode circuit) — a single loop hugging the body, so it reads as one circuit rather than being hidden behind the zone circles */}
      {showConnectors && (
        <path
          d={`M ${cx} ${headY}
              C ${cx + flip * 34 * scale} ${headY + 10 * scale}, ${cx + flip * 34 * scale} ${chestY - 10 * scale}, ${cx} ${chestY}
              C ${cx - flip * 34 * scale} ${chestY + 10 * scale}, ${cx - flip * 34 * scale} ${bellyY - 10 * scale}, ${cx} ${bellyY}
              L ${handX} ${handY}`}
          stroke={zones.belly?.color ?? zones.chest?.color ?? zones.head?.color ?? strokeColor}
          strokeOpacity={0.5}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
        />
      )}

      {/* legs */}
      <path
        d={`M ${cx - 6 * scale} ${hipY} L ${footX - flip * 4 * scale} ${footY}`}
        stroke={strokeColor}
        strokeOpacity={0.45}
        strokeWidth={2}
        fill="none"
      />
      <path
        d={`M ${cx + 6 * scale} ${hipY} L ${footX + flip * 10 * scale} ${footY}`}
        stroke={strokeColor}
        strokeOpacity={0.45}
        strokeWidth={2}
        fill="none"
      />

      {/* arm toward action side */}
      <path
        d={`M ${cx + flip * 10 * scale} ${chestY + 6 * scale} Q ${cx + flip * 26 * scale} ${handY - 10 * scale} ${handX} ${handY}`}
        stroke={strokeColor}
        strokeOpacity={0.45}
        strokeWidth={2}
        fill="none"
      />
      {/* other arm, resting */}
      <path
        d={`M ${cx - flip * 10 * scale} ${chestY + 6 * scale} L ${cx - flip * 16 * scale} ${hipY - 4 * scale}`}
        stroke={strokeColor}
        strokeOpacity={0.3}
        strokeWidth={2}
        fill="none"
      />

      {/* torso */}
      <rect
        x={cx - 15 * scale}
        y={chestY - 18 * scale}
        width={30 * scale}
        height={48 * scale}
        rx={14 * scale}
        fill="var(--card)"
        stroke={strokeColor}
        strokeOpacity={0.35}
        strokeWidth={1.4}
      />

      {/* belly zone glow + marker */}
      {zones.belly && (
        <circle
          cx={cx}
          cy={bellyY}
          r={ZONE_OFFSETS.belly.r * scale}
          fill={zones.belly.color ?? 'transparent'}
          opacity={zones.belly.active ? 0.5 : 0.18}
          style={{ transition: 'all 500ms ease' }}
        />
      )}
      {/* chest zone glow + marker */}
      {zones.chest && (
        <circle
          cx={cx}
          cy={chestY}
          r={ZONE_OFFSETS.chest.r * scale}
          fill={zones.chest.color ?? 'transparent'}
          opacity={zones.chest.active ? 0.55 : 0.2}
          style={{ transition: 'all 500ms ease' }}
        />
      )}

      {/* head */}
      <circle
        cx={cx}
        cy={headY}
        r={ZONE_OFFSETS.head.r * scale}
        fill="var(--card)"
        stroke={strokeColor}
        strokeOpacity={0.45}
        strokeWidth={1.4}
      />
      {zones.head?.active && (
        <circle
          cx={cx}
          cy={headY}
          r={ZONE_OFFSETS.head.r * scale + 5}
          fill="none"
          stroke={zones.head.color ?? strokeColor}
          strokeOpacity={0.6}
          strokeWidth={1.5}
        />
      )}
      {/* eye — origin point for the projection cone */}
      <circle cx={cx + flip * 6 * scale} cy={headY} r={1.6 * scale} fill={strokeColor} opacity={0.55} />

      {/* zone labels */}
      {(['head', 'chest', 'belly'] as ZoneKey[]).map((k) => {
        const z = zones[k]
        if (!z?.label) return null
        const y = k === 'head' ? headY - 26 * scale : k === 'chest' ? chestY : bellyY
        const x = cx - flip * 60 * scale
        return (
          <g key={k}>
            <text
              x={x}
              y={y - 3}
              textAnchor={mirrored ? 'start' : 'end'}
              className="fill-foreground/80"
              style={{ font: `500 11px var(--font-sans)` }}
            >
              {z.label}
            </text>
            {z.sublabel && (
              <text
                x={x}
                y={y + 11}
                textAnchor={mirrored ? 'start' : 'end'}
                className="fill-muted-foreground"
                style={{ font: `400 9px var(--font-sans)` }}
              >
                {z.sublabel}
              </text>
            )}
          </g>
        )
      })}

      {/* action tag near hand */}
      {actionLabel && (
        <g>
          <circle cx={handX} cy={handY} r={3} fill="var(--nt-action)" />
          <text
            x={handX + flip * 8}
            y={handY + 4}
            textAnchor={mirrored ? 'end' : 'start'}
            className="fill-foreground/70"
            style={{ font: `400 10.5px var(--font-sans)` }}
          >
            {actionLabel}
          </text>
        </g>
      )}

      {/* nameplate (mode name, once crystallized) — width tracks text length so small-scale figures don't clip it */}
      {nameplate && (
        <g style={{ transition: 'opacity 400ms ease' }}>
          <rect
            x={cx - (nameplate.length * 3.6 + 12)}
            y={hipY + 24 * scale}
            width={(nameplate.length * 3.6 + 12) * 2}
            height={20}
            rx={10}
            fill="var(--foreground)"
          />
          <text
            x={cx}
            y={hipY + 24 * scale + 15}
            textAnchor="middle"
            className="fill-background"
            style={{ font: `600 11px var(--font-sans)`, letterSpacing: '0.02em' }}
          >
            {nameplate}
          </text>
        </g>
      )}
    </g>
  )
}
