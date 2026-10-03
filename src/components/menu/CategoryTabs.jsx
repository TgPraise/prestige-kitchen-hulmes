import { motion } from 'framer-motion'
import { categories } from '../../data/menu'
import { useMotionPrefs } from '../../lib/motion'

// Horizontally scrollable pill tabs, synced to ?cat= by the caller. A layoutId-animated
// underline follows the active pill; switching category never reloads the page.
export default function CategoryTabs({ active, onChange }) {
  const { reduced } = useMotionPrefs()
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="scrollbar-none flex gap-2 overflow-x-auto pb-1"
    >
      {categories.map((c) => {
        const isActive = c.id === active
        return (
          <button
            key={c.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(c.id)}
            className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 font-sans text-[0.95rem] font-semibold transition-colors ${
              isActive ? 'text-on-terracotta' : 'text-espresso/70 hover:text-espresso'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-terracotta"
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{c.label}</span>
          </button>
        )
      })}
    </div>
  )
}
