import { MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { CATEGORIES, type Photo } from './data/gallery'

export default function App() {
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const showWork = useCallback((f: Filter = 'all') => {
    setFilter(f)
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Category links, e.g. paiza-investment.co.ke/#kitchens, open "Our Work" already filtered
  // (used in the WhatsApp Business greeting message and in ads).
  useEffect(() => {
    const applyHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const category = CATEGORIES.find((c) => c.id === id)
      if (!category) return
      setFilter(category.id)
      const scroll = () => document.getElementById('work')?.scrollIntoView({ block: 'start' })
      requestAnimationFrame(scroll)
      setTimeout(scroll, 600) // again once images and fonts above have settled
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
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
