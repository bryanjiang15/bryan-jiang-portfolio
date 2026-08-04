import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MoodImage } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { MoodDrift, type MoodDriftContent } from './MoodDrift'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = {
  images: MoodImage[]
  title: string
  drift: MoodDriftContent
  /** Matches page chrome — dark for Music, light for Projects */
  tone?: 'light' | 'dark'
}

export function MoodBoard({ images, title, drift, tone = 'light' }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!root.current || reduced) return

      gsap.from(root.current.querySelectorAll('.mood-frame'), {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 78%',
        },
      })
    },
    { scope: root, dependencies: [reduced, images] },
  )

  return (
    <div
      ref={root}
      className="relative mb-14 h-[min(56vw,480px)] w-full overflow-hidden md:mb-16"
      aria-label={`${title} mood board`}
    >
      <MoodDrift content={drift} tone={tone} />

      <div className="relative z-10 h-full w-full">
        {images.map((img, i) => (
          <figure
            key={`${img.alt}-${i}`}
            data-music-pulse={tone === 'dark' ? '' : undefined}
            className={
              tone === 'dark'
                ? 'mood-frame absolute overflow-hidden rounded-2xl bg-white/5 shadow-[0_22px_48px_-16px_rgba(0,0,0,0.75)] ring-1 ring-white/12'
                : 'mood-frame absolute overflow-hidden rounded-2xl bg-white/40 shadow-[0_22px_48px_-20px_rgba(30,40,70,0.5)] ring-1 ring-ink/10'
            }
            style={{
              top: img.style.top,
              left: img.style.left,
              width: img.style.width,
              height: img.style.height,
              zIndex: images.length - i,
              ...(tone === 'dark' ? { animationDelay: `${(i % 4) * 0.18}s` } : {}),
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
