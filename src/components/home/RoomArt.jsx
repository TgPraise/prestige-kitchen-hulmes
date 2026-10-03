// Placeholder scenes for The Room (pendant lamps over a bar, table or pass).
const palettes = {
  dining: ['#4a2c1b', '#1f120b'],
  bar: ['#3b2418', '#160b06'],
  kitchen: ['#52321f', '#20130c'],
}

export default function RoomArt({ scene = 'dining', label }) {
  const [a, b] = palettes[scene] ?? palettes.dining
  const id = `room-${scene}`
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id={`${id}-lamp`}>
          <stop offset="0" stopColor="#ffc98a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffc98a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      {[110, 200, 290].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={150 + (i % 2) * 24} r="90" fill={`url(#${id}-lamp)`} />
          <line x1={x} y1="0" x2={x} y2={92 + (i % 2) * 24} stroke="#1a0f09" strokeWidth="2" />
          <path d={`M${x - 20} ${112 + (i % 2) * 24} a20 20 0 0 1 40 0z`} fill="#e8b57a" />
        </g>
      ))}
      {scene === 'bar' && (
        <g>
          {[60, 120, 180, 240, 300].map((x, i) => (
            <rect key={x} x={x} y={250 - (i % 3) * 14} width="26" height={70 + (i % 3) * 14} rx="6" fill="#b5541f" opacity="0.55" />
          ))}
          <rect x="0" y="360" width="400" height="140" fill="#2b1810" />
          <rect x="0" y="352" width="400" height="14" fill="#6b3f26" />
        </g>
      )}
      {scene === 'dining' && (
        <g>
          <rect x="0" y="380" width="400" height="120" fill="#22130b" />
          <ellipse cx="200" cy="392" rx="150" ry="20" fill="#6b3f26" />
          <ellipse cx="200" cy="388" rx="150" ry="18" fill="#8a5232" />
          {[130, 270].map((x) => (
            <g key={x}>
              <rect x={x - 3} y="330" width="6" height="50" fill="#fbf1e6" opacity="0.85" />
              <circle cx={x} cy="326" r="5" fill="#ffc98a" />
            </g>
          ))}
        </g>
      )}
      {scene === 'kitchen' && (
        <g>
          <rect x="0" y="330" width="400" height="170" fill="#22130b" />
          <rect x="0" y="322" width="400" height="16" fill="#c9ced2" opacity="0.7" />
          {[70, 150, 230, 310].map((x) => (
            <rect key={x} x={x} y="286" width="44" height="34" rx="6" fill="#e8ebee" opacity="0.5" />
          ))}
        </g>
      )}
    </svg>
  )
}
