import { motion } from 'framer-motion'
import {
  IconCompass,
  IconDiamond,
  IconHeart,
  IconLayers,
  IconTools,
  IconTruck,
} from './icons'
import { Accent, SectionHeading, Stagger, fadeUp } from './ui'

const REASONS = [
  { icon: IconDiamond, title: 'Premium Quality', text: 'Quality-focused furnishing and interior solutions.' },
  { icon: IconCompass, title: 'Modern Designs', text: 'Contemporary designs created for modern living.' },
  { icon: IconTools, title: 'Professional Installation', text: 'Professional supply and fitting.' },
  { icon: IconLayers, title: 'Custom Interior Solutions', text: 'Solutions designed around your space and requirements.' },
  { icon: IconTruck, title: 'Countrywide Service', text: 'Supply and fitting available countrywide.' },
  { icon: IconHeart, title: 'Excellent Customer Care', text: 'Support throughout your project.' },
]

export default function WhyChoose() {
  return (
    <section className="section bg-cream">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Why Choose Paiza?"
          title={
            <>
              Your vision. Our expertise. <Accent>Beautiful living.</Accent>
            </>
          }
        />

        <Stagger gap={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-7">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[26px] border border-ink/[0.07] bg-white p-8 transition-all duration-700 ease-lux hover:-translate-y-1 hover:border-transparent hover:bg-ink hover:shadow-[0_40px_70px_-35px_rgba(13,12,11,0.6)] lg:p-10"
            >
              <span className="pointer-events-none absolute top-5 right-7 font-serif text-7xl leading-none text-ink/[0.04] italic transition-colors duration-700 group-hover:text-white/[0.05]">
                {i + 1}
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sand text-ink transition-all duration-700 group-hover:bg-gold">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-8 text-xl font-extrabold tracking-tight transition-colors duration-700 group-hover:text-white">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink/60 transition-colors duration-700 group-hover:text-white/60">
                {text}
              </p>
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-gold to-ember transition-all duration-700 ease-lux group-hover:w-full" />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
