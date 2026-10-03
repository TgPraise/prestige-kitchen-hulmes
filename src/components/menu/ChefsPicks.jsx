import { useRef } from 'react'
import { popularDishes } from '../../data/menu'
import DishArt from '../ui/DishArt'
import AddToCart from './AddToCart'
import { priceLabel } from '../../lib/format'
import Reveal from '../ui/Reveal'

// The fastest path from "I don't know what to get" to ordering: the client's own
// "Most Popular" homepage picks, pulled out ahead of the full list.
export default function ChefsPicks({ onOpen }) {
  const scroller = useRef(null)
  if (!popularDishes.length) return null

  return (
    <Reveal as="section" aria-labelledby="picks-heading" className="mb-12 sm:mb-16">
      <h2 id="picks-heading" className="font-display text-[1.6rem] font-medium text-espresso sm:text-[1.9rem]">
        Chef&rsquo;s picks
      </h2>
      <p className="mt-1.5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-taupe">
        The most-ordered dishes on Prestige Kitchen&rsquo;s own menu.
      </p>

      <div
        ref={scroller}
        className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {popularDishes.map((dish) => {
          const price = priceLabel(dish)
          return (
            <div
              key={dish.id}
              className="w-[15.5rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-white/80 ring-1 ring-espresso/10 sm:w-[17rem]"
            >
              <button type="button" onClick={() => onOpen(dish)} className="block aspect-[4/3] w-full overflow-hidden">
                {dish.img ? (
                  <img src={dish.img} alt={dish.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                ) : (
                  <DishArt kind={dish.art} className="h-full w-full" />
                )}
              </button>
              <div className="p-4">
                <button type="button" onClick={() => onOpen(dish)} className="text-left">
                  <h3 className="font-display text-[1.05rem] font-medium leading-snug text-espresso">{dish.name}</h3>
                </button>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="font-sans text-[0.95rem] font-semibold text-terracotta-deep">{price ?? 'Ask'}</span>
                  <AddToCart dish={dish} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Reveal>
  )
}
