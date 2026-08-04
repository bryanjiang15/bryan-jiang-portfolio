import { useMemo } from 'react'
import type { MoodDriftContent } from '../../data/portfolio'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export type { MoodDriftContent }

type DriftItem =
  | { kind: 'image'; src: string; key: string }
  | { kind: 'text'; text: string; key: string }

type Props = {
  content: MoodDriftContent
  tone?: 'light' | 'dark'
}

/** Deterministic layout so SSR/hydration stay stable without looking ordered. */
function place(i: number, seed: number) {
  const n = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
  return n - Math.floor(n)
}

function buildStrip(content: MoodDriftContent, copies: number): DriftItem[] {
  const base: DriftItem[] = []
  const max = Math.max(content.images.length, content.texts.length, 1)

  for (let i = 0; i < max; i++) {
    if (content.images[i % content.images.length]) {
      base.push({
        kind: 'image',
        src: content.images[i % content.images.length]!,
        key: `img-${i}`,
      })
    }
    if (content.texts[i % content.texts.length]) {
      base.push({
        kind: 'text',
        text: content.texts[i % content.texts.length]!,
        key: `txt-${i}`,
      })
    }
  }

  const filled: DriftItem[] = []
  for (let c = 0; c < copies; c++) {
    for (const item of base) {
      filled.push({ ...item, key: `${item.key}-r${c}` })
    }
  }
  return filled
}

export function MoodDrift({ content, tone = 'light' }: Props) {
  const reduced = useReducedMotion()
  // Fewer copies + wider strip = more air between pieces
  const strip = useMemo(() => buildStrip(content, 2), [content])
  const lanes = [0, 1]
  const dark = tone === 'dark'

  const cols = Math.max(4, Math.ceil(Math.sqrt(strip.length * 1.4)))
  const rows = Math.max(3, Math.ceil(strip.length / cols))

  return (
    <div
      aria-hidden
      className={`mood-drift pointer-events-none absolute inset-[-8%_-12%] overflow-hidden ${dark ? 'mood-drift-dark' : ''}`}
    >
      <div
        className={`mood-drift-track flex h-full w-max ${reduced ? '' : 'mood-drift-scroll'}`}
      >
        {lanes.map((lane) => (
          <div key={lane} className="relative h-full w-[min(210vw,1900px)] shrink-0">
            {strip.map((item, i) => {
              const col = i % cols
              const row = Math.floor(i / cols) % rows
              // Grid cell + light jitter — keeps the wall loose without stacking
              const x =
                ((col + 0.5) / cols) * 92 +
                4 +
                (place(i, 1) - 0.5) * (70 / cols)
              const y =
                ((row + 0.5) / rows) * 78 +
                6 +
                (place(i, 2) - 0.5) * (55 / rows)
              const scale = 0.85 + place(i, 3) * 0.28
              const rot = (place(i, 4) - 0.5) * 10
              const delay = place(i, 5) * 4
              const dur = 7 + place(i, 6) * 6

              if (item.kind === 'image') {
                const w = 96 + place(i, 7) * 100
                return (
                  <figure
                    key={`${lane}-${item.key}`}
                    className={`mood-drift-float absolute ${reduced ? '' : 'mood-drift-bob'}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: `${w}px`,
                      transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
                      animationDelay: `${delay}s`,
                      animationDuration: `${dur}s`,
                    }}
                  >
                    <img
                      src={item.src}
                      alt=""
                      draggable={false}
                      className="mood-drift-img h-auto w-full rounded-md object-cover"
                    />
                  </figure>
                )
              }

              const size = 11 + place(i, 8) * 8
              return (
                <p
                  key={`${lane}-${item.key}`}
                  className={`mood-drift-float mood-drift-text absolute max-w-[200px] font-mono leading-snug ${reduced ? '' : 'mood-drift-bob'}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    fontSize: `${size}px`,
                    transform: `translate(-50%, -50%) rotate(${rot * 0.7}deg)`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${dur}s`,
                    opacity: dark ? 0.28 + place(i, 9) * 0.22 : 0.22 + place(i, 9) * 0.18,
                  }}
                >
                  {item.text}
                </p>
              )
            })}
          </div>
        ))}
      </div>

      <div
        className={
          dark
            ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,color-mix(in_srgb,var(--color-ink)_92%,transparent)_100%)]'
            : 'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,color-mix(in_srgb,var(--color-haze)_88%,transparent)_100%)]'
        }
      />
    </div>
  )
}
