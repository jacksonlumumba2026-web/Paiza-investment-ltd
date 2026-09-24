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

### GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes `dist/` on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
If Pages is set to "Deploy from a branch", it serves the raw source code instead and the page shows blank white.

### Custom domain: paiza-investment.co.ke

Registered at Truehost. DNS records (Truehost client area → Domains → Manage → DNS management):

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `jacksonlumumba2026-web.github.io` |

Then **Settings → Pages → Custom domain** → `paiza-investment.co.ke` → Save, and tick **Enforce HTTPS** once it's offered.
The domain is also written in `index.html` (canonical, link-preview and business tags), `public/robots.txt` and `public/sitemap.xml`.

## Editing content

| What | Where |
| --- | --- |
| Phone, WhatsApp, email, locations, Google Maps embed | `src/data/site.ts` |
| The 8 services, descriptions, WhatsApp messages, showcase photos | `src/data/services.ts` |
| Gallery photos, categories, order and alt text | `src/data/gallery.ts` |
| Logo (vector recreation of the flyer logo; reference in `photos/brand/`) | `src/components/Logo.tsx`, `public/favicon.svg` |

### Adding photos

1. Drop the new originals into `photos/originals/`.
2. Run `npm run images`. This creates optimised WebP files (`public/work/<id>-sm.webp` and `-lg.webp`) and updates `src/data/image-meta.json`.
3. Add an `['<id>', 'description']` entry to the right group in `src/data/gallery.ts`.

The photo id is the number after `WA` in the WhatsApp filename (e.g. `IMG-20260923-WA0214.jpg` → `0214`).
WhatsApp restarts its numbering each day, so photos from any other day keep the day in their id
(e.g. `IMG-20260924-WA0012.jpg` → `24-0012`).

A product or model name (e.g. "Rixos") can be given as the 4th value of a gallery entry. It shows as a label
on the photo, in the full-screen viewer and in the WhatsApp enquiry.

### Google Maps

Paste the embed URL (Google Maps → Share → *Embed a map* → the iframe `src`) into `mapEmbedUrl` in `src/data/site.ts`. You can also set `mapShareUrl` for the "Get directions" button. Until then, a styled placeholder is shown.

## Photos not used on the site

The full list is kept in `scripts/optimize-images.mjs`:

- **Third-party TikTok watermark (@bridgefurniture):** 0042, 0043, 0052, 0053, 0066, 0069, 0072, 0108, 0120, 0161, 0162, 0193, 0227, 0228
- **Duplicates of a better or clean version:** 0022, 0024, 0034, 0048, 0061, 0062, 0074, 0106, 0110, 0165, 0167, 0237
- **Not suitable:** 0125 (packaged mattress protector), 0180 (141×250 px), 0207 and 24-0027 (phone screenshots)
- **24 Sept re-sends of photos already on the site:** 24-0012, 24-0013, 24-0017, 24-0018, 24-0019, 24-0020, 24-0023, 24-0028, 24-0029, 24-0031 (24-0014 also carries the @bridgefurniture watermark)

`0060` is cropped automatically to remove a screenshot border and a Google Lens button (see `CROP` in the same script).
