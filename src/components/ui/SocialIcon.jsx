// Minimal line icons, drawn in-house (no icon-font dependency, themeable via currentColor).
const icons = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M14.5 3h2.2c.16 1.36.86 2.53 2.05 3.3.8.53 1.72.83 2.75.9v2.24a7.8 7.8 0 0 1-3.35-.86v6.15a5.37 5.37 0 1 1-5.37-5.37c.19 0 .38.01.57.03v2.28a3.1 3.1 0 1 0 2.15 2.95V3z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-7.6h2.55l.38-2.96H13.5V8.53c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.24 4c-2.27 0-3.83 1.39-3.83 3.93v2.51H7.85v2.96h2.56V21h3.09z"
    />
  ),
}

export default function SocialIcon({ name, className = 'h-[18px] w-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {icons[name] ?? icons.instagram}
    </svg>
  )
}
