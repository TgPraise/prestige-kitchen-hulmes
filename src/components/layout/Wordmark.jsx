import { Link } from 'react-router-dom'
import { site } from '../../data/site'

export function ClocheMark({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <circle cx="16" cy="6.5" r="2.4" fill="#e8c9a8" />
      <path d="M4 22C4 13.5 9.4 9.5 16 9.5S28 13.5 28 22z" fill="#b5541f" />
      <rect x="2" y="23.5" width="28" height="2.6" rx="1.3" fill="#fbf1e6" />
    </svg>
  )
}

export default function Wordmark({ onClick }) {
  return (
    <Link to="/" onClick={onClick} aria-label={`${site.name} ${site.area}, home`} className="flex min-h-11 items-center gap-2.5 text-cream">
      <ClocheMark />
      <span className="whitespace-nowrap font-display text-[1.2rem] font-medium leading-none tracking-[-0.005em] sm:text-[1.3rem]">
        {site.name}
        <span className="ml-1.5 hidden font-normal text-cream/70 sm:inline">{site.area}</span>
      </span>
    </Link>
  )
}
