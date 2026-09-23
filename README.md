# Paiza Investment Ltd — Website

Premium single-page website for **Paiza Investment Ltd — Home Furnishings & Interior Fit-Out Experts**.
*Style. Quality. Comfort.* It's built as a visual portfolio, a service catalogue and a WhatsApp lead-generation site (no e-commerce).

**Stack:** React + TypeScript, Vite, Tailwind CSS v4, Framer Motion.

## Run locally

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

`dist/` is fully static (relative paths), so it can be hosted on Netlify, Vercel, GitHub Pages, cPanel, etc.

## Editing content

| What | Where |
| --- | --- |
| Phone, WhatsApp, email, locations, Google Maps embed | `src/data/site.ts` |
| The 8 services, descriptions, WhatsApp messages, showcase photos | `src/data/services.ts` |
| Gallery photos, categories, order and alt text | `src/data/gallery.ts` |
| Logo (placeholder wordmark) | `src/components/Logo.tsx`, `public/favicon.svg` |

### Adding photos

1. Drop the new originals into `photos/originals/`.
2. Run `npm run images`. This creates optimised WebP files (`public/work/<id>-sm.webp` and `-lg.webp`) and updates `src/data/image-meta.json`.
3. Add a `photo('<id>', ['category'], 'description')` line in `src/data/gallery.ts`.

The photo id is the number after `WA` in the WhatsApp filename (e.g. `IMG-20260923-WA0214.jpg` → `0214`).

### Google Maps

Paste the embed URL (Google Maps → Share → *Embed a map* → the iframe `src`) into `mapEmbedUrl` in `src/data/site.ts`. You can also set `mapShareUrl` for the "Get directions" button. Until then, a styled placeholder is shown.

## Photos not used on the site

Listed in `scripts/optimize-images.mjs`:

- `0207`: phone screenshot of a social post
- `0227`, `0228`: carry a third-party TikTok watermark (@bridgefurniture)
- `0237`: collage duplicating `0235` and `0238`
