import { SITE } from './data/site'

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
  }
}

/** Meta's standard Pixel loader, typed. */
function loadPixel() {
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

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)
}

/** Reports a contact (the conversion Paiza's ads optimise for). No-op while the Pixel is off. */
export function trackContact(method: 'whatsapp' | 'phone' | 'enquiry-form') {
  window.fbq?.('track', 'Contact', { content_name: method })
}

export function initMetaPixel() {
  if (!SITE.metaPixelId || window.fbq) return
  loadPixel()
  window.fbq!('init', SITE.metaPixelId)
  window.fbq!('track', 'PageView')

  // Every WhatsApp and phone link on the site counts as a contact.
  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      if (link.href.startsWith('https://wa.me/')) trackContact('whatsapp')
      else if (link.href.startsWith('tel:')) trackContact('phone')
    },
    { capture: true },
  )
}
