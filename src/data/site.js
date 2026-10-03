// Single source of truth for restaurant details.
// Sources: the live site prestigekitchenhulme.com (banner + product pages) unless marked otherwise.
// TODO(client): confirm every line marked CONFIRM before launch.
export const site = {
  name: 'Prestige Kitchen',
  area: 'Hulme',
  city: 'Manchester',
  tagline: 'Elevated comfort food', // CONFIRM positioning: the live site sells itself as "seafood boil takeaway since 2019"

  // CONFIRM: not on the live site. A third-party listing (Zmenu) gives "Anne Nuttall Rd, M15 4HN".
  // Unverified, so NOT used anywhere (map/directions use the business name instead — see
  // lib/map.js — rather than risk sending someone to a wrong address).
  address: ['Address line to confirm', 'Hulme, Manchester'],
  addressConfirmed: false,
  phone: '0161 000 0000', // CONFIRM
  phoneHref: '+441610000000',
  // No WhatsApp number confirmed anywhere on the client's own channels — stays null until they
  // give us one. The Booking page only shows a WhatsApp button when this is set.
  whatsappHref: null, // e.g. 'https://wa.me/441610000000'
  email: 'hello@example.com', // CONFIRM

  // CONFIRM: two of the client's own channels disagree, so nothing here should be trusted as final.
  //   - Instagram bio: "Open 5pm-10pm daily"
  //   - A TikTok caption: "open Tuesday to Saturday 5 till 10pm"
  // Using the Instagram version below (daily) as the working default, since it reads as the
  // more current/authoritative of the two — but this MUST be confirmed with the client directly.
  // openDays uses JS weekday numbers (0 = Sunday). Times are 24h, Europe/London.
  openDays: [0, 1, 2, 3, 4, 5, 6],
  opensAt: '17:00',
  closesAt: '22:00',
  hours: [{ days: 'Daily', open: '17:00', close: '22:00' }],

  // Both handles confirmed directly (Instagram bio, and the @handle on the client's own TikTok videos).
  socials: [
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/prestigekitchenhulme/' },
    { label: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@prestigekitchenhulme' },
  ],

  // Trust strip renders ONLY when this holds a real, verified value. Keep null until confirmed.
  trust: null,

  heroImage: '/images/hero-seafood.jpg',
  galleryUrl: null,

  // Halal is claimed in their Instagram bio but is NOT stated on the site. Never shown until the client confirms.
  halal: null,
}
