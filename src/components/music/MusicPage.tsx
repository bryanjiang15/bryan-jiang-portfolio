import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listeningNow, musicTracks, site } from '../../data/portfolio'
import { clearMusicPlayback } from '../../lib/musicPlayback'
import { CheckItOut } from './CheckItOut'
import { MusicTrackSection } from './MusicTrackSection'

export function MusicPage() {
  const { trackId } = useParams<{ trackId?: string }>()
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState(
    () =>
      trackId && musicTracks.some((t) => t.id === trackId)
        ? trackId
        : musicTracks[0]?.id,
  )
  const scrollingRef = useRef(false)
  const shouldScrollRef = useRef(true)

  useEffect(() => {
    document.documentElement.classList.remove('theme-light', 'page-projects')
    return () => {
      document.documentElement.classList.remove('theme-light', 'page-projects')
      clearMusicPlayback()
    }
  }, [])

  useEffect(() => {
    if (!trackId) {
      scrollingRef.current = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveId(musicTracks[0]?.id)
      const t = window.setTimeout(() => {
        scrollingRef.current = false
      }, 500)
      return () => window.clearTimeout(t)
    }

    const exists = musicTracks.some((t) => t.id === trackId)
    if (!exists) {
      navigate('/music', { replace: true })
      return
    }

    setActiveId(trackId)

    if (!shouldScrollRef.current) {
      shouldScrollRef.current = true
      return
    }

    scrollingRef.current = true
    const el = document.getElementById(`music-${trackId}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const t = window.setTimeout(() => {
      scrollingRef.current = false
    }, 900)
    return () => window.clearTimeout(t)
  }, [trackId, navigate])

  useEffect(() => {
    const sections = musicTracks
      .map((t) => document.getElementById(`music-${t.id}`))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target.id) return
        const id = top.target.id.replace(/^music-/, '')
        setActiveId((prev) => {
          if (prev === id) return prev
          shouldScrollRef.current = false
          navigate(`/music/${id}`, { replace: true })
          return id
        })
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.35, 0.55] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [navigate])

  const scrollToTrack = (id: string) => {
    setActiveId(id)
    shouldScrollRef.current = true
    scrollingRef.current = true
    navigate(`/music/${id}`, { replace: true })
    document.getElementById(`music-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    window.setTimeout(() => {
      scrollingRef.current = false
    }, 900)
  }

  return (
    <main className="relative min-h-screen bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 20% 18%, rgba(180,140,255,0.22), transparent 55%), radial-gradient(ellipse 55% 45% at 85% 8%, rgba(255,143,216,0.14), transparent 50%)',
        }}
      />

      <div className="relative mx-auto flex max-w-6xl gap-10 px-5 pt-28 pb-24 md:gap-14 md:px-10 md:pt-32 md:pb-32">
        <aside className="sticky top-28 z-20 hidden h-fit w-40 shrink-0 self-start sm:block md:top-32 lg:w-48">
          <nav aria-label="Music" className="flex flex-col gap-0.5">
            <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-mute/55 uppercase">
              Index
            </p>
            {musicTracks.map((track, i) => {
              const active = activeId === track.id
              return (
                <button
                  key={track.id}
                  type="button"
                  data-cursor
                  data-music-pulse
                  onClick={() => scrollToTrack(track.id)}
                  className={`rounded-md px-2.5 py-2 text-left text-[13px] leading-snug transition-colors ${
                    active
                      ? 'bg-white/[0.08] font-medium text-cream'
                      : 'text-soft/55 hover:bg-white/[0.04] hover:text-cream'
                  }`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <span className="mr-2 font-mono text-[10px] tracking-wide text-mute/50 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {track.title}
                </button>
              )
            })}
            <button
              type="button"
              data-cursor
              onClick={() =>
                document.getElementById('check-it-out')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
              className="mt-6 rounded-md px-2.5 py-2 text-left text-[13px] text-soft/50 transition-colors hover:bg-white/[0.04] hover:text-cream"
            >
              Check it out
            </button>
            <Link
              to="/"
              data-cursor
              className="mt-8 px-2.5 text-xs text-mute/50 transition-colors hover:text-cream"
            >
              ← About
            </Link>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-12 md:mb-16">
            <h1 className="font-display text-4xl text-cream italic md:text-5xl">Music</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={site.spotify}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                data-music-pulse
                className="text-sm text-soft/70 transition-colors hover:text-cream"
              >
                Spotify
              </a>
              <a
                href={site.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                data-music-pulse-slow
                className="text-sm text-soft/70 transition-colors hover:text-cream"
              >
                Apple Music
              </a>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:hidden">
              {musicTracks.map((track) => {
                const active = activeId === track.id
                return (
                  <button
                    key={track.id}
                    type="button"
                    data-cursor
                    onClick={() => scrollToTrack(track.id)}
                    className={`shrink-0 rounded-md px-3 py-1.5 text-xs whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-white/12 text-cream'
                        : 'bg-white/[0.05] text-soft/65'
                    }`}
                  >
                    {track.title}
                  </button>
                )
              })}
            </div>
          </header>

          <div className="flex flex-col gap-16 md:gap-24">
            {musicTracks.map((track, i) => (
              <MusicTrackSection key={track.id} track={track} index={i} />
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-16 md:mt-28 md:pt-20">
            <CheckItOut tracks={listeningNow} />
          </div>
        </div>
      </div>
    </main>
  )
}
