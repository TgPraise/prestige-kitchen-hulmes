import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ConfirmMark from '../ui/ConfirmMark'
import { site } from '../../data/site'
import { sendEnquiryEmail } from '../../lib/emailjs'
import { makeEnquiryRef } from '../../lib/orderRef'
import { useMotionPrefs } from '../../lib/motion'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldCls =
  'w-full rounded-xl border-2 border-espresso/15 bg-white px-4 py-3 font-sans text-[0.9375rem] text-espresso placeholder:text-taupe/60 transition-colors focus:border-terracotta focus:outline-none'
const labelCls = 'mb-1.5 block font-sans text-[0.875rem] font-semibold text-espresso'
const errorCls = 'mt-1.5 text-[0.8125rem] font-medium text-[#b3261e]'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      {children}
      {error && <p className={errorCls}>{error}</p>}
    </div>
  )
}

// Intentionally smaller than the Order/Booking forms — for general enquiries, press, large
// private events, feedback — so it doesn't compete with those two primary actions.
export default function EnquiryForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error | sent
  const [sentRef, setSentRef] = useState(null)
  const mountedAt = useRef(Date.now())
  const { reduced } = useMotionPrefs()

  useEffect(() => { mountedAt.current = Date.now() }, [])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er))
  }

  function validate() {
    const e = {}
    if (!values.name.trim()) e.name = 'Please enter your name.'
    if (!EMAIL_RE.test(values.email.trim())) e.email = 'Please enter a valid email address.'
    if (!values.message.trim()) e.message = 'Please enter a message.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const looksLikeBot = values.company.trim().length > 0 || Date.now() - mountedAt.current < 2500
    const ref = makeEnquiryRef()

    if (looksLikeBot) {
      setSentRef(ref)
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      await sendEnquiryEmail({
        enquiry_ref: ref,
        submitted_at: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
        customer_name: values.name.trim(),
        customer_email: values.email.trim(),
        message: values.message.trim(),
        restaurant_email: site.email,
      })
      setSentRef(ref)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-white/70 px-6 py-10 text-center ring-1 ring-espresso/10">
        <ConfirmMark sweepId="enquiry-confirm" />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 1.05, duration: 0.45 }}
        >
          <h2 className="mt-1 font-display text-xl font-medium text-espresso">Message sent</h2>
          <p className="mt-2 max-w-[36ch] text-[0.9375rem] leading-relaxed text-taupe">
            Thanks, {values.name.split(' ')[0] || 'there'} — we&rsquo;ll get back to you by email soon.
          </p>
          <p className="mt-3 font-mono text-[0.8125rem] text-taupe">Ref {sentRef}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white/70 p-5 ring-1 ring-espresso/10 sm:p-6">
      <h2 className="font-display text-xl font-medium text-espresso">Send a message</h2>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-taupe">
        General questions, press, large private events, or feedback.
      </p>

      {/* Honeypot — hidden from sighted and keyboard users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="c-name" label="Full name" error={errors.name}>
          <input id="c-name" autoComplete="name" className={fieldCls} value={values.name} onChange={set('name')} aria-invalid={!!errors.name} placeholder="Jordan Blake" />
        </Field>
        <Field id="c-email" label="Email" error={errors.email}>
          <input id="c-email" type="email" autoComplete="email" className={fieldCls} value={values.email} onChange={set('email')} aria-invalid={!!errors.email} placeholder="jordan@email.com" />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="c-message" label="Message" error={errors.message}>
          <textarea id="c-message" rows={4} className={fieldCls} value={values.message} onChange={set('message')} aria-invalid={!!errors.message} placeholder="How can we help?" />
        </Field>
      </div>

      {status === 'error' && (
        <div className="mt-5 rounded-xl border-2 border-[#b3261e]/25 bg-[#b3261e]/5 px-4 py-3 text-[0.875rem] leading-snug text-[#8c1f18]">
          Something went wrong sending your message. Please try again, or email us directly at{' '}
          <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">{site.email}</a>.
        </div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileTap={{ scale: 0.98 }}
        className="mt-6 flex min-h-14 w-full items-center justify-center rounded-full bg-terracotta font-sans text-[1.0625rem] font-semibold text-on-terracotta transition-colors hover:bg-terracotta-deep disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </motion.button>
    </form>
  )
}
