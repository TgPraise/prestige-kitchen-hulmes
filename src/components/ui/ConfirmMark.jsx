import { motion } from 'framer-motion'
import Cloche from '../home/Cloche'
import { useMotionPrefs, EASE } from '../../lib/motion'

// A small echo of the hero's cloche reveal: the dome lifts once to uncover a checkmark, tying
// every confirmation moment (order, booking) back to the site's one piece of theatre, at a
// fraction of the scale. `sweepId` must be unique per instance if more than one is ever on screen.
export default function ConfirmMark({ sweepId = 'confirm' }) {
  const { reduced } = useMotionPrefs()
  return (
    <div className="relative mx-auto h-28 w-40 sm:h-32 sm:w-44">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.55, duration: 0.4, ease: EASE }}
      >
        <circle cx="50" cy="50" r="42" fill="#fff" />
        <motion.path
          d="M32 51 L45 64 L70 36"
          fill="none"
          stroke="#b5541f"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: reduced ? 0 : 0.85, duration: 0.5, ease: EASE }}
        />
      </motion.svg>
      {!reduced && (
        <motion.div
          className="absolute inset-0"
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '-120%', x: '18%', rotate: -14, opacity: 0 }}
          transition={{ delay: 0.15, duration: 0.65, ease: EASE }}
        >
          <Cloche sweepId={sweepId} />
        </motion.div>
      )}
    </div>
  )
}
