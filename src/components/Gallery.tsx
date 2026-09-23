import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, PHOTOS, categoryTitle, photosFor, type Photo } from '../data/gallery'
import { useSite, type Filter } from '../context'
import { IconExpand, IconPlus } from './icons'
import { Accent, EASE, Reveal, SectionHeading } from './ui'

const PAGE = 15

function useColumns() {
  const get = () => (window.innerWidth >= 1024 ? 3 : 2)
  const [cols, setCols] = useState(get)
  useEffect(() => {
    const onResize = () => setCols(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return cols
}

/** Places each photo in the currently shortest column — true masonry, no cropping. */
function distribute(photos: Photo[], cols: number) {
  const columns: { photo: Photo; index: number }[][] = Array.from({ length: cols }, () => [])
  const heights = new Array(cols).fill(0)
  photos.forEach((photo, index) => {
    const c = heights.indexOf(Math.min(...heights))
    columns[c].push({ photo, index })
    heights[c] += photo.h / photo.w
  })
  return columns
}

export default function Gallery() {
  const { filter, setFilter, openLightbox } = useSite()
  const [visible, setVisible] = useState(PAGE)
  const cols = useColumns()

  const filters = useMemo(
    () => [
      { id: 'all' as Filter, label: 'All', count: PHOTOS.length },
      ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label, count: photosFor(c.id).length })).filter(
        (c) => c.count > 0,
      ),
    ],
    [],
  )

  const list = useMemo(() => photosFor(filter), [filter])
  const shown = list.slice(0, visible)
  const columns = useMemo(() => distribute(shown, cols), [shown, cols])

  useEffect(() => setVisible(PAGE), [filter])

  return (
    <section id="work" className="section relative bg-cream">
      <div className="container-lux">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Work"
            title={
              <>
                Explore our <Accent>designs.</Accent>
              </>
            }
            text="Take a look at some of the spaces, furniture and interior solutions we have worked on."
          />
          <Reveal className="shrink-0 lg:pb-3">
            <p className="text-sm text-ink/50">
              <span className="font-serif text-4xl text-ink italic">{list.length}</span>{' '}
              {filter === 'all' ? 'project photos' : `photos · ${categoryTitle(filter)}`}
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal className="sticky top-[68px] z-20 -mx-5 mt-12 bg-cream/85 px-5 py-3 backdrop-blur-lg sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:mt-16 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
          <div role="tablist" aria-label="Filter projects" className="scrollbar-none flex gap-2 overflow-x-auto lg:flex-wrap">
            {filters.map((f) => {
              const on = f.id === filter
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f.id)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-colors duration-300 ${
                    on ? 'text-ink' : 'text-ink/55 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/30'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="gallery-pill"
                      className="absolute inset-0 rounded-full bg-gold"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative">
                    {f.label}
                    <span className={`ml-1.5 ${on ? 'text-ink/60' : 'text-ink/30'}`}>{f.count}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Masonry */}
        <div className="mt-8 flex gap-3 sm:gap-4 lg:mt-10 lg:gap-6">
          {columns.map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:gap-6">
              <AnimatePresence initial={false} mode="popLayout">
                {col.map(({ photo, index }) => (
                  <motion.button
                    key={`${filter}-${photo.id}`}
                    type="button"
                    onClick={() => openLightbox(list, index)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: EASE, delay: (index % PAGE) * 0.04 }}
                    className="group relative block overflow-hidden rounded-2xl bg-sand text-left sm:rounded-[22px]"
                    style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
                    aria-label={`Open image: ${photo.alt}`}
                  >
                    <img
                      src={photo.sm}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      width={photo.w}
                      height={photo.h}
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 hidden translate-y-3 items-end justify-between gap-3 p-5 opacity-0 sm:flex transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-[11px] font-bold tracking-[0.18em] text-white uppercase">
                        {categoryTitle(photo.cats[0])}
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink">
                        <IconExpand className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-ink/10">
            <motion.div
              className="h-full bg-ink"
              animate={{ width: `${(shown.length / list.length) * 100}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
          <p className="text-xs font-semibold tracking-[0.18em] text-ink/45 uppercase">
            Showing {shown.length} of {list.length}
          </p>
          {visible < list.length && (
            <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn-dark group !px-8 !py-4">
              <IconPlus className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
              Load more
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
