import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { photoById, type Photo } from '../data/gallery'
import { SERVICES } from '../data/services'
import { waLink } from '../data/site'
import { useSite } from '../context'
import { IconArrow, IconExpand, IconWhatsApp } from './icons'
import { SheerPlaceholder } from './Services'
import { Accent, EASE, SectionHeading } from './ui'

function Mosaic({ photos, label }: { photos: Photo[]; label: string }) {
  const { openLightbox } = useSite()
  const shown = photos.slice(0, 5)
  const n = shown.length

  // Adaptive layouts so services with fewer photos still look intentional.
  const layout =
    n >= 5
      ? ['col-span-2 row-span-2', '', '', '', '']
      : n === 4
        ? ['col-span-2 row-span-2', '', '', 'col-span-2']
        : n === 3
          ? ['col-span-2 row-span-2', 'col-span-2', 'col-span-2']
          : n === 2
            ? ['col-span-4 row-span-2', 'col-span-4 row-span-1']
            : ['col-span-4 row-span-3']

  return (
    <div className="grid auto-rows-[110px] grid-cols-4 gap-3 sm:auto-rows-[150px] lg:auto-rows-[140px] xl:auto-rows-[160px]">
      {shown.map((p, i) => (
        <button
          key={p.id}
          type="button"
          onClick={() => openLightbox(photos, i, label)}
          className={`group relative overflow-hidden rounded-2xl ${layout[i]}`}
          aria-label={`Open image: ${p.alt}`}
        >
          <img
            src={i === 0 ? p.lg : p.sm}
            alt={p.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30" />
          <span className="absolute right-3 bottom-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <IconExpand className="h-4 w-4" />
          </span>
        </button>
      ))}
    </div>
  )
}

export default function ServiceShowcase() {
  const [activeId, setActiveId] = useState(SERVICES[0].id)
  const { showWork } = useSite()
  const active = SERVICES.find((s) => s.id === activeId)!
  const photos = active.showcase.map(photoById)

  return (
    <section className="section relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute top-0 -left-40 h-[520px] w-[520px] rounded-full bg-gold/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-ember/[0.08] blur-[120px]" />

      <div className="container-lux relative">
        <SectionHeading
          dark
          eyebrow="Service Collections"
          title={
            <>
              See the work, <Accent>service by service.</Accent>
            </>
          }
          text="Pick a service to see a selection of our strongest real projects — then open the full gallery or enquire directly."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Services"
            className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
          >
            {SERVICES.map((s, i) => {
              const on = s.id === activeId
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveId(s.id)}
                  className={`group relative flex shrink-0 items-center gap-4 rounded-full border px-5 py-3 text-left transition-all duration-500 lg:rounded-none lg:border-0 lg:border-b lg:border-white/[0.08] lg:px-0 lg:py-5 ${
                    on
                      ? 'border-gold bg-gold text-ink lg:bg-transparent lg:text-white'
                      : 'border-white/10 text-white/55 hover:text-white'
                  }`}
                >
                  <span
                    className={`hidden font-serif text-lg italic transition-colors lg:inline ${
                      on ? 'text-gold' : 'text-white/30'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold whitespace-nowrap lg:text-lg lg:font-extrabold lg:tracking-tight lg:whitespace-normal">
                    {s.name}
                  </span>
                  {on && (
                    <motion.span
                      layoutId="showcase-bar"
                      className="absolute bottom-[-1px] left-0 hidden h-px w-full bg-gold lg:block"
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Panel */}
          <div className="lg:col-span-8" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {photos.length > 0 ? (
                  <Mosaic photos={photos} label={active.name} />
                ) : (
                  <div className="relative overflow-hidden rounded-2xl">
                    <SheerPlaceholder className="h-[360px] w-full sm:h-[480px]" />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                      <p className="max-w-md font-serif text-3xl leading-tight italic sm:text-4xl">
                        Soft light, total privacy, tailored to every window.
                      </p>
                      <p className="mt-3 max-w-md text-sm text-white/60">
                        Ask us on WhatsApp for fabric options, colours and a measurement visit.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-extrabold tracking-tight">{active.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{active.description}</p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                    {active.category && (
                      <button
                        type="button"
                        onClick={() => showWork(active.category!)}
                        className="btn-ghost-light group !py-3"
                      >
                        {active.galleryLabel}
                        <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </button>
                    )}
                    <a
                      href={waLink(active.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold !py-3"
                    >
                      <IconWhatsApp className="h-4 w-4" />
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
