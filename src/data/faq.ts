import { SITE } from './site'

/**
 * Shown in the FAQ section and published as FAQPage structured data.
 * Keep answers to facts the client has confirmed — no prices, warranties or lead times.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: 'What services does Paiza Investment Ltd offer?',
    a: 'We design, supply and fit modern kitchens, wardrobes, gypsum ceilings, TV wall panels, curtains and sheers, curtain rods and rails, recliner sofas, elegant sofas and Arabic-design sofas — plus office furniture.',
  },
  {
    q: 'Where are you located?',
    a: `Our main showroom is in ${SITE.location}. We also have a branch on Mombasa Rd.`,
  },
  {
    q: 'Do you deliver and install outside Kikuyu and Nairobi?',
    a: 'Yes. We offer supply and fitting countrywide, with professional installation.',
  },
  {
    q: 'Can you make kitchens and wardrobes to fit my space?',
    a: 'Yes. Our kitchens, wardrobes, TV panels, gypsum ceilings and curtains are designed around your space, requirements and preferred style.',
  },
  {
    q: 'Do you supply and fit curtain rods and ceiling tracks?',
    a: 'Yes. Alongside curtains and sheers we supply and fit curtain rods, rails and ceiling tracks in a range of finishes.',
  },
  {
    q: 'How do I get a quotation?',
    a: `Chat with us on WhatsApp at ${SITE.phoneDisplay} or send the enquiry form on this page. Share your space, measurements or photos and the style you like, and we will get back to you with a quotation.`,
  },
]
