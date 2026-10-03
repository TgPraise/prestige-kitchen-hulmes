import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import DishArt from '../ui/DishArt'
import Steam from '../ui/Steam'
import Cloche from './Cloche'
import { site } from '../../data/site'
import { EASE, useMotionPrefs } from '../../lib/motion'

/*
  The cloche reveal: the site's one theatrical moment (~4s), exactly as planned:
    0.0-0.8  dark warm vignette settles, cloche catches a highlight
    0.8-1.6  cloche lifts on a gentle arc and tilts away
    1.6-2.2  steam rises, warm light-bloom crosses the dish
    2.2-2.8  eyebrow label fades up
    2.8-3.6  headline resolves line by line
    3.6-4.2  two CTAs settle in
  The dish photo is the full-bleed section background throughout; the cloche sits centered over
  it and lifts away to reveal it. Reduced motion, a repeat visit in the same session, or the Skip
  button all resolve instantly to the end state. Add ?intro=1 to the URL to force a replay.
*/
const BEAT = {
  vignette: 0,
  lift: 0.8,
  reveal: 1.6,
  eyebrow: 2.2,
  headline: 2.8,
  ctas: 3.6,
}
const SEEN_KEY = 'pk:intro-seen'
const HEADLINE = ['Comfort food.', 'Served the way', 'it deserves.']

function shouldSkipIntro() {
  try {
    if (new URLSearchParams(window.location.search).get('intro') === '1') return false
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function Hero() {
  const { reduced } = useMotionPrefs()
  const [skipped, setSkipped] = useState(shouldSkipIntro)
  const [ctaReady, setCtaReady] = useState(false)
  const [clocheGone, setClocheGone] = useState(false)
  const instant = reduced || skipped

  useEffect(() => {
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* ignore */ }
  }, [])

  // In instant mode there is nothing to wait for.
  useEffect(() => { if (instant) setCtaReady(true) }, [instant])

  // Escape also skips (keyboard users).
  useEffect(() => {
    if (instant || ctaReady) return
    const onKey = (e) => e.key === 'Escape' && setSkipped(true)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [instant, ctaReady])

  const t = (delay, duration = 0.6) => (instant ? { duration: 0 } : { delay, duration, ease: EASE })
  const fade = (delay, y = 14) => ({
    initial: instant ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: t(delay),
  })

  return (
    <section
      key={instant ? 'instant' : 'play'}
      aria-label="Welcome"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-espresso text-center"
    >
      {/* Full-bleed dish photo, behind everything */}
      <div className="absolute inset-0">
        {site.heroImage ? (
          <img
            src={site.heroImage}
            alt="Our food, plated at Prestige Kitchen"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        ) : (
          <DishArt kind="boil" className="h-full w-full" />
        )}

        {/* Beat 1: dark vignette settles, dish stays dim until the reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 42%, rgba(20,10,6,0.3) 20%, rgba(20,10,6,0.96) 100%)' }}
          initial={instant ? { opacity: 0.6 } : { opacity: 1 }}
          animate={{ opacity: 0.6 }}
          transition={t(BEAT.vignette, 0.8)}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-espresso"
          initial={instant ? { opacity: 0 } : { opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={t(BEAT.reveal, 0.6)}
        />

        {/* Beat 3: warm light-bloom crossing the dish */}
        {!instant && (
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ background: 'radial-gradient(ellipse 40% 36% at 50% 40%, rgba(255,178,102,0.7), transparent 70%)' }}
            initial={{ opacity: 0, x: '-18%' }}
            animate={{ opacity: [0, 0.7, 0.15], x: ['-18%', '6%', '0%'] }}
            transition={{ delay: BEAT.reveal, duration: 1.1, ease: EASE, times: [0, 0.5, 1] }}
          />
        )}

        {/* Always-on scrims: nav legibility up top, headline/CTA legibility down low */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: 'linear-gradient(180deg, rgba(20,12,8,0.55), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(16,9,6,0.55) 45%, rgba(13,8,5,0.92) 100%)' }}
        />

        {/* Steam: starts at the reveal, then keeps a slow ambient loop, rising from the dish's centre */}
        {!reduced && (
          <div className="absolute inset-x-0 top-[8%] h-[56%]">
            <Steam active startDelay={instant ? 0.2 : BEAT.reveal} />
          </div>
        )}
      </div>

      {/* Foreground: cloche up top, text pinned toward the bottom, both over the photo */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-5 pb-10 pt-28 sm:pb-12">
        <div className="flex w-full flex-1 items-center justify-center">
          {!instant && !clocheGone && (
            <motion.div
              className="pointer-events-none aspect-[10/7] w-[min(72vw,30rem)]"
              style={{ transformOrigin: '80% 90%' }}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{
                x: [0, '3%', '12%'],
                y: [0, '-22%', '-62%'],
                rotate: [0, -5, -17],
                opacity: [1, 1, 0],
              }}
              transition={{ delay: BEAT.lift, duration: 0.8, ease: EASE, times: [0, 0.45, 1] }}
              onAnimationComplete={() => setClocheGone(true)}
            >
              <Cloche />
            </motion.div>
          )}
        </div>

        {/* Beat 4: eyebrow */}
        <motion.p
          {...fade(BEAT.eyebrow, 10)}
          className="font-sans text-[0.95rem] font-medium tracking-[0.08em] text-terracotta-glow"
        >
          Elevated Comfort Food · {site.area}
        </motion.p>

        {/* Beat 5: headline, line by line */}
        <h1 className="mt-3 font-display text-[clamp(2.6rem,min(9vw,7.4svh),4.75rem)] font-medium leading-[1.04] tracking-[-0.01em] text-cream">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                className="block"
                initial={instant ? false : { y: '105%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={t(BEAT.headline + i * 0.2, 0.55)}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Beat 6: CTAs (inert until visible, so keyboard focus never lands on hidden buttons) */}
        <motion.div
          {...fade(BEAT.ctas, 16)}
          onAnimationComplete={() => setCtaReady(true)}
          inert={!ctaReady}
          className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
        >
          <Button to="/order" size="lg" variant="primary">Order Now</Button>
          <Button to="/book" size="lg" variant="outline">Book a Table</Button>
        </motion.div>
      </div>

      {/* Skip: visible only while the intro plays (also reachable by keyboard, and Esc) */}
      {!instant && !ctaReady && (
        <button
          type="button"
          onClick={() => setSkipped(true)}
          className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-10 min-h-11 rounded-full px-4 font-sans text-sm font-medium text-cream/80 underline-offset-4 hover:text-cream hover:underline"
        >
          Skip intro
        </button>
      )}
    </section>
  )
}
