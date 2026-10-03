import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ConfirmMark from '../ui/ConfirmMark'
import { site } from '../../data/site'
import { formatTime } from '../../lib/format'
import { useMotionPrefs } from '../../lib/motion'

function formatFriendlyDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

// Same honesty standard as the Order confirmation: a request has been sent, not a confirmed
// table — nothing here is checking live availability.
export default function BookingConfirmation({ bookingRef, summary }) {
  const { reduced } = useMotionPrefs()
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-cream px-5 pb-16 pt-28 text-center sm:pt-32">
      <ConfirmMark sweepId="booking-confirm" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 1.05, duration: 0.5 }}
        className="mt-2 max-w-lg"
      >
        <h1 className="font-display text-[clamp(1.9rem,3.4vw+0.8rem,2.9rem)] font-medium text-espresso">
          Your table request has been sent
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-taupe">
          A human will follow up by phone or email to confirm your table — we&rsquo;re not checking
          live availability here. If it&rsquo;s urgent or last-minute, give us a call.
        </p>

        {summary && (
          <div className="mt-6 rounded-2xl bg-white/70 px-5 py-4 text-left ring-1 ring-espresso/10 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[0.9375rem] font-semibold text-espresso">Reference</span>
              <span className="font-mono text-[0.9375rem] font-semibold text-terracotta-deep">{bookingRef}</span>
            </div>
            <dl className="mt-3 space-y-1.5 border-t border-espresso/10 pt-3 text-[0.9rem] text-taupe">
              <div className="flex justify-between gap-3">
                <dt>Date</dt>
                <dd className="text-espresso">{formatFriendlyDate(summary.date)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Time</dt>
                <dd className="text-espresso">{formatTime(summary.time)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Party size</dt>
                <dd className="text-espresso">{summary.party} {summary.party === 1 ? 'guest' : 'guests'}</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/menu" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-espresso px-6 font-semibold text-espresso hover:bg-espresso hover:text-cream">
            Browse the menu
          </Link>
          <Link to="/" className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-on-terracotta hover:bg-terracotta-deep">
            Back to home
          </Link>
        </div>
        <p className="mt-5 text-[0.875rem] text-taupe">
          Question about your booking? Call us on{' '}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-terracotta-deep underline underline-offset-2">{site.phone}</a>.
        </p>
      </motion.div>
    </section>
  )
}
