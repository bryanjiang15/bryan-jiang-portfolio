import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import glitchOriginal from '../../assets/glitch-effect-original.png'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Page-top seam into the dark contact zone — original asset, dark half only. */
export function IntroGlitch() {
  const root = useRef<HTMLElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !root.current || !img.current) return

      gsap.fromTo(
        img.current,
        { yPercent: 4 },
        {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
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
      className="relative z-10 w-full overflow-hidden bg-ink"
    >
      {/* Viewport shows only the dark bottom half; light top is clipped. */}
      <div className="relative h-[min(28vh,260px)] w-full overflow-hidden md:h-[min(32vh,300px)]">
        <img
          ref={img}
          src={glitchOriginal}
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[220%] w-full object-cover object-[center_bottom] select-none"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      </div>
    </section>
  )
}
