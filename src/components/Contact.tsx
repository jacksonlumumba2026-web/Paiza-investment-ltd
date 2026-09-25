import { m } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { SERVICE_OPTIONS } from '../data/services'
import { SITE, directionsLink, waLink } from '../data/site'
import { trackContact } from '../analytics'
import { IconArrowUpRight, IconMail, IconPhone, IconPin, IconStore, IconWhatsApp } from './icons'
import { Accent, Reveal, SectionHeading, Stagger, fadeUp } from './ui'

type Form = { name: string; phone: string; email: string; service: string; message: string }
const EMPTY: Form = { name: '', phone: '', email: '', service: '', message: '' }

function buildMessage(f: Form) {
  const lines = ['Hello Paiza Investment Ltd,', '', `Name: ${f.name.trim()}`, `Phone: ${f.phone.trim()}`]
  if (f.email.trim()) lines.push(`Email: ${f.email.trim()}`)
  lines.push(`Service: ${f.service}`)
  if (f.message.trim()) lines.push(`Message: ${f.message.trim()}`)
  return lines.join('\n')
}

const field =
  'peer w-full rounded-2xl border border-ink/10 bg-white px-5 pt-7 pb-2.5 text-[16px] text-ink outline-none transition focus:border-ink/40 focus:ring-4 focus:ring-gold/25'
const labelCls =
  'pointer-events-none absolute top-2 left-5 text-[13px] font-bold tracking-[0.08em] text-ink/70 uppercase'

