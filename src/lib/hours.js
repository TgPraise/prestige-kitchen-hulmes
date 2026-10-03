import { site } from '../data/site'

// Minutes since local midnight, in Europe/London (not the visitor's own timezone).
function londonNowMinutes() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t)?.value
  const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return { day: days[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

// Today's date in Europe/London as YYYY-MM-DD — for <input type="date"> min/value, independent
// of the visitor's own timezone or locale.
export function londonTodayISO() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t)?.value
  return `${get('year')}-${get('month')}-${get('day')}`
}

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

const toHHMM = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`

function formatDisplayTime(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

// { open: bool, label pieces } for right now.
export function openStatus() {
  const { day, minutes } = londonNowMinutes()
  const openToday = site.openDays.includes(day)
  const open = toMin(site.opensAt)
  const close = toMin(site.closesAt)
  const isOpen = openToday && minutes >= open && minutes < close
  return { isOpen, opensAt: site.opensAt, closesAt: site.closesAt }
}

// Weekday number (0 = Sunday) for a YYYY-MM-DD date string, without timezone drift —
// parsed as a local calendar date rather than through `new Date(string)` (which is UTC-ish).
export function weekdayOf(dateISO) {
  const [y, m, d] = dateISO.split('-').map(Number)
  return new Date(y, m - 1, d).getDay()
}

// Time slots, in 15-minute steps, for a given YYYY-MM-DD date — honest about the shop's real
// hours. For today, only shows times still reachable with the kitchen's lead time; for a future
// date, shows the full opening window. Returns [] when the shop is closed that day, or (for
// today) already past closing — callers should fall back to an "as soon as possible" message.
export function slotsForDate(dateISO) {
  if (!dateISO) return []
  if (!site.openDays.includes(weekdayOf(dateISO))) return []

  const open = toMin(site.opensAt)
  const close = toMin(site.closesAt)
  const isToday = dateISO === londonTodayISO()
  const leadTime = 20 // minutes' notice the kitchen needs

  let start = open
  if (isToday) {
    const { minutes } = londonNowMinutes()
    if (minutes >= close) return []
    start = minutes < open ? open : minutes + leadTime
  }
  start = Math.ceil(start / 15) * 15
  if (start >= close) return []

  const slots = []
  for (let m = start; m <= close - 15; m += 15) slots.push({ value: toHHMM(m), label: formatDisplayTime(m) })
  return slots
}

// Same-day slots for right now — used by the Order page (delivery/collection is always "today").
export const todaySlots = () => slotsForDate(londonTodayISO())

// True when the shop doesn't open at all on this date's weekday (distinct from "open today but
// no bookable slots left" — callers should message those two cases differently).
export function isClosedDay(dateISO) {
  return !site.openDays.includes(weekdayOf(dateISO))
}
