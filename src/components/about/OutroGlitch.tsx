import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import glitchOriginal from '../../assets/glitch-effect-original.png'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Page-end seam on the light projects zone — original asset, pastel half only. */
export function OutroGlitch() {
  const root = useRef<HTMLElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !root.current || !img.current) return

      gsap.fromTo(
        img.current,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section
      ref={root}
      aria-hidden
      className="relative z-10 w-full overflow-hidden bg-haze pt-16 md:pt-24"
    >
      {/* Viewport shows only the light top half; dark bottom is clipped. */}
      <div className="relative h-[min(28vh,260px)] w-full overflow-hidden md:h-[min(32vh,300px)]">
        <img
          ref={img}
          src={glitchOriginal}
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-x-0 top-0 h-[220%] w-full object-cover object-[center_top] select-none"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-haze) 0%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
