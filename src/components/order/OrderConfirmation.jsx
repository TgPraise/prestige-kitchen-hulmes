import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ConfirmMark from '../ui/ConfirmMark'
import { site } from '../../data/site'
import { formatPrice } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

export default function OrderConfirmation({ orderRef, summary }) {
  const { reduced } = useMotionPrefs()
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-cream px-5 pb-16 pt-28 text-center sm:pt-32">
      <ConfirmMark sweepId="order-confirm" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 1.05, duration: 0.5 }}
        className="mt-2 max-w-lg"
      >
        <h1 className="font-display text-[clamp(1.9rem,3.4vw+0.8rem,2.9rem)] font-medium text-espresso">
          Your order has been sent
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-taupe">
          We&rsquo;ll call or email you shortly to confirm timing{summary?.fulfilment === 'delivery' ? ' and delivery' : ''}.
          This page isn&rsquo;t a live tracker — if you don&rsquo;t hear from us within 20 minutes, please give us a call.
        </p>

        <div className="mt-6 rounded-2xl bg-white/70 px-5 py-4 text-left ring-1 ring-espresso/10 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[0.9375rem] font-semibold text-espresso">Reference</span>
            <span className="font-mono text-[0.9375rem] font-semibold text-terracotta-deep">{orderRef}</span>
          </div>
          {summary && (
            <>
              <ul className="mt-3 space-y-1 border-t border-espresso/10 pt-3 text-[0.9rem] text-taupe">
                {summary.items.map((i) => (
                  <li key={i.id} className="flex justify-between gap-3">
                    <span className="truncate">{i.qty} &times; {i.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-espresso/10 pt-3">
                <span className="font-sans text-[0.9375rem] font-semibold text-espresso">
                  {summary.isFrom ? 'Estimated total' : 'Total'}
                </span>
                <span className="font-sans text-[0.9375rem] font-semibold text-espresso">
                  {summary.isFrom ? 'from ' : ''}{summary.total != null ? formatPrice(summary.total) : '—'}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/menu" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-espresso px-6 font-semibold text-espresso hover:bg-espresso hover:text-cream">
            Order something else
          </Link>
          <Link to="/" className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-on-terracotta hover:bg-terracotta-deep">
            Back to home
          </Link>
        </div>
        <p className="mt-5 text-[0.875rem] text-taupe">
          Question about your order? Call us on{' '}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-terracotta-deep underline underline-offset-2">{site.phone}</a>.
        </p>
      </motion.div>
    </section>
  )
}
