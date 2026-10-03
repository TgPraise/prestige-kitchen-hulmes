import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DishArt from '../ui/DishArt'
import Steam from '../ui/Steam'
import Reveal from '../ui/Reveal'
import { featuredDishes } from '../../data/menu'
import { formatPrice } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

// Hover, keyboard focus AND tap all trigger the same warm-glow + steam cue,
// so touch users get the same feedback (plan: no hover-only interactions).
function DishCard({ dish, size }) {
  const { reduced } = useMotionPrefs()
  const [lit, setLit] = useState(false)
  const price = formatPrice(dish.pricePence)
  const large = size === 'large'

  const media = dish.img ? (
    <img src={dish.img} alt={dish.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
  ) : (
    <DishArt kind={dish.art} fit={large ? 'slice' : 'meet'} className="h-full w-full" />
  )

  return (
    <motion.div
      className={large ? 'lg:h-full' : 'lg:flex-1'}
      whileHover={reduced ? undefined : { y: -6 }}
      whileTap={reduced ? undefined : { y: -3, scale: 0.995 }}
      onHoverStart={() => setLit(true)}
      onHoverEnd={() => setLit(false)}
      onTapStart={() => setLit(true)}
      onTapCancel={() => setLit(false)}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <Link
        to={`/menu?cat=${dish.category}`}
        onFocus={() => setLit(true)}
        onBlur={() => setLit(false)}
        onPointerUp={() => setTimeout(() => setLit(false), 900)}
        className={`group flex overflow-hidden rounded-2xl bg-white/60 ring-1 ring-espresso/10 transition-shadow duration-500 hover:shadow-[0_18px_44px_rgba(43,28,20,0.16)] focus-visible:shadow-[0_18px_44px_rgba(43,28,20,0.16)] ${
          large ? 'h-full flex-col' : 'h-full flex-row items-stretch'
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            large ? 'aspect-[4/3] w-full' : 'aspect-square w-[38%] shrink-0 sm:w-[34%] lg:aspect-auto'
          }`}
        >
          {media}
          {/* Very slight warm glow + the hero's steam cue */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-500"
            style={{
              opacity: lit ? 1 : 0,
              background: 'radial-gradient(ellipse 60% 55% at 50% 58%, rgba(255,170,90,0.32), transparent 72%)',
            }}
          />
          {!reduced && <Steam active={lit} count={large ? 3 : 2} />}
        </div>

        <div className={`flex flex-col justify-center ${large ? 'p-6 sm:p-8' : 'p-4 sm:p-6'}`}>
          <h3
            className={`font-display font-medium leading-tight text-espresso ${
              large ? 'text-[1.75rem] sm:text-[2.1rem]' : 'text-[1.25rem] sm:text-[1.45rem]'
            }`}
          >
            {dish.name}
          </h3>
          <p className={`mt-2 max-w-[46ch] leading-relaxed text-taupe ${large ? 'text-[1.0625rem]' : 'text-[0.95rem] sm:text-base'}`}>
            {dish.description}
          </p>
          {price && <p className="mt-3 font-sans text-base font-semibold text-terracotta-deep">{price}</p>}
          {dish.tagsConfirmed && dish.tags.length > 0 && (
            <p className="mt-2 font-sans text-sm text-taupe">{dish.tags.join(', ')}</p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function SignatureDishes() {
  const [hero, ...rest] = featuredDishes
  if (!hero) return null

  return (
    <section aria-labelledby="signature-heading" className="bg-cream-deep px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="signature-heading" className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-medium leading-tight text-espresso">
              Signature dishes
            </h2>
            <p className="mt-3 max-w-[44ch] text-[1.0625rem] leading-relaxed text-taupe">
              A few we&rsquo;d order first. The full menu is a tap away.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex min-h-12 items-center self-start font-sans text-base font-semibold text-terracotta-deep underline decoration-2 underline-offset-[6px] hover:text-espresso sm:self-auto"
          >
            See the full menu
          </Link>
        </Reveal>

        <Reveal className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <DishCard dish={hero} size="large" />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
            {rest.slice(0, 3).map((d) => (
              <DishCard key={d.id} dish={d} size="small" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
