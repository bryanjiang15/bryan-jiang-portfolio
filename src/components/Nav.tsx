import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/portfolio'

export function Nav() {
  const { pathname } = useLocation()
  const onProjects = pathname.startsWith('/projects')
  const onMusic = pathname.startsWith('/music')
  const onContact = pathname.startsWith('/contact')
  const onAbout = !onProjects && !onMusic && !onContact

  const active =
    'nav-link text-sm font-medium text-cream underline decoration-neon-violet decoration-2 underline-offset-8 transition-colors duration-500'
  const muted =
    'nav-muted text-sm text-mute/50 transition-colors duration-500 hover:text-cream'

  return (
    <header className="nav-shell fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-md transition-colors duration-500">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          to="/"
          data-cursor
          className="nav-brand font-display text-lg italic tracking-wide text-cream transition-colors duration-500 hover:text-neon-violet md:text-xl"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-5 md:gap-9" aria-label="Primary">
          <Link to="/" data-cursor className={onAbout ? active : muted}>
            About
          </Link>
          <Link
            to="/projects"
            data-cursor
            className={onProjects ? active : muted}
            onClick={() => {
              if (pathname === '/projects' || pathname.startsWith('/projects/')) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            Projects
          </Link>
          <Link
            to="/music"
            data-cursor
            className={onMusic ? active : muted}
            onClick={() => {
              if (pathname === '/music' || pathname.startsWith('/music/')) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            Music
          </Link>
          <Link to="/contact" data-cursor className={onContact ? active : muted}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
