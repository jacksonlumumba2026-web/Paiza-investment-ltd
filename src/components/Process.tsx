import { motion } from 'framer-motion'
import { Accent, EASE, SectionHeading, Stagger, fadeUp } from './ui'

const STEPS = [
  { title: 'Consultation', text: 'Discuss your space, style and requirements.' },
  { title: 'Design', text: 'Develop a solution around your vision.' },
  { title: 'Supply & Fitting', text: 'Professional supply and installation.' },
  { title: 'Transform', text: 'Enjoy your completed space.' },
]

export default function Process() {
  return (
    <section className="section relative overflow-hidden bg-sand/60">
      <div className="container-lux">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Four steps to a <Accent>masterpiece.</Accent>
            </>
          }
          text="A simple, guided journey — from the first WhatsApp message to the day you enjoy your finished space."
        />

        <div className="relative mt-16 lg:mt-24">
          {/* Timeline rail */}
          <div className="absolute top-7 right-0 left-0 hidden h-px bg-ink/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-gold via-gold to-ember"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
            />
          </div>
          <div className="absolute top-0 bottom-0 left-7 w-px bg-ink/10 lg:hidden" />

          <Stagger as="ul" gap={0.18} delay={0.2} className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <motion.li key={s.title} variants={fadeUp} className="relative flex gap-6 lg:block">
                <span
                  className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full font-serif text-xl italic shadow-lg ${
                    i === STEPS.length - 1 ? 'bg-gold text-ink' : 'bg-ink text-gold'
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="lg:mt-8 lg:pr-6">
                  <h3 className="text-xl font-extrabold tracking-tight uppercase lg:text-2xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/60">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
