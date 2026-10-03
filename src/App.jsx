import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ComingNext from './pages/ComingNext'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Book from './pages/Book'
import Contact from './pages/Contact'
import { useMotionPrefs } from './lib/motion'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const coming = {}

export default function App() {
  const location = useLocation()
  const { reduced } = useMotionPrefs()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:font-semibold focus:text-espresso"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            {Object.entries(coming).map(([path, [title, note]]) => (
              <Route key={path} path={path} element={<ComingNext title={title} note={note} />} />
            ))}
            <Route path="*" element={<ComingNext title="Page not found" note="That page doesn't exist. Head back home to see the menu, order or book a table." />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
