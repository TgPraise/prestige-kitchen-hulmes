import { motion } from 'framer-motion'
import { EASE, useMotionPrefs } from '../../lib/motion'

// A soft fade-in as content scrolls into view. Deliberately opacity-only:
// the hero is the theatre; everything after it is calm.
export default function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const { reduced } = useMotionPrefs()
  const Tag = motion[as]
  if (reduced) return <Tag className={className}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
