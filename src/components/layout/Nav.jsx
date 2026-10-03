import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../ui/Button'
import Wordmark from './Wordmark'
import { useCart } from '../../context/CartContext'
import { useMotionPrefs, EASE } from '../../lib/motion'
import { site } from '../../data/site'

// Five items, deliberately short: wordmark, Menu, Order (filled), Book (outlined), Contact.
const textLink =
  'relative inline-flex min-h-11 items-center px-1 font-sans text-base font-medium text-cream/90 transition-colors hover:text-cream'

function CartBadge() {
  const { count } = useCart()
  if (!count) return null
  return (
    <span
      className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-cream px-1.5 text-[0.8125rem] font-bold leading-none text-espresso"
      aria-label={`${count} ${count === 1 ? 'item' : 'items'} in your order`}
    >
      {count}
    </span>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { reduced } = useMotionPrefs()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuBtn = useRef(null)
  const firstLink = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation
  useEffect(() => setOpen(false), [pathname])

  // Drawer: lock body scroll, Esc closes, move focus in, and return it on close
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    firstLink.current?.focus()
    const btn = menuBtn.current
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      btn?.focus({ preventScroll: true })
    }
  }, [open])

  // Transparent over the hero, warm espresso everywhere else
  const solid = !isHome || scrolled || open

  const active = ({ isActive }) =>
    `${textLink} ${isActive ? 'text-cream after:absolute after:inset-x-1 after:bottom-1.5 after:h-0.5 after:rounded after:bg-terracotta-glow' : ''}`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? 'bg-espresso/95 shadow-[0_1px_0_rgba(251,241,230,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <nav aria-label="Main" className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Wordmark onClick={() => setOpen(false)} />

        {/* Desktop */}
        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          <NavLink to="/menu" className={active}>Menu</NavLink>
          <Button to="/order" variant="primary" className="ml-1">
            Order<CartBadge />
          </Button>
          <Button to="/book" variant="outline">Book</Button>
          <NavLink to="/contact" className={active}>Contact</NavLink>
        </div>

        {/* Mobile: the Order action stays one tap away in the bar */}
        <div className="flex items-center gap-2 md:hidden">
          <Button to="/order" variant="primary" className="!min-h-11 !px-5">
            Order<CartBadge />
          </Button>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full text-cream"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[calc(4.25rem+env(safe-area-inset-top))] overflow-y-auto bg-espresso px-6 pb-safe pt-6 md:hidden"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <ul className="flex flex-col">
              {[
                ['Menu', '/menu'],
                ['Contact', '/contact'],
              ].map(([label, to], i) => (
                <li key={to} className="border-b border-cream/10">
                  <NavLink
                    ref={i === 0 ? firstLink : undefined}
                    to={to}
                    className="flex min-h-16 items-center font-display text-[2rem] font-medium text-cream"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button to="/order" variant="primary" size="lg">Order Now</Button>
              <Button to="/book" variant="outline" size="lg">Book a Table</Button>
            </div>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-8 inline-flex min-h-12 items-center text-lg font-medium text-cream/90 underline decoration-terracotta-glow decoration-2 underline-offset-[6px]"
            >
              Call {site.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
