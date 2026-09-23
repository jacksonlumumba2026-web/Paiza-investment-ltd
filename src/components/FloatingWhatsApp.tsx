import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { waLink } from '../data/site'
import { IconWhatsApp } from './icons'

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false)

  // Appears once the visitor scrolls past the hero (where the main CTA already sits).
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Paiza on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex items-center sm:right-6 sm:bottom-6"
        >
          <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full bg-ink px-4 py-2 text-xs font-bold tracking-wide whitespace-nowrap text-white opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            Chat with Paiza
          </span>
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.4s]" />
            <IconWhatsApp className="relative h-7 w-7" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
