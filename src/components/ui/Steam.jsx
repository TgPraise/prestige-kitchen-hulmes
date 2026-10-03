import { motion } from 'framer-motion'

// Soft wisps of steam. Reused on the hero reveal and on dish-card hover, so the whole
// page feels like one continuous kitchen (plan: "the same steam/heat cue").
const WISPS = [
  { x: '38%', delay: 0, dur: 3.4, scale: 1 },
  { x: '50%', delay: 0.9, dur: 3.9, scale: 1.15 },
  { x: '62%', delay: 1.7, dur: 3.2, scale: 0.9 },
]

export default function Steam({ active = true, startDelay = 0, count = 3, className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {WISPS.slice(0, count).map((w, i) => (
        <motion.svg
          key={i}
          viewBox="-30 -190 60 190"
          className="absolute bottom-[38%] h-[46%] w-auto -translate-x-1/2 overflow-visible"
          style={{ left: w.x }}
          initial={{ opacity: 0, y: 0 }}
          animate={
            active
              ? { opacity: [0, 0.55, 0], y: [0, -40 * w.scale, -95 * w.scale], x: [0, 7, -5] }
              : { opacity: 0 }
          }
          transition={
            active
              ? { delay: startDelay + w.delay, duration: w.dur, repeat: Infinity, ease: 'easeOut' }
              : { duration: 0.3 }
          }
        >
          <defs>
            <filter id={`steam-blur-${i}`} x="-100%" y="-20%" width="300%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <path
            d="M0 0 C 18 -34, -18 -68, 0 -100 S 18 -156, 0 -186"
            fill="none"
            stroke="#fbf1e6"
            strokeWidth="11"
            strokeLinecap="round"
            filter={`url(#steam-blur-${i})`}
          />
        </motion.svg>
      ))}
    </div>
  )
}
