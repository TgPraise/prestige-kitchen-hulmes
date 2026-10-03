import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { site } from '../../data/site'
import { sendOrderEmail } from '../../lib/emailjs'
import { makeOrderRef } from '../../lib/orderRef'
import { todaySlots, openStatus } from '../../lib/hours'
import { formatPrice } from '../../lib/format'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\s-]{7,}$/

const fieldCls =
  'w-full rounded-xl border-2 border-espresso/15 bg-white px-4 py-3 font-sans text-[0.9375rem] text-espresso placeholder:text-taupe/60 transition-colors focus:border-terracotta focus:outline-none'
const labelCls = 'mb-1.5 block font-sans text-[0.875rem] font-semibold text-espresso'
const errorCls = 'mt-1.5 text-[0.8125rem] font-medium text-[#b3261e]'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      {children}
      {error && <p id={`${id}-error`} className={errorCls}>{error}</p>}
    </div>
  )
}

export default function CheckoutForm({ onSuccess }) {
  const { items, count, subtotalPence, subtotalIsFrom, clear } = useCart()
  const [fulfilment, setFulfilment] = useState('delivery')
  const [values, setValues] = useState({ name: '', phone: '', email: '', address: '', time: 'asap', notes: '', company: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error
  const mountedAt = useRef(Date.now())
  const slots = useMemo(() => todaySlots(), [])
  const { isOpen } = useMemo(() => openStatus(), [])

  useEffect(() => { mountedAt.current = Date.now() }, [])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er))
  }

  function validate() {
    const e = {}
    if (!values.name.trim()) e.name = 'Please enter your name.'
    if (!PHONE_RE.test(values.phone.trim())) e.phone = 'Please enter a valid phone number.'
    if (!EMAIL_RE.test(values.email.trim())) e.email = 'Please enter a valid email address.'
    if (fulfilment === 'delivery' && !values.address.trim()) e.address = 'Please enter a delivery address.'
    if (!items.length) e.cart = 'Add at least one item to your order first.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    // Honeypot: a real visitor never fills this hidden field. Silently accept without sending.
    // Timing guard: a submit inside 2.5s of the form mounting is almost certainly a bot.
    const looksLikeBot = values.company.trim().length > 0 || Date.now() - mountedAt.current < 2500
    const ref = makeOrderRef()

    if (looksLikeBot) {
      const summary = { items, total: subtotalPence, isFrom: subtotalIsFrom, fulfilment, time: values.time, name: values.name.trim() }
      clear()
      onSuccess(ref, summary)
      return
    }

    setStatus('sending')
    const orderLines = items
      .map((i) => `${i.qty} x ${i.name} — ${i.priceFrom ? 'from ' : ''}${formatPrice(i.pricePence)} each`)
      .join('\n')

    try {
      await sendOrderEmail({
        order_ref: ref,
        submitted_at: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
        customer_name: values.name.trim(),
        customer_phone: values.phone.trim(),
        customer_email: values.email.trim(),
        fulfilment_type: fulfilment === 'delivery' ? 'Delivery' : 'Collection',
        delivery_address: fulfilment === 'delivery' ? values.address.trim() : '—',
        requested_time: values.time === 'asap' ? 'As soon as possible' : values.time,
        notes: values.notes.trim() || '—',
        order_lines: orderLines,
        item_count: String(count),
        order_total: `${subtotalIsFrom ? 'from ' : ''}${subtotalPence != null ? formatPrice(subtotalPence) : 'to confirm'}`,
        restaurant_email: site.email,
      })
      clear()
      onSuccess(ref, { items, total: subtotalPence, isFrom: subtotalIsFrom, fulfilment, time: values.time, name: values.name.trim() })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white/70 p-5 ring-1 ring-espresso/10 sm:p-6">
      <h2 className="font-display text-xl font-medium text-espresso">Your details</h2>

      {/* Honeypot — hidden from sighted and keyboard users, bots fill every field they can find */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" autoComplete="name" className={fieldCls} value={values.name} onChange={set('name')} aria-invalid={!!errors.name} placeholder="Jordan Blake" />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input id="phone" type="tel" autoComplete="tel" className={fieldCls} value={values.phone} onChange={set('phone')} aria-invalid={!!errors.phone} placeholder="07123 456789" />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" type="email" autoComplete="email" className={fieldCls} value={values.email} onChange={set('email')} aria-invalid={!!errors.email} placeholder="jordan@email.com" />
        </Field>
      </div>

      <div className="mt-6">
        <span className={labelCls}>Delivery or collection?</span>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Delivery or collection">
          {[
            ['delivery', 'Delivery'],
            ['collection', 'Collection'],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              role="radio"
              aria-checked={fulfilment === val}
              onClick={() => setFulfilment(val)}
              className={`min-h-12 rounded-xl border-2 font-sans text-[0.9375rem] font-semibold transition-colors ${
                fulfilment === val ? 'border-terracotta bg-terracotta/10 text-terracotta-deep' : 'border-espresso/15 text-espresso/70 hover:border-espresso/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {fulfilment === 'delivery' ? (
        <div className="mt-4">
          <Field id="address" label="Delivery address" error={errors.address}>
            <textarea id="address" rows={2} className={fieldCls} value={values.address} onChange={set('address')} aria-invalid={!!errors.address} placeholder="Flat number, street, postcode" />
          </Field>
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-cream-deep px-4 py-3 text-[0.875rem] leading-snug text-taupe">
          Collect in person from {site.area}. Full address is on the{' '}
          <a href="/contact" className="font-medium text-terracotta-deep underline underline-offset-2">Contact page</a>.
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="time" className={labelCls}>
          {fulfilment === 'delivery' ? 'Requested delivery time' : 'Requested collection time'}
        </label>
        {slots.length > 0 ? (
          <select id="time" className={fieldCls} value={values.time} onChange={set('time')}>
            <option value="asap">As soon as possible (~20 min)</option>
            {slots.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        ) : (
          <div className="rounded-xl bg-cream-deep px-4 py-3 text-[0.875rem] leading-snug text-taupe">
            {isOpen
              ? "We're closing soon, so pick a time isn't available — send your order and we'll call to confirm."
              : "We're currently closed. Send your order and we'll call to confirm the earliest time."}
          </div>
        )}
      </div>

      <div className="mt-4">
        <Field id="notes" label="Notes (optional)">
          <textarea id="notes" rows={2} className={fieldCls} value={values.notes} onChange={set('notes')} placeholder="Anything we should know?" />
        </Field>
      </div>

      {errors.cart && <p className={`mt-4 ${errorCls}`}>{errors.cart}</p>}

      {status === 'error' && (
        <div className="mt-5 rounded-xl border-2 border-[#b3261e]/25 bg-[#b3261e]/5 px-4 py-3 text-[0.875rem] leading-snug text-[#8c1f18]">
          Something went wrong sending your order. Please try again, or call us directly on{' '}
          <a href={`tel:${site.phoneHref}`} className="font-semibold underline underline-offset-2">{site.phone}</a>.
        </div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileTap={{ scale: 0.98 }}
        className="mt-6 flex min-h-14 w-full items-center justify-center rounded-full bg-terracotta font-sans text-[1.0625rem] font-semibold text-on-terracotta transition-colors hover:bg-terracotta-deep disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending your order…' : 'Send order'}
      </motion.button>
      <p className="mt-3 text-center text-[0.8125rem] text-taupe">
        This sends your order to the restaurant by email — it&rsquo;s not a live order tracker. We&rsquo;ll call or email to confirm.
      </p>
    </form>
  )
}
