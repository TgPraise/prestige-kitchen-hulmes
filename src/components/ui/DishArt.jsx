// Illustrated dish scenes used until real photography is dropped in.
// Every scene shares one 1000x700 canvas (table, plate, food), so they crop cleanly to any
// aspect ratio via `slice`. Real photos: set `image` on the dish in data/menu.js.
const LABELS = {
  chicken: 'Buttermilk fried chicken on mash with gravy',
  pie: 'Golden short rib pie with a pot of gravy',
  mac: 'Truffle mac and cheese in a bowl',
  pudding: 'Sticky toffee pudding with toffee sauce and cream',
  boil: 'Seafood boil with prawns, corn and potatoes in a tray',
  prawns: 'A plate of seasoned prawns',
  bowl: 'A bowl of seafood curry with rice',
  chips: 'Fish and chips in a paper tray',
}

function Defs() {
  return (
    <defs>
      <radialGradient id="da-table" gradientUnits="userSpaceOnUse" cx="500" cy="430" r="720">
        <stop offset="0" stopColor="#6a3f26" />
        <stop offset="0.55" stopColor="#3c2416" />
        <stop offset="1" stopColor="#1d100a" />
      </radialGradient>
      <radialGradient id="da-plate" cx="50%" cy="40%" r="65%">
        <stop offset="0" stopColor="#fff6ea" />
        <stop offset="1" stopColor="#dcc7ae" />
      </radialGradient>
      <radialGradient id="da-well" cx="50%" cy="45%" r="60%">
        <stop offset="0" stopColor="#f6e8d6" />
        <stop offset="1" stopColor="#d9c3a8" />
      </radialGradient>
      <linearGradient id="da-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f0b24f" />
        <stop offset="0.6" stopColor="#c9781f" />
        <stop offset="1" stopColor="#8a4a14" />
      </linearGradient>
      <linearGradient id="da-mash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff2cf" />
        <stop offset="1" stopColor="#ecd39b" />
      </linearGradient>
      <linearGradient id="da-gravy" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7a4526" />
        <stop offset="1" stopColor="#4a2612" />
      </linearGradient>
      <linearGradient id="da-cheese" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f7c25a" />
        <stop offset="1" stopColor="#d98a24" />
      </linearGradient>
      <linearGradient id="da-sponge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7a4a2a" />
        <stop offset="1" stopColor="#4d2a15" />
      </linearGradient>
      <linearGradient id="da-shell" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4a56a" />
        <stop offset="1" stopColor="#c76a2e" />
      </linearGradient>
      <linearGradient id="da-crab" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e2632c" />
        <stop offset="1" stopColor="#a83f1a" />
      </linearGradient>
      <linearGradient id="da-corn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffd873" />
        <stop offset="1" stopColor="#e0a838" />
      </linearGradient>
      <linearGradient id="da-curry" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d67a2a" />
        <stop offset="1" stopColor="#8a4210" />
      </linearGradient>
      <linearGradient id="da-batter" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f7cf7a" />
        <stop offset="1" stopColor="#c98a2e" />
      </linearGradient>
      <linearGradient id="da-paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fbeedb" />
        <stop offset="1" stopColor="#e4cba0" />
      </linearGradient>
      <radialGradient id="da-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#ffb266" stopOpacity="0.5" />
        <stop offset="1" stopColor="#ffb266" stopOpacity="0" />
      </radialGradient>
      <filter id="da-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
    </defs>
  )
}

function Plate() {
  return (
    <g>
      <ellipse cx="500" cy="540" rx="380" ry="92" fill="#000" opacity="0.45" filter="url(#da-soft)" />
      <ellipse cx="500" cy="486" rx="350" ry="98" fill="#bfa78a" />
      <ellipse cx="500" cy="474" rx="350" ry="98" fill="url(#da-plate)" />
      <ellipse cx="500" cy="478" rx="268" ry="70" fill="url(#da-well)" />
      <ellipse cx="500" cy="472" rx="268" ry="70" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
    </g>
  )
}

const crumbs = [
  [360, 420], [400, 440], [452, 398], [498, 428], [540, 404], [585, 436],
  [620, 412], [650, 440], [430, 452], [520, 452], [570, 396], [470, 416],
]

