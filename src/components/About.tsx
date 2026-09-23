import { motion } from 'framer-motion'
import { photoById } from '../data/gallery'
import { Accent, Reveal, Stagger, fadeUp } from './ui'

const PILLARS = ['Design', 'Quality', 'Comfort', 'Craftsmanship', 'Installation', 'Customer Care']
const a = photoById('0206')
const b = photoById('0244')

export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden bg-charcoal text-white">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />

      <div className="container-lux relative grid gap-16 lg:grid-cols-12 lg:gap-20">
        <Stagger gap={0.12} className="lg:col-span-6">
          <motion.p variants={fadeUp} className="eyebrow text-gold">
            About Paiza Investment Ltd
          </motion.p>
          <motion.h2 variants={fadeUp} className="display mt-5 text-[40px] sm:text-5xl lg:text-[64px]">
            Transform your space. <Accent>Transform your life.</Accent>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 text-lg leading-relaxed text-white/65">
            At Paiza Investment Ltd, we transform ordinary spaces into beautiful, functional and
            comfortable environments. From modern kitchens and wardrobes to elegant sofas, curtains,
            TV panels and complete interior fit-outs, we bring design, quality and craftsmanship
            together to create spaces that feel truly yours.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.08] sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <li
                key={p}
                className="group bg-charcoal px-5 py-6 transition-colors duration-500 hover:bg-graphite"
              >
                <span className="font-serif text-sm text-gold/80 italic">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-[13px] font-bold tracking-[0.16em] uppercase">{p}</p>
              </li>
            ))}
          </motion.ul>
        </Stagger>

        <div className="relative grid grid-cols-5 gap-4 lg:col-span-6">
          <Reveal className="col-span-3 self-end">
            <img
              src={a.sm}
              alt={a.alt}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-[26px] object-cover"
            />
          </Reveal>
          <Reveal delay={0.15} className="col-span-2 self-start pt-0 lg:-mt-6">
            <img
              src={b.sm}
              alt={b.alt}
              loading="lazy"
              className="aspect-[3/5] w-full rounded-[26px] object-cover"
            />
            <div className="mt-4 rounded-[22px] bg-gold p-5 text-ink">
              <p className="font-serif text-2xl leading-tight italic">Modern Designs.</p>
              <p className="text-sm font-bold tracking-wide">Timeless Comfort.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
