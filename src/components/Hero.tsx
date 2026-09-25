import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { photoById } from '../data/gallery'
import { SERVICES } from '../data/services'
import { SITE, waLink } from '../data/site'
import { useSite } from '../context'
import { IconArrow, IconWhatsApp } from './icons'
import { Accent, EASE } from './ui'

const hero = photoById('0214')
const inset = photoById('0243')

export default function Hero() {
  const { showWork } = useSite()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  })

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: imgY }}>
        <motion.img
          src={hero.lg}
          alt={hero.alt}
          width={hero.w}
          height={hero.h}
          fetchPriority="high"
          className="h-[115%] w-full object-cover object-center"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-lux grid w-full gap-12 pt-36 pb-14 sm:pb-20 lg:grid-cols-12 lg:items-end lg:pb-24"
      >
        <div className="lg:col-span-8">
          <motion.p {...line(0.2)} className="eyebrow text-gold">
            {SITE.name}
          </motion.p>

          <h1 className="display mt-6 text-[46px] sm:text-7xl lg:text-[88px] xl:text-[100px]">
            <span className="block overflow-hidden pb-2">
              <motion.span {...line(0.35)} className="block">
                Designing Spaces,
              </motion.span>
            </span>{' '}
            <span className="block overflow-hidden pb-3">
              <motion.span {...line(0.5)} className="block">
                <Accent>Elevating</Accent> Lifestyles<span className="text-gold">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...line(0.7)}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Premium home furnishings and interior fit-out solutions designed to transform your space
            with style, quality and comfort.
          </motion.p>

          <motion.div {...line(0.85)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold !px-7 !py-4">
              <IconWhatsApp className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <button type="button" onClick={() => showWork('all')} className="btn-ghost-light group !px-7 !py-4">
              Explore Our Work
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.ul
            {...line(1)}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] font-semibold tracking-[0.18em] text-white/55 uppercase"
          >
            {['Style', 'Quality', 'Comfort'].map((w, i) => (
              <li key={w} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-ember" />}
                {w}
              </li>
            ))}
            <li className="hidden items-center gap-6 sm:flex">
              <span className="h-4 w-px bg-white/20" />
              Supply &amp; fitting countrywide
            </li>
          </motion.ul>
        </div>

        {/* Floating expertise card */}
        <motion.aside
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1 }}
          className="glass-dark hidden rounded-3xl p-5 shadow-2xl shadow-black/40 lg:col-span-4 lg:block"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img src={inset.sm} alt={inset.alt} width={inset.w} height={inset.h} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <span className="absolute top-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[12px] font-bold tracking-[0.2em] text-gold uppercase backdrop-blur">
              Arabic Design
            </span>
          </div>
          <p className="mt-5 text-[12px] font-bold tracking-[0.24em] text-white/50 uppercase">Our expertise</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a
                  href="#services"
                  className="block rounded-full border border-white/10 px-3 py-1.5 text-[12px] font-medium text-white/80 transition hover:border-gold/60 hover:text-white"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.aside>
      </motion.div>

    </section>
  )
}
