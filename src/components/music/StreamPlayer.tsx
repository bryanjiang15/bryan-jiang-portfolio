import { useEffect, useId, useRef } from 'react'
import type { MusicStream } from '../../data/portfolio'
import { streamEmbedSrc } from '../../data/portfolio'
import { reportMusicPlayback } from '../../lib/musicPlayback'
import { getSpotifyIframeApi } from '../../lib/spotifyIframeApi'

type Props = {
  stream: MusicStream
  /** Compact for listening rows; roomy for original demos */
  size?: 'compact' | 'demo'
  className?: string
  /** Stagger pulse phase (seconds) when music is playing */
  pulseDelay?: number
  /** Tempo used to sync global / local pulse while this player is active */
  bpm?: number
}

function isActivelyPlaying(data: {
  isPaused: boolean
  position: number
  duration: number
}) {
  if (data.isPaused) return false
  // Treat end-of-track as stopped — Spotify sometimes leaves isPaused false briefly
  if (data.duration > 0 && data.position >= data.duration - 80) return false
  return true
}

export function StreamPlayer({
  stream,
  size = 'demo',
  className = '',
  pulseDelay = 0,
  bpm,
}: Props) {
  const playerId = useId()
  const hostRef = useRef<HTMLDivElement>(null)
  const bpmRef = useRef(bpm)
  bpmRef.current = bpm

  const height =
    stream.provider === 'spotify'
      ? size === 'compact'
        ? 80
        : 152
      : stream.provider === 'apple'
        ? size === 'compact'
          ? 150
          : 175
        : 40

  const pulseStyle = {
    ...(pulseDelay ? { animationDelay: `${pulseDelay}s` } : {}),
  }

  useEffect(() => {
    if (stream.provider !== 'spotify' || !hostRef.current) return

    let cancelled = false
    let controller: { destroy?: () => void } | null = null
    const host = hostRef.current
    const id = stream.id.split('?')[0] ?? stream.id
    const uri = `spotify:${stream.kind}:${id}`

    getSpotifyIframeApi().then((api) => {
      if (cancelled || !host.isConnected) return

      api.createController(host, { uri, width: '100%', height }, (ctrl) => {
        if (cancelled) {
          ctrl.destroy?.()
          return
        }

        controller = ctrl
        ctrl.addListener('playback_update', (e) => {
          if (cancelled) return
          reportMusicPlayback(
            playerId,
            isActivelyPlaying(e.data),
            bpmRef.current,
          )
        })
      })
    })

    return () => {
      cancelled = true
      reportMusicPlayback(playerId, false)
      try {
        controller?.destroy?.()
      } catch {
        /* ignore */
      }
      controller = null
      host.replaceChildren()
    }
  }, [stream, height, playerId])

  if (stream.provider === 'audio') {
    return (
      <div
        data-music-pulse
        style={pulseStyle}
        className={`overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 ${className}`}
      >
        <audio
          controls
          preload="none"
          src={stream.src}
          title={stream.title}
          className="h-10 w-full accent-neon-violet"
          onPlay={() => reportMusicPlayback(playerId, true, bpm)}
          onPause={() => reportMusicPlayback(playerId, false)}
          onEnded={() => reportMusicPlayback(playerId, false)}
        >
          Your browser does not support audio playback.
        </audio>
      </div>
    )
  }

  if (stream.provider === 'spotify') {
    return (
      <div
        data-music-pulse
        style={{ minHeight: height, ...pulseStyle }}
        className={`overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/10 ${className}`}
      >
        <div ref={hostRef} className="w-full" style={{ minHeight: height }} />
      </div>
    )
  }

  const src = streamEmbedSrc(stream)
  if (!src) return null

  return (
    <div
      data-music-pulse
      style={pulseStyle}
      className={`overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/10 ${className}`}
    >
      <iframe
        src={src}
        title="Apple Music player"
        width="100%"
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block w-full border-0"
        style={{ borderRadius: 12, minHeight: height }}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      />
    </div>
  )
}
