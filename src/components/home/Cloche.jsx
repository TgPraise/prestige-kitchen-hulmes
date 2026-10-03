// The silver dome. Shares the 1000x700 canvas with DishArt so it sits exactly over the plate.
export default function Cloche({ sweepId = 'cloche' }) {
  const dome = 'M140 476 C140 240 300 148 500 148 C700 148 860 240 860 476 Z'
  return (
    <svg viewBox="0 0 1000 700" className="h-full w-full overflow-visible" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${sweepId}-metal`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c8288" />
          <stop offset="0.22" stopColor="#d9dee2" />
          <stop offset="0.42" stopColor="#f6f8f9" />
          <stop offset="0.7" stopColor="#aab0b6" />
          <stop offset="1" stopColor="#60666c" />
        </linearGradient>
        <linearGradient id={`${sweepId}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6d7378" />
          <stop offset="0.4" stopColor="#e4e8eb" />
          <stop offset="1" stopColor="#5b6166" />
        </linearGradient>
        <clipPath id={`${sweepId}-clip`}><path d={dome} /></clipPath>
        <filter id={`${sweepId}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <ellipse cx="500" cy="520" rx="380" ry="60" fill="#000" opacity="0.4" filter={`url(#${sweepId}-shadow)`} />
      <path d={dome} fill={`url(#${sweepId}-metal)`} />
      <path d="M190 440 C 195 290, 290 200, 420 172" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" opacity="0.55" />
      <g clipPath={`url(#${sweepId}-clip)`}>
        <rect className="cloche-sweep" x="-160" y="120" width="110" height="380" fill="#fff" opacity="0.5" />
      </g>
      <ellipse cx="500" cy="478" rx="366" ry="34" fill={`url(#${sweepId}-rim)`} />
      <ellipse cx="500" cy="470" rx="366" ry="30" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" />
      <rect x="482" y="120" width="36" height="36" rx="6" fill={`url(#${sweepId}-rim)`} />
      <ellipse cx="500" cy="112" rx="42" ry="18" fill={`url(#${sweepId}-metal)`} />
    </svg>
  )
}
