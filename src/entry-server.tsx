// Build-time entry: scripts/prerender.mjs renders the page to static HTML so
// search engines and link-preview crawlers see the full content without JavaScript.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export { FAQS } from './data/faq'
export { PHOTOS, categoryTitle } from './data/gallery'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
