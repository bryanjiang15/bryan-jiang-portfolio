import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const HEIGHT = 64
const MID = HEIGHT / 2
/** Vibration length before the string returns to rest */
const VIBRATE_MS = 1600
/** Extra wait after rest before another pluck is allowed */
const COOLDOWN_MS = 700
const TOTAL_LOCK_MS = VIBRATE_MS + COOLDOWN_MS
/** Peak vertical displacement in CSS pixels */
const PEAK_AMP = 24
const FREQ = 14
/** Standing-wave harmonic — number of antinode peaks along the string */
const PEAKS = 5

function buildStringPath(width: number, amplitude: number, phase: number): string {
  // Overshoot the viewport so ends clip off-screen
  const pad = 80
  const startX = -pad
  const endX = width + pad
  const span = endX - startX
  const steps = Math.max(64, Math.round(width / 10))
  let d = `M ${startX} ${MID}`
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const x = startX + t * span
    // Higher harmonic: PEAKS antinodes, still fixed at the ends
    const envelope = Math.sin(PEAKS * Math.PI * t)
    const y = MID + amplitude * envelope * Math.sin(phase)
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return d
}

export function GuitarString() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<SVGPathElement>(null)
  const rafRef = useRef(0)
  const lockedUntil = useRef(0)
  const widthRef = useRef(0)
  const [width, setWidth] = useState(0)
  const [vibrating, setVibrating] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const update = () => {
      const next = el.getBoundingClientRect().width
      widthRef.current = next
      setWidth(next)
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const pluck = useCallback(() => {
    if (reduced || widthRef.current <= 0) return
    const now = performance.now()
    if (now < lockedUntil.current) return

    lockedUntil.current = now + TOTAL_LOCK_MS
    cancelAnimationFrame(rafRef.current)
    setVibrating(true)

    const start = performance.now()

    const tick = (t: number) => {
      const w = widthRef.current
      const elapsed = t - start
      const progress = Math.min(1, elapsed / VIBRATE_MS)
      const amp = PEAK_AMP * Math.exp(-2.2 * progress * 1.8) * (1 - progress * 0.12)
      const phase = (elapsed / 1000) * FREQ * Math.PI * 2
      const d = buildStringPath(w, amp, phase)

      if (pathRef.current) pathRef.current.setAttribute('d', d)
      if (glowRef.current) {
        glowRef.current.setAttribute('d', d)
        glowRef.current.style.opacity = String(0.55 * (1 - progress))
      }

      if (elapsed < VIBRATE_MS) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        if (pathRef.current) pathRef.current.setAttribute('d', buildStringPath(w, 0, 0))
        if (glowRef.current) glowRef.current.style.opacity = '0'
        setVibrating(false)
      }
    }

    // Wait a frame so the SVG overlay is painted before we write path data
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(tick)
    })
  }, [reduced])

  const restPath = width > 0 ? buildStringPath(width, 0, 0) : ''

  return (
    <div
      ref={wrapRef}
      className="relative left-1/2 h-16 w-screen max-w-none -translate-x-1/2"
    >
      {/* Narrow hit target centered on the wire */}
      <button
        type="button"
        data-cursor
        aria-label="Guitar string"
        onMouseEnter={pluck}
        onFocus={pluck}
        className="absolute inset-x-0 top-1/2 z-20 h-3 -translate-y-1/2 border-0 bg-transparent p-0"
      />

      {/* Resting string — plain CSS so it’s always visible */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 block h-[2px] -translate-y-1/2 bg-[#f4f2ee]"
        style={{
          opacity: vibrating ? 0 : 0.92,
          boxShadow: '0 0 6px rgba(244,242,238,0.4)',
        }}
      />

      {/* Vibrating overlay — pixel-space SVG so stroke width stays correct */}
      {width > 0 ? (
        <svg
          className="pointer-events-none absolute inset-0 z-10 block h-16 w-full overflow-hidden"
          width={width}
          height={HEIGHT}
          viewBox={`0 0 ${width} ${HEIGHT}`}
          style={{ opacity: vibrating ? 1 : 0 }}
        >
          <defs>
            <linearGradient id="stringGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b48cff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff8fd8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6fa8ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            ref={glowRef}
            d={restPath}
            fill="none"
            stroke="url(#stringGlow)"
            strokeWidth={3.5}
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
          <path
            ref={pathRef}
            d={restPath}
            fill="none"
            stroke="#f4f2ee"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </div>
  )
}
