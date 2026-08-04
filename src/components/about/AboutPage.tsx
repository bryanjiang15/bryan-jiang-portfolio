import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeroWaveform } from './HeroWaveform'
import { GuitarString } from './GuitarString'
import { LinerNotes } from './LinerNotes'
import { ExperienceSetlist } from './ExperienceSetlist'
import { ThemeGlitch } from './ThemeGlitch'
import { ProjectCovers } from './ProjectCovers'
import { OutroGlitch } from './OutroGlitch'

export function AboutPage() {
  const { hash } = useLocation()

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('theme-light')
    }
  }, [])

  useEffect(() => {
    if (!hash) return
    const id = hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash])

  return (
    <main>
      <HeroWaveform />
      <GuitarString />
      <LinerNotes />
      <ExperienceSetlist />
      <ThemeGlitch />
      <ProjectCovers />
      <OutroGlitch />
    </main>
  )
}
