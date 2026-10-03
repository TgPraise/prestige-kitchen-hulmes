import { useState } from 'react'
import DishArt from '../ui/DishArt'
import Steam from '../ui/Steam'
import AddToCart from './AddToCart'
import { priceLabel, servesLabel } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

export default function DishCard({ dish, onOpen }) {
  const { reduced } = useMotionPrefs()
  const [lit, setLit] = useState(false)
  const price = priceLabel(dish)
  const serves = servesLabel(dish)

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl bg-white/70 ring-1 ring-espresso/10 transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(43,28,20,0.14)]"
      onPointerEnter={() => setLit(true)}
      onPointerLeave={() => setLit(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(dish)}
        aria-label={`View details for ${dish.name}`}
        className="relative block aspect-[4/3] w-full overflow-hidden text-left"
      >
        {dish.img ? (
          <img src={dish.img} alt={dish.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <DishArt kind={dish.art} className="h-full w-full" />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-500"
          style={{ opacity: lit ? 1 : 0, background: 'radial-gradient(ellipse 60% 55% at 50% 58%, rgba(255,170,90,0.30), transparent 72%)' }}
        />
        {!reduced && <Steam active={lit} count={2} />}
        {dish.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-espresso/90 px-3 py-1 font-sans text-xs font-semibold tracking-wide text-cream">
            Chef&rsquo;s pick
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <button type="button" onClick={() => onOpen(dish)} className="text-left">
          <h3 className="font-display text-[1.15rem] font-medium leading-snug text-espresso group-hover:underline">{dish.name}</h3>
        </button>
        {dish.note && <p className="mt-1 text-[0.9rem] leading-snug text-taupe">{dish.note}</p>}
        {serves && <p className="mt-1 text-[0.85rem] text-taupe/80">{serves}</p>}

        <div className="mt-3 flex flex-1 items-end justify-between gap-3">
          <span className="font-sans text-base font-semibold text-terracotta-deep">{price ?? 'Price on request'}</span>
          <AddToCart dish={dish} />
        </div>
      </div>
    </div>
  )
}
