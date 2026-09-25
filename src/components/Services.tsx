import { m } from 'framer-motion'
import { photoById } from '../data/gallery'
import { SERVICES, type Service } from '../data/services'
import { waLink } from '../data/site'
import { useSite } from '../context'
import { IconArrowUpRight, IconWhatsApp } from './icons'
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
  const { showWork } = useSite()
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
          {service.category ? (
            <button
              type="button"
              onClick={() => showWork(service.category!)}
              className="group/link inline-flex min-h-11 items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] whitespace-nowrap text-ink uppercase"
            >
              View Work
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </button>
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

export default function Services() {
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
        {/* Phones: a swipeable row instead of eight stacked cards. Larger screens: a grid. */}
        <Stagger
          gap={0.08}
          className="scrollbar-none -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-2 pb-8 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:p-0 lg:mt-20 lg:gap-7 xl:grid-cols-4"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
