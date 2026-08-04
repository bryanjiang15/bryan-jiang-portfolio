import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function buildWavePath(width: number, height: number, seed = 1) {
  const mid = height * 0.55
  const amp = height * 0.28
  const steps = 64
  let d = `M 0 ${mid}`
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * width
    const t = i / steps
    const y =
      mid +
      Math.sin(t * Math.PI * 4.2 + seed) * amp * (0.35 + 0.65 * Math.sin(t * Math.PI)) +
      Math.sin(t * Math.PI * 11 + seed * 2) * amp * 0.18
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

export function HeroWaveform() {
  const root = useRef<HTMLElement>(null)
  const waveRef = useRef<SVGPathElement>(null)
  const waveLayer = useRef<SVGGElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!root.current) return

      const words = root.current.querySelectorAll('.hero-word')
      const path = waveRef.current
      const layer = waveLayer.current

      if (reduced) {
        gsap.set([words, path, layer], { clearProps: 'all', opacity: 1 })
        return
      }

      if (path) {
        const length = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.85,
        })
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(words, {
        yPercent: 110,
        opacity: 0,
        duration: 1.05,
        stagger: 0.12,
      })
        .from(
          root.current.querySelector('.hero-sub'),
          { opacity: 0, y: 18, duration: 0.7 },
          '-=0.45',
        )
        .to(
          path,
          { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' },
          '-=0.9',
        )

      if (layer) {
        gsap.to(layer, {
          y: 48,
          scaleY: 0.72,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }

      gsap.to(root.current.querySelector('.hero-glow'), {
        opacity: 0.35,
        scale: 1.15,
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  const nameParts = site.name.split(' ')

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-20"
    >
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -top-32 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(180,140,255,0.35) 0%, rgba(255,143,216,0.12) 40%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[18%] h-[42vh] w-full opacity-90 md:bottom-[12%]"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff8fd8" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#b48cff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#6fa8ff" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <g ref={waveLayer}>
          <path
            ref={waveRef}
            d={buildWavePath(1440, 420, 1)}
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildWavePath(1440, 420, 1.7)}
            fill="none"
            stroke="rgba(244,242,238,0.12)"
            strokeWidth="1"
          />
        </g>
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <h1 className="font-display text-[clamp(3.4rem,12vw,8.5rem)] leading-[0.92] font-medium tracking-[-0.03em] text-cream">
          {nameParts.map((word) => (
            <span key={word} className="mr-[0.18em] inline-block overflow-hidden align-bottom italic">
              <span className="hero-word inline-block">{word}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub mt-5 max-w-xl text-base text-soft md:text-lg">{site.roles}</p>
      </div>
    </section>
  )
}
