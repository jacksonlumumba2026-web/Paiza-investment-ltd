import meta from './image-meta.json'

export type CategoryId =
  | 'kitchens'
  | 'sofas'
  | 'arabic'
  | 'recliners'
  | 'tv-panels'
  | 'gypsum'
  | 'wardrobes'
  | 'office'
  | 'installations'

export const CATEGORIES: { id: CategoryId; label: string; title: string }[] = [
  { id: 'kitchens', label: 'Kitchens', title: 'Modern Kitchens' },
  { id: 'sofas', label: 'Sofas', title: 'Elegant Sofas' },
  { id: 'arabic', label: 'Arabic Designs', title: 'Arabic Sofa Designs' },
  { id: 'recliners', label: 'Recliners', title: 'Recliner Sofas' },
  { id: 'tv-panels', label: 'TV Panels', title: 'TV Panel Designs' },
  { id: 'gypsum', label: 'Gypsum', title: 'Gypsum Design Works' },
  { id: 'wardrobes', label: 'Wardrobes & Storage', title: 'Wardrobes & Built-in Storage' },
  { id: 'office', label: 'Office Furniture', title: 'Office Furniture' },
  { id: 'installations', label: 'Installations', title: 'Supply & Fitting' },
]

export const categoryTitle = (id: CategoryId | 'all') =>
  id === 'all' ? 'All Projects' : (CATEGORIES.find((c) => c.id === id)?.title ?? '')

export type Photo = {
  id: string
  alt: string
  cats: CategoryId[]
  w: number
  h: number
  sm: string
  lg: string
}

const dims = meta as Record<string, { w: number; h: number }>
const photo = (id: string, cats: CategoryId[], alt: string): Photo => ({
  id,
  alt,
  cats,
  w: dims[id].w,
  h: dims[id].h,
  sm: `work/${id}-sm.webp`,
  lg: `work/${id}-lg.webp`,
})

/**
 * Curated order: the gallery opens on the strongest images and alternates
 * categories so the first screen shows the full range of work.
 * The first category in `cats` is the photo's primary label.
 */
export const PHOTOS: Photo[] = [
  photo('0214', ['kitchens'], 'Open-plan kitchen with dark stone island, timber cabinetry and warm downlights'),
  photo('0243', ['arabic'], 'Arabic-style velvet sofa set with gold trim and a round coffee table'),
  photo('0211', ['tv-panels', 'gypsum'], 'Marble-effect TV wall panel with lit display shelving under a gypsum ceiling'),
  photo('0221', ['sofas'], 'Large tan L-shaped sectional sofa with scatter cushions'),
  photo('0218', ['kitchens'], 'L-shaped timber kitchen with glass-front wall units and a stone island'),
  photo('0225', ['recliners'], 'Three-piece leather-look recliner set in a bright living room'),
  photo('0241', ['arabic'], 'Grey tufted Arabic-design sofa and matching armchair with gold detailing'),
  photo('0206', ['kitchens'], 'Kitchen island with black sintered-stone top and timber panelling'),
  photo('0212', ['sofas'], 'White fabric chaise sectional with a dark coffee table'),
  photo('0244', ['arabic'], 'Emerald and cream Arabic-style living room sofa set'),
  photo('0216', ['kitchens'], 'Grey high-gloss kitchen with black glass splashback'),
  photo('0219', ['sofas'], 'Cream sofa collection arranged in the showroom'),
  photo('0230', ['recliners'], 'Charcoal recliner sofa with patterned cushions'),
  photo('0205', ['kitchens'], 'Grey gloss kitchen with chimney hood and warm under-cabinet lighting'),
  photo('0242', ['arabic'], 'Champagne Arabic-style sofa set with gold-accented base'),
  photo('0210', ['sofas'], 'Brown suede corner sofa in a family living room'),
  photo('0215', ['wardrobes', 'installations'], 'Built-in white shelving and storage unit'),
  photo('0208', ['kitchens'], 'Modern kitchen with black splashback, chimney hood and integrated appliances'),
  photo('0238', ['office'], 'Executive office desk with white pedestal and oak top'),
  photo('0222', ['sofas'], 'Camel sectional sofa with grey accent cushions'),
  photo('0220', ['tv-panels', 'installations'], 'Fluted wall panel and floating unit being measured during fitting'),
  photo('0226', ['sofas'], 'Taupe chaise sectional sofa'),
  photo('0217', ['kitchens', 'installations'], 'Cream kitchen with tall pantry unit and dark worktop'),
  photo('0235', ['office'], 'Executive office desk in mahogany finish with leather chair'),
  photo('0239', ['office'], 'Dark walnut executive desk with Paiza branding'),
  photo('0223', ['sofas'], 'White and grey accent armchair'),
  photo('0209', ['sofas'], 'Soft grey armchair with patterned cushion on a diamond rug'),
  photo('0229', ['sofas'], 'Accent armchair with timber side frame'),
  photo('0213', ['kitchens', 'installations'], 'Kitchen base cabinets being installed with marble-effect worktop'),
  photo('0224', ['kitchens', 'installations'], 'Cream base cabinets and sink unit freshly fitted'),
  photo('0234', ['office'], 'Oak executive office desk with return and black office chair'),
  photo('0240', ['office'], 'Home and office desk in mahogany and black'),
  photo('0236', ['office'], 'Study desk with mint pedestal drawers'),
  photo('0231', ['office'], 'Grey and white executive desk, two views'),
  photo('0232', ['office'], 'Oak executive desk with side cabinet, two views'),
  photo('0233', ['office'], 'Oak desk with fluted modesty panel, two views'),
]

export const photoById = (id: string) => PHOTOS.find((p) => p.id === id)!

export const photosFor = (cat: CategoryId | 'all') =>
  cat === 'all' ? PHOTOS : PHOTOS.filter((p) => p.cats.includes(cat))
