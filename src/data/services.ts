import type { CategoryId } from './gallery'

export type Service = {
  id: string
  name: string
  description: string
  message: string
  /** Gallery filter opened by "View Work"; null when no photos are available yet. */
  category: CategoryId | null
  /** Card cover photo id; null renders a branded placeholder. */
  cover: string | null
  /** Strongest photos for the service showcase (3–6 when available). */
  showcase: string[]
  galleryLabel: string
}

const quote = (subject: string) =>
  `Hello Paiza Investment Ltd, I am interested in ${subject}. I would like to get more information and a quotation.`

export const SERVICES: Service[] = [
  {
    id: 'kitchens',
    name: 'Modern Kitchen Design',
    description:
      'Contemporary kitchens designed around your space, lifestyle, storage needs and preferred aesthetic.',
    message: quote('Modern Kitchen Design'),
    category: 'kitchens',
    cover: '0214',
    showcase: ['0214', '0218', '0073', '0206', '0188', '0204'],
    galleryLabel: 'View all kitchen projects',
  },
  {
    id: 'wardrobes',
    name: 'Modern Wardrobes',
    description:
      'Custom wardrobes and built-in storage planned to the centimetre — clean lines, smart compartments, lasting finishes.',
    message: quote('Modern Wardrobes'),
    category: 'wardrobes',
    cover: '0129',
    showcase: ['0129', '0160', '0132', '0117', '0164', '0137'],
    galleryLabel: 'View all wardrobe projects',
  },
  {
    id: 'gypsum',
    name: 'Gypsum Design Works',
    description:
      'Gypsum ceilings and feature details with concealed lighting that give every room a refined, finished look.',
    message: quote('Gypsum Design Works'),
    category: 'gypsum',
    cover: '0134',
    showcase: ['0134', '0131', '0150', '0140', '0059', '0126'],
    galleryLabel: 'View gypsum projects',
  },
  {
    id: 'tv-panels',
    name: 'Modern TV Panel Designs',
    description:
      'Statement TV walls with integrated shelving, cable management and ambient lighting — the centrepiece of your living room.',
    message: quote('Modern TV Panel Designs'),
    category: 'tv-panels',
    cover: '0200',
    showcase: ['0200', '0199', '0059', '0126', '0211', '0173'],
    galleryLabel: 'View all TV panel projects',
  },
  {
    id: 'curtains',
    name: 'Curtains & Sheers',
    description:
      'Tailored curtains and soft sheers that control light, add privacy and complete the mood of your space.',
    message:
      'Hello Paiza Investment Ltd, I am interested in Curtains & Sheers. I would like to get more information.',
    category: 'curtains',
    cover: '0192',
    showcase: ['0192', '0198', '0184', '0136', '0112', '0144'],
    galleryLabel: 'View all curtain projects',
  },
  {
    id: 'recliners',
    name: 'Recliner Sofas',
    description:
      'Plush recliner sofas engineered for deep comfort, durable upholstery and effortless everyday relaxation.',
    message: quote('Recliner Sofas'),
    category: 'recliners',
    cover: '0225',
    showcase: ['0225', '0142', '0139', '0123', '0230', '0194'],
    galleryLabel: 'View all recliner sofas',
  },
  {
    id: 'sofas',
    name: 'Elegant Sofa Designs',
    description:
      'Sectionals, chaise sofas and accent chairs in rich fabrics — modern silhouettes built for real family living.',
    message: quote('your sofa designs'),
    category: 'sofas',
    cover: '0221',
    showcase: ['0221', '0196', '0146', '0212', '0174', '0148'],
    galleryLabel: 'View all sofa designs',
  },
  {
    id: 'arabic',
    name: 'Artic Sofa Design (Arabic Design)',
    description:
      'Opulent Arabic-inspired sofa sets with sculpted frames, gold accents and luxurious velvet upholstery.',
    message: quote('Artic Sofa Design (Arabic Design)'),
    category: 'arabic',
    cover: '0243',
    showcase: ['0243', '0121', '0241', '0063', '0244', '0185'],
    galleryLabel: 'View all Arabic designs',
  },
]

export const SERVICE_OPTIONS = [
  'Modern Kitchen Design',
  'Modern Wardrobes',
  'Gypsum Design Works',
  'Modern TV Panel Designs',
  'Curtains & Sheers',
  'Recliner Sofas',
  'Elegant Sofa Designs',
  'Artic Sofa Design',
  'Other',
]