function Chicken() {
  return (
    <g>
      <ellipse cx="410" cy="440" rx="140" ry="74" fill="url(#da-mash)" />
      <path d="M330 420 C 370 470, 470 470, 500 430 C 470 445, 380 440, 330 420Z" fill="url(#da-gravy)" opacity="0.92" />
      <g transform="rotate(-10 580 420)">
        <ellipse cx="590" cy="424" rx="132" ry="66" fill="url(#da-gold)" />
        <ellipse cx="590" cy="408" rx="112" ry="40" fill="#f2b95c" opacity="0.5" />
      </g>
      <g transform="rotate(9 480 396)">
        <ellipse cx="480" cy="396" rx="118" ry="58" fill="url(#da-gold)" />
        <ellipse cx="480" cy="382" rx="98" ry="34" fill="#f4c168" opacity="0.55" />
      </g>
      {crumbs.map(([x, y], i) => (
        <circle key={i} cx={x + 40} cy={y - 6} r={4 + (i % 3)} fill="#8a4a14" opacity="0.55" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx={690 + i * 14} cy={446 - i * 12} rx="22" ry="9" fill={i % 2 ? '#5f8a3d' : '#7aa552'} transform={`rotate(${-30 + i * 22} ${690 + i * 14} ${446 - i * 12})`} />
      ))}
    </g>
  )
}

function Pie() {
  return (
    <g>
      <ellipse cx="480" cy="452" rx="220" ry="58" fill="#a8621c" />
      <path d="M262 452 C 262 300, 698 300, 698 452 C 640 486, 320 486, 262 452Z" fill="url(#da-gold)" />
      <path d="M330 360 C 420 322, 540 322, 640 360" fill="none" stroke="#f6cf80" strokeWidth="9" strokeLinecap="round" opacity="0.7" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${440 + i * 46} ${350 + i * 4} q14 26 0 52`} fill="none" stroke="#6b3a10" strokeWidth="9" strokeLinecap="round" />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <ellipse key={i} cx={296 + i * 26} cy={462 + Math.sin(i) * 3} rx="15" ry="9" fill="#b76f22" opacity="0.9" />
      ))}
      <ellipse cx="760" cy="470" rx="72" ry="24" fill="#5c5c60" />
      <path d="M690 452 v34 c0 14 144 14 144 0 v-34" fill="#78787d" />
      <ellipse cx="762" cy="452" rx="72" ry="22" fill="url(#da-gravy)" />
    </g>
  )
}

function Mac() {
  return (
    <g>
      <ellipse cx="500" cy="452" rx="215" ry="62" fill="#3d2a24" />
      <path d="M285 440 v22 c0 60 430 60 430 0 v-22" fill="#4b352d" />
      <ellipse cx="500" cy="436" rx="205" ry="56" fill="url(#da-cheese)" />
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={330 + ((i * 47) % 340)} cy={418 + ((i * 29) % 44)} r={7 + (i % 4) * 2} fill="#a45a17" opacity="0.65" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse key={i} cx={380 + i * 30} cy={430 + ((i * 17) % 28)} rx="13" ry="5" fill="#2b1c14" opacity="0.85" />
      ))}
    </g>
  )
}

function Pudding() {
  return (
    <g>
      <ellipse cx="500" cy="472" rx="230" ry="44" fill="#b8681e" opacity="0.9" />
      <path d="M340 400 L560 372 L660 410 L440 446Z" fill="#8f5530" />
      <path d="M340 400 L440 446 L440 500 L340 452Z" fill="url(#da-sponge)" />
      <path d="M440 446 L660 410 L660 462 L440 500Z" fill="#3f2110" />
      <path d="M340 400 L560 372 L660 410 L440 446Z" fill="url(#da-sponge)" />
      <path d="M352 402 C 400 420, 470 440, 520 420 C 560 404, 610 412, 650 412 L 660 424 C 620 438, 520 460, 440 458 C 400 446, 362 424, 352 402Z" fill="#d68a2e" opacity="0.95" />
      <ellipse cx="700" cy="440" rx="58" ry="40" fill="#fff4dc" />
      <ellipse cx="690" cy="428" rx="34" ry="18" fill="#ffffff" opacity="0.6" />
    </g>
  )
}

function prawnShape(cx, cy, rot, scale = 1) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${scale})`}>
      <path d="M-40 0 C -40 -34, -10 -48, 20 -40 C 46 -33, 52 -8, 40 14 C 30 32, 4 38, -16 28 C -32 20, -40 12, -40 0Z" fill="url(#da-shell)" />
      <path d="M-40 0 C -30 -6, -16 -8, -2 -4" fill="none" stroke="#8a3d16" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      <path d="M14 -38 C 26 -46, 40 -44, 46 -34" fill="none" stroke="#8a3d16" strokeWidth="5" strokeLinecap="round" />
      <circle cx="18" cy="-36" r="3.5" fill="#3a1c0c" />
    </g>
  )
}

