import type { ListeningTrack } from '../../data/portfolio'
import { StreamPlayer } from './StreamPlayer'

type Props = {
  tracks: ListeningTrack[]
}

/** Soft zigzag so the list doesn’t read as a stacked grid. */
const OFFSETS = ['0%', '7%', '2%', '11%', '4%', '9%', '1%', '13%']

export function CheckItOut({ tracks }: Props) {
  return (
    <section id="check-it-out" className="scroll-mt-28 pt-4 md:pt-8">
      <header className="mb-10 max-w-xl md:mb-12">
        <p className="font-mono text-[10px] tracking-[0.2em] text-mute/60 uppercase">
          Rotation
        </p>
        <h2 className="mt-3 font-display text-3xl text-cream italic md:text-4xl">
          Check it out
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-soft/70 md:text-[15px]">
          A few tracks on repeat — stream from Spotify or Apple Music below.
        </p>
      </header>

      <ul className="flex flex-col gap-6 md:gap-8">
        {tracks.map((track, i) => (
          <li
            key={track.id}
            className="w-[min(100%,28rem)] md:w-[min(100%,32rem)]"
            style={{ marginLeft: OFFSETS[i % OFFSETS.length] }}
          >
            <StreamPlayer
              stream={track.stream}
              size="compact"
              className="shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)]"
              pulseDelay={(i % 5) * 0.14}
              bpm={track.bpm}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
