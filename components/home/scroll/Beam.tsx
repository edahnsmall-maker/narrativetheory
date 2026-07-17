'use client'

export interface BeamProps {
  originX: number
  originY: number
  targetX: number
  targetY: number
  width?: number
  color: string
  opacity?: number
  locked?: boolean
  reverseWrap?: boolean
}

/** The Saran Wrap cone: a projection from the eye, widening toward the target. */
export function Beam({
  originX,
  originY,
  targetX,
  targetY,
  width = 70,
  color,
  opacity = 0.4,
  locked = false,
  reverseWrap = false,
}: BeamProps) {
  const dx = targetX - originX
  const dy = targetY - originY
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const halfW = width / 2

  const p1 = { x: originX + nx * 3, y: originY + ny * 3 }
  const p2 = { x: originX - nx * 3, y: originY - ny * 3 }
  const p3 = { x: targetX - nx * halfW, y: targetY - ny * halfW }
  const p4 = { x: targetX + nx * halfW, y: targetY + ny * halfW }

  const path = `M ${p1.x} ${p1.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p2.x} ${p2.y} Z`

  return (
    <g style={{ transition: 'opacity 600ms ease' }}>
      <path
        d={path}
        fill={color}
        opacity={locked ? opacity * 1.5 : opacity}
        style={{
          filter: locked ? 'saturate(1.3)' : 'blur(2px)',
          transition: 'opacity 600ms ease, filter 600ms ease',
        }}
      />
      {locked && (
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeOpacity={0.6}
          strokeWidth={1}
        />
      )}
      {/* wrap curling back around the person, once locked */}
      {reverseWrap && (
        <circle
          cx={originX}
          cy={originY + 40}
          r={54}
          fill="none"
          stroke={color}
          strokeOpacity={0.35}
          strokeWidth={10}
        />
      )}
    </g>
  )
}
