import { motion } from 'framer-motion'
import DishArt from '../ui/DishArt'
import QtyStepper from '../ui/QtyStepper'
import { menu } from '../../data/menu'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../context/CartContext'
import { useMotionPrefs } from '../../lib/motion'

// One editable line in the cart. Looks up the dish's art/notes from the menu by id, since the
// cart itself only stores the pricing-relevant fields.
export default function CartLine({ item }) {
  const { inc, dec, remove } = useCart()
  const { reduced } = useMotionPrefs()
  const dish = menu.find((d) => d.id === item.id)
  const lineTotal = item.pricePence == null ? null : formatPrice(item.pricePence * item.qty)

  return (
    <motion.li
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3 overflow-hidden py-3"
    >
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
        {dish?.img ? (
          <img src={dish.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : dish ? (
          <DishArt kind={dish.art} className="h-full w-full" />
        ) : (
          <div className="h-full w-full bg-cream-deep" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-[0.95rem] font-semibold text-espresso">{item.name}</p>
        <p className="text-[0.85rem] text-taupe">
          {item.priceFrom ? 'from ' : ''}
          {formatPrice(item.pricePence)} each
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <QtyStepper qty={item.qty} label={item.name} onInc={() => inc(item.id)} onDec={() => dec(item.id)} />
        <div className="flex items-center gap-2">
          {lineTotal && <span className="text-[0.85rem] font-semibold text-terracotta-deep">{lineTotal}</span>}
          <button
            type="button"
            onClick={() => remove(item.id)}
            aria-label={`Remove ${item.name} from your order`}
            className="text-[0.8rem] font-medium text-taupe underline decoration-taupe/40 underline-offset-2 hover:text-espresso"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  )
}
