import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { AboutPage } from './components/about/AboutPage'
import { ContactPage } from './components/contact/ContactPage'
import { MusicPage } from './components/music/MusicPage'
import { ProjectsPage } from './components/projects/ProjectsPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell relative min-h-screen bg-ink text-cream">
        <div
          aria-hidden
          className="app-dots pointer-events-none fixed inset-0 opacity-[0.045]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <Cursor />
        <Nav />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectsPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/music/:trackId" element={<MusicPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
