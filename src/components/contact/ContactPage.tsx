import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { contactLinks } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { IntroGlitch } from './IntroGlitch'

gsap.registerPlugin(useGSAP)

const EQ_BARS = Array.from({ length: 32 }, (_, i) => {
  const t = i / 31
  const wave = Math.sin(t * Math.PI * 3.2) * 0.35 + Math.sin(t * Math.PI * 7.1) * 0.2
  const height = 28 + wave * 55 + ((i * 17) % 23)
  const hue = i % 2 === 0 ? 'var(--color-neon-violet)' : 'var(--color-neon-cyan)'
  return { height, hue, delay: (i % 8) * 0.08 }
})

export function ContactPage() {
  const content = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    document.documentElement.classList.remove('theme-light', 'page-projects')
    window.scrollTo(0, 0)
  }, [])

  useGSAP(
    () => {
      if (!content.current || reduced) return

      gsap.from(content.current.querySelectorAll('.contact-reveal'), {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
      })
    },
    { scope: content, dependencies: [reduced] },
  )

  return (
    <main className="min-h-screen bg-ink text-cream">
      <IntroGlitch />

      <div
        ref={content}
        className="mx-auto max-w-xl px-5 pt-10 pb-28 md:px-10 md:pt-14 md:pb-36"
      >
        <h1 className="contact-reveal font-display text-3xl text-cream italic md:text-4xl">
          Contacts
        </h1>
        <p className="contact-reveal mt-3 max-w-md text-[15px] leading-relaxed text-soft/80 text-pretty">
          Make sure to like, comment, and subscribe
        </p>

        <div className="contact-reveal mt-10 overflow-hidden rounded-2xl border border-white/10">
          <ul className="flex flex-col gap-px">
            {contactLinks.map((link) => {
              const shared =
                'group flex items-center justify-between gap-4 px-5 py-5 transition-colors duration-300 md:px-6'

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-cursor
                    {...(link.download ? { download: link.download } : {})}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={
                      link.accent
                        ? `${shared} bg-gradient-to-br from-neon-pink/12 to-neon-cyan/12 hover:from-neon-pink/18 hover:to-neon-cyan/18`
                        : `${shared} bg-white/5 hover:bg-white/[0.08]`
                    }
                  >
                    <span className={`text-sm ${link.accent ? 'text-soft' : 'text-mute'}`}>
                      {link.label}
                    </span>
                    <span
                      className={`truncate text-[15px] text-cream transition-colors ${
                        link.accent
                          ? 'group-hover:text-neon-cyan'
                          : 'group-hover:text-neon-violet'
                      }`}
                    >
                      {link.value}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          aria-hidden
          className="contact-reveal mt-14 flex h-11 items-end gap-[3px] opacity-55"
        >
          {EQ_BARS.map((bar, i) => (
            <div
              key={i}
              className="contact-eq-bar w-full min-w-[4px] origin-bottom rounded-[1px]"
              style={{
                height: `${bar.height}%`,
                background: bar.hue,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
