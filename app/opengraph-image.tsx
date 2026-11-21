import { ImageResponse } from 'next/og'

export const alt = 'Introducing Narrative Theory'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Share card: the apple in Saran Wrap, and the title. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#f5f0e6', padding: 72, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640 }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: '#6b6862', textTransform: 'uppercase' }}>Narrative Theory</div>
          <div style={{ fontSize: 86, lineHeight: 1, color: '#1f1d1a', marginTop: 24, fontWeight: 600 }}>Introducing Narrative Theory</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: '#4a4741', marginTop: 28 }}>
            How the mind constructs our reality, and what to do about it.
          </div>
        </div>
        <div style={{ position: 'relative', width: 380, height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: 999, background: '#e8b23a', opacity: 0.35 }} />
          <div style={{ position: 'absolute', top: 30, left: 186, width: 10, height: 60, background: '#7a4a2a', borderRadius: 6, transform: 'rotate(18deg)' }} />
          <div style={{ position: 'absolute', top: 40, left: 200, width: 70, height: 36, background: '#8fb39a', borderRadius: '60% 0 60% 0' }} />
          <div style={{ width: 270, height: 250, borderRadius: '48% 48% 46% 46%', background: '#e0533d', boxShadow: '4px 6px 0 rgba(31,29,26,0.18)', display: 'flex' }} />
          <div style={{ position: 'absolute', width: 300, height: 280, borderRadius: '48% 48% 46% 46%', border: '3px solid rgba(255,255,255,0.75)', background: 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.25))' }} />
          <div style={{ position: 'absolute', bottom: 18, right: 0, background: '#fffaf0', padding: '8px 14px', fontSize: 22, fontFamily: 'monospace', color: '#1f1d1a', transform: 'rotate(-3deg)' }}>fig. 1: an apple?</div>
        </div>
      </div>
    ),
    size,
  )
}
