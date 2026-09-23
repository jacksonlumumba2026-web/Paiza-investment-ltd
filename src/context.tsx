import { createContext, useContext } from 'react'
import type { CategoryId, Photo } from './data/gallery'

export type Filter = CategoryId | 'all'

type Ctx = {
  filter: Filter
  setFilter: (f: Filter) => void
  /** Sets the gallery filter and scrolls to "Our Work". */
  showWork: (f?: Filter) => void
  openLightbox: (photos: Photo[], index: number, label?: string) => void
}

export const SiteContext = createContext<Ctx | null>(null)

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside SiteContext')
  return ctx
}
