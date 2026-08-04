import { placeholderMoodDrift, type MusicTrack } from '../../data/portfolio'
import { MoodBoard } from '../projects/MoodBoard'
import { StreamPlayer } from './StreamPlayer'

type Props = {
  track: MusicTrack
  index: number
}

export function MusicTrackSection({ track, index }: Props) {
  return (
    <section
      id={`music-${track.id}`}
      className="scroll-mt-28 border-b border-white/8 pb-20 last:border-b-0 md:pb-28"
    >
      {track.mood && track.mood.length > 0 ? (
        <MoodBoard
          images={track.mood}
          title={track.title}
          drift={track.moodDrift ?? placeholderMoodDrift}
          tone="dark"
        />
      ) : null}

      <div className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-mute/70 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-cream md:text-4xl">
          {track.title}
        </h2>
        {track.period ? (
          <p className="mt-2 text-sm text-soft/65 md:text-[15px]">{track.period}</p>
        ) : null}

        {track.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {track.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-soft/80"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {track.blurb ? (
          <p className="mt-8 text-[15px] leading-[1.75] text-soft/80 text-pretty">
            {track.blurb}
          </p>
        ) : null}

        {track.stream ? (
          <div className="mt-10">
            <h3 className="font-display text-xl text-cream italic md:text-2xl">Demo</h3>
            <div className="mt-5">
              <StreamPlayer stream={track.stream} size="demo" bpm={track.bpm} />
            </div>
          </div>
        ) : null}

        {track.links && track.links.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {track.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-cream transition-colors hover:border-white/25 hover:bg-white/[0.08]"
              >
                {link.label}
                <span aria-hidden className="text-mute">
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
