/**
 * Wordmark built from the Paiza brand colours (yellow roof, red accent).
 * Swap for the official logo file once supplied: drop it in /public and
 * replace this component's markup with an <img>.
 */
export default function Logo({ light = true, className = '' }: { light?: boolean; className?: string }) {
  const text = light ? 'text-white' : 'text-ink'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden>
        <rect width="64" height="64" rx="14" className={light ? 'fill-white/10' : 'fill-ink'} />
        <path
          d="M12 30 32 13l20 17"
          fill="none"
          stroke="#f5c518"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 50V34h11a7 7 0 0 1 0 14h-11"
          fill="none"
          stroke="#fff"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="46" cy="49" r="3.5" fill="#e0301e" />
      </svg>
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="text-[19px] font-extrabold tracking-[0.18em]">PAIZA</span>
        <span className="mt-1 text-[8.5px] font-bold tracking-[0.34em] opacity-60">INVESTMENT LTD</span>
      </span>
    </span>
  )
}
