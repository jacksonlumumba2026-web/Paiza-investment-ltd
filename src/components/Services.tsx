import { m } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { photoById } from '../data/gallery'
import { SERVICES, type Service } from '../data/services'
import { waLink } from '../data/site'
import { pageForService, pagePath } from '../data/servicePages'
import { IconArrowUpRight, IconPause, IconPlay, IconWhatsApp } from './icons'
import { Accent, SectionHeading, Stagger, fadeUp } from './ui'

/** Branded stand-in for services that don't have client photos yet. */
function SheerPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#2a2521] via-[#3a332c] to-[#1b1816] ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0 14px, rgba(255,255,255,0.02) 14px 30px, rgba(0,0,0,0.12) 30px 38px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gold/25 via-transparent to-ink/60" />
      <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/50 to-transparent" />
    </div>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const page = pageForService(service.id)
  const cover = service.cover ? photoById(service.cover) : null

  return (
    <m.article
      variants={fadeUp}
      className="group relative flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] bg-white sm:w-auto shadow-[0_1px_0_rgba(13,12,11,0.04),0_24px_48px_-32px_rgba(13,12,11,0.35)] ring-1 ring-ink/[0.06] transition-all duration-700 ease-lux hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-35px_rgba(13,12,11,0.5)]"
    >
      <div className="relative aspect-[4/3.4] overflow-hidden">
        {cover ? (
          <img
            src={cover.sm}
            alt={cover.alt}
            loading="lazy"
            width={cover.w}
            height={cover.h}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-110"
          />
        ) : (
          <SheerPlaceholder className="h-full w-full transition-transform duration-[1.4s] ease-lux group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <span aria-hidden className="absolute top-4 left-4 font-serif text-2xl text-white italic drop-shadow">
          {String(index + 1).padStart(2, '0')}
        </span>
        {!cover && (
          <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur">
            Fabric samples on request
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg leading-snug font-extrabold tracking-tight">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{service.description}</p>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/[0.08] pt-5">
          {page ? (
            <a
              href={pagePath(page)}
              className="group/link inline-flex min-h-11 items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] whitespace-nowrap text-ink uppercase"
              aria-label={`${service.name}: see our work and details`}
            >
              View Work
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-[12px] font-bold tracking-[0.1em] whitespace-nowrap text-ink/65 uppercase">Samples in store</span>
          )}
          <a
            href={waLink(service.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] text-white uppercase transition-colors duration-300 hover:bg-gold hover:text-ink"
            aria-label={`Enquire on WhatsApp about ${service.name}`}
          >
            <IconWhatsApp className="h-3.5 w-3.5" />
            Enquire
          </a>
        </div>
      </div>
    </m.article>
  )
}

const SLIDE_MS = 4000
/** After a visitor touches or scrolls the row, auto-slide waits this long before carrying on. */
const IDLE_MS = 8000

/**
 * Auto-advances the phone swipe row every 4 seconds. Does nothing when the row
 * isn't scrollable (the tablet/desktop grid), when it's off screen, while the
 * visitor is using it, when paused, or when they prefer reduced motion.
 */
function useAutoSlide(count: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0) // read by the timer, so it isn't restarted on every slide
  const [paused, setPaused] = useState(false)
  const lastTouch = useRef(0)
  const onScreen = useRef(false)

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i] as HTMLElement | undefined
    if (!card) return
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0
    const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - pad
    track.scrollTo({ left, behavior: 'smooth' })
  }, [])

  // Track which card is in view, and note when the visitor takes over.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0
      const x = track.getBoundingClientRect().left + pad
      let best = 0
      let bestDist = Infinity
      Array.from(track.children).forEach((c, i) => {
        const d = Math.abs(c.getBoundingClientRect().left - x)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      activeRef.current = best
      setActive(best)
    }
    const touched = () => (lastTouch.current = Date.now())
    const io = new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting), { threshold: 0.4 })
    io.observe(track)
    track.addEventListener('scroll', onScroll, { passive: true })
    track.addEventListener('pointerdown', touched)
    track.addEventListener('touchstart', touched, { passive: true })
    track.addEventListener('wheel', touched, { passive: true })
    track.addEventListener('focusin', touched)
    return () => {
      io.disconnect()
      track.removeEventListener('scroll', onScroll)
      track.removeEventListener('pointerdown', touched)
      track.removeEventListener('touchstart', touched)
      track.removeEventListener('wheel', touched)
      track.removeEventListener('focusin', touched)
    }
  }, [])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      const track = trackRef.current
      if (!track || track.scrollWidth <= track.clientWidth + 1) return // grid layout: nothing to slide
      if (!onScreen.current || document.hidden || Date.now() - lastTouch.current < IDLE_MS) return
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8
      goTo(atEnd ? 0 : (activeRef.current + 1) % count)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [paused, count, goTo])

  return { trackRef, active, paused, setPaused, goTo, touch: () => (lastTouch.current = Date.now()) }
}

export default function Services() {
  const { trackRef, active, paused, setPaused, goTo, touch } = useAutoSlide(SERVICES.length)

  return (
    <section id="services" className="section relative bg-sand/60">
      <div className="container-lux">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Services"
            title={
              <>
                Everything your home needs, <Accent>beautifully</Accent> done.
              </>
            }
            text="From modern kitchens and custom wardrobes to elegant sofas, curtains and complete interior transformations."
          />
          <p className="max-w-xs text-sm leading-relaxed text-ink/65 lg:pb-3 lg:text-right">
            Every enquiry goes straight to our team on WhatsApp — tell us about your space and get a
            quotation.
          </p>
        </div>

        <p className="mt-10 text-sm font-semibold text-ink/70 sm:hidden">Swipe to see all {SERVICES.length} services →</p>
        {/* Phones: a swipeable row instead of stacked cards. Larger screens: a grid. */}
        <Stagger
          ref={trackRef}
          gap={0.08}
          className="scrollbar-none -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-2 pb-6 sm:mx-0 sm:scroll-px-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:p-0 lg:mt-20 lg:grid-cols-3 lg:gap-7"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </Stagger>

        {/* Phones only: position dots and a pause button for the auto-sliding row. */}
        <div className="flex items-center justify-center gap-3 sm:hidden">
          <div className="flex items-center" role="group" aria-label="Choose a service">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  touch()
                  goTo(i)
                }}
                aria-label={`Show ${s.name}`}
                aria-current={i === active ? 'true' : undefined}
                className="grid h-11 w-6 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ease-lux ${
                    i === active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/25'
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play service slideshow' : 'Pause service slideshow'}
            className="grid h-11 w-11 place-items-center rounded-full text-ink/70 ring-1 ring-ink/15 transition-colors hover:text-ink"
          >
            {paused ? <IconPlay className="h-4 w-4" /> : <IconPause className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </section>
  )
}
