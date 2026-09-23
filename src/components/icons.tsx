import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const IconWhatsApp = (props: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden {...props}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.43-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.42-9.44 9.42m8.03-17.45A11.27 11.27 0 0 0 12.05.73C5.8.73.71 5.82.7 12.07c0 2 .52 3.95 1.52 5.66L.61 23.64l6.03-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.34-5.09 11.35-11.34a11.28 11.28 0 0 0-3.32-8.03" />
  </svg>
)

export const IconArrow = (props: P) => (
  <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const IconArrowUpRight = (props: P) => (
  <svg {...base(props)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
export const IconChevronLeft = (props: P) => (
  <svg {...base(props)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)
export const IconChevronRight = (props: P) => (
  <svg {...base(props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)
export const IconClose = (props: P) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const IconPlus = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const IconExpand = (props: P) => (
  <svg {...base(props)}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)
export const IconDiamond = (props: P) => (
  <svg {...base(props)}>
    <path d="M6 3h12l3 6-9 12L3 9z" />
    <path d="M3 9h18M9 3l3 18 3-18" />
  </svg>
)
export const IconCompass = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3v2M12 5l-6 16M12 5l6 16M8.2 15h7.6" />
    <circle cx="12" cy="5" r="1.6" />
  </svg>
)
export const IconTools = (props: P) => (
  <svg {...base(props)}>
    <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.5 2.5-2.7-.3-.3-2.7z" />
  </svg>
)
export const IconHeart = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 20s-7.5-4.6-9.2-9.3C1.6 7.3 3.9 4 7.3 4c2 0 3.5 1.1 4.7 2.7C13.2 5.1 14.7 4 16.7 4c3.4 0 5.7 3.3 4.5 6.7C19.5 15.4 12 20 12 20z" />
  </svg>
)
export const IconTruck = (props: P) => (
  <svg {...base(props)}>
    <path d="M2 6h11v10H2zM13 9h4.5L21 12.5V16h-8" />
    <circle cx="6" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
)
export const IconLayers = (props: P) => (
  <svg {...base(props)}>
    <path d="m12 3 9 5-9 5-9-5z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
)
export const IconSparkle = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
  </svg>
)
export const IconSofa = (props: P) => (
  <svg {...base(props)}>
    <path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" />
    <path d="M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2zM5 18v2M19 18v2" />
  </svg>
)
export const IconPhone = (props: P) => (
  <svg {...base(props)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
)
export const IconMail = (props: P) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)
export const IconPin = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)
export const IconStore = (props: P) => (
  <svg {...base(props)}>
    <path d="M3 9 4.5 4h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6" />
  </svg>
)
export const IconMenu = (props: P) => (
  <svg {...base(props)}>
    <path d="M4 8h16M4 16h10" />
  </svg>
)
