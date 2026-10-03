// Short, readable reference: PK-YYMMDD-XXXX (orders) or PK-B-YYMMDD-XXXX (bookings)
function makeRef(prefix) {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const date = `${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${prefix}-${date}-${rand}`
}

export const makeOrderRef = () => makeRef('PK')
export const makeBookingRef = () => makeRef('PK-B')
export const makeEnquiryRef = () => makeRef('PK-E')
