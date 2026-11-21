'use client'

import { useEffect, useState } from 'react'

/**
 * The signed-in person and their module progress, from GET /api/me.
 * One shared request per page load: the nav and the library both read it
 * without fetching twice. Call `refreshMe()` (or dispatch the window event
 * `nt:me-changed`) after signing in/out or upgrading to update every reader.
 */

export type ProgressStatus = 'active' | 'complete' | 'locked'

export interface MeData {
  user: { email: string; plan: 'free' | 'member'; member: boolean } | null
  progress: Record<string, { status: ProgressStatus; sessionId: string }>
  freeShelves: string[]
}

export type MeState = { loading: true; data: null } | { loading: false; data: MeData }

const SIGNED_OUT: MeData = { user: null, progress: {}, freeShelves: [] }

let cached: MeData | null = null
let inflight: Promise<MeData> | null = null
const listeners = new Set<(d: MeData) => void>()

function load(): Promise<MeData> {
  if (inflight) return inflight
  inflight = fetch('/api/me', { cache: 'no-store', credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : SIGNED_OUT))
    .then((j: Partial<MeData>) => ({
      user: j.user ?? null,
      progress: j.progress ?? {},
      freeShelves: j.freeShelves ?? [],
    }))
    .catch(() => SIGNED_OUT)
    .then((d) => {
      cached = d
      inflight = null
      listeners.forEach((l) => l(d))
      return d
    })
  return inflight
}

export function refreshMe() {
  cached = null
  return load()
}

export function useMe(): MeState {
  // Always start in the loading state so server and client render the same markup.
  const [data, setData] = useState<MeData | null>(null)

  useEffect(() => {
    const onData = (d: MeData) => setData(d)
    listeners.add(onData)
    if (cached) setData(cached)
    else load()
    const onChanged = () => refreshMe()
    window.addEventListener('nt:me-changed', onChanged)
    return () => {
      listeners.delete(onData)
      window.removeEventListener('nt:me-changed', onChanged)
    }
  }, [])

  return data ? { loading: false, data } : { loading: true, data: null }
}
