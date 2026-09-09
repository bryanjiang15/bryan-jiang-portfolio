import { useMemo, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function LinerNotes() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const fadeStrip = useMemo(() => {
    const phrases = [...site.bioFade]
    if (reduced) return phrases
    // Duplicate so translateX(-50%) loops seamlessly
    return [...phrases, ...phrases]
  }, [reduced])

  useGSAP(
    () => {
      if (!root.current || reduced) return

      gsap.from(root.current.querySelectorAll('.liner-reveal'), {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section
      ref={root}
      id="liner"
      className="relative mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32"
    >
      <div className="max-w-2xl">
        <p className="liner-reveal m-0 font-display text-2xl leading-relaxed text-cream italic md:text-3xl md:leading-snug">
          {site.bioLead}
        </p>

        <div
          className={`liner-reveal bio-fade-strip relative mt-12 overflow-hidden md:mt-12 ${reduced ? 'bio-fade-static' : ''}`}
        >
          <div
            className={`flex w-max items-center gap-3 ${reduced ? 'max-w-full flex-wrap' : 'mood-drift-scroll'}`}
          >
            {fadeStrip.map((phrase, i) => (
              <span
                key={`${phrase}-${i}`}
                className={`bio-fade-label shrink-0 font-mono text-[11px] tracking-[0.04em] md:text-xs ${reduced ? '' : 'mood-drift-bob'}`}
                style={
                  reduced
                    ? undefined
                    : {
                        animationDelay: `${(i % site.bioFade.length) * 0.35}s`,
                        animationDuration: `${7 + (i % 5)}s`,
                      }
                }
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
