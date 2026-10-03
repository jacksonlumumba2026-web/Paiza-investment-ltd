import { m } from 'framer-motion'
import { photoById, srcSet } from '../data/gallery'
import { SERVICE_PAGES, pagePath, type ServicePage as Page } from '../data/servicePages'
import { SITE, waLink } from '../data/site'
import Contact from './Contact'
import FAQ from './FAQ'
import FinalCTA from './FinalCTA'
import Gallery from './Gallery'
import Process from './Process'
import { IconArrowUpRight, IconPhone, IconWhatsApp } from './icons'
import { Accent, EASE, Reveal, SectionHeading, Stagger, fadeUp } from './ui'

function PageHero({ page }: { page: Page }) {
  const { service } = page
  const [main, ...rest] = service.showcase.map(photoById)
  const side = rest.slice(0, 2)

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-40 -right-40 -z-10 h-[520px] w-[520px] rounded-full bg-gold/[0.12] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-96 w-96 rounded-full bg-ember/[0.12] blur-[120px]" />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay" />

      <div className="container-lux grid gap-12 pt-32 pb-16 sm:pt-36 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pt-44 lg:pb-28">
        <div className="lg:col-span-7">
          <m.nav {...line(0.1)} aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-white/60">
              <li>
                <a href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                  Home
                </a>
              </li>
              <li aria-hidden>/</li>
              <li>
                <a href="/#services" className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                  Services
                </a>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white">
                {page.short}
              </li>
            </ol>
          </m.nav>

          <h1 className="display mt-4 text-[44px] sm:text-6xl lg:text-[76px] xl:text-[84px]">
            <m.span {...line(0.2)} className="block">
              {page.h1[0]}
            </m.span>
            <m.span {...line(0.32)} className="block">
              <Accent>{page.h1[1]}</Accent>
            </m.span>
          </h1>

          <m.p {...line(0.45)} className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {page.intro[0]}
          </m.p>

          <m.div {...line(0.58)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={waLink(service.message)} target="_blank" rel="noopener noreferrer" className="btn-gold !px-7 !py-4">
              <IconWhatsApp className="h-5 w-5" />
              Get a quote on WhatsApp
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="btn-ghost-light !px-7 !py-4">
              <IconPhone className="h-5 w-5" />
              Call {SITE.phoneDisplay}
            </a>
          </m.div>

          <m.ul
            {...line(0.7)}
            className="mt-10 flex flex-col gap-3 text-[12px] font-semibold tracking-[0.18em] text-white/55 uppercase sm:flex-row sm:flex-wrap sm:gap-x-4"
          >
            {['Showroom in Kikuyu', 'Mombasa Rd branch', 'Supply & fitting countrywide'].map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-ember sm:block" />}
                {t}
              </li>
            ))}
          </m.ul>
        </div>

        <m.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="grid grid-cols-3 gap-3 lg:col-span-5 lg:gap-4"
        >
          <div className="col-span-3 overflow-hidden rounded-[26px] ring-1 ring-white/10">
            <img
              src={main.lg}
              srcSet={srcSet(main)}
              sizes="(min-width: 1024px) 520px, 100vw"
              width={main.w}
              height={main.h}
              alt={main.alt}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          {side.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img src={p.sm} width={p.w} height={p.h} alt={p.alt} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          ))}
          <a
            href="#work"
            className="group flex flex-col justify-between rounded-2xl bg-gold p-4 text-ink transition-colors hover:bg-[#ffd43b]"
          >
            <IconArrowUpRight className="h-5 w-5 rotate-90 transition-transform duration-500 group-hover:translate-y-0.5" />
            <span className="text-[12px] leading-tight font-bold tracking-[0.1em] uppercase">See all photos</span>
          </a>
        </m.div>
      </div>
    </section>
  )
}

function Overview({ page }: { page: Page }) {
  return (
    <section className="section bg-cream">
      <div className="container-lux">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-ember">{page.service.name}</p>
            <p className="mt-6 font-serif text-3xl leading-snug text-ink italic sm:text-4xl">{page.intro[1]}</p>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display text-[34px] sm:text-5xl">{page.optionsTitle}</h2>
            </Reveal>
            <Stagger gap={0.06} as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
              {page.options.map((o, i) => (
                <m.li
                  key={o.title}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white p-6 transition-all duration-700 ease-lux hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(13,12,11,0.45)] lg:p-7"
                >
                  <span className="font-serif text-lg text-gold-deep italic">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-lg font-extrabold tracking-tight">{o.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{o.text}</p>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-gold to-ember transition-all duration-700 ease-lux group-hover:w-full" />
                </m.li>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}

function Details({ page }: { page: Page }) {
  return (
    <section className="section bg-sand/60">
      <div className="container-lux">
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {page.sections.map((s) => (
            <Reveal key={s.heading} className="grid gap-5 py-10 lg:grid-cols-12 lg:gap-20 lg:py-14">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:col-span-5">{s.heading}</h2>
              <div className="space-y-4 text-base leading-relaxed text-ink/70 sm:text-lg lg:col-span-7">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Related({ page }: { page: Page }) {
  const others = SERVICE_PAGES.filter((p) => p !== page)
  return (
    <section className="section bg-cream">
      <div className="container-lux">
        <SectionHeading
          eyebrow="More from Paiza"
          title={
            <>
              Complete the <Accent>room.</Accent>
            </>
          }
          text="Kitchens, wardrobes, ceilings, TV walls, curtains and sofas — designed to work together."
        />
        <Stagger gap={0.05} as="ul" className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {others.map((p) => {
            const cover = photoById(p.service.cover ?? p.service.showcase[0])
            return (
              <m.li key={p.slug} variants={fadeUp}>
                <a href={pagePath(p)} className="group relative block overflow-hidden rounded-[22px] bg-ink">
                  <img
                    src={cover.sm}
                    width={cover.w}
                    height={cover.h}
                    alt={cover.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover opacity-80 transition-all duration-[1.2s] ease-lux group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white sm:p-5">
                    <span className="text-[15px] leading-snug font-extrabold tracking-tight sm:text-lg">{p.service.name}</span>
                    <IconArrowUpRight className="h-5 w-5 shrink-0 text-gold transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </m.li>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

export default function ServicePage({ page }: { page: Page }) {
  const { service } = page
  return (
    <>
      <PageHero page={page} />
      <Overview page={page} />
      <Gallery
        scope={page.categories}
        title={
          <>
            {page.short}, <Accent>by Paiza.</Accent>
          </>
        }
        text="Designs and installations from our own work. Tap any photo to see it full size."
      />
      <Details page={page} />
      <Process />
      <FAQ
        items={page.faqs}
        message={service.message}
        title={
          <>
            {page.short}: your <Accent>questions.</Accent>
          </>
        }
      />
      <Related page={page} />
      <FinalCTA message={service.message} />
      <Contact service={service.name} />
    </>
  )
}
