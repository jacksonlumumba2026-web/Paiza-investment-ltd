import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { CATEGORIES, PHOTOS, categoryTitle, photosFor, srcSet, type CategoryId, type Photo } from '../data/gallery'
import { useSite, type Filter } from '../context'
import { IconExpand, IconPlus } from './icons'
import { Accent, EASE, Reveal, SectionHeading } from './ui'

const PAGE = 15

function useColumns() {
  // Starts at 3 so the pre-rendered HTML matches the first client render,
  // then adjusts to the real screen width.
  const [cols, setCols] = useState(3)
  useEffect(() => {
    const onResize = () => setCols(window.innerWidth >= 1024 ? 3 : 2)
    onResize()
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

/**
 * The homepage shows every category, filtered through the shared site state.
 * A service page passes `scope` to show only its own categories.
 */
export default function Gallery({
  scope,
  title,
  text,
}: {
  scope?: CategoryId[]
  title?: ReactNode
  text?: string
}) {
  const site = useSite()
  const [scopedFilter, setScopedFilter] = useState<Filter>('all')
  const filter = scope ? scopedFilter : site.filter
  const setFilter = scope ? setScopedFilter : site.setFilter
  const { openLightbox } = site
  const [visible, setVisible] = useState(PAGE)
  const cols = useColumns()

  const pool = useMemo(
    () => (scope ? PHOTOS.filter((p) => p.cats.some((c) => scope.includes(c))) : PHOTOS),
    [scope],
  )

  const filters = useMemo(() => {
    const cats = scope ? CATEGORIES.filter((c) => scope.includes(c.id)) : CATEGORIES
    const chips = cats
      .map((c) => ({ id: c.id as Filter, label: c.label, count: photosFor(c.id).length }))
      .filter((c) => c.count > 0)
    // A single-category page needs no filter bar.
    return chips.length > 1 ? [{ id: 'all' as Filter, label: 'All', count: pool.length }, ...chips] : []
  }, [scope, pool])

  const list = useMemo(() => (filter === 'all' ? pool : photosFor(filter)), [filter, pool])
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
              title ?? (
                <>
                  Explore our <Accent>designs.</Accent>
                </>
              )
            }
            text={text ?? 'Take a look at some of the spaces, furniture and interior solutions we have worked on.'}
          />
          <Reveal className="shrink-0 lg:pb-3">
            <p className="text-sm text-ink/65">
              <span className="font-serif text-4xl text-ink italic">{list.length}</span>{' '}
              {filter === 'all' ? 'project photos' : `photos · ${categoryTitle(filter)}`}
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        {filters.length > 0 && (
          <Reveal className="sticky top-[68px] z-20 -mx-5 mt-12 bg-cream/85 px-5 py-3 backdrop-blur-lg sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:mt-16 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
            <div role="group" aria-label="Filter projects by category" className="scrollbar-none flex gap-2 overflow-x-auto lg:flex-wrap">
              {filters.map((f) => {
                const on = f.id === filter
                return (
                  <button
                    key={f.id}
                    aria-pressed={on}
                    onClick={() => setFilter(f.id)}
                    className={`relative min-h-11 shrink-0 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-colors duration-300 ${
                      on ? 'text-ink' : 'text-ink/65 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/30'
                    }`}
                  >
                    {on && (
                      <m.span
                        layoutId="gallery-pill"
                        className="absolute inset-0 rounded-full bg-gold"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                    <span className="relative">
                      {f.label}
                      <span className={`ml-1.5 ${on ? 'text-ink/60' : 'text-ink/65'}`}>{f.count}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        )}

        {/* Masonry */}
        <div className={`flex gap-3 sm:gap-4 lg:gap-6 ${filters.length > 0 ? 'mt-8 lg:mt-10' : 'mt-12 lg:mt-16'}`}>
          {columns.map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:gap-6">
              <AnimatePresence initial={false} mode="popLayout">
                {col.map(({ photo, index }) => (
                  <m.button
                    key={`${filter}-${photo.id}`}
                    type="button"
                    onClick={() => openLightbox(list, index)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: EASE, delay: (index % PAGE) * 0.025 }}
                    className="group relative block overflow-hidden rounded-2xl bg-sand text-left sm:rounded-[22px]"
                    style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
                    aria-label={`Open image: ${photo.alt}`}
                  >
                    <img
                      src={photo.sm}
                      srcSet={srcSet(photo)}
                      sizes="(min-width: 1024px) 400px, 50vw"
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      width={photo.w}
                      height={photo.h}
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-[1.06]"
                    />
                    {(photo.name || photo.price) && (
                      <span className="absolute top-3 right-3 left-3 flex flex-wrap items-start gap-1.5 sm:top-4 sm:right-4 sm:left-4">
                        {photo.name && (
                          <span className="rounded-full bg-ink/80 px-3 py-1 text-[12px] font-bold tracking-[0.12em] text-gold uppercase backdrop-blur">
                            <span className="font-semibold text-white/80 normal-case tracking-normal">Model</span> {photo.name}
                          </span>
                        )}
                        {photo.price && (
                          <span className="rounded-full bg-gold px-3 py-1 text-[12px] font-extrabold tracking-[0.06em] text-ink">
                            {photo.price}
                          </span>
                        )}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 hidden translate-y-3 items-end justify-between gap-3 p-5 opacity-0 sm:flex transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-[12px] font-bold tracking-[0.18em] text-white uppercase">
                        {photo.name ?? categoryTitle(photo.cats[0])}
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink">
                        <IconExpand className="h-4 w-4" />
                      </span>
                    </div>
                  </m.button>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-ink/10">
            <m.div
              className="h-full bg-ink"
              animate={{ width: `${(shown.length / list.length) * 100}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
          <p className="text-xs font-semibold tracking-[0.18em] text-ink/65 uppercase">
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
