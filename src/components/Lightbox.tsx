import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { categoryTitle, type Photo } from '../data/gallery'
import { waLink } from '../data/site'
import { IconChevronLeft, IconChevronRight, IconClose, IconWhatsApp } from './icons'
import { EASE } from './ui'

export type LightboxState = { photos: Photo[]; index: number; label?: string } | null

const pad = (n: number) => String(n).padStart(2, '0')

export default function Lightbox({ state, onClose }: { state: LightboxState; onClose: () => void }) {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 0])

  useEffect(() => {
    if (state) setIndex([state.index, 0])
  }, [state])

  const total = state?.photos.length ?? 0
  const go = useCallback(
    (d: number) => setIndex(([i]) => [(i + d + total) % total, d]),
    [total],
  )

  useEffect(() => {
    if (!state) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [state, go, onClose])

  // Preload neighbours so next/previous feel instant.
  useEffect(() => {
    if (!state) return
    ;[1, -1].forEach((d) => {
      const p = state.photos[(index + d + total) % total]
      if (p) new Image().src = p.lg
    })
  }, [state, index, total])

  const photo = state?.photos[index]
  const label = photo ? (state?.label ?? categoryTitle(photo.cats[0])) : ''

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
  }

  return (
    <AnimatePresence>
      {state && photo && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-ink/[0.97] text-white backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} image viewer`}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-6">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold tracking-[0.24em] text-gold uppercase">{label}</p>
              <p className="mt-1 font-serif text-2xl italic">
                {pad(index + 1)} <span className="text-white/35">/ {pad(total)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition hover:border-white/50 hover:bg-white/10"
              aria-label="Close"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          {/* Image stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 sm:px-20">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={photo.id + index}
                src={photo.lg}
                alt={photo.alt}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.98 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.98 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
                drag={total > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                className="max-h-full max-w-full cursor-grab touch-pan-y rounded-lg object-contain select-none active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 hidden h-14 w-14 place-items-center rounded-full border border-white/15 bg-ink/40 backdrop-blur transition hover:border-gold hover:bg-gold hover:text-ink sm:left-6 sm:grid"
                  aria-label="Previous image"
                >
                  <IconChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 hidden h-14 w-14 place-items-center rounded-full border border-white/15 bg-ink/40 backdrop-blur transition hover:border-gold hover:bg-gold hover:text-ink sm:right-6 sm:grid"
                  aria-label="Next image"
                >
                  <IconChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
            <div className="max-w-xl">
              {photo.name && (
                <p className="text-lg font-extrabold tracking-[0.12em] text-white uppercase">{photo.name}</p>
              )}
              <p className="text-sm text-white/55">{photo.name ? photo.alt.replace(`${photo.name} — `, '') : photo.alt}</p>
            </div>
            <div className="flex items-center gap-3">
              {total > 1 && (
                <div className="flex gap-2 sm:hidden">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/15"
                    aria-label="Previous image"
                  >
                    <IconChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/15"
                    aria-label="Next image"
                  >
                    <IconChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
              <a
                href={waLink(
                  `Hello Paiza Investment Ltd, I saw this design on your website (${
                    photo.name ? `${photo.name}, ` : ''
                  }${categoryTitle(photo.cats[0])}, photo ${photo.id}). I would like to get more information and a quotation.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 !py-3 sm:flex-none"
              >
                <IconWhatsApp className="h-4 w-4" />
                Enquire about this
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
