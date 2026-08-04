import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import glitchEffect from '../../assets/glitch-effect.png'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Seam between dark experience and light projects. Image is flipped so black leads, pastel exits. */
export function ThemeGlitch() {
  const root = useRef<HTMLElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!root.current) return

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 55%',
        end: 'bottom top',
        onEnter: () => document.documentElement.classList.add('theme-light'),
        onEnterBack: () => document.documentElement.classList.add('theme-light'),
        onLeaveBack: () => document.documentElement.classList.remove('theme-light'),
      })

      if (reduced || !img.current) return

      gsap.fromTo(
        img.current,
        { yPercent: -12 },
        {
          yPercent: 12,
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
      className="relative z-10 w-full overflow-hidden bg-ink pt-16 md:pt-24"
    >
      <div className="relative h-[min(52vh,480px)] w-full md:h-[min(56vh,560px)]">
        <img
          ref={img}
          src={glitchEffect}
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full scale-y-[-1] object-cover object-[center_center] select-none"
        />
        {/* Hairline joins — keep the art dominant */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-ink/90 to-transparent" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{
            background:
              'linear-gradient(to top, var(--color-haze) 0%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
