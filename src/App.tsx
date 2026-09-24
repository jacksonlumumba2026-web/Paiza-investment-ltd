import { MotionConfig } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Featured from './components/Featured'
import FinalCTA from './components/FinalCTA'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Lightbox, { type LightboxState } from './components/Lightbox'
import Navbar from './components/Navbar'
import Process from './components/Process'
import Services from './components/Services'
import ServiceShowcase from './components/ServiceShowcase'
import TrustBar from './components/TrustBar'
import WhyChoose from './components/WhyChoose'
import { SiteContext, type Filter } from './context'
import type { Photo } from './data/gallery'

export default function App() {
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const showWork = useCallback((f: Filter = 'all') => {
    setFilter(f)
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const openLightbox = useCallback(
    (photos: Photo[], index: number, label?: string) => setLightbox({ photos, index, label }),
    [],
  )
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const ctx = useMemo(
    () => ({ filter, setFilter, showWork, openLightbox }),
    [filter, showWork, openLightbox],
  )

  return (
    <MotionConfig reducedMotion="user">
      <SiteContext.Provider value={ctx}>
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <Intro />
          <Services />
          <ServiceShowcase />
          <Featured />
          <About />
          <WhyChoose />
          <Process />
          <Gallery />
          <FAQ />
          <FinalCTA />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Lightbox state={lightbox} onClose={closeLightbox} />
      </SiteContext.Provider>
    </MotionConfig>
  )
}
