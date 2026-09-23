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
  /** Optional object-position so services sharing a photo show different details. */
  coverFocus?: string
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
    showcase: ['0214', '0218', '0206', '0216', '0205', '0217'],
    galleryLabel: 'View all kitchen projects',
  },
  {
    id: 'wardrobes',
    name: 'Modern Wardrobes',
    description:
      'Custom wardrobes and built-in storage planned to the centimetre — clean lines, smart compartments, lasting finishes.',
    message: quote('Modern Wardrobes'),
    category: 'wardrobes',
    cover: '0215',
    showcase: ['0215'],
    galleryLabel: 'View wardrobe & storage work',
  },
  {
    id: 'gypsum',
    name: 'Gypsum Design Works',
    description:
      'Gypsum ceilings and feature details with concealed lighting that give every room a refined, finished look.',
    message: quote('Gypsum Design Works'),
    category: 'gypsum',
    cover: '0211',
    coverFocus: '50% 0%',
    showcase: ['0211'],
    galleryLabel: 'View gypsum projects',
  },
  {
    id: 'tv-panels',
    name: 'Modern TV Panel Designs',
    description:
      'Statement TV walls with integrated shelving, cable management and ambient lighting — the centrepiece of your living room.',
    message: quote('Modern TV Panel Designs'),
    category: 'tv-panels',
    cover: '0211',
    coverFocus: '50% 62%',
    showcase: ['0211', '0220'],
    galleryLabel: 'View all TV panel projects',
  },
  {
    id: 'curtains',
    name: 'Curtains & Sheers',
    description:
      'Tailored curtains and soft sheers that control light, add privacy and complete the mood of your space.',
    message:
      'Hello Paiza Investment Ltd, I am interested in Curtains & Sheers. I would like to get more information.',
    category: null,
    cover: null,
    showcase: [],
    galleryLabel: 'Ask for curtain samples',
  },
  {
    id: 'recliners',
    name: 'Recliner Sofas',
    description:
      'Plush recliner sofas engineered for deep comfort, durable upholstery and effortless everyday relaxation.',
    message: quote('Recliner Sofas'),
    category: 'recliners',
    cover: '0225',
    showcase: ['0225', '0230'],
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
    showcase: ['0221', '0212', '0222', '0210', '0226', '0219'],
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
    showcase: ['0243', '0241', '0244', '0242'],
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
