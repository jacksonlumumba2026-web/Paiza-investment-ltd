import { motion } from 'framer-motion'
import { photoById } from '../data/gallery'
import { useSite } from '../context'
import { IconArrow, IconArrowUpRight } from './icons'
import { Accent, Reveal, SectionHeading, Stagger, fadeUp } from './ui'

const FEATURED = [
  { id: '0214', label: 'Modern Kitchen', span: 'sm:col-span-2 lg:col-span-7 lg:row-span-2' },
  { id: '0192', label: 'Curtains & Sheers', span: 'lg:col-span-5 lg:row-span-2' },
  { id: '0243', label: 'Luxury Sofa', span: 'lg:col-span-4' },
  { id: '0160', label: 'Custom Wardrobe', span: 'lg:col-span-4' },
  { id: '0225', label: 'Recliner Sofa', span: 'sm:col-span-2 lg:col-span-4' },
  { id: '0030', label: 'Modern Kitchen', span: 'lg:col-span-5' },
  { id: '0196', label: 'Elegant Sofa', span: 'lg:col-span-7' },
].map((f) => ({ ...f, photo: photoById(f.id) }))

export default function Featured() {
  const { showWork, openLightbox } = useSite()
  const photos = FEATURED.map((f) => f.photo)

  return (
    <section className="section bg-cream">
      <div className="container-lux">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title={
              <>
                Spaces we’ve <Accent>transformed.</Accent>
              </>
            }
            text="Making every room a masterpiece — a selection of kitchens, wardrobes, curtains and living spaces by Paiza."
          />
          <Reveal className="shrink-0">
            <button type="button" onClick={() => showWork('all')} className="btn-outline-dark group">
              View all our work
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <Stagger
          gap={0.09}
          className="mt-14 grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[300px] lg:mt-20 lg:grid-cols-12 lg:gap-6"
        >
          {FEATURED.map((f, i) => (
            <motion.button
              key={`${f.id}-${i}`}
              type="button"
              variants={fadeUp}
              onClick={() => openLightbox(photos, i, 'Featured Projects')}
              className={`group relative overflow-hidden rounded-[26px] text-left ${f.span}`}
              aria-label={`${f.label} — view larger`}
            >
              <img
                src={i < 2 ? f.photo.lg : f.photo.sm}
                alt={f.photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-lux group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7">
                <div>
                  <p className="font-serif text-sm text-gold italic">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-2xl">{f.label}</p>
                </div>
                <span className="grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
                  <IconArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </motion.button>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
