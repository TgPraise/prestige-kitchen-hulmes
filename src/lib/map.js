import { site } from '../data/site'

// We don't have a confirmed street address (see site.js), so rather than risk sending someone to
// a wrong location, both the embed and the directions link search by business name — Google
// resolves that to wherever the restaurant is actually listed, and stays correct even if they
// move or we never get a confirmed address.
const query = () => `${site.name} ${site.area} ${site.city}`

export const mapEmbedSrc = () => `https://www.google.com/maps?q=${encodeURIComponent(query())}&output=embed`

export const directionsHref = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query())}`