function Boil() {
  return (
    <g>
      <ellipse cx="500" cy="452" rx="290" ry="86" fill="#8a5a2c" />
      <ellipse cx="500" cy="440" rx="278" ry="80" fill="#c67f3a" />
      <ellipse cx="500" cy="432" rx="268" ry="74" fill="#e2a252" />
      {prawnShape(420, 400, -20, 1.05)}
      {prawnShape(560, 410, 35, 0.95)}
      {prawnShape(480, 460, 150, 1)}
      <circle cx="330" cy="430" r="46" fill="url(#da-crab)" />
      <path d="M300 410 q-22 -14 -34 2" fill="none" stroke="url(#da-crab)" strokeWidth="10" strokeLinecap="round" />
      <path d="M360 408 q22 -14 34 2" fill="none" stroke="url(#da-crab)" strokeWidth="10" strokeLinecap="round" />
      <g transform="translate(640 448) rotate(8)">
        <rect x="-16" y="-52" width="32" height="104" rx="16" fill="url(#da-corn)" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={-14} y1={-46 + i * 15} x2={14} y2={-46 + i * 15} stroke="#b9821f" strokeWidth="2" opacity="0.5" />
        ))}
      </g>
      {[[400, 470], [460, 486], [540, 480], [590, 466]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="20" fill="#f0d9a8" />
      ))}
    </g>
  )
}

function Prawns() {
  return (
    <g>
      <ellipse cx="500" cy="452" rx="230" ry="60" fill="#8a5a2c" opacity="0.5" />
      {[[-70, -20, -25], [0, -55, 8], [70, -10, -40], [-30, 30, 50], [40, 45, 15], [120, 20, -60]].map(([dx, dy, rot], i) => (
        <g key={i}>{prawnShape(500 + dx, 430 + dy, rot, 0.9)}</g>
      ))}
      <path d="M320 470 q180 40 360 0" fill="none" stroke="#7a3f18" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </g>
  )
}

function Bowl() {
  return (
    <g>
      <ellipse cx="500" cy="470" rx="235" ry="66" fill="#3d2a24" />
      <ellipse cx="500" cy="452" rx="222" ry="60" fill="url(#da-curry)" />
      <ellipse cx="500" cy="440" rx="150" ry="38" fill="#f2e2c4" opacity="0.95" />
      {prawnShape(430, 436, -15, 0.62)}
      {prawnShape(560, 442, 25, 0.6)}
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={i} cx={360 + ((i * 41) % 280)} cy={424 + ((i * 23) % 40)} r="5" fill="#e2662c" opacity="0.7" />
      ))}
    </g>
  )
}

function Chips() {
  return (
    <g>
      <path d="M300 380 L700 380 L672 500 L328 500Z" fill="url(#da-paper)" />
      <path d="M300 380 L700 380 L690 410 L310 410Z" fill="#e0522c" opacity="0.85" />
      <g transform="translate(420 360) rotate(-8)">
        <ellipse cx="0" cy="0" rx="92" ry="52" fill="url(#da-batter)" />
        <ellipse cx="-10" cy="-14" rx="60" ry="26" fill="#f8dfa0" opacity="0.6" />
      </g>
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={340 + i * 26} y={392 - (i % 3) * 10} width="14" height={70 + (i % 3) * 14} rx="4" fill="url(#da-corn)" transform={`rotate(${(i % 5) - 2} ${347 + i * 26} 430)`} />
      ))}
    </g>
  )
}

const scenes = { chicken: Chicken, pie: Pie, mac: Mac, pudding: Pudding, boil: Boil, prawns: Prawns, bowl: Bowl, chips: Chips }

export default function DishArt({ kind = 'chicken', className = '', label, fit = 'slice' }) {
  const Scene = scenes[kind] ?? Chicken
  return (
    <svg
      viewBox={fit === 'meet' ? '110 200 780 420' : '0 0 1000 700'} /* meet = tight crop on the plate for small cards */
      preserveAspectRatio={`xMidYMid ${fit}`}
      className={className}
      role="img"
      aria-label={label ?? LABELS[kind]}
    >
      <Defs />
      <rect x="-1500" y="-1500" width="4000" height="4000" fill="url(#da-table)" />
      <ellipse cx="500" cy="440" rx="480" ry="300" fill="url(#da-glow)" />
      <Plate />
      <Scene />
    </svg>
  )
}