export default function Contact() {
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  /** Validates, shows errors and focuses the first invalid field. Returns true when the form is valid. */
  const validate = () => {
    const next: typeof errors = {}
    if (!form.name.trim()) next.name = 'Please enter your name'
    if (!/^[+\d][\d\s-]{8,}$/.test(form.phone.trim())) next.phone = 'Please enter a valid phone number'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email'
    if (!form.service) next.service = 'Please choose a service'
    setErrors(next)
    const firstInvalid = (['name', 'phone', 'email', 'service'] as const).find((k) => next[k])
    if (firstInvalid) document.getElementById(firstInvalid)?.focus()
    return !firstInvalid
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    trackContact('enquiry-form')
    window.open(waLink(buildMessage(form)), '_blank', 'noopener,noreferrer')
  }

  // For visitors without WhatsApp (e.g. on a work computer): same details, sent by email.
  const sendEmail = () => {
    if (!validate()) return
    trackContact('email-form')
    const subject = `Website enquiry: ${form.service} (${form.name.trim()})`
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(form))}`
  }

  const details = [
    { icon: IconPhone, label: 'Phone', value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
    { icon: IconWhatsApp, label: 'WhatsApp', value: SITE.phoneDisplay, href: waLink(), external: true },
    { icon: IconMail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: IconPin, label: 'Location', value: SITE.location, href: directionsLink(), external: true },
    { icon: IconStore, label: 'Branch', value: 'Mombasa Rd' },
  ]

  return (
    <section id="contact" className="section bg-cream">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let’s create something <Accent>beautiful.</Accent>
            </>
          }
          text="Tell us about your space. Your enquiry opens directly in WhatsApp so our team can respond quickly."
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Details card */}
          <Reveal className="min-w-0 lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-[28px] bg-ink p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
              <p className="text-[12px] font-bold tracking-[0.24em] text-gold uppercase">{SITE.name}</p>
              <p className="mt-3 font-serif text-3xl leading-tight italic">{SITE.tagline}</p>

              <ul className="mt-10 space-y-1">
                {details.map(({ icon: Icon, label, value, href, external }) => {
                  const inner = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12px] font-bold tracking-[0.2em] text-white/60 uppercase">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-[15px] font-semibold [overflow-wrap:anywhere] text-white/90">
                          {value}
                        </span>
                      </span>
                    </>
                  )
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="group flex items-center gap-4 rounded-2xl p-2 -mx-2 transition-colors hover:bg-white/[0.04]"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4 p-2 -mx-2">{inner}</div>
                      )}
                    </li>
                  )
                })}
              </ul>

              <a
                href={waLink('Hello Paiza Investment Ltd, I would like to request a consultation for my space.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-10 w-full !py-4"
              >
                <IconWhatsApp className="h-5 w-5" />
                Request a consultation
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
            <form
              onSubmit={submit}
              noValidate
              className="h-full rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(13,12,11,0.4)] ring-1 ring-ink/[0.06] sm:p-10"
            >
              <h3 className="text-2xl font-extrabold tracking-tight">Send an enquiry</h3>
              <p className="mt-2 text-sm text-ink/65">
                Fill in your details — we’ll prepare a WhatsApp message for you to send.
              </p>

              <Stagger gap={0.06} className="mt-8 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ['name', 'Full name', 'text', 'name'],
                    ['phone', 'Phone number', 'tel', 'tel'],
                  ] as const
                ).map(([k, l, type, ac]) => (
                  <m.div key={k} variants={fadeUp}>
                    <div className="relative">
                      <input
                        id={k}
                        type={type}
                        autoComplete={ac}
                        value={form[k]}
                        onChange={set(k)}
                        className={field}
                        aria-invalid={!!errors[k]}
                        aria-describedby={errors[k] ? `${k}-error` : undefined}
                        required
                      />
                      <label htmlFor={k} className={labelCls}>
                        {l} *
                      </label>
                    </div>
                    {errors[k] && (
                      <p id={`${k}-error`} role="alert" className="mt-1.5 pl-2 text-sm text-ember">
                        {errors[k]}
                      </p>
                    )}
                  </m.div>
                ))}

                <m.div variants={fadeUp}>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set('email')}
                      className={field}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    <label htmlFor="email" className={labelCls}>
                      Email
                    </label>
                  </div>
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 pl-2 text-sm text-ember">
                      {errors.email}
                    </p>
                  )}
                </m.div>

                <m.div variants={fadeUp}>
                  <div className="relative">
                    <select
                      id="service"
                      value={form.service}
                      onChange={set('service')}
                      className={`${field} appearance-none pr-10 ${form.service ? '' : 'text-ink/65'}`}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      required
                    >
                      <option value="" disabled>
                        Choose a service
                      </option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s} className="text-ink">
                          {s}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="service" className={labelCls}>
                      Service interested in *
                    </label>
                    <span className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-ink/65">▾</span>
                  </div>
                  {errors.service && (
                    <p id="service-error" role="alert" className="mt-1.5 pl-2 text-sm text-ember">
                      {errors.service}
                    </p>
                  )}
                </m.div>

                <m.div variants={fadeUp} className="relative sm:col-span-2">
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    className={`${field} resize-none pt-8`}
                    placeholder="Tell us about your space, measurements or the style you like…"
                  />
                  <label htmlFor="message" className={labelCls}>
                    Message
                  </label>
                </m.div>
              </Stagger>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button type="button" onClick={sendEmail} className="btn-outline-dark !px-6 !py-4">
                  <IconMail className="h-4 w-4" />
                  Send by email instead
                </button>
                <button type="submit" className="btn-dark group !px-8 !py-4">
                  <IconWhatsApp className="h-4 w-4" />
                  Send via WhatsApp
                </button>
              </div>
              <p className="mt-4 text-sm text-ink/70 sm:text-right">
                WhatsApp opens with your details filled in. No WhatsApp? Email sends the same details to{' '}
                {SITE.email}.
              </p>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <p className="text-[12px] font-bold tracking-[0.18em] text-ink/70 uppercase">What happens next</p>
                <ol className="mt-4 grid gap-3 text-sm text-ink/75 sm:grid-cols-2">
                  {[
                    'We reply to discuss your space and style',
                    'We agree the design and requirements',
                    'You receive a quotation',
                    'We supply and fit, countrywide',
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-[12px] font-bold text-ink">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Map / location */}
        <Reveal className="mt-6 lg:mt-8">
          <div className="grid overflow-hidden rounded-[28px] bg-white ring-1 ring-ink/[0.06] lg:grid-cols-12">
            <div className="relative min-h-[300px] lg:col-span-8 lg:min-h-[380px]">
              {SITE.mapEmbedUrl ? (
                <iframe
                  title="Paiza Investment Ltd location map"
                  src={SITE.mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.3]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 overflow-hidden bg-sand">
                  {/* Stylised map placeholder — replace via SITE.mapEmbedUrl */}
                  <svg className="absolute inset-0 h-full w-full text-ink/[0.08]" aria-hidden>
                    <defs>
                      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path d="M48 0H0v48" fill="none" stroke="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path d="M-20 220 C 200 160, 380 300, 620 210 S 980 140, 1400 240" stroke="white" strokeWidth="22" fill="none" />
                    <path d="M340 -20 C 360 120, 300 260, 380 420" stroke="white" strokeWidth="14" fill="none" />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="relative mx-auto grid h-16 w-16 place-items-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
                      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-ink text-gold shadow-xl">
                        <IconPin className="h-6 w-6" />
                      </span>
                    </span>
                    <p className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wide shadow-lg">
                      Nderitu Rd · Kikuyu Town
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-4">
              <p className="eyebrow text-ember">Visit us</p>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight">Kikuyu Town</h3>
              <p className="mt-2 leading-relaxed text-ink/60">{SITE.location}</p>
              <div className="mt-6 border-t border-ink/10 pt-6">
                <p className="text-[12px] font-bold tracking-[0.2em] text-ink/65 uppercase">Also at</p>
                <p className="mt-1 font-semibold">{SITE.branch}</p>
              </div>
              <a
                href={directionsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark group mt-8 self-start"
              >
                Get directions
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
