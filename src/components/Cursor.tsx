import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { subscribeMusicPlayback } from '../lib/musicPlayback'

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const ringInnerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const hover = useRef(false)
  const enabled = useRef(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

  useEffect(
    () => subscribeMusicPlayback((state) => setMusicPlaying(state.playing)),
    [],
  )

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer || reduced) return

    enabled.current = true
    document.body.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      hover.current = Boolean(t?.closest?.('[data-cursor]'))
    }

    let raf = 0
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      const el = ringRef.current
      const inner = ringInnerRef.current
      if (el) {
        el.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }
      if (inner) {
        if (inner.classList.contains('cursor-ring-pulse')) {
          // Clear inline overrides so CSS keyframes can drive transform/glow
          inner.style.transform = ''
          inner.style.borderColor = ''
          inner.style.opacity = ''
        } else {
          const scale = hover.current ? 1.65 : 1
          inner.style.transform = `scale(${scale})`
          inner.style.borderColor = hover.current ? '#ff8fd8' : '#cbb8ff'
          inner.style.opacity = hover.current ? '0.95' : '0.65'
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      enabled.current = false
      document.body.classList.remove('has-custom-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={ringInnerRef}
          className={`size-8 rounded-full border border-neon-violet/80 shadow-[0_0_14px_1px_rgba(203,184,255,0.35)] transition-[border-color,opacity] duration-200 ${
            musicPlaying ? 'cursor-ring-pulse' : ''
          }`}
          style={{ willChange: 'transform' }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[9999] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_8px_2px_rgba(255,255,255,0.35)] md:block ${
          musicPlaying ? 'cursor-dot-pulse' : ''
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
