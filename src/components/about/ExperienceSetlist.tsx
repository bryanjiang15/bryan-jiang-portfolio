import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience, neonAccents } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Degrees from 12 o'clock — spread across the visible mid-groove */
const ARC_ANGLES = [-28, 0, 28] as const

/** First portion of pin scroll drives the rotate-in; the rest is hold */
const INTRO_PORTION = 0.18
/** Progress where frenzy starts (down) / is scrubbed (up) — room after this for reverse */
const FRENZY_AT = 0.7

export function ExperienceSetlist() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const disc = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!section.current || !disc.current || !stage.current || reduced) return

      const faces = gsap.utils.toArray<HTMLElement>('.vinyl-face')
      const arms = gsap.utils.toArray<HTMLElement>('.vinyl-arm')
      const easeIntro = gsap.parseEase('power2.out')
      /** idle | playing (free-run down) | complete (held at end) */
      let frenzyPhase: 'idle' | 'playing' | 'complete' = 'idle'

      const setIntroState = (t: number) => {
        const e = easeIntro(gsap.utils.clamp(0, 1, t))
        gsap.set(disc.current, {
          rotation: 70 * (1 - e),
          transformOrigin: '50% 50%',
        })
        faces.forEach((face, i) => {
          const base = ARC_ANGLES[i] ?? 0
          gsap.set(face, {
            rotation: -base - 70 * (1 - e),
            opacity: e,
            scale: 0.88 + 0.12 * e,
          })
        })
      }

      const setRestPose = () => {
        gsap.set(disc.current, { rotation: 0, transformOrigin: '50% 50%' })
        faces.forEach((face, i) => {
          const base = ARC_ANGLES[i] ?? 0
          gsap.set(face, { rotation: -base, opacity: 1, scale: 1 })
        })
        gsap.set(stage.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          rotation: 0,
          filter: 'blur(0px)',
        })
        gsap.set(arms, { opacity: 1 })
      }

      const setInitialPose = () => {
        setIntroState(0)
        gsap.set(stage.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          rotation: 0,
          filter: 'blur(0px)',
        })
        gsap.set(arms, { opacity: 1 })
      }

      setInitialPose()

      // Forward frenzy is free-running; upward travel scrubs this same timeline
      const frenzyTl = gsap.timeline({
        paused: true,
        onComplete: () => {
          frenzyPhase = 'complete'
        },
      })
      frenzyTl.to(
        disc.current,
        {
          rotation: -1680,
          duration: 1.85,
          ease: 'power2.in',
        },
        0,
      )
      frenzyTl.to(
        stage.current,
        {
          x: 14,
          rotation: -2.5,
          duration: 0.45,
          ease: 'sine.inOut',
        },
        0,
      )
      frenzyTl.to(
        stage.current,
        {
          x: -20,
          rotation: 3.5,
          duration: 0.5,
          ease: 'sine.inOut',
        },
        0.45,
      )
      frenzyTl.to(
        stage.current,
        {
          x: 12,
          rotation: -2,
          filter: 'blur(2.5px)',
          duration: 0.55,
          ease: 'power1.in',
        },
        0.95,
      )
      frenzyTl.to(
        stage.current,
        {
          opacity: 0,
          scale: 1.2,
          x: 48,
          rotation: 10,
          filter: 'blur(14px)',
          duration: 0.65,
          ease: 'power2.in',
        },
        1.4,
      )
      frenzyTl.to(
        arms,
        {
          opacity: 0.1,
          duration: 0.5,
          ease: 'power1.in',
        },
        1.4,
      )

      const scrubFrenzyToScroll = (progress: number) => {
        // Map [FRENZY_AT → 1] to timeline [0 → 1]
        const t = gsap.utils.clamp(
          0,
          1,
          (progress - FRENZY_AT) / (1 - FRENZY_AT),
        )
        frenzyTl.pause()
        frenzyTl.progress(t)
        frenzyPhase = t <= 0.001 ? 'idle' : t >= 0.999 ? 'complete' : 'playing'
      }

      const startFrenzyForward = () => {
        if (frenzyPhase === 'playing' || frenzyPhase === 'complete') return
        frenzyPhase = 'playing'
        setRestPose()
        frenzyTl.play(0)
      }

      const hardResetFrenzy = () => {
        frenzyPhase = 'idle'
        frenzyTl.pause(0)
        setInitialPose()
      }

      // Dummy scrubbed tween — smooths intro/hold progress without owning the frenzy
      const scrollProxy = { p: 0 }
      const scrubTween = gsap.fromTo(
        scrollProxy,
        { p: 0 },
        { p: 1, ease: 'none', paused: true },
      )

      const st = ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        // Extra length = longer hold + room to scrub frenzy on the way back up
        end: () => `+=${window.innerHeight * 3.6}`,
        pin: true,
        scrub: 0.5,
        animation: scrubTween,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = scrubTween.progress()
          const inFrenzyZone = progress >= FRENZY_AT

          if (self.direction === 1) {
            // ── scrolling down ──
            if (!inFrenzyZone) {
              if (frenzyPhase !== 'idle') {
                frenzyTl.pause(0)
                frenzyPhase = 'idle'
                setRestPose()
              }
              setIntroState(progress / INTRO_PORTION)
              return
            }

            // Entered the frenzy zone — free-run forward once
            if (frenzyPhase === 'idle') {
              startFrenzyForward()
            } else if (frenzyPhase === 'complete') {
              frenzyTl.progress(1)
            }
            // if playing, let the free-run continue
            return
          }

          // ── scrolling up ──
          // Scrub the frenzy in the SAME scroll band it occupied on the way down
          if (inFrenzyZone) {
            scrubFrenzyToScroll(progress)
            return
          }

          // Hold + intro: vinyl must be visible (never leave the dissolved state here)
          if (frenzyPhase !== 'idle' || frenzyTl.progress() > 0) {
            frenzyTl.pause(0)
            frenzyPhase = 'idle'
            setRestPose()
          }
          setIntroState(progress / INTRO_PORTION)
        },
        onEnterBack: () => {
          // Coming back from the next section into the post-frenzy zone
          if (scrubTween.progress() >= FRENZY_AT) {
            scrubFrenzyToScroll(scrubTween.progress())
          }
        },
        onLeaveBack: () => {
          hardResetFrenzy()
        },
      })

      return () => {
        st.kill()
        scrubTween.kill()
        frenzyTl.kill()
      }
    },
    { scope: section, dependencies: [reduced] },
  )

  return (
    <section
      ref={section}
      id="setlist"
      className="relative overflow-hidden border-y border-white/5 bg-[#0b0b0d]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(180,140,255,0.12),transparent_55%)]" />

      <div className="relative z-20 px-5 pt-14 md:px-10 md:pt-16">
        <h2 className="font-display text-3xl italic md:text-5xl">Experience</h2>
      </div>

      <div className="relative h-[100svh]">
        <div
          ref={stage}
          className="absolute inset-x-0 top-[4%] bottom-0 overflow-hidden"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <div
            className="absolute top-[-8%] left-1/2 aspect-square w-[min(210vw,2000px)] -translate-x-1/2"
            style={{ containerType: 'size' }}
          >
            <div
              ref={disc}
              className="absolute inset-0"
              style={{ willChange: 'transform' }}
            >
              <div
                aria-hidden
                className="absolute inset-[8%] rounded-full border border-white/10"
                style={{
                  background: `
                    radial-gradient(circle at 50% 50%, #1a1a1f 0 9%, transparent 9.2%),
                    repeating-radial-gradient(circle at 50% 50%, #121216 0 3px, #0c0c10 3px 6px)
                  `,
                  boxShadow:
                    'inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px rgba(180,140,255,0.12)',
                }}
              />
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 size-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
                style={{
                  background: 'radial-gradient(circle, #f4f2ee 0 12%, #1c1c20 12% 100%)',
                  boxShadow: '0 0 28px rgba(255,143,216,0.25)',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[6%] rounded-full"
                style={{
                  background:
                    'conic-gradient(from 200deg, transparent 0deg, rgba(111,168,255,0.2) 60deg, rgba(255,143,216,0.25) 120deg, transparent 180deg, transparent 360deg)',
                  mask: 'radial-gradient(circle, transparent 66%, #000 67%)',
                  WebkitMask: 'radial-gradient(circle, transparent 66%, #000 67%)',
                }}
              />

              {experience.map((job, i) => {
                const angle = ARC_ANGLES[i] ?? 0
                const glow = neonAccents[i % neonAccents.length]
                const company = job.company.split(',')[0]?.trim() ?? job.company

                return (
                  <div
                    key={job.role + job.period}
                    className="vinyl-arm absolute top-1/2 left-1/2 h-0 w-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="absolute left-0 top-0"
                      style={{
                        // ~29% of disc ≈ center of the playing surface, clear of the rim
                        transform: 'translate(-50%, calc(-50% - 29cqw))',
                      }}
                    >
                      <article
                        className="vinyl-face w-[min(26vw,180px)] text-center"
                        style={{
                          willChange: 'transform, opacity',
                          transform: `rotate(${-angle}deg)`,
                        }}
                      >
                        <p
                          className="font-mono text-[11px] tracking-[0.22em]"
                          style={{ color: glow }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-2 font-display text-[clamp(1rem,2.4vw,1.45rem)] leading-tight text-cream">
                          {company}
                        </h3>
                        <p className="mt-1.5 text-[12px] text-soft/90">{job.role}</p>
                        <p className="mt-1 font-mono text-[10px] tracking-wide text-mute">
                          {job.period}
                        </p>
                      </article>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <p className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-mute/70 uppercase">
          Keep scrolling
        </p>
      </div>
    </section>
  )
}
