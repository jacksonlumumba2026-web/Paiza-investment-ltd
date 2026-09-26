import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
// Fonts are bundled with the site (no Google Fonts requests). Latin subset only: the site is in English.
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-700.css'
import '@fontsource/manrope/latin-800.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './index.css'
import { initAnalytics } from './analytics'
import { pageForPath } from './data/servicePages'

// Service pages live at /<slug>/. GitHub Pages adds the slash itself; this covers hosts that don't.
const { pathname, search, hash } = window.location
if (!pathname.endsWith('/') && !pathname.endsWith('.html') && pageForPath(pathname)) {
  window.location.replace(`${pathname}/${search}${hash}`)
} else {
  const root = document.getElementById('root')!
  const app = (
    <StrictMode>
      <App path={pathname} />
    </StrictMode>
  )

  // The production build ships pre-rendered HTML (see scripts/prerender.mjs); dev does not.
  if (root.hasChildNodes()) hydrateRoot(root, app)
  else createRoot(root).render(app)

  initAnalytics()
}
