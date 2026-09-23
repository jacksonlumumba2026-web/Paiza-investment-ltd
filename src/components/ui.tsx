import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

/** Fades and slides content up once, the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Parent for staggered children that use the `fadeUp` variant. */
export function Stagger({
  children,
  className,
  gap = 0.1,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
  as?: 'div' | 'ul'
}) {
  const Comp = as === 'ul' ? motion.ul : motion.div
  return (
    <Comp
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </Comp>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  align = 'left',
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  dark?: boolean
  align?: 'left' | 'center'
  className?: string
}) {
  const center = align === 'center'
  return (
    <Stagger
      gap={0.12}
      className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}
    >
      <motion.p
        variants={fadeUp}
        className={`eyebrow ${dark ? 'text-gold' : 'text-ember'} ${center ? 'justify-center' : ''}`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className={`display mt-5 text-[40px] sm:text-5xl lg:text-[64px] ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p
          variants={fadeUp}
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            dark ? 'text-white/60' : 'text-ink/60'
          } ${center ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}
        >
          {text}
        </motion.p>
      )}
    </Stagger>
  )
}

/** Serif italic accent used inside bold headlines. */
export const Accent = ({ children }: { children: ReactNode }) => (
  <span className="font-serif font-normal italic tracking-[-0.01em]">{children}</span>
)
