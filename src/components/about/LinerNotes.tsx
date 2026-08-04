import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type BioWord = {
  text: string
  fade: boolean
  /** Index among fade words only; -1 for lead words */
  fadeIndex: number
}

function buildWords(): BioWord[] {
  const words: BioWord[] = []
  let fadeIndex = 0

  for (const text of site.bioLead.split(/\s+/).filter(Boolean)) {
    words.push({ text, fade: false, fadeIndex: -1 })
  }

  for (const text of site.bioFade.split(/\s+/).filter(Boolean)) {
    words.push({ text, fade: true, fadeIndex: fadeIndex++ })
  }

  return words
}

const bioWords = buildWords()
const fadeWordTotal = bioWords.filter((w) => w.fade).length

function wordStyle(word: BioWord): CSSProperties | undefined {
  if (!word.fade || fadeWordTotal <= 0) return undefined
  const t = fadeWordTotal <= 1 ? 1 : word.fadeIndex / (fadeWordTotal - 1)
  const eased = t * t
  return {
    fontSize: `${(1 - eased * 0.55) * 100}%`,
    opacity: 0.92 - eased * 0.82,
  }
}

function lineSpacing(lineIndex: number) {
  // Full gap for the first three lines; tighten after that
  const stepsPastThird = Math.max(0, lineIndex - 2)
  if (lineIndex === 0) {
    return { marginTop: 0, lineHeight: 1.45 }
  }
  if (stepsPastThird === 0) {
    return { marginTop: '0.2em', lineHeight: 1.45 }
  }
  return {
    marginTop: `${Math.max(0.02, 0.2 - stepsPastThird * 0.07)}em`,
    lineHeight: Math.max(1.02, 1.45 - stepsPastThird * 0.12),
  }
}

export function LinerNotes() {
  const root = useRef<HTMLElement>(null)
  const measureRef = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const [lines, setLines] = useState<BioWord[][] | null>(null)

  useLayoutEffect(() => {
    const measureEl = measureRef.current
    if (!measureEl) return

    const measure = () => {
      const nodes = measureEl.querySelectorAll<HTMLElement>('[data-bio-word]')
      if (!nodes.length) return

      const next: BioWord[][] = []
      let currentTop = Number.NaN

      nodes.forEach((node, i) => {
        const top = node.getBoundingClientRect().top
        const word = bioWords[i]
        if (!word) return

        if (Number.isNaN(currentTop) || Math.abs(top - currentTop) > 2) {
          next.push([word])
          currentTop = top
        } else {
          next[next.length - 1]?.push(word)
        }
      })

      setLines(next)
    }

    measure()

    const ro = new ResizeObserver(() => {
      // Remeasure from the flowing copy after width changes
      setLines(null)
      requestAnimationFrame(measure)
    })
    ro.observe(measureEl)

    return () => ro.disconnect()
  }, [])

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
        <div className="liner-reveal relative font-display text-2xl leading-relaxed text-cream italic md:text-3xl md:leading-snug">
          {/* Invisible flowing paragraph — source of truth for natural wraps */}
          <p
            ref={measureRef}
            aria-hidden
            className="pointer-events-none invisible m-0"
          >
            {bioWords.map((word, i) => (
              <span key={`m-${i}`} data-bio-word>
                {i > 0 ? ' ' : null}
                <span style={wordStyle(word)}>{word.text}</span>
              </span>
            ))}
          </p>

          {/* Visible paragraph: same wraps, progressive gaps after line 3 */}
          <div className="m-0">
            {(lines ?? [bioWords]).map((line, lineIndex) => {
              const spacing = lineSpacing(lineIndex)
              return (
                <span
                  key={`line-${lineIndex}-${line[0]?.text ?? lineIndex}`}
                  className="block"
                  style={spacing}
                >
                  {line.map((word, wordIndex) => (
                    <span key={`${lineIndex}-${wordIndex}-${word.text}`}>
                      {wordIndex > 0 ? ' ' : null}
                      <span style={wordStyle(word)}>{word.text}</span>
                    </span>
                  ))}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
