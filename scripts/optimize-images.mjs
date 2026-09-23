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
// 0207 – phone screenshot of a social post (low quality, UI chrome visible)
// 0227, 0228 – carry a third-party TikTok watermark (@bridgefurniture)
// 0237 – collage duplicating 0235 and 0238
const EXCLUDE = new Set(['0207', '0227', '0228', '0237'])

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
