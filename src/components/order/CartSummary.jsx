import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CartLine from './CartLine'
import DishArt from '../ui/DishArt'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

function EmptyCart() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <div className="h-24 w-24 overflow-hidden rounded-full ring-1 ring-espresso/10">
        <DishArt kind="boil" className="h-full w-full" />
      </div>
      <p className="mt-5 font-display text-lg font-medium text-espresso">Your order is empty</p>
      <p className="mt-1.5 max-w-[26ch] text-[0.9375rem] leading-relaxed text-taupe">
        Add a boil or a side from the menu to get started.
      </p>
      <Link
        to="/menu"
        className="mt-5 inline-flex min-h-11 items-center rounded-full bg-terracotta px-6 font-semibold text-on-terracotta hover:bg-terracotta-deep"
      >
        Browse the menu
      </Link>
    </div>
  )
}

export default function CartSummary() {
  const { items, count, subtotalPence, subtotalIsFrom } = useCart()
  const { reduced } = useMotionPrefs()

  return (
    <div className="rounded-3xl bg-white/70 ring-1 ring-espresso/10">
      <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
        <h2 className="font-display text-xl font-medium text-espresso">Your order</h2>
        {count > 0 && (
          <span className="rounded-full bg-cream-deep px-2.5 py-1 font-sans text-[0.8rem] font-semibold text-espresso">
            {count} {count === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <ul className="mt-2 divide-y divide-espresso/8 px-5 sm:px-6">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartLine key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </ul>

          <div className="mx-5 my-4 rounded-xl bg-terracotta/10 px-3.5 py-2.5 text-[0.8125rem] leading-snug text-terracotta-deep sm:mx-6">
            Boils are made up as listed and can&rsquo;t be adjusted or swapped.
          </div>

          <div className="border-t border-espresso/10 px-5 py-5 sm:px-6">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-base font-medium text-espresso">
                {subtotalIsFrom ? 'Estimated total' : 'Total'}
              </span>
              <motion.span
                key={subtotalPence}
                initial={reduced ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-display text-2xl font-medium text-espresso"
              >
                {subtotalIsFrom ? 'from ' : ''}
                {subtotalPence != null ? formatPrice(subtotalPence) : '—'}
              </motion.span>
            </div>
            {subtotalIsFrom && (
              <p className="mt-1 text-[0.8125rem] text-taupe">Some items have variants — final price is confirmed by phone.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
