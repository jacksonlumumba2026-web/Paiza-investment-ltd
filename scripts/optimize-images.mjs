// Converts the client's original photos (photos/originals) into responsive WebP
// files in public/work and writes their dimensions to src/data/image-meta.json.
// Run with: npm run images
import sharp from 'sharp'
import { readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'photos/originals'
const OUT = 'public/work'
const SIZES = { sm: 720, lg: 1600 }

// Crops applied before resizing (pixels in the original file).
// 0060 – screenshot: trims the grey border and the Google Lens button.
const CROP = {
  '0060': { left: 142, top: 36, width: 688, height: 1228 },
}

// Kept out of the website:
// Third-party TikTok watermark (@bridgefurniture):
//   0042, 0043, 0052, 0053, 0066, 0069, 0072, 0108, 0120, 0161, 0162, 0193, 0227, 0228
// Duplicates of a better/clean version: 0022 (0151), 0024 (0111), 0034 (0185),
//   0048 (0063), 0061 (0233), 0062 (0244), 0074 (0200), 0106 (0232), 0110 (0241),
//   0165 (0242), 0167 (0243), 0237 (collage of 0235 + 0238)
// Not suitable: 0125 (packaged mattress protector), 0180 (141×250px),
//   0207 (phone screenshot of a social post)
const EXCLUDE = new Set([
  '0042', '0043', '0052', '0053', '0066', '0069', '0072', '0108',
  '0120', '0161', '0162', '0193', '0227', '0228',
  '0022', '0024', '0034', '0048', '0061', '0062', '0074', '0106', '0110',
  '0165', '0167', '0237',
  '0125', '0180', '0207',
  // 24 Sept batch — re-sends of photos already on the site: 24-0012 (0171),
  // 24-0013 (0157), 24-0017 (0124), 24-0018 (0151), 24-0019 (0139), 24-0020 (0063),
  // 24-0023 (0067), 24-0028 (0185), 24-0029 (0121), 24-0031 (0018);
  // 24-0027 phone screenshot (= 0207); 24-0014 @bridgefurniture watermark.
  '24-0012', '24-0013', '24-0017', '24-0018', '24-0019', '24-0020',
  '24-0023', '24-0028', '24-0029', '24-0031', '24-0027', '24-0014',
])

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
const meta = {}

for (const file of files) {
  // IMG-20260923-WA0214.jpg → "0214". WhatsApp restarts its numbering each day,
  // so photos from any other day keep the day: IMG-20260924-WA0012.jpg → "24-0012".
  const m = file.match(/IMG-(\d{8})-WA(\d+)/)
  const id = !m ? path.parse(file).name : m[1] === '20260923' ? m[2] : `${m[1].slice(6)}-${m[2]}`
  if (EXCLUDE.has(id)) continue
  let base = sharp(path.join(SRC, file)).rotate()
  if (CROP[id]) base = sharp(await base.extract(CROP[id]).toBuffer())
  const { width, height } = await base.metadata()
  for (const [suffix, w] of Object.entries(SIZES)) {
    await base
      .clone()
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: suffix === 'sm' ? 72 : 80 })
      .toFile(path.join(OUT, `${id}-${suffix}.webp`))
  }
  meta[id] = { w: width, h: height }
}

// 1200×630 JPEG for link previews (WhatsApp, Facebook, Meta ads). Crawlers need JPEG/PNG.
await sharp(path.join(SRC, 'IMG-20260923-WA0214.jpg'))
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg')

await writeFile('src/data/image-meta.json', JSON.stringify(meta, null, 2) + '\n')
console.log(`Optimised ${Object.keys(meta).length} images → ${OUT}`)
