// Runs after `vite build` and the SSR build (see package.json "build").
// 1. Renders the homepage into dist/index.html so crawlers see the full content.
// 2. Renders one page per service into dist/<slug>/index.html, each with its own
//    title, description, canonical URL, link-preview image and structured data.
// 3. Writes dist/sitemap.xml, listing every page and its photos for Google Images.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const SITE_URL = 'https://paiza-investment.co.ke'
const SSR_DIR = 'dist-ssr'

const { render, FAQS, PHOTOS, SERVICE_PAGES, categoryTitle, photoById } = await import(
  pathToFileURL(path.resolve(SSR_DIR, 'entry-server.js')).href
)

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const jsonLd = (data) =>
  `  <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n  </head>`

const faqLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

/** Replaces one tag in the template, failing loudly if the template changed. */
function swap(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Pattern not found in index.html: ${pattern}`)
  return html.replace(pattern, replacement)
}

function inject(html, appHtml) {
  if (!html.includes('<div id="root"></div>')) throw new Error('Root element not found in dist/index.html')
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

const template = await readFile('dist/index.html', 'utf8')

// Homepage
await writeFile('dist/index.html', inject(template, render('/')).replace('</head>', jsonLd(faqLd(FAQS))))

// Service pages
await mkdir('dist/og', { recursive: true })
const pagePhotos = (page) => PHOTOS.filter((p) => p.cats.some((c) => page.categories.includes(c)))

for (const page of SERVICE_PAGES) {
  const url = `${SITE_URL}/${page.slug}/`
  const cover = photoById(page.service.showcase[0])
  const ogImage = `og/${page.slug}.jpg`

  // Link previews (WhatsApp, Facebook) need a JPEG; crop the page's lead photo to 1200×630.
  await sharp(path.join('public', cover.lg))
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join('dist', ogImage))

  const serviceLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.service.name,
        serviceType: page.service.name,
        description: page.description,
        url,
        image: `${SITE_URL}${cover.lg}`,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: { '@type': 'Country', name: 'Kenya' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
          { '@type': 'ListItem', position: 3, name: page.short, item: url },
        ],
      },
    ],
  }

  let html = template
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`)
  html = swap(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(page.description)}$2`)
  html = swap(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = swap(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  html = swap(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
  html = swap(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
  html = swap(html, /(<meta property="og:image" content=")[^"]*(")/, `$1${SITE_URL}/${ogImage}$2`)
  html = swap(html, /(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(cover.alt)}$2`)
  html = swap(html, /(<link rel="preload" as="image" href=")[^"]*(")/, `$1${cover.lg}$2`)
  html = inject(html, render(`/${page.slug}/`))
    .replace('</head>', jsonLd(serviceLd))
    .replace('</head>', jsonLd(faqLd(page.faqs)))

  await mkdir(path.join('dist', page.slug), { recursive: true })
  await writeFile(path.join('dist', page.slug, 'index.html'), html)
}

// Sitemap
const today = new Date().toISOString().slice(0, 10)
const imageTags = (photos) =>
  photos
    .map(
      (p) => `    <image:image>
      <image:loc>${SITE_URL}${p.lg}</image:loc>
      <image:title>${esc(`${p.name ? p.name + ' — ' : ''}${categoryTitle(p.cats[0])} by Paiza Investment Ltd`)}</image:title>
      <image:caption>${esc(p.alt)}</image:caption>
    </image:image>`,
    )
    .join('\n')

const urlEntry = (loc, priority, photos) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${imageTags(photos)}
  </url>`

await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[
  urlEntry(`${SITE_URL}/`, '1.0', PHOTOS),
  ...SERVICE_PAGES.map((page) => urlEntry(`${SITE_URL}/${page.slug}/`, '0.9', pagePhotos(page))),
].join('\n')}
</urlset>
`,
)

await rm(SSR_DIR, { recursive: true, force: true })
console.log(
  `Pre-rendered the homepage and ${SERVICE_PAGES.length} service pages; sitemap with ${SERVICE_PAGES.length + 1} pages and ${PHOTOS.length} photos`,
)
