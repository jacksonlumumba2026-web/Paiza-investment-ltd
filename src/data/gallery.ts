import meta from './image-meta.json'

export type CategoryId =
  | 'kitchens'
  | 'wardrobes'
  | 'gypsum'
  | 'tv-panels'
  | 'curtains'
  | 'recliners'
  | 'sofas'
  | 'arabic'
  | 'office'
  | 'installations'

export const CATEGORIES: { id: CategoryId; label: string; title: string }[] = [
  { id: 'kitchens', label: 'Kitchens', title: 'Modern Kitchens' },
  { id: 'wardrobes', label: 'Wardrobes', title: 'Modern Wardrobes' },
  { id: 'gypsum', label: 'Gypsum', title: 'Gypsum Design Works' },
  { id: 'tv-panels', label: 'TV Panels', title: 'TV Panel Designs' },
  { id: 'curtains', label: 'Curtains', title: 'Curtains & Sheers' },
  { id: 'recliners', label: 'Recliners', title: 'Recliner Sofas' },
  { id: 'sofas', label: 'Sofas', title: 'Elegant Sofas' },
  { id: 'arabic', label: 'Arabic Designs', title: 'Arabic Sofa Designs' },
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

/** [photo id, alt text, extra categories] — the group's category is always first. */
type Entry = [id: string, alt: string, extra?: CategoryId[]]

const group = (cat: CategoryId, entries: Entry[]): Photo[] =>
  entries.map(([id, alt, extra = []]) => {
    if (!dims[id]) throw new Error(`Photo ${id} is missing — run "npm run images"`)
    return {
      id,
      alt,
      cats: [cat, ...extra],
      w: dims[id].w,
      h: dims[id].h,
      sm: `work/${id}-sm.webp`,
      lg: `work/${id}-lg.webp`,
    }
  })

/*
 * Each group is ordered strongest-first. To add a photo: run `npm run images`,
 * then add an entry to the right group below.
 */
const KITCHENS = group('kitchens', [
  ['0214', 'Open-plan kitchen with dark stone island, timber cabinetry and warm downlights'],
  ['0030', 'Marble waterfall island kitchen with bar seating and warm cove lighting'],
  ['0039', 'Cream L-shaped kitchen with lit glass display cabinets'],
  ['0218', 'L-shaped timber kitchen with glass-front wall units and a stone island'],
  ['0073', 'Two-tone kitchen with white island, grey units and dark worktop'],
  ['0023', 'Taupe and walnut kitchen with lit glass pantry and cove ceiling'],
  ['0038', 'Charcoal and walnut kitchen with breakfast island'],
  ['0026', 'Cream kitchen with open lit shelving and integrated fridge'],
  ['0036', 'Taupe kitchen with long island and integrated appliances'],
  ['0206', 'Kitchen island with black sintered-stone top and timber panelling'],
  ['0188', 'Sage and walnut kitchen with glass splashback'],
  ['0183', 'Green and walnut kitchen with hexagon-tile splashback'],
  ['0040', 'Cream fitted kitchen with tall appliance wall and lit spice shelves'],
  ['0055', 'Charcoal kitchen with open walnut shelving'],
  ['0028', 'Warm grey L-shaped kitchen with open shelving'],
  ['0031', 'Oak and cream compact kitchen with built-in ovens'],
  ['0216', 'Grey high-gloss kitchen with black glass splashback'],
  ['0204', 'Timber kitchen with stone island and chimney hood'],
  ['0064', 'Timber kitchen with stone island and glossy grey wall units'],
  ['0203', 'Timber kitchen with glass-front wall units and built-in oven'],
  ['0205', 'Grey gloss kitchen with chimney hood and warm under-cabinet lighting'],
  ['0208', 'Modern kitchen with black splashback, chimney hood and integrated appliances'],
  ['0202', 'Grey gloss kitchen with black splashback'],
  ['0118', 'Sage utility and laundry cabinetry with open shelving'],
  ['0217', 'Cream kitchen with tall pantry unit and dark worktop', ['installations']],
  ['0201', 'Cream kitchen with tall pantry unit and wall cabinets', ['installations']],
  ['0213', 'Kitchen base cabinets being installed with marble-effect worktop', ['installations']],
  ['0224', 'Cream base cabinets and sink unit freshly fitted', ['installations']],
  ['0141', 'Kitchen units being installed on site', ['installations']],
])

const CURTAINS = group('curtains', [
  ['0192', 'Floor-to-ceiling wave curtains and sheers in a living room'],
  ['0198', 'Wave curtains and sheers beside a dining area'],
  ['0109', 'Grey patterned curtains with white sheer'],
  ['0184', 'Brown eyelet curtains with linen sheer'],
  ['0136', 'Deep red curtains with white sheer'],
  ['0112', 'Emerald curtains with embroidered white sheer and pearl tie-back'],
  ['0144', 'Mustard yellow curtains with patterned sheer'],
  ['0135', 'Blue embroidered luxury curtains with gold detailing'],
  ['0191', 'Mocha wave curtains with sheer'],
  ['0197', 'Mocha wave curtains framing a window'],
  ['0114', 'Green jacquard curtains paired with embroidered cream sheers'],
  ['0175', 'Mocha curtains with embroidered sheer and pearl tie-back'],
  ['0149', 'Raspberry curtains with white sheer'],
  ['0181', 'Chocolate curtains with ivory sheers'],
  ['0154', 'Teal curtains with printed sheer'],
  ['0153', 'Navy blackout curtain with silver damask sheer'],
  ['0143', 'Marble-print curtains with white sheer'],
  ['0177', 'Slate grey curtains with ivory sheer'],
  ['0179', 'Dusty rose curtains with ivory panels'],
  ['0187', 'Beige curtains with embroidered sheer'],
  ['0189', 'Grey pleated curtains with tie-backs'],
  ['0176', 'Cream textured curtains'],
  ['0182', 'Taupe pleated curtains'],
  ['0186', 'Caramel pleated curtains'],
  ['0122', 'Ivory damask curtain fabric in soft pleats'],
  ['0116', 'Silver-grey floral jacquard curtain fabric'],
  ['0195', 'Grey textured curtain fabric'],
  ['0128', 'Soft white sheer curtain'],
  ['0152', "Children's bunny-print curtain fabric"],
])

const SOFAS = group('sofas', [
  ['0221', 'Large tan L-shaped sectional sofa with scatter cushions'],
  ['0196', 'Cream L-shaped sectional with glass coffee table'],
  ['0056', 'Curved cream boucle sofa'],
  ['0058', 'Terracotta leather chaise sectional'],
  ['0057', 'Taupe sofa set with red accent cushions'],
  ['0146', 'Grey L-shaped sectional with nested coffee tables'],
  ['0212', 'White fabric chaise sectional with a dark coffee table'],
  ['0174', 'White sofa set with gold coffee table'],
  ['0148', 'Mocha fabric sofa set in the showroom'],
  ['0018', 'Cream and white sofa collection in the showroom'],
  ['0070', 'Cream two-seater sofa with patterned cushions and throw'],
  ['0047', 'Black leather sofa set in the showroom'],
  ['0045', 'Grey sofa bed opened out'],
  ['0091', 'Grey fabric sofa set arranged around a white coffee table'],
  ['0222', 'Camel sectional sofa with grey accent cushions'],
  ['0210', 'Brown suede corner sofa in a family living room'],
  ['0151', 'Blue and rust leather corner sofa'],
  ['0168', 'Mauve sectional sofa with chaise'],
  ['0226', 'Taupe chaise sectional sofa'],
  ['0163', 'White curved two-seater sofa'],
  ['0169', 'White two-seater sofa with dark piping'],
  ['0190', 'Grey leather two-seater sofa'],
  ['0133', 'Grey two-seater sofa with cream cushions'],
  ['0101', 'Cream two-seater sofa with patterned cushion'],
  ['0219', 'Cream sofa collection arranged in the showroom'],
  ['0145', 'Cream accent armchair with cushion'],
  ['0147', 'Stone leather armchair with patterned cushion'],
  ['0170', 'White armchair with dark piping'],
  ['0223', 'White and grey accent armchair'],
  ['0209', 'Soft grey armchair with patterned cushion on a diamond rug'],
  ['0229', 'Accent armchair with timber side frame'],
  ['0138', 'Fitted upholstered banquette seating'],
])

const WARDROBES = group('wardrobes', [
  ['0129', 'Floor-to-ceiling taupe wardrobe with mirror door and drawers'],
  ['0160', 'White fitted wardrobes with walk-in opening'],
  ['0032', 'Floor-to-ceiling cream wardrobe in a bedroom'],
  ['0132', 'Fitted bedroom wardrobe with built-in dressing table'],
  ['0117', 'Cream fitted wardrobe with integrated study desk and lit shelving'],
  ['0164', 'White fitted wardrobe with internal drawers'],
  ['0137', 'Charcoal wardrobe with integrated study desk and shelving'],
  ['0158', 'Oak-effect wardrobe with drawers and display shelves'],
  ['0119', 'Grey and oak wardrobe with dressing table and mirror'],
  ['0155', 'Open wardrobe interior with hanging rails and shelving'],
  ['0159', 'Fitted home-office wall with desk, cabinets and shelving'],
  ['0215', 'Built-in white shelving and storage unit', ['installations']],
  ['0115', 'Built-in white wardrobe being fitted on site', ['installations']],
])

const ARABIC = group('arabic', [
  ['0243', 'Arabic-style velvet sofa set with gold trim and a round coffee table'],
  ['0121', 'Royal-style cream sofa set with carved frames and black coffee table'],
  ['0033', 'Royal-style sofa set with carved white coffee tables'],
  ['0241', 'Grey tufted Arabic-design sofa and matching armchair with gold detailing'],
  ['0063', 'Royal-style loveseat with carved dark-wood frame and damask cushions'],
  ['0244', 'Emerald and cream Arabic-style living room sofa set'],
  ['0157', 'Arabic-style sofa set with gold-trimmed arms'],
  ['0185', 'Royal-style armchair in grey leather with carved mahogany frame'],
  ['0242', 'Champagne Arabic-style sofa set with gold-accented base'],
  ['0172', 'Royal-style ivory loveseat with carved frame'],
  ['0171', 'Royal-style carved white armchair with embroidered cushion'],
  ['0067', 'Royal-style ivory loveseat with floral cushions'],
  ['0050', 'Royal-style white armchair with embroidered cushion'],
  ['0035', 'Royal-style black and gold coffee tables with sofa'],
  ['0124', 'Royal-style white dining set with carved chairs'],
])

const TV_PANELS = group('tv-panels', [
  ['0211', 'Marble-effect TV wall panel with lit display shelving under a gypsum ceiling', ['gypsum']],
  ['0027', 'Marble and walnut TV wall with lit display shelving'],
  ['0046', 'Black fluted TV wall with backlit marble panel'],
  ['0199', 'Curved TV wall with lit niches and floating unit'],
  ['0037', 'Light fluted TV wall with floating unit and bookshelf'],
  ['0060', 'Fluted timber TV wall with lit shelving'],
  ['0059', 'TV wall with gypsum ceiling cove lighting and lit display niches', ['gypsum']],
  ['0200', 'Marble-effect TV wall panel with lit display shelving'],
  ['0126', 'Minimal TV wall with fluted panel and lit shelving under a gypsum ceiling', ['gypsum']],
  ['0173', 'Fluted feature wall and floating TV unit being fitted', ['installations']],
  ['0065', 'Fluted wall panel and lit glass display unit being fitted', ['installations']],
  ['0220', 'Fluted wall panel and floating unit being measured during fitting', ['installations']],
])

const RECLINERS = group('recliners', [
  ['0225', 'Three-piece leather-look recliner set in a bright living room'],
  ['0142', 'Grey recliner sofa set with swivel armchair'],
  ['0071', 'Charcoal recliner sofa set'],
  ['0139', 'Charcoal leather recliner set in the showroom'],
  ['0123', 'Taupe recliner sofa set on a marble-print rug'],
  ['0230', 'Charcoal recliner sofa with patterned cushions'],
  ['0130', 'Leather-look recliner loveseat with cup holders'],
  ['0194', 'Power recliner armchair with footrest extended'],
  ['0111', 'Taupe recliner loveseat with both footrests extended'],
  ['0127', 'Taupe recliner loveseat with footrest extended'],
])

const GYPSUM = group('gypsum', [
  ['0131', 'Living room with gypsum tray ceiling, chandelier and TV wall', ['tv-panels']],
  ['0134', 'Layered gypsum ceiling with cove lighting and chandelier'],
  ['0140', 'Grand living room with gypsum ceiling, chandelier and feature TV wall', ['tv-panels']],
  ['0029', 'Bedroom with panelled feature wall and gypsum cove ceiling'],
  ['0150', 'Gypsum ceiling with LED line lighting and pendant'],
])

const OFFICE = group('office', [
  ['0238', 'Executive office desk with white pedestal and oak top'],
  ['0235', 'Executive office desk in mahogany finish with leather chair'],
  ['0239', 'Dark walnut executive desk with Paiza branding'],
  ['0234', 'Oak executive office desk with return and black office chair'],
  ['0240', 'Home and office desk in mahogany and black'],
  ['0236', 'Study desk with mint pedestal drawers'],
  ['0231', 'Grey and white executive desk, two views'],
  ['0232', 'Oak executive desk with side cabinet, two views'],
  ['0233', 'Oak desk with fluted modesty panel, two views'],
])

/** Round-robin across groups so every "Load more" step shows the full range of work. */
function interleave(groups: Photo[][]) {
  const out: Photo[] = []
  for (let i = 0; out.length < groups.flat().length; i++) {
    groups.forEach((g) => g[i] && out.push(g[i]))
  }
  return out
}

export const PHOTOS: Photo[] = [
  ...interleave([KITCHENS, CURTAINS, SOFAS, WARDROBES, ARABIC, TV_PANELS, RECLINERS, GYPSUM]),
  ...OFFICE,
]

export const photoById = (id: string) => {
  const p = PHOTOS.find((x) => x.id === id)
  if (!p) throw new Error(`Unknown photo ${id}`)
  return p
}

export const photosFor = (cat: CategoryId | 'all') =>
  cat === 'all' ? PHOTOS : PHOTOS.filter((p) => p.cats.includes(cat))
