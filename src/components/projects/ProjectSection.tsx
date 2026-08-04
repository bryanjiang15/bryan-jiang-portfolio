import type { Project } from '../../data/portfolio'
import { placeholderMoodDrift } from '../../data/portfolio'
import { MoodBoard } from './MoodBoard'

type Props = {
  project: Project
  index: number
}

export function ProjectSection({ project, index }: Props) {
  return (
    <section
      id={`project-${project.id}`}
      className="scroll-mt-28 border-b border-ink/10 pb-20 last:border-b-0 md:pb-28"
    >
      {project.mood && project.mood.length > 0 ? (
        <MoodBoard
          images={project.mood}
          title={project.title}
          drift={project.moodDrift ?? placeholderMoodDrift}
        />
      ) : null}

      <div className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-ink-soft/55 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
          {project.title}
        </h2>
        <p className="mt-2 text-sm text-ink-soft/75 md:text-[15px]">{project.period}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-ink/[0.06] px-2.5 py-1 text-xs text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.overview ? (
          <div className="mt-10">
            <h3 className="font-display text-xl italic text-ink md:text-2xl">Overview</h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-ink-soft/90 text-pretty">
              {project.overview}
            </p>
          </div>
        ) : null}

        {project.bullets.length > 0 ? (
          <ul className="mt-8 space-y-3">
            {project.bullets.map((b) => (
              <li
                key={b}
                className="relative pl-4 text-[14.5px] leading-relaxed text-ink-soft/85"
              >
                <span
                  aria-hidden
                  className="absolute top-[0.65em] left-0 h-px w-2.5 bg-neon-violet/80"
                />
                {b}
              </li>
            ))}
          </ul>
        ) : null}

        {project.demoEmbed ? (
          <div className="mt-12">
            <h3 className="font-display text-xl italic text-ink md:text-2xl">Demo</h3>
            <div className="mt-5 aspect-video overflow-hidden rounded-2xl bg-ink/90 ring-1 ring-ink/10">
              <iframe
                src={project.demoEmbed.src}
                title={project.demoEmbed.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        ) : null}

        {project.links && project.links.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-white/35 px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink/30 hover:bg-white/55"
              >
                {link.label}
                <span aria-hidden className="text-ink-soft/50">
                  ↗
                </span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
