import { type CSSProperties } from 'react'

interface Props {
  variant?: 'violet' | 'pink' | 'orange' | 'blue' | 'yellow' | 'rainbow'
  size?: number
  className?: string
  style?: CSSProperties
}

const palettes: Record<string, string[]> = {
  violet: ['#b59cff', '#8b5cf6', '#ec4899'],
  pink: ['#ffb1c8', '#ff6b9a', '#f97316'],
  orange: ['#ffd29a', '#f59e0b', '#ec4899'],
  blue: ['#9ec5ff', '#3b82f6', '#8b5cf6'],
  yellow: ['#fff1a8', '#fde047', '#f59e0b'],
  rainbow: ['#a78bfa', '#ec4899', '#fb923c', '#60a5fa'],
}

export function GradientOrb({ variant = 'rainbow', size = 320, className = '', style }: Props) {
  const colors = palettes[variant]
  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full orb-base"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors[0]} 0%, transparent 55%),
                       radial-gradient(circle at 70% 60%, ${colors[1]} 0%, transparent 60%),
                       radial-gradient(circle at 50% 80%, ${colors[2] ?? colors[1]} 0%, transparent 55%)`,
          opacity: 0.85,
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.3"
          transform="rotate(25 50 50)" />
        <ellipse cx="50" cy="50" rx="42" ry="14" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.3"
          transform="rotate(-30 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="10" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.3"
          transform="rotate(70 50 50)" />
      </svg>
    </div>
  )
}
