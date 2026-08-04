import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ProjectCovers() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!root.current || reduced) return

      gsap.from(root.current.querySelectorAll('.project-row'), {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 72%',
        },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="covers" className="relative bg-haze text-ink">
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-36">
        <h2 className="mb-12 font-display text-3xl italic md:mb-16 md:text-5xl">
          Projects
        </h2>

        <ul className="border-t border-ink/15">
          {projects.map((project, i) => {
            const row = (
              <>
                <span className="font-mono text-[11px] tracking-[0.22em] text-ink-soft/70 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl leading-snug transition-colors group-hover:text-ink/55 md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-ink-soft/80 md:text-[15px]">
                    {project.tagline}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] tracking-wide text-ink-soft/55 md:pt-2">
                  {project.period.split('·')[0]?.trim()}
                  {!project.implemented ? (
                    <span className="ml-2 text-ink-soft/40">· Soon</span>
                  ) : null}
                </span>
              </>
            )

            return (
              <li key={project.id} className="project-row border-b border-ink/15">
                {project.implemented ? (
                  <Link
                    to={`/projects/${project.id}`}
                    data-cursor
                    className="group flex flex-col gap-2 py-7 transition-colors md:flex-row md:items-baseline md:gap-8 md:py-9"
                  >
                    {row}
                  </Link>
                ) : (
                  <div
                    className="group flex flex-col gap-2 py-7 opacity-55 md:flex-row md:items-baseline md:gap-8 md:py-9"
                    aria-disabled="true"
                    title="Coming soon"
                  >
                    {row}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
