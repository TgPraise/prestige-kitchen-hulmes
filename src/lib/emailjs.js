import emailjs from '@emailjs/browser'

// LAUNCH TODO: create a free account at emailjs.com, add an Email Service pointed at the
// restaurant's real inbox, and three Email Templates — order, booking, and enquiry — using the
// variables built in Order's CheckoutForm, Book's ReservationForm, and Contact's EnquiryForm.
// Then replace the five placeholders below. Nothing sends until they're set.
export const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
export const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
export const EMAILJS_ORDER_TEMPLATE_ID = 'YOUR_ORDER_TEMPLATE_ID'
export const EMAILJS_BOOKING_TEMPLATE_ID = 'YOUR_BOOKING_TEMPLATE_ID'
export const EMAILJS_ENQUIRY_TEMPLATE_ID = 'YOUR_ENQUIRY_TEMPLATE_ID'

const configured = (...ids) => ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, ...ids].some((v) => v.startsWith('YOUR_'))

let inited = false
function ensureInit() {
  if (!inited) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
    inited = true
  }
}

async function send(templateId, templateParams) {
  return emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams)
}

// Each sender throws on failure (including "not configured yet") so the caller can show a retry
// message rather than silently pretending to succeed.
export async function sendOrderEmail(templateParams) {
  if (!configured(EMAILJS_ORDER_TEMPLATE_ID)) {
    throw new Error('EmailJS order template is not configured yet (see src/lib/emailjs.js).')
  }
  ensureInit()
  return send(EMAILJS_ORDER_TEMPLATE_ID, templateParams)
}

export async function sendBookingEmail(templateParams) {
  if (!configured(EMAILJS_BOOKING_TEMPLATE_ID)) {
    throw new Error('EmailJS booking template is not configured yet (see src/lib/emailjs.js).')
  }
  ensureInit()
  return send(EMAILJS_BOOKING_TEMPLATE_ID, templateParams)
}

export async function sendEnquiryEmail(templateParams) {
  if (!configured(EMAILJS_ENQUIRY_TEMPLATE_ID)) {
    throw new Error('EmailJS enquiry template is not configured yet (see src/lib/emailjs.js).')
  }
  ensureInit()
  return send(EMAILJS_ENQUIRY_TEMPLATE_ID, templateParams)
}
