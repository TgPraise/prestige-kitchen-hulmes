import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import QtyStepper from '../ui/QtyStepper'
import { useCart } from '../../context/CartContext'
import { EASE } from '../../lib/motion'

// Priceless items (contents not yet costed by the client) can't be added to a cart honestly —
// so they get a "Call to order" affordance instead of Add, everywhere this is used.
export default function AddToCart({ dish, size = 'md' }) {
  const { qtyOf, add, inc, dec } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const qty = qtyOf(dish.id)
  const big = size === 'lg'

  if (dish.pricePence == null) {
    return (
      <a
        href="tel:+441610000000"
        className={`inline-flex ${big ? 'min-h-12 px-5 text-base' : 'min-h-11 px-4 text-[0.9375rem]'} items-center justify-center rounded-full border-2 border-espresso/20 font-semibold text-espresso/70 transition-colors hover:border-espresso/40 hover:text-espresso`}
      >
        Call to order
      </a>
    )
  }

  if (qty > 0) {
    return <QtyStepper qty={qty} label={dish.name} onInc={() => inc(dish.id)} onDec={() => dec(dish.id)} />
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(dish)
        setJustAdded(true)
        setTimeout(() => setJustAdded(false), 900)
      }}
      className={`relative inline-flex ${big ? 'min-h-12 px-6 text-base' : 'min-h-11 px-5 text-[0.9375rem]'} items-center justify-center overflow-hidden rounded-full bg-terracotta font-semibold text-on-terracotta transition-colors hover:bg-terracotta-deep`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={justAdded ? 'added' : 'add'}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          {justAdded ? 'Added ✓' : 'Add'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
