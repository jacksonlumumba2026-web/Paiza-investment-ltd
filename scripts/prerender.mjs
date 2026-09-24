// Runs after `vite build` and the SSR build (see package.json "build").
// 1. Renders the page into dist/index.html so crawlers see the full content.
// 2. Adds FAQPage structured data from src/data/faq.ts.
// 3. Writes dist/sitemap.xml, listing every gallery photo for Google Images.
import { readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_URL = 'https://paiza-investment.co.ke'
const SSR_DIR = 'dist-ssr'

const { render, FAQS, PHOTOS, categoryTitle } = await import(
  pathToFileURL(path.resolve(SSR_DIR, 'entry-server.js')).href
)

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

let html = await readFile('dist/index.html', 'utf8')
const appHtml = render()
if (!html.includes('<div id="root"></div>')) throw new Error('Root element not found in dist/index.html')
html = html
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace(
    '</head>',
    `  <script type="application/ld+json">${JSON.stringify(faqLd).replace(/</g, '\\u003c')}</script>\n  </head>`,
  )
await writeFile('dist/index.html', html)

const today = new Date().toISOString().slice(0, 10)
const images = PHOTOS.map(
  (p) => `    <image:image>
      <image:loc>${SITE_URL}/${p.lg}</image:loc>
      <image:title>${esc(`${p.name ? p.name + ' — ' : ''}${categoryTitle(p.cats[0])} by Paiza Investment Ltd`)}</image:title>
      <image:caption>${esc(p.alt)}</image:caption>
    </image:image>`,
).join('\n')

await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${images}
  </url>
</urlset>
`,
)

await rm(SSR_DIR, { recursive: true, force: true })
console.log(`Pre-rendered index.html (${(appHtml.length / 1024).toFixed(0)} KB of HTML), sitemap with ${PHOTOS.length} images`)
