import { motion } from 'framer-motion'
import { photoById } from '../data/gallery'
import { waLink } from '../data/site'
import { useSite } from '../context'
import { IconArrow, IconWhatsApp } from './icons'
import { Accent, Stagger, fadeUp } from './ui'

const bg = photoById('0211')

export default function FinalCTA() {
  const { showWork } = useSite()
  return (
    <section className="bg-cream px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-ink text-white">
        <img
          src={bg.lg}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink/85 to-ink/40" />
        <div className="absolute -right-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-gold/25 blur-[100px]" />

        <Stagger gap={0.12} className="container-lux py-24 text-center sm:py-32 lg:py-40">
          <motion.p variants={fadeUp} className="eyebrow justify-center text-gold">
            Let’s talk
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="display mx-auto mt-6 max-w-4xl text-[44px] sm:text-6xl lg:text-[88px]"
          >
            Ready to <Accent>transform</Accent> your space?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            Let’s discuss your vision and create a space that reflects your style, quality and comfort.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold !px-8 !py-5">
              <IconWhatsApp className="h-5 w-5" />
              Chat with us on WhatsApp
            </a>
            <button type="button" onClick={() => showWork('all')} className="btn-ghost-light group !px-8 !py-5">
              Explore our work
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </Stagger>
      </div>
    </section>
  )
}
