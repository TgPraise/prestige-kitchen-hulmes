import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import DishArt from '../ui/DishArt'
import AddToCart from './AddToCart'
import { priceLabel, servesLabel } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

// Quick-view: shows the boil's real, itemised contents where the client's own product page
// listed them — the fastest way to prove "no surprises" on a menu that's mostly opaque boxes.
export default function DishModal({ dish, onClose }) {
  const { reduced } = useMotionPrefs()
  const closeBtn = useRef(null)

  useEffect(() => {
    if (!dish) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeBtn.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [dish, onClose])

  if (!dish) return null
  const price = priceLabel(dish)
  const serves = servesLabel(dish)

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-end justify-center bg-espresso/60 backdrop-blur-sm sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream pb-safe sm:rounded-3xl"
          initial={reduced ? { opacity: 0 } : { y: '100%' }}
          animate={reduced ? { opacity: 1 } : { y: 0 }}
          exit={reduced ? { opacity: 0 } : { y: '100%' }}
          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {dish.img ? (
              <img src={dish.img} alt={dish.name} className="h-full w-full object-cover" />
            ) : (
              <DishArt kind={dish.art} className="h-full w-full" />
            )}
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-espresso/80 text-cream backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="p-6 sm:p-7">
            <h2 id="dish-modal-title" className="font-display text-2xl font-medium leading-tight text-espresso">
              {dish.name}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-taupe">
              {serves && <span>{serves}</span>}
              {dish.note && <span>{dish.note}</span>}
            </div>

            {dish.contents && (
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-espresso/10 pt-4">
                {dish.contents.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[0.9375rem] leading-snug text-espresso">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            )}

            {dish.tagsConfirmed && dish.tags.length > 0 && (
              <p className="mt-3 text-sm text-taupe">{dish.tags.join(' · ')}</p>
            )}

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-espresso/10 pt-5">
              <span className="font-sans text-xl font-semibold text-terracotta-deep">{price ?? 'Price on request'}</span>
              <AddToCart dish={dish} size="lg" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
