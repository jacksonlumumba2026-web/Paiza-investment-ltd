import { NAV, SITE, waLink } from '../data/site'
import { useSite } from '../context'
import type { Filter } from '../context'
import { IconArrowUpRight, IconWhatsApp } from './icons'
import Logo from './Logo'
import { Reveal } from './ui'

const FOOTER_SERVICES: { label: string; filter?: Filter; href?: string }[] = [
  { label: 'Modern Kitchens', filter: 'kitchens' },
  { label: 'Wardrobes', filter: 'wardrobes' },
  { label: 'TV Panels', filter: 'tv-panels' },
  { label: 'Curtains', filter: 'curtains' },
  { label: 'Sofas', filter: 'sofas' },
  { label: 'Interior Fit-Out', filter: 'installations' },
]

export default function Footer() {
  const { showWork } = useSite()
  const linkCls = 'text-[15px] text-white/60 transition-colors hover:text-gold'

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 pb-10 text-white lg:pt-28">
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-[600px] rounded-full bg-gold/[0.06] blur-[120px]" />

      <div className="container-lux relative">
        <Reveal className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="!h-20" />
            <p className="mt-6 max-w-xs font-serif text-2xl leading-snug text-white/85 italic">
              {SITE.message}
            </p>
            <p className="mt-3 text-sm text-white/45">{SITE.category}</p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8 !py-3">
              <IconWhatsApp className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.24em] text-gold uppercase">Quick Links</h4>
              <ul className="mt-6 space-y-3">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className={linkCls}>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.24em] text-gold uppercase">Services</h4>
              <ul className="mt-6 space-y-3">
                {FOOTER_SERVICES.map((s) => (
                  <li key={s.label}>
                    {s.filter ? (
                      <button type="button" onClick={() => showWork(s.filter)} className={linkCls}>
                        {s.label}
                      </button>
                    ) : (
                      <a href={s.href} className={linkCls}>
                        {s.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.24em] text-gold uppercase">Contact</h4>
              <ul className="mt-6 space-y-3 text-[15px] text-white/60">
                <li>
                  <a href={`tel:${SITE.phoneTel}`} className={linkCls}>
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className={`${linkCls} break-all`}>
                    {SITE.email}
                  </a>
                </li>
                <li>{SITE.location}</li>
                <li>Branch: Mombasa Rd</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <p className="mt-16 text-center text-[11px] font-bold tracking-[0.4em] text-gold/70 uppercase">
          Making every room a masterpiece
        </p>

        {/* Oversized wordmark */}
        <div className="mt-6 overflow-hidden border-t border-white/[0.08] pt-10">
          <p
            aria-hidden
            className="display bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text text-center text-[19vw] leading-[0.8] text-transparent select-none lg:text-[15vw]"
          >
            PAIZA
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3 tracking-[0.2em] uppercase">
            {SITE.tagline}
            <a href="#home" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold" aria-label="Back to top">
              <IconArrowUpRight className="h-4 w-4 -rotate-45" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
