/**
 * Vector recreation of the Paiza Investment Ltd logo (roof with chimney,
 * red window, "Paiza" slab wordmark, red "INVESTMENT LTD").
 * `light` is the gold-on-dark version used on the flyer's black badge.
 */
export default function Logo({ light = true, className = '' }: { light?: boolean; className?: string }) {
  const main = light ? '#f5c518' : '#0d0c0b'
  const red = light ? '#ff4a3d' : '#d7261e'

  return (
    <svg
      viewBox="0 0 200 112"
      className={`h-12 w-auto sm:h-[52px] ${className}`}
      role="img"
      aria-label="Paiza Investment Ltd"
    >
      {/* Roof with chimney */}
      <path
        d="M22 44 100 9l78 35"
        fill="none"
        stroke={main}
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M131 23V6h10v22" fill="none" stroke={main} strokeWidth="6" strokeLinejoin="miter" />
      {/* Window */}
      <g fill={red}>
        <rect x="93" y="19" width="6.5" height="6.5" />
        <rect x="100.5" y="19" width="6.5" height="6.5" />
        <rect x="93" y="26.5" width="6.5" height="6.5" />
        <rect x="100.5" y="26.5" width="6.5" height="6.5" />
      </g>
      <text
        x="100"
        y="86"
        textAnchor="middle"
        textLength="178"
        lengthAdjust="spacingAndGlyphs"
        fill={main}
        style={{ font: "800 60px 'Roboto Slab', Rockwell, Georgia, serif" }}
      >
        Paiza
      </text>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        textLength="150"
        lengthAdjust="spacingAndGlyphs"
        fill={red}
        style={{ font: "700 17px 'Manrope', system-ui, sans-serif", letterSpacing: '1px' }}
      >
        INVESTMENT LTD
      </text>
    </svg>
  )
}
