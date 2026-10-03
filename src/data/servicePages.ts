import type { CategoryId } from './gallery'
import { SERVICES, type Service } from './services'

/*
 * One pre-rendered page per service (see scripts/prerender.mjs), e.g.
 * paiza-investment.co.ke/kitchens/. Each page targets its own search terms.
 *
 * Copy rule: only facts the client has confirmed or that their photos show.
 * Prices only where the client has given one; no lead times, warranties or materials we have not seen.
 */

export type ServicePage = {
  slug: string
  service: Service
  /** Gallery categories shown on the page; the first one is the main one. */
  categories: CategoryId[]
  /** <title> — keep under ~60 characters. */
  title: string
  /** Meta description — keep under ~155 characters. */
  description: string
  /** Short name used in breadcrumbs, links and the footer. */
  short: string
  h1: [before: string, accent: string]
  intro: string[]
  optionsTitle: string
  options: { title: string; text: string }[]
  sections: { heading: string; paragraphs: string[] }[]
  faqs: { q: string; a: string }[]
}

const service = (id: string) => {
  const s = SERVICES.find((x) => x.id === id)
  if (!s) throw new Error(`Unknown service ${id}`)
  return s
}

const WHERE =
  'Our showroom is in Kikuyu Town on Nderitu Rd, near the Law Court, and we have a branch on Mombasa Rd in Nairobi. We supply and fit countrywide, so wherever your home is in Kenya, start with a WhatsApp message.'

