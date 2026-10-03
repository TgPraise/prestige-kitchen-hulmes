export const formatPrice = (pence) =>
  pence == null ? null : new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(pence / 100)

// "12:00" -> "12pm", "22:30" -> "10:30pm"
export const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

// "from £20" / "£15" / null
export const priceLabel = (dish) => {
  const p = formatPrice(dish.pricePence)
  if (!p) return null
  return dish.priceFrom ? `from ${p}` : p
}

export const servesLabel = ({ servesMin, servesMax }) => {
  if (servesMin == null) return null
  if (servesMax == null) return `Serves ${servesMin}+`
  return servesMin === servesMax ? `Serves ${servesMin}` : `Serves ${servesMin} to ${servesMax}`
}
