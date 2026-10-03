import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../../data/site'
import { sendBookingEmail } from '../../lib/emailjs'
import { makeBookingRef } from '../../lib/orderRef'
import { slotsForDate, londonTodayISO, isClosedDay } from '../../lib/hours'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\s-]{7,}$/
const MAX_PARTY = 10

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

function PartyStepper({ value, onChange }) {
  const dec = () => onChange(Math.max(1, value - 1))
  const inc = () => onChange(Math.min(MAX_PARTY, value + 1))
  return (
    <div>
      <div className="inline-flex items-center rounded-full border-2 border-espresso/15" role="group" aria-label="Party size">
        <button type="button" onClick={dec} aria-label="Fewer guests" className="flex h-12 w-12 items-center justify-center text-xl font-medium text-espresso hover:bg-espresso/5">
          &minus;
        </button>
        <span className="w-14 text-center font-sans text-base font-semibold tabular-nums text-espresso" aria-live="polite">
          {value} {value === 1 ? 'guest' : 'guests'}
        </span>
        <button type="button" onClick={inc} aria-label="More guests" className="flex h-12 w-12 items-center justify-center text-xl font-medium text-espresso hover:bg-espresso/5">
          +
        </button>
      </div>
      {value >= MAX_PARTY && (
        <p className="mt-1.5 text-[0.8125rem] text-taupe">
          Larger group? Call us on{' '}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-terracotta-deep underline underline-offset-2">{site.phone}</a>.
        </p>
      )}
    </div>
  )
}

export default function ReservationForm({ onSuccess }) {
  const today = londonTodayISO()
  const [values, setValues] = useState({ name: '', phone: '', email: '', date: today, time: '', party: 2, notes: '', company: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error
  const mountedAt = useRef(Date.now())
  const slots = useMemo(() => slotsForDate(values.date), [values.date])

  useEffect(() => { mountedAt.current = Date.now() }, [])
  // If the chosen date's slot list changes (e.g. a closed day, or the day's slots emptied),
  // keep `time` valid rather than silently submitting a stale value.
  useEffect(() => {
    if (slots.length === 0) {
      if (values.time !== '') setValues((v) => ({ ...v, time: '' }))
    } else if (!slots.some((s) => s.value === values.time)) {
      setValues((v) => ({ ...v, time: slots[0].value }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er))
  }

  function validate() {
    const e = {}
    if (!values.name.trim()) e.name = 'Please enter your name.'
    if (!PHONE_RE.test(values.phone.trim())) e.phone = 'Please enter a valid phone number.'
    if (!EMAIL_RE.test(values.email.trim())) e.email = 'Please enter a valid email address.'
    if (!values.date) {
      e.date = 'Please choose a date.'
    } else if (slots.length === 0) {
      e.date = isClosedDay(values.date)
        ? "We're closed that day — please pick another date."
        : 'No bookable times left that day — please choose a later date, or call us.'
    }
    if (slots.length > 0 && !values.time) e.time = 'Please choose a time.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const looksLikeBot = values.company.trim().length > 0 || Date.now() - mountedAt.current < 2500
    const ref = makeBookingRef()
    const summary = { date: values.date, time: values.time, party: values.party, name: values.name.trim() }

    if (looksLikeBot) {
      onSuccess(ref, summary)
      return
    }

    setStatus('sending')
    try {
      await sendBookingEmail({
        booking_ref: ref,
        submitted_at: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
        customer_name: values.name.trim(),
        customer_phone: values.phone.trim(),
        customer_email: values.email.trim(),
        requested_date: values.date,
        requested_time: values.time,
        party_size: String(values.party),
        notes: values.notes.trim() || '—',
        restaurant_email: site.email,
      })
      onSuccess(ref, summary)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white/70 p-5 ring-1 ring-espresso/10 sm:p-6">
      <h2 className="font-display text-xl font-medium text-espresso">Reserve a table</h2>

      {/* Honeypot — hidden from sighted and keyboard users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="b-company">Company</label>
        <input id="b-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="b-name" label="Full name" error={errors.name}>
          <input id="b-name" autoComplete="name" className={fieldCls} value={values.name} onChange={set('name')} aria-invalid={!!errors.name} placeholder="Jordan Blake" />
        </Field>
        <Field id="b-phone" label="Phone" error={errors.phone}>
          <input id="b-phone" type="tel" autoComplete="tel" className={fieldCls} value={values.phone} onChange={set('phone')} aria-invalid={!!errors.phone} placeholder="07123 456789" />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="b-email" label="Email" error={errors.email}>
          <input id="b-email" type="email" autoComplete="email" className={fieldCls} value={values.email} onChange={set('email')} aria-invalid={!!errors.email} placeholder="jordan@email.com" />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="b-date" label="Date" error={errors.date}>
          <input id="b-date" type="date" min={today} className={fieldCls} value={values.date} onChange={set('date')} aria-invalid={!!errors.date} />
        </Field>
        <Field id="b-time" label="Time" error={errors.time}>
          {slots.length > 0 ? (
            <select id="b-time" className={fieldCls} value={values.time} onChange={set('time')} aria-invalid={!!errors.time}>
              {slots.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          ) : (
            <div className={`${fieldCls} flex items-center text-taupe`}>{isClosedDay(values.date) ? 'Closed that day' : 'No times left that day'}</div>
          )}
        </Field>
      </div>

      <div className="mt-4">
        <span className={labelCls}>Party size</span>
        <PartyStepper value={values.party} onChange={(n) => setValues((v) => ({ ...v, party: n }))} />
      </div>

      <div className="mt-4">
        <Field id="b-notes" label="Occasion or notes (optional)">
          <textarea id="b-notes" rows={2} className={fieldCls} value={values.notes} onChange={set('notes')} placeholder="Birthday, dietary needs, anything else?" />
        </Field>
      </div>

      {status === 'error' && (
        <div className="mt-5 rounded-xl border-2 border-[#b3261e]/25 bg-[#b3261e]/5 px-4 py-3 text-[0.875rem] leading-snug text-[#8c1f18]">
          Something went wrong sending your request. Please try again, or call us directly on{' '}
          <a href={`tel:${site.phoneHref}`} className="font-semibold underline underline-offset-2">{site.phone}</a>.
        </div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileTap={{ scale: 0.98 }}
        className="mt-6 flex min-h-14 w-full items-center justify-center rounded-full bg-terracotta font-sans text-[1.0625rem] font-semibold text-on-terracotta transition-colors hover:bg-terracotta-deep disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending your request…' : 'Request table'}
      </motion.button>
      <p className="mt-3 text-center text-[0.8125rem] text-taupe">
        This sends a request — a human will follow up to actually confirm your table.
      </p>
    </form>
  )
}
