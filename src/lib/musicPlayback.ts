type MusicPlaybackState = {
  playing: boolean
  /** Effective BPM driving UI pulse (most recently started active player). */
  bpm: number | null
}

type Listener = (state: MusicPlaybackState) => void

type Entry = {
  bpm: number
  startedAt: number
  lastSeen: number
}

const DEFAULT_BPM = 120
/** Drop players that stop sending updates (stale Spotify embeds after another takes over). */
const STALE_MS = 1600
const active = new Map<string, Entry>()
const listeners = new Set<Listener>()
let sweepTimer: ReturnType<typeof setInterval> | null = null

function effectiveBpm(): number | null {
  if (active.size === 0) return null
  let latest: Entry | null = null
  for (const entry of active.values()) {
    if (!latest || entry.startedAt > latest.startedAt) latest = entry
  }
  return latest?.bpm ?? null
}

function applyCssBeat(bpm: number | null) {
  const root = document.documentElement
  if (!bpm || bpm <= 0) {
    root.style.removeProperty('--music-beat')
    root.style.removeProperty('--music-beat-slow')
    return
  }
  const beat = 60 / bpm
  root.style.setProperty('--music-beat', `${beat}s`)
  root.style.setProperty('--music-beat-slow', `${beat * 2}s`)
}

function snapshot(): MusicPlaybackState {
  return { playing: active.size > 0, bpm: effectiveBpm() }
}

function emit() {
  const state = snapshot()
  document.documentElement.classList.toggle('music-playing', state.playing)
  applyCssBeat(state.bpm)
  listeners.forEach((l) => l(state))
}

function normalizeBpm(bpm?: number) {
  if (typeof bpm === 'number' && Number.isFinite(bpm) && bpm > 0) return bpm
  return DEFAULT_BPM
}

function stopSweep() {
  if (!sweepTimer) return
  clearInterval(sweepTimer)
  sweepTimer = null
}

function ensureSweep() {
  if (sweepTimer || typeof window === 'undefined') return
  sweepTimer = setInterval(() => {
    const now = performance.now()
    let removed = false
    for (const [id, entry] of active) {
      if (now - entry.lastSeen > STALE_MS) {
        active.delete(id)
        removed = true
      }
    }
    if (removed) emit()
    if (active.size === 0) stopSweep()
  }, 400)
}

/**
 * Report whether a specific player instance is currently playing.
 * When several players are active, pulse tempo follows the most recently started one;
 * pausing it falls back to whichever remains (stale embeds time out automatically).
 */
export function reportMusicPlayback(
  playerId: string,
  isPlaying: boolean,
  bpm?: number,
) {
  const before = snapshot()
  const now = performance.now()

  if (isPlaying) {
    const rate = normalizeBpm(bpm)
    const existing = active.get(playerId)
    if (!existing) {
      active.set(playerId, { bpm: rate, startedAt: now, lastSeen: now })
      ensureSweep()
    } else {
      existing.lastSeen = now
      if (existing.bpm !== rate) existing.bpm = rate
    }
  } else if (active.has(playerId)) {
    active.delete(playerId)
    if (active.size === 0) stopSweep()
  } else {
    return
  }

  const after = snapshot()
  if (before.playing !== after.playing || before.bpm !== after.bpm) emit()
}

export function clearMusicPlayback() {
  stopSweep()
  if (active.size === 0) {
    document.documentElement.classList.remove('music-playing')
    applyCssBeat(null)
    return
  }
  active.clear()
  emit()
}

export function subscribeMusicPlayback(listener: Listener) {
  listeners.add(listener)
  listener(snapshot())
  return () => {
    listeners.delete(listener)
  }
}

export function isMusicPlaying() {
  return active.size > 0
}

export function getMusicPlaybackState(): MusicPlaybackState {
  return snapshot()
}
