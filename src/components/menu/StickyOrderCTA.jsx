import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

// Shows only once the listings themselves are on screen (never before there's something worth
// ordering visible), and never covers the footer.
export default function StickyOrderCTA({ watchRef }) {
  const [visible, setVisible] = useState(false)
  const [pastFooter, setPastFooter] = useState(false)
  const { count, subtotalPence, subtotalIsFrom } = useCart()
  const { reduced } = useMotionPrefs()

  useEffect(() => {
    const target = watchRef.current
    if (!target) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '-40% 0px -40% 0px' })
    io.observe(target)
    return () => io.disconnect()
  }, [watchRef])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(([entry]) => setPastFooter(entry.isIntersecting), { rootMargin: '0px' })
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  const show = visible && !pastFooter

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-3 sm:flex sm:justify-center"
        >
          <Link
            to="/order"
            className="flex min-h-14 w-full items-center justify-between gap-3 rounded-full bg-espresso px-5 text-cream shadow-[0_10px_34px_rgba(0,0,0,0.35)] sm:w-auto sm:min-w-[22rem] sm:px-6"
          >
            <span className="font-sans text-[1.0625rem] font-semibold">
              {count > 0 ? `View order · ${count} ${count === 1 ? 'item' : 'items'}` : 'Start your order'}
            </span>
            {count > 0 && subtotalPence != null && (
              <span className="font-sans text-[1.0625rem] font-semibold text-terracotta-glow">
                {subtotalIsFrom ? 'from ' : ''}{formatPrice(subtotalPence)}
              </span>
            )}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
