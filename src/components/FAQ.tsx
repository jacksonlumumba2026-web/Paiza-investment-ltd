import { motion } from 'framer-motion'
import { FAQS } from '../data/faq'
import { waLink } from '../data/site'
import { IconPlus, IconWhatsApp } from './icons'
import { Accent, Reveal, SectionHeading, Stagger, fadeUp } from './ui'

export default function FAQ() {
  return (
    <section id="faq" className="section bg-sand/60">
      <div className="container-lux grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions, <Accent>answered.</Accent>
              </>
            }
            text="Everything you need to know before you start your project. Can't find your answer? Ask us directly."
          />
          <Reveal className="mt-10">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-dark !py-4">
              <IconWhatsApp className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>

        {/* Native <details> keeps every answer in the page HTML for search engines. */}
        <Stagger gap={0.07} className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-7">
          {FAQS.map(({ q, a }, i) => (
            <motion.details key={q} variants={fadeUp} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-extrabold tracking-tight [&::-webkit-details-marker]:hidden">
                <h3>{q}</h3>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 transition-all duration-500 ease-lux group-open:rotate-45 group-open:border-gold group-open:bg-gold">
                  <IconPlus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pr-16 pb-7 leading-relaxed text-ink/65">{a}</p>
            </motion.details>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
