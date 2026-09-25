import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NAV, SITE, waLink } from '../data/site'
import { IconClose, IconMenu, IconWhatsApp } from './icons'
import Logo from './Logo'
import { EASE } from './ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lux ${
          scrolled || open
            ? 'border-b border-white/[0.07] bg-ink/85 py-3 backdrop-blur-xl'
            : 'bg-transparent py-5 lg:py-7'
        }`}
      >
        <nav className="container-lux flex items-center justify-between" aria-label="Main">
          <a href="#home" aria-label={`${SITE.name} — home`} onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                    active === item.href ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold hidden !px-5 !py-3 sm:inline-flex"
            >
              <IconWhatsApp className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="glass-dark grid h-11 w-11 place-items-center rounded-full text-white lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-24 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
            <ul className="container-lux flex flex-1 flex-col justify-center gap-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2 text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
                  >
                    <span className="font-serif text-lg font-normal text-gold italic">0{i + 1}</span>
                    <span className="transition-colors group-hover:text-gold">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="container-lux pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold w-full !py-4">
                <IconWhatsApp className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <p className="mt-5 text-center text-sm text-white/60">
                {SITE.phoneDisplay} · {SITE.tagline}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
