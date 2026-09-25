import { m } from 'framer-motion'
import { photoById } from '../data/gallery'
import { Accent, Reveal, Stagger, fadeUp } from './ui'

const a = photoById('0218')
const b = photoById('0244')

export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden bg-charcoal text-white">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />

      <div className="container-lux relative grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <Stagger gap={0.08} className="lg:col-span-6">
          <m.p variants={fadeUp} className="eyebrow text-gold">
            About Paiza Investment Ltd
          </m.p>
          <m.h2 variants={fadeUp} className="display mt-5 text-[40px] sm:text-5xl lg:text-[64px]">
            Beautiful spaces. <Accent>Thoughtfully designed.</Accent>
          </m.h2>
          <m.p variants={fadeUp} className="mt-8 text-lg leading-relaxed text-white/75">
            From modern kitchens and wardrobes to elegant sofas, curtains, TV panels and complete
            interior fit-outs, we bring design, quality craftsmanship and professional installation
            together to create spaces that feel truly yours.
          </m.p>
          <m.blockquote
            variants={fadeUp}
            className="mt-10 border-l-2 border-gold pl-6 font-serif text-2xl leading-snug italic sm:text-[28px]"
          >
            “We don’t just furnish homes, we create experiences.”
          </m.blockquote>
        </Stagger>

        <div className="relative grid grid-cols-5 gap-4 lg:col-span-6">
          <Reveal className="col-span-3 self-end">
            <img
              src={a.sm}
              alt={a.alt}
              loading="lazy"
              width={a.w}
              height={a.h}
              className="aspect-[3/4] w-full rounded-[26px] object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="col-span-2 self-start">
            <img
              src={b.sm}
              alt={b.alt}
              loading="lazy"
              width={b.w}
              height={b.h}
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
