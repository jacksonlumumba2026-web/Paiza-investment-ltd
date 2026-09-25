export const SITE = {
  name: 'Paiza Investment Ltd',
  category: 'Home Furnishings & Interior Fit-Out Experts',
  tagline: 'Style. Quality. Comfort.',
  message: 'Designing Spaces, Elevating Lifestyles.',
  phoneDisplay: '0792 680 757',
  phoneTel: '+254792680757',
  whatsapp: '254792680757',
  email: 'info@paiza-investment.co.ke',
  location: 'Kikuyu Town, Nderitu Rd, near the Law Court',
  branch: 'Mombasa Rd branch',
  /**
   * Paste the Google Maps "Embed a map" iframe src here once the client
   * confirms the exact pin. While empty, a styled placeholder is shown.
   */
  mapEmbedUrl: '',
  /** Optional: the client's shared Google Maps link for "Get directions". */
  mapShareUrl: '',
  /**
   * Analytics IDs (see src/analytics.ts). While empty, nothing loads.
   * GA4: "G-XXXXXXXXXX" from Google Analytics → Admin → Data streams.
   * Meta Pixel: digits from Meta Events Manager.
   */
  ga4MeasurementId: '',
  metaPixelId: '',
} as const

export const DEFAULT_MESSAGE =
  'Hello Paiza Investment Ltd, I would like to enquire about your interior design and home furnishing services.'

export function waLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export function directionsLink() {
  if (SITE.mapShareUrl) return SITE.mapShareUrl
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Nderitu Rd, Kikuyu Law Courts, Kikuyu, Kenya',
  )}`
}

export const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const
