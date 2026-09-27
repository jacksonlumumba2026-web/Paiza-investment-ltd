// Build-time entry: scripts/prerender.mjs renders the page to static HTML so
// search engines and link-preview crawlers see the full content without JavaScript.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export { FAQS } from './data/faq'
export { PHOTOS, categoryTitle, photoById, photosFor } from './data/gallery'
export { SERVICE_PAGES } from './data/servicePages'

export function render(path = '/') {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  )
}
