import type { StreamEvent } from '@/lib/types'

/** Newline-delimited JSON streaming response. `work` receives an emit function. */
export function ndjson(work: (emit: (e: StreamEvent) => void) => Promise<void>): Response {
  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let open = true
      const emit = (e: StreamEvent) => {
        if (!open) return
        try {
          controller.enqueue(encoder.encode(JSON.stringify(e) + '\n'))
        } catch {
          open = false // client went away; keep working so the session still saves
        }
      }
      try {
        await work(emit)
      } finally {
        emit({ t: 'done' })
        open = false
        try {
          controller.close()
        } catch {}
      }
    },
  })
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
