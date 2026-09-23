import { motion } from 'framer-motion'
import { IconCompass, IconDiamond, IconHeart, IconTools, IconTruck } from './icons'
import { Stagger, fadeUp } from './ui'

const VALUES = [
  { icon: IconDiamond, label: 'Premium Quality' },
  { icon: IconCompass, label: 'Expert Designs' },
  { icon: IconTools, label: 'Professional Installation' },
  { icon: IconHeart, label: 'Excellent Customer Care' },
  { icon: IconTruck, label: 'Supply & Fitting' },
]

export default function TrustBar() {
  return (
    <section id="values" aria-label="Our promise" className="relative border-y border-white/[0.06] bg-charcoal text-white">
      <Stagger
        as="ul"
        gap={0.08}
        className="container-lux grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      >
        {VALUES.map(({ icon: Icon, label }, i) => (
          <motion.li
            key={label}
            variants={fadeUp}
            className={`group flex items-center gap-4 py-7 lg:justify-center lg:py-9 ${
              i === VALUES.length - 1 ? 'col-span-2 sm:col-span-1' : ''
            } ${i > 0 ? 'lg:border-l lg:border-white/[0.07]' : ''}`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/25 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] leading-tight font-bold tracking-[0.18em] text-white/80 uppercase sm:text-xs">
              {label}
            </span>
          </motion.li>
        ))}
      </Stagger>
    </section>
  )
}