const QUOTE_A =
  'Send us a WhatsApp message on 0792 680 757 or use the enquiry form on this page. Share your room measurements or photos and the style you like, and we will get back to you with a quotation.'

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'kitchens',
    service: service('kitchens'),
    categories: ['kitchens'],
    short: 'Kitchens',
    title: 'Modern Kitchen Design & Fitting in Kikuyu & Nairobi | Paiza',
    description:
      'Modern fitted kitchens designed, supplied and installed by Paiza Investment Ltd, Kikuyu. See our kitchen projects and WhatsApp us for a quote.',
    h1: ['Modern kitchen design', 'and fitting.'],
    intro: [
      'A kitchen is the room you use most, so it should work as well as it looks. Paiza Investment Ltd designs, supplies and fits modern kitchens planned around your space, the way you cook and how much you need to store.',
      'The photos on this page are our own kitchen designs and installations — from open-plan kitchens with stone islands to compact kitchens where every centimetre counts.',
    ],
    optionsTitle: 'Kitchen styles we design and fit',
    options: [
      { title: 'Island kitchens', text: 'Stone and marble-effect islands with bar seating, including waterfall islands for open-plan living.' },
      { title: 'L-shaped kitchens', text: 'Efficient corner layouts that keep the cooker, sink and fridge close together.' },
      { title: 'Compact kitchens', text: 'Smart layouts for apartments, with built-in ovens and tall units that use the full wall height.' },
      { title: 'Glass display units', text: 'Lit glass-front wall cabinets and pantry units that show off your dishes.' },
      { title: 'Integrated appliances', text: 'Fridges, ovens and chimney hoods built into the cabinetry for a clean, seamless look.' },
      { title: 'Utility and laundry', text: 'Matching cabinetry and open shelving for laundry and utility spaces.' },
    ],
    sections: [
      {
        heading: 'Finishes to match your home',
        paragraphs: [
          'Our kitchens range from warm timber and walnut to cream, sage, charcoal, taupe and high-gloss grey. Worktops include dark stone, marble-effect and black sintered stone, with glass or tiled splashbacks.',
          'Lighting finishes the room: warm downlights, under-cabinet strips, cove ceilings and lit shelves make a kitchen feel bigger and easier to work in.',
        ],
      },
      {
        heading: 'How we plan your kitchen',
        paragraphs: [
          'Tell us about your space, how you cook and what you need to store. Share measurements, a photo of the room or a picture of a kitchen you love, and we design a layout around it.',
          'Once you are happy with the design, we supply and install everything, from the base cabinets and sink unit to the worktop and wall cabinets. You can see some of that work in progress in our photos.',
        ],
      },
      { heading: 'Kitchens in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Can you design a kitchen to fit my exact space?',
        a: 'Yes. Every kitchen is designed around your room, your storage needs and the style you prefer, whether it is a large open-plan space or a compact apartment kitchen.',
      },
      {
        q: 'Do you install the kitchen as well?',
        a: 'Yes. We design, supply and fit the kitchen, including base and wall cabinets, tall units, the sink unit and the worktop.',
      },
      {
        q: 'Can I choose the colour and finish?',
        a: 'Yes. Our projects include timber, walnut, cream, sage, charcoal and high-gloss grey kitchens, with stone, marble-effect and sintered-stone worktops.',
      },
      { q: 'How do I get a kitchen quotation?', a: QUOTE_A },
    ],
  },
  {
    slug: 'wardrobes',
    service: service('wardrobes'),
    categories: ['wardrobes'],
    short: 'Wardrobes',
    title: 'Fitted Wardrobes & Built-in Storage in Kenya | Paiza',
    description:
      'Custom fitted wardrobes, walk-ins and built-in storage, designed and installed by Paiza Investment Ltd in Kikuyu, Nairobi and countrywide.',
    h1: ['Custom fitted', 'wardrobes.'],
    intro: [
      'A good wardrobe gives everything a place. Paiza Investment Ltd designs, supplies and fits custom wardrobes and built-in storage planned to the centimetre, with clean lines, smart compartments and finishes that last.',
      'From floor-to-ceiling bedroom wardrobes to walk-in openings and study walls, the photos on this page are our own designs and installations.',
    ],
    optionsTitle: 'Wardrobe designs we build',
    options: [
      { title: 'Floor-to-ceiling wardrobes', text: 'Full-height units that use the whole wall and leave no dusty gap on top.' },
      { title: 'Mirror doors', text: 'Mirrored panels that double as a dressing mirror and make the room feel bigger.' },
      { title: 'Walk-in openings', text: 'Open wardrobe runs with hanging rails, shelving and drawers you can walk into.' },
      { title: 'Dressing tables', text: 'Built-in dressing tables with mirrors, designed as part of the wardrobe.' },
      { title: 'Study desks', text: 'Wardrobes with an integrated study desk and lit shelving — ideal for children’s and guest rooms.' },
      { title: 'Home-office walls', text: 'Fitted desks, cabinets and shelving for working from home.' },
    ],
    sections: [
      {
        heading: 'Storage planned around what you own',
        paragraphs: [
          'Hanging space, shelves, internal drawers and display shelves are arranged around your clothes, shoes and bags, so the wardrobe works for you every day.',
          'Finishes include white, cream, taupe, charcoal, grey and oak-effect, with mirror doors, handles and lit shelving to suit your bedroom.',
        ],
      },
      {
        heading: 'From measurements to a fitted wardrobe',
        paragraphs: [
          'Share your wall measurements or a photo of the room and tell us what you need to store. We design the wardrobe around it, then supply and fit it on site.',
          'The same approach works for built-in shelving and storage units anywhere in the home.',
        ],
      },
      { heading: 'Wardrobes in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Can you build a wardrobe with a desk or dressing table?',
        a: 'Yes. We have fitted wardrobes with integrated study desks, lit shelving and built-in dressing tables with mirrors.',
      },
      {
        q: 'Do you make walk-in wardrobes?',
        a: 'Yes. We design open wardrobe runs with walk-in openings, hanging rails, shelving and drawers.',
      },
      {
        q: 'Do you fit the wardrobe for me?',
        a: 'Yes. We design, supply and fit wardrobes and built-in storage.',
      },
      { q: 'How do I get a wardrobe quotation?', a: QUOTE_A },
    ],
  },
  {
    slug: 'gypsum-ceilings',
    service: service('gypsum'),
    categories: ['gypsum'],
    short: 'Gypsum Ceilings',
    title: 'Gypsum Ceiling Designs & Installation in Kenya | Paiza',
    description:
      'Gypsum ceilings with cove and LED lighting, tray ceilings and feature details, designed and fitted by Paiza Investment Ltd. See our work and get a quote.',
    h1: ['Gypsum ceiling', 'designs.'],
    intro: [
      'A gypsum ceiling changes how a whole room feels. Paiza Investment Ltd designs and fits gypsum ceilings and feature details with concealed lighting that give living rooms, bedrooms and dining areas a refined, finished look.',
      'Gypsum often works together with a TV wall or curtain track, so we plan them as one design — the photos on this page show how.',
    ],
    optionsTitle: 'Gypsum designs we create',
    options: [
      { title: 'Tray ceilings', text: 'A raised centre that adds height and frames a chandelier.' },
      { title: 'Layered ceilings', text: 'Two or more levels for a dramatic, custom look.' },
      { title: 'Cove lighting', text: 'Hidden LED strips that wash the ceiling in soft, warm light.' },
      { title: 'LED line lighting', text: 'Clean lines of light set into the ceiling for a modern finish.' },
      { title: 'Curtain recesses', text: 'Gypsum pockets that hide the curtain track for a seamless window.' },
      { title: 'Feature walls', text: 'Panelled walls that pair with the ceiling in bedrooms and living rooms.' },
    ],
    sections: [
      {
        heading: 'Lighting is part of the design',
        paragraphs: [
          'Most of our gypsum ceilings are designed with lighting in mind: cove lighting, LED lines, downlights and a central chandelier or pendant. Planning the lighting with the ceiling means no loose fittings or afterthoughts.',
        ],
      },
      {
        heading: 'Ceilings that work with the rest of the room',
        paragraphs: [
          'A gypsum ceiling looks best when it connects to the room below it. We often combine gypsum with a feature TV wall with lit display niches, or with a recessed ceiling curtain track above the windows.',
          'Send us a photo of the room and a picture of a ceiling you like, and we will suggest a design that suits the space.',
        ],
      },
      { heading: 'Gypsum works in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Can you add lighting to a gypsum ceiling?',
        a: 'Yes. Our gypsum designs include cove lighting, LED line lighting and ceilings designed around a chandelier or pendant.',
      },
      {
        q: 'Can the curtain track be hidden in the ceiling?',
        a: 'Yes. We fit ceiling curtain tracks inside gypsum recesses so the track is hidden and the curtains fall straight from the ceiling.',
      },
      {
        q: 'Do you also do the TV wall?',
        a: 'Yes. We design and fit TV wall panels, and many of our projects combine a gypsum ceiling with a feature TV wall.',
      },
      { q: 'How do I get a gypsum quotation?', a: QUOTE_A },
    ],
  },
  {
    slug: 'tv-wall-panels',
    service: service('tv-panels'),
    categories: ['tv-panels'],
    short: 'TV Wall Panels',
    title: 'TV Wall Panels & TV Wall Unit Designs in Kenya | Paiza',
    description:
      'Fluted, marble-effect and backlit TV wall panels with floating units and lit shelving, designed and fitted by Paiza Investment Ltd. WhatsApp for a quote.',
    h1: ['Modern TV wall', 'panels.'],
    intro: [
      'The TV wall is the centrepiece of most living rooms. Paiza Investment Ltd designs and fits statement TV walls with integrated shelving, cable management and ambient lighting.',
      'The photos on this page are our own TV wall designs and installations — from marble-effect panels with lit display shelves to fluted timber walls with floating units.',
    ],
    optionsTitle: 'TV wall designs we fit',
    options: [
      { title: 'Fluted panels', text: 'Vertical fluted panels in light, timber and black finishes for texture and depth.' },
      { title: 'Marble-effect walls', text: 'Marble-effect panels, including backlit marble for a dramatic glow.' },
      { title: 'Floating TV units', text: 'Wall-hung units that keep the floor clear and hide the cables.' },
      { title: 'Lit display shelving', text: 'Niches and glass display units with built-in lighting.' },
      { title: 'Curved TV walls', text: 'Curved walls with lit niches for a soft, custom shape.' },
      { title: 'With gypsum ceilings', text: 'TV walls planned together with cove-lit gypsum ceilings above.' },
    ],
    sections: [
      {
        heading: 'A clean wall with no loose cables',
        paragraphs: [
          'Cable management is planned into every TV wall, so the screen, decoder and sound system sit neatly with no wires on show. Shelving and lighting are built in at the same time.',
        ],
      },
      {
        heading: 'Designed for your living room',
        paragraphs: [
          'Share the wall width and height, your TV size and a photo of the room, and we will design a TV wall that suits the space. Our photos include TV walls being measured and fitted on site.',
          'We can also design the gypsum ceiling above, so the TV wall and ceiling lighting work together.',
        ],
      },
      { heading: 'TV walls in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Will the cables be hidden?',
        a: 'Yes. Cable management is part of every TV wall design, so wires are hidden behind the panels and units.',
      },
      {
        q: 'What finishes are available?',
        a: 'Our TV walls include fluted panels in light, timber and black finishes, marble-effect panels and backlit marble, with lit shelving and floating units.',
      },
      {
        q: 'Can you do the ceiling at the same time?',
        a: 'Yes. Many of our projects combine a TV wall with a gypsum ceiling and cove lighting.',
      },
      { q: 'How do I get a TV wall quotation?', a: QUOTE_A },
    ],
  },
  {
    slug: 'curtains',
    service: service('curtains'),
    categories: ['curtains', 'rods'],
    short: 'Curtains & Rods',
    title: 'Curtains, Sheers, Rods & Ceiling Tracks in Kenya | Paiza',
    description:
      'Tailored curtains and sheers plus curtain rods, rails and ceiling tracks, supplied and fitted by Paiza Investment Ltd in Kikuyu, Nairobi and countrywide.',
    h1: ['Curtains, sheers', 'and rods.'],
    intro: [
      'The right curtains finish a room. Paiza Investment Ltd supplies and fits tailored curtains and soft sheers, together with the curtain rods, rails and ceiling tracks that hold them.',
      'Our curtain photos show the range: wave curtains, pleated and eyelet styles, blackout fabrics and embroidered sheers in dozens of colours.',
    ],
    optionsTitle: 'Curtains, sheers and fittings',
    options: [
      { title: 'Wave curtains', text: 'Soft, even folds from floor to ceiling for a modern living room.' },
      { title: 'Pleated and eyelet', text: 'Classic pleated headings and easy eyelet curtains, with tie-backs.' },
      { title: 'Sheers', text: 'Plain, embroidered, printed and damask sheers to soften daylight.' },
      { title: 'Blackout curtains', text: 'Heavier curtains for bedrooms that need a darker room.' },
      { title: 'Curtain rods', text: 'Copper, antique brass and matte black rods, including double rods, with finials and brackets.' },
      { title: 'Ceiling tracks', text: 'Single, double and centre-bend tracks, surface-fitted or recessed into gypsum.' },
    ],
    sections: [
      {
        heading: 'Fabrics and colours',
        paragraphs: [
          'Choose from plain and textured fabrics, jacquards, damasks, marble prints and children’s prints, in colours from ivory, cream and mocha to emerald, teal, navy, raspberry and mustard. Most curtains are paired with a matching sheer.',
          'Tie-backs, including pearl tie-backs, complete the look.',
        ],
      },
      {
        heading: 'Rods, rails and ceiling tracks',
        paragraphs: [
          'A curtain hangs only as well as its fitting. We supply and fit decorative curtain rods with finials and rings, and ceiling curtain tracks — including nano double tracks, square tracks and one-line centre-bend tracks.',
          'For the cleanest look, the track can be recessed into a gypsum ceiling so the curtains fall straight from above.',
        ],
      },
      { heading: 'Curtains in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Do you fit the curtain rods and tracks?',
        a: 'Yes. We supply and fit curtain rods, rails and ceiling tracks, as well as the curtains and sheers.',
      },
      {
        q: 'Can I see fabric samples?',
        a: 'Yes. Visit our showroom in Kikuyu Town or message us on WhatsApp and we can share options.',
      },
      {
        q: 'Do you have blackout curtains?',
        a: 'Yes. We supply blackout curtains, which can be paired with a sheer for daytime.',
      },
      { q: 'How do I get a curtain quotation?', a: QUOTE_A },
    ],
  },
  {
    slug: 'recliner-sofas',
    service: service('recliners'),
    categories: ['recliners'],
    short: 'Recliner Sofas',
    title: 'Recliner Sofas & Recliner Sets in Kenya | Paiza',
    description:
      'Recliner sofas, recliner sets, corner recliners and power recliner chairs from Paiza Investment Ltd, Kikuyu. See the range and WhatsApp us today.',
    h1: ['Recliner sofas', 'for real comfort.'],
    intro: [
      'After a long day, nothing beats putting your feet up. Paiza Investment Ltd supplies plush recliner sofas built for deep comfort, durable upholstery and effortless everyday relaxation.',
      'Browse the recliners in our range below, then visit the Kikuyu showroom to try one.',
    ],
    optionsTitle: 'Recliners in our range',
    options: [
      { title: 'Three-piece recliner sets', text: 'Matching sofa, loveseat and chair for the whole living room.' },
      { title: 'Corner recliners', text: 'Recliner sectionals that fill a corner, with multiple footrests.' },
      { title: 'Recliner loveseats', text: 'Two-seater recliners, some with cup holders in the centre console.' },
      { title: 'Power recliners', text: 'Recliner armchairs that open at the press of a button.' },
      { title: 'Swivel armchairs', text: 'Recliner sets paired with a swivel armchair.' },
      { title: 'Leather-look and fabric', text: 'Charcoal, grey, taupe and brown upholstery to suit your room.' },
    ],
    sections: [
      {
        heading: 'Choosing the right recliner',
        paragraphs: [
          'Think about how many people use the room, whether you want every seat to recline, and how much space there is behind the sofa for the backrest to move. A corner recliner seats a family; a loveseat or single power recliner suits smaller rooms.',
          'Tell us the size of your living room and we will help you choose the right set.',
        ],
      },
      {
        heading: 'See and try them in the showroom',
        paragraphs: [
          'Comfort is personal, so the best way to choose a recliner is to sit in one. Visit our showroom in Kikuyu Town, or message us on WhatsApp for photos of the models and colours available.',
        ],
      },
      { heading: 'Recliners in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Do you have power recliners?',
        a: 'Yes. Our range includes power recliner armchairs as well as manual recliner sofas and loveseats.',
      },
      {
        q: 'Do you have corner recliner sofas?',
        a: 'Yes. We have corner recliner sectionals with several footrests, as well as three-piece recliner sets.',
      },
      {
        q: 'Can I see the recliners before buying?',
        a: 'Yes. Visit our showroom in Kikuyu Town on Nderitu Rd, near the Law Court, or ask on WhatsApp for photos.',
      },
      {
        q: 'How do I order a recliner?',
        a: 'Send us a WhatsApp message on 0792 680 757 with the model or photo you like and we will share the details and a quotation.',
      },
    ],
  },
  {
    slug: 'sofas',
    service: service('sofas'),
    categories: ['sofas'],
    short: 'Sofas',
    title: 'Modern Sofas, L-Shape Sofas & Armchairs in Kenya | Paiza',
    description:
      'L-shape sofas from KSh 13,500, sectionals, chaise sofas, sofa beds and accent armchairs from Paiza Investment Ltd, Kikuyu. Browse and WhatsApp us.',
    h1: ['Elegant sofa', 'designs.'],
    intro: [
      'Your sofa is where family life happens. Paiza Investment Ltd offers sectionals, chaise sofas and accent chairs in rich fabrics — modern shapes built for real family living.',
      'Browse our range below, from large L-shaped sectionals to compact two-seaters and our royal and Arabic-design sets.',
    ],
    optionsTitle: 'Sofa styles in our range',
    options: [
      { title: 'Simple L-shape sofa — KSh 13,500', text: 'A 4-seater L-shaped sofa with a chaise and channel-stitched seats.' },
      { title: 'L-shaped sectionals', text: 'Large corner sofas that seat the whole family.' },
      { title: 'Chaise sofas', text: 'Sectionals with a chaise for stretching out.' },
      { title: 'Two-seaters', text: 'Compact sofas for smaller rooms, bedrooms and apartments.' },
      { title: 'Accent armchairs', text: 'Statement chairs to complete a living room.' },
      { title: 'Royal and Arabic designs', text: 'Carved frames, velvet and gold details — see our Arabic sofa page.' },
    ],
    sections: [
      {
        heading: 'Fabrics, leather and colours',
        paragraphs: [
          'Our sofas come in fabric, boucle, suede and leather, in colours from cream, white and taupe to grey, camel, mauve, terracotta and black. Scatter cushions and throws finish the look.',
        ],
      },
      {
        heading: 'Choosing a sofa for your room',
        paragraphs: [
          'Measure the wall where the sofa will go and think about how many people need a seat. A sectional works well in an open living room; a sofa set with armchairs gives more flexibility.',
          'Send us your measurements and a photo of the room, or visit the Kikuyu showroom to see and sit on the sofas in person.',
        ],
      },
      { heading: 'Sofas in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'How much is the simple L-shape sofa?',
        a: 'The simple L-shape sofa, a 4-seater with a chaise, is KSh 13,500. Message us on WhatsApp to order or to ask about colours.',
      },
      {
        q: 'Do you have sofa beds?',
        a: 'Yes. Our range includes sofa beds, such as the Nevada Sofa Bed.',
      },
      {
        q: 'Can I see the sofas in person?',
        a: 'Yes. Visit our showroom in Kikuyu Town on Nderitu Rd, near the Law Court, or ask on WhatsApp for photos of the models and colours available.',
      },
      {
        q: 'Do you have leather sofas?',
        a: 'Yes. We have leather and leather-look sofas as well as fabric, boucle and suede.',
      },
      {
        q: 'How do I order a sofa?',
        a: 'Send us a WhatsApp message on 0792 680 757 with the sofa or photo you like and we will share the details and a quotation.',
      },
    ],
  },
  {
    slug: 'arabic-sofas',
    service: service('arabic'),
    categories: ['arabic'],
    short: 'Arabic Sofas',
    title: 'Arabic & Royal Sofa Designs in Kenya | Paiza Investment',
    description:
      'Arabic and royal-style sofa sets with carved frames, velvet and gold trim — Rixos, Romance, Romeo and more. See the range from Paiza Investment Ltd.',
    h1: ['Arabic and royal', 'sofa designs.'],
    intro: [
      'For a living room that makes a statement, choose an Arabic or royal-style sofa set. Paiza Investment Ltd offers opulent sets with sculpted frames, gold accents and luxurious velvet upholstery.',
      'Our range includes named models such as Rixos, Romance, Romeo and the Nevada Sofa Bed, alongside carved royal-style loveseats, armchairs and coffee tables.',
    ],
    optionsTitle: 'Arabic and royal designs',
    options: [
      { title: 'Rixos', text: 'An Arabic-style velvet sofa set with gold trim and a round coffee table.' },
      { title: 'Romance', text: 'A champagne Arabic-style set with a gold-accented base.' },
      { title: 'Romeo', text: 'A grey tufted sofa and matching armchair with gold detailing.' },
      { title: 'Nevada Sofa Bed', text: 'An emerald and cream Arabic-style set that opens into a bed.' },
      { title: 'Royal loveseats and armchairs', text: 'Carved frames in white, black, mahogany and gold.' },
      { title: 'Coffee tables and dining', text: 'Carved coffee tables and a royal-style dining set to match.' },
    ],
    sections: [
      {
        heading: 'Colours and finishes',
        paragraphs: [
          'Choose from grey, ivory, champagne, emerald, powder blue and mint upholstery, with carved frames in white, black, dark wood and mahogany, many with gold detailing. Embroidered and damask cushions complete each set.',
        ],
      },
      {
        heading: 'Plan the whole room',
        paragraphs: [
          'An Arabic sofa set looks best with matching coffee tables, curtains and a gypsum ceiling. We supply the sofas and can also design and fit the curtains, TV wall and ceiling, so the whole room works together.',
          'Tell us the size of your living room and the colours you like, and we will suggest the right set.',
        ],
      },
      { heading: 'Arabic sofas in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Which Arabic sofa models do you have?',
        a: 'Our range includes Rixos, Romance, Romeo and the Nevada Sofa Bed, plus royal-style loveseats, armchairs and coffee tables. Ask on WhatsApp for the latest models and colours.',
      },
      {
        q: 'Do you have matching coffee tables?',
        a: 'Yes. We have carved royal-style coffee tables, including black and gold and white designs, as well as a royal-style dining set.',
      },
      {
        q: 'Can I see the sets in person?',
        a: 'Yes. Visit our showroom in Kikuyu Town on Nderitu Rd, near the Law Court.',
      },
      {
        q: 'How do I order an Arabic sofa set?',
        a: 'Send us a WhatsApp message on 0792 680 757 with the model name or a photo and we will share the details and a quotation.',
      },
    ],
  },
  {
    slug: 'spc-flooring',
    service: service('flooring'),
    categories: ['flooring'],
    short: 'SPC Flooring',
    title: 'SPC Flooring in Kenya — Waterproof Wood-Look Floors | Paiza',
    description:
      'Modern SPC flooring from Paiza Investment Ltd: waterproof, fire-resistant and durable, in warm wood, grey and walnut finishes. WhatsApp us for a quote.',
    h1: ['SPC flooring,', 'modern and durable.'],
    intro: [
      'A new floor changes the whole room. Paiza Investment Ltd offers modern, high-quality SPC flooring that brings the warmth of wood with a finish built for everyday life: waterproof, fire-resistant and durable.',
      'Choose from warm oak, honey and chestnut tones, cool greys and white-washed woods, or rich dark walnut.',
    ],
    optionsTitle: 'Why choose SPC flooring',
    options: [
      { title: 'Waterproof', text: 'Spills and mopping are no problem, which makes it a good fit for kitchens and busy living areas.' },
      { title: 'Fire-resistant', text: 'A rigid, stone-based core for added peace of mind at home and at work.' },
      { title: 'Durable', text: 'A hard-wearing surface made for family homes, offices and high-traffic rooms.' },
      { title: 'Wood-look elegance', text: 'Realistic wood grain in light, mid and dark tones, without the upkeep of real timber.' },
      { title: 'Warm and cool tones', text: 'Oak, honey and chestnut for warmth; greys and white-wash for a modern, airy look.' },
      { title: 'Matches the whole room', text: 'Pair it with our kitchens, wardrobes, TV walls and curtains for one finished design.' },
    ],
    sections: [
      {
        heading: 'What is SPC flooring?',
        paragraphs: [
          'SPC stands for stone plastic composite. Each plank has a rigid core made mainly from stone powder, a printed wood-grain layer and a protective top layer. The result looks like wood but stands up to water and daily wear far better.',
          'SPC planks usually click together, so a new floor can often be laid over an existing flat floor. Share a photo of your room and we will advise what suits your space.',
        ],
      },
      {
        heading: 'Choosing your colour',
        paragraphs: [
          'Light oak and grey tones make small rooms feel bigger and brighter. Honey and chestnut add warmth to living rooms and bedrooms, while dark walnut gives a rich, formal finish.',
          'You can see our colour range in the photos on this page. Ask us on WhatsApp for the full sample list and pictures of the floors laid in a room.',
        ],
      },
      { heading: 'SPC flooring in Kikuyu, Nairobi and across Kenya', paragraphs: [WHERE] },
    ],
    faqs: [
      {
        q: 'Is SPC flooring waterproof?',
        a: 'Yes. Our SPC flooring is waterproof, so it handles spills and mopping, including in kitchens.',
      },
      {
        q: 'What colours are available?',
        a: 'We have warm oak, honey and chestnut tones, greys and white-washed woods, and dark walnut. Message us on WhatsApp for the full sample list.',
      },
      {
        q: 'Can I see samples before I order?',
        a: 'Yes. Ask us on WhatsApp and we will send pictures of the samples, or visit our showroom in Kikuyu Town to talk through the options.',
      },
      { q: 'How do I get a flooring quotation?', a: QUOTE_A },
    ],
  },
]

export const pagePath = (p: ServicePage) => `/${p.slug}/`

export const pageForService = (serviceId: string) => SERVICE_PAGES.find((p) => p.service.id === serviceId)

/** Matches "/kitchens", "/kitchens/" and "/kitchens/index.html". */
export function pageForPath(pathname: string) {
  const slug = pathname.replace(/\/index\.html$/, '').replace(/^\/+|\/+$/g, '')
  return SERVICE_PAGES.find((p) => p.slug === slug)
}
