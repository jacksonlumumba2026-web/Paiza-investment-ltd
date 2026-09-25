import { SITE } from './data/site'

/*
 * Google Analytics 4 and Meta Pixel. Each loads only when its ID is set in
 * src/data/site.ts; with both empty, no tracking code or requests are made.
 * Every WhatsApp, phone and email tap is reported as a contact, with the page
 * section it came from.
 */

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: Fbq
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type Method = 'whatsapp' | 'phone' | 'email' | 'enquiry-form' | 'email-form'

function loadScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function initGa4(id: string) {
  window.dataLayer = window.dataLayer || []
  // gtag must push the `arguments` object itself, as in Google's snippet.
  window.gtag = function () {
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
}

/** Meta's standard Pixel loader, typed. */
function initPixel(id: string) {
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq
  fbq.queue = []
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  window.fbq = fbq
  window._fbq ??= fbq
  loadScript('https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', id)
  fbq('track', 'PageView')
}

/** Which part of the page a link sits in: hero ("home"), services, contact, footer, floating-button… */
function sectionOf(el: Element) {
  if (el.closest('[aria-label="Chat with Paiza on WhatsApp"]')) return 'floating-button'
  if (el.closest('[role="dialog"]')) return 'image-viewer'
  if (el.closest('#mobile-menu')) return 'mobile-menu'
  if (el.closest('header')) return 'header'
  if (el.closest('footer')) return 'footer'
  return el.closest('section[id]')?.id ?? 'page'
}

/** Reports a contact. No-op while both analytics IDs are empty. */
export function trackContact(method: Method, section = 'contact') {
  window.gtag?.('event', 'contact', { method, section })
  window.fbq?.('track', 'Contact', { content_name: method, content_category: section })
}

export function initAnalytics() {
  if (SITE.ga4MeasurementId && !window.gtag) initGa4(SITE.ga4MeasurementId)
  if (SITE.metaPixelId && !window.fbq) initPixel(SITE.metaPixelId)
  if (!window.gtag && !window.fbq) return

  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      const method: Method | null = link.href.startsWith('https://wa.me/')
        ? 'whatsapp'
        : link.href.startsWith('tel:')
          ? 'phone'
          : link.href.startsWith('mailto:')
            ? 'email'
            : null
      if (method) trackContact(method, sectionOf(link))
    },
    { capture: true },
  )
}
