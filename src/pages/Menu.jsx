import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CategoryTabs from '../components/menu/CategoryTabs'
import ChefsPicks from '../components/menu/ChefsPicks'
import DishCard from '../components/menu/DishCard'
import DishModal from '../components/menu/DishModal'
import AllergenNote from '../components/menu/AllergenNote'
import StickyOrderCTA from '../components/menu/StickyOrderCTA'
import OpenBadge from '../components/ui/OpenBadge'
import Reveal from '../components/ui/Reveal'
import { categories, menu, categoryLabel } from '../data/menu'
import { site } from '../data/site'
import { useMotionPrefs } from '../lib/motion'

export default function Menu() {
  const [params, setParams] = useSearchParams()
  const { reduced } = useMotionPrefs()
  const [openDish, setOpenDish] = useState(null)
  const listingsRef = useRef(null)

  const requested = params.get('cat')
  const active = categories.some((c) => c.id === requested) ? requested : categories[0].id
  const setActive = (id) => setParams(id === categories[0].id ? {} : { cat: id }, { replace: false })

  const dishesInCategory = useMemo(() => menu.filter((d) => d.category === active), [active])
  const activeCategory = categories.find((c) => c.id === active)

  return (
    <>
      <section className="bg-cream px-5 pb-8 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display text-[clamp(2.1rem,3.4vw+1rem,3.5rem)] font-medium leading-tight text-espresso">
              Menu
            </h1>
            <OpenBadge className="text-taupe" />
          </div>
          <p className="mt-2 max-w-[52ch] text-[1.0625rem] leading-relaxed text-taupe">
            {site.tagline} in {site.area}. Boils are made up as listed and can&rsquo;t be adjusted or
            swapped — for something bespoke, call ahead.
          </p>

          <div className="mt-8">
            <CategoryTabs active={active} onChange={setActive} />
          </div>
        </div>
      </section>

      <section ref={listingsRef} className="bg-cream px-5 pb-24 pt-2 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ChefsPicks onOpen={setOpenDish} />

          <div>
            <h2 className="font-display text-[1.6rem] font-medium text-espresso sm:text-[1.9rem]">
              {activeCategory.label}
            </h2>
            {activeCategory.blurb && <p className="mt-1.5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-taupe">{activeCategory.blurb}</p>}

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {dishesInCategory.map((dish) => (
                  <DishCard key={dish.id} dish={dish} onOpen={setOpenDish} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal>
            <AllergenNote />
          </Reveal>
        </div>
      </section>

      <DishModal dish={openDish} onClose={() => setOpenDish(null)} />
      <StickyOrderCTA watchRef={listingsRef} />
    </>
  )
}
