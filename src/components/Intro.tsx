import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { photoById } from '../data/gallery'
import { IconArrow } from './icons'
import { Accent, Reveal, Stagger, fadeUp } from './ui'

const main = photoById('0218')
const detail = photoById('0241')

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section className="section overflow-hidden bg-cream">
      <div className="container-lux grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div ref={ref} className="relative lg:col-span-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(13,12,11,0.45)]">
              <img
                src={main.lg}
                alt={main.alt}
                loading="lazy"
                width={main.w}
                height={main.h}
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] ease-lux hover:scale-105 sm:aspect-[5/5]"
              />
            </div>
          </Reveal>
          <motion.div
            style={{ y }}
            className="absolute -right-4 -bottom-10 w-[46%] overflow-hidden rounded-3xl border-[6px] border-cream shadow-2xl sm:-right-10 lg:-right-14"
          >
            <img src={detail.sm} alt={detail.alt} loading="lazy" className="aspect-square w-full object-cover" />
          </motion.div>
          <div className="absolute top-6 -left-3 rounded-full bg-ink px-4 py-2 text-[10px] font-bold tracking-[0.22em] text-gold uppercase shadow-xl sm:-left-6">
            Real Paiza projects
          </div>
        </div>

        <Stagger gap={0.12} className="pt-10 lg:col-span-6 lg:pt-0">
          <motion.p variants={fadeUp} className="eyebrow text-ember">
            Welcome to Paiza
          </motion.p>
          <motion.h2 variants={fadeUp} className="display mt-5 text-[40px] sm:text-5xl lg:text-[64px]">
            Beautiful Spaces. <Accent>Thoughtfully</Accent> Designed.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-ink/65">
            At Paiza Investment Ltd, we bring together modern design, quality craftsmanship and
            professional installation to transform homes and interiors into beautiful, functional
            spaces.
          </motion.p>

          <motion.blockquote
            variants={fadeUp}
            className="mt-10 border-l-2 border-gold pl-6 font-serif text-2xl leading-snug text-ink italic sm:text-[28px]"
          >
            “We don’t just furnish homes, we create experiences.”
          </motion.blockquote>

          <motion.dl variants={fadeUp} className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
            {[
              ['Your Vision', 'Our starting point'],
              ['Our Expertise', 'Design to fitting'],
              ['Beautiful Living', 'The result'],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="text-sm font-extrabold tracking-tight sm:text-base">{t}</dt>
                <dd className="mt-1 text-xs text-ink/50 sm:text-sm">{d}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} className="mt-10">
            <a href="#services" className="btn-dark group !px-7 !py-4">
              Explore Our Services
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </Stagger>
      </div>
    </section>
  )
}
