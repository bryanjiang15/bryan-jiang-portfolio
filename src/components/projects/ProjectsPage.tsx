import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { implementedProjects } from '../../data/portfolio'
import { ProjectSection } from './ProjectSection'

export function ProjectsPage() {
  const { projectId } = useParams<{ projectId?: string }>()
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState(
    () =>
      projectId && implementedProjects.some((p) => p.id === projectId)
        ? projectId
        : implementedProjects[0]?.id,
  )
  const scrollingRef = useRef(false)
  /** When true, a projectId change should smooth-scroll to the section. */
  const shouldScrollRef = useRef(true)

  useEffect(() => {
    document.documentElement.classList.add('theme-light', 'page-projects')
    return () => {
      document.documentElement.classList.remove('theme-light', 'page-projects')
    }
  }, [])

  useEffect(() => {
    if (!projectId) {
      scrollingRef.current = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveId(implementedProjects[0]?.id)
      const t = window.setTimeout(() => {
        scrollingRef.current = false
      }, 500)
      return () => window.clearTimeout(t)
    }

    const exists = implementedProjects.some((p) => p.id === projectId)
    if (!exists) {
      navigate('/projects', { replace: true })
      return
    }

    setActiveId(projectId)

    if (!shouldScrollRef.current) {
      shouldScrollRef.current = true
      return
    }

    scrollingRef.current = true
    const el = document.getElementById(`project-${projectId}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const t = window.setTimeout(() => {
      scrollingRef.current = false
    }, 900)
    return () => window.clearTimeout(t)
  }, [projectId, navigate])

  useEffect(() => {
    const sections = implementedProjects
      .map((p) => document.getElementById(`project-${p.id}`))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target.id) return
        const id = top.target.id.replace(/^project-/, '')
        setActiveId((prev) => {
          if (prev === id) return prev
          shouldScrollRef.current = false
          navigate(`/projects/${id}`, { replace: true })
          return id
        })
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.35, 0.55] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [navigate])

  const scrollToProject = (id: string) => {
    setActiveId(id)
    shouldScrollRef.current = true
    scrollingRef.current = true
    navigate(`/projects/${id}`, { replace: true })
    document.getElementById(`project-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    window.setTimeout(() => {
      scrollingRef.current = false
    }, 900)
  }

  return (
    <main className="min-h-screen bg-haze text-ink">
      <div className="mx-auto flex max-w-6xl gap-10 px-5 pt-28 pb-24 md:gap-14 md:px-10 md:pt-32 md:pb-32">
        <aside className="sticky top-28 z-20 hidden h-fit w-40 shrink-0 self-start sm:block md:top-32 lg:w-48">
          <nav
            aria-label="Projects"
            className="flex flex-col gap-0.5"
          >
            <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-ink-soft/50 uppercase">
              Index
            </p>
            {implementedProjects.map((project, i) => {
              const active = activeId === project.id
              return (
                <button
                  key={project.id}
                  type="button"
                  data-cursor
                  onClick={() => scrollToProject(project.id)}
                  className={`rounded-md px-2.5 py-2 text-left text-[13px] leading-snug transition-colors ${
                    active
                      ? 'bg-ink/[0.07] font-medium text-ink'
                      : 'text-ink-soft/65 hover:bg-ink/[0.04] hover:text-ink'
                  }`}
                >
                  <span className="mr-2 font-mono text-[10px] tracking-wide text-ink-soft/45 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {project.title}
                </button>
              )
            })}
            <Link
              to="/#covers"
              data-cursor
              className="mt-8 px-2.5 text-xs text-ink-soft/50 transition-colors hover:text-ink"
            >
              ← About
            </Link>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-12 md:mb-16">
            <h1 className="font-display text-4xl italic text-ink md:text-5xl">Projects</h1>
            <p className="mt-3 max-w-md text-sm text-ink-soft/70 md:text-[15px]">
              Selected work across AI systems, tools, and games.
            </p>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:hidden">
              {implementedProjects.map((project) => {
                const active = activeId === project.id
                return (
                  <button
                    key={project.id}
                    type="button"
                    data-cursor
                    onClick={() => scrollToProject(project.id)}
                    className={`shrink-0 rounded-md px-3 py-1.5 text-xs whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-ink/10 text-ink'
                        : 'bg-ink/[0.04] text-ink-soft/70'
                    }`}
                  >
                    {project.title}
                  </button>
                )
              })}
            </div>
          </header>

          <div className="flex flex-col gap-16 md:gap-24">
            {implementedProjects.map((project, i) => (
              <ProjectSection key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
