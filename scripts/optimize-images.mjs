// Converts the client's original photos (photos/originals) into responsive WebP
// files in public/work and writes their dimensions to src/data/image-meta.json.
// Run with: npm run images
import sharp from 'sharp'
import { readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'photos/originals'
const OUT = 'public/work'
const SIZES = { sm: 720, lg: 1600 }

// Kept out of the website:
// Third-party TikTok watermark (@bridgefurniture):
//   0053, 0066, 0120, 0161, 0162, 0193, 0227, 0228
// Duplicates of a better/clean version: 0024 (0111), 0074 (0200), 0165 (0242),
//   0167 (0243), 0237 (collage of 0235 + 0238)
// Not suitable: 0125 (packaged mattress protector), 0180 (141×250px),
//   0207 (phone screenshot of a social post)
const EXCLUDE = new Set([
  '0053', '0066', '0120', '0161', '0162', '0193', '0227', '0228',
  '0024', '0074', '0165', '0167', '0237',
  '0125', '0180', '0207',
])

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
const meta = {}

for (const file of files) {
  const id = file.match(/WA(\d+)/)?.[1] ?? path.parse(file).name
  if (EXCLUDE.has(id)) continue
  const base = sharp(path.join(SRC, file)).rotate()
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

await writeFile('src/data/image-meta.json', JSON.stringify(meta, null, 2) + '\n')
console.log(`Optimised ${Object.keys(meta).length} images → ${OUT}`)
