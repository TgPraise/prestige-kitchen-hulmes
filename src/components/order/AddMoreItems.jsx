import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DishArt from '../ui/DishArt'
import AddToCart from '../menu/AddToCart'
import { categories, menu } from '../../data/menu'
import { priceLabel } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

function ChevronDown({ open }) {
  return (
    <motion.svg
      width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function Row({ dish }) {
  const price = priceLabel(dish)
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
        {dish.img ? (
          <img src={dish.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <DishArt kind={dish.art} className="h-full w-full" fit="meet" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-[0.9rem] font-semibold text-espresso">{dish.name}</p>
        <p className="text-[0.8125rem] text-taupe">{price ?? 'Price on request'}</p>
      </div>
      <AddToCart dish={dish} />
    </div>
  )
}

// A collapsed mini-menu, grouped exactly like the full Menu page, so someone can bulk up an
// order without losing their place in checkout.
export default function AddMoreItems() {
  const [open, setOpen] = useState(categories[0]?.id ?? null)
  const { reduced } = useMotionPrefs()

  return (
    <div className="rounded-3xl bg-white/70 ring-1 ring-espresso/10">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <h2 className="font-display text-xl font-medium text-espresso">Add more items</h2>
      </div>
      <div className="mt-3 divide-y divide-espresso/8 px-5 sm:px-6">
        {categories.map((cat) => {
          const isOpen = open === cat.id
          const dishes = menu.filter((d) => d.category === cat.id)
          return (
            <div key={cat.id}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : cat.id)}
                aria-expanded={isOpen}
                className="flex min-h-12 w-full items-center justify-between gap-3 text-left"
              >
                <span className="font-sans text-[0.95rem] font-semibold text-espresso">{cat.label}</span>
                <ChevronDown open={isOpen} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-espresso/6 pb-3">
                      {dishes.map((dish) => (
                        <Row key={dish.id} dish={dish} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
