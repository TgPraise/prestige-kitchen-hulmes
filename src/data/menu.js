// The real menu, built ONLY from text actually retrieved from prestigekitchenhulme.com
// (its homepage, its "SEAFOOD BOILS" and "boils for 2 or more" collection pages, and three
// individual product pages), plus one item (seafood stir fry) confirmed via the client's own
// TikTok caption. Nothing here is invented — where a detail wasn't captured, it is null, and
// where two pages disagreed, both figures are kept in a CONFIRM note rather than picking one.
//
// Field notes
//   pricePence  integer pence, or null where no price was captured. priceFrom: true means the
//               site showed "from £X" (variants exist, e.g. size or extras).
//   servesMin/Max  only where the product name or page said so.
//   contents    only copied from an actual product-page ingredients list. Never guessed.
//   img         always null for now — see lib/images.js for why, and what's needed to add real photos.
//   popular     the items shown in the site's own "Most Popular" homepage row.
//   tags        dietary tags, shown ONLY when tagsConfirmed is true. None are confirmed yet.
//
// CONFIRM WITH CLIENT before this goes live:
//   - Prestige boil: £35 on the homepage list, £30 on the "2 or more" collection page.
//   - Panko Crumb Calamari rings and Whole crab: on the menu, but no price was captured.
//   - Every "Sold out" badge on the live site — likely reflects being closed at fetch time
//     (Thu-Sun 5pm-8:30pm per the banner), not real stock. Don't carry "sold out" over.
//   - Full contents for every boil except the three listed below with a `contents` array —
//     those three are the only ones whose product page was actually opened and read.
//   - Whether this is genuinely a "comfort food" positioning brief, or whether the plan's
//     framing should shift toward the client's own "Manchester's No.1 Seafood Boil" identity —
//     worth raising, since the real menu is almost entirely seafood boils, not the pie-and-mash
//     style dishes used as placeholders on the Home page. Those Home page placeholders now need
//     swapping for real boil dishes to match this menu.
export const categories = [
  { id: 'boils', label: 'Seafood boils', blurb: 'Boxes are made up as listed and cannot be adjusted or swapped — for a custom order, ask about a build-your-own.' },
  { id: 'plates', label: 'Prawns and plates', blurb: 'Prawns, curry, stir fry, and fish and chips.' },
  { id: 'sides', label: 'Sides and extras', blurb: 'Add to any boil, or order on their own.' },
]

const dish = (d) => ({
  description: null,
  note: null,         // customer-facing only ("No crab or mussels"). Rendered on the site.
  internalNote: null,  // build/review notes ("confirm price with client"). NEVER rendered on the site.
  contents: null,
  servesMin: null,
  servesMax: null,
  priceFrom: false,
  img: null,
  popular: false,
  featured: false,
  tags: [],
  tagsConfirmed: false,
  source: null, // where this was confirmed — internal, never rendered
  ...d,
})

export const menu = [
  // ---- Seafood boils ----
  dish({
    id: 'prestige-boil', category: 'boils', name: 'Prestige boil', pricePence: 3500, art: 'boil',
    popular: true, featured: true, img: '/images/prestige-boil.jpg',
    internalNote: 'Priced at £30 elsewhere on the current site — confirm which is current.',
    source: 'Homepage "Most Popular" list; price conflict with the "boils for 2+" collection page (£30)',
  }),
  dish({ id: 'solo-boil', category: 'boils', name: 'Solo boil', pricePence: 1500, servesMin: 1, servesMax: 1, art: 'boil', source: 'SEAFOOD BOILS collection' }),
  dish({ id: 'mega-solo-boil', category: 'boils', name: 'Mega solo boil', pricePence: 1500, servesMin: 1, servesMax: 1, art: 'boil', source: 'SEAFOOD BOILS collection' }),
  dish({ id: 'bando-boil', category: 'boils', name: 'Bando boil', pricePence: 2000, priceFrom: true, servesMin: 1, servesMax: 1, art: 'boil', popular: true, source: 'Homepage "Most Popular" list' }),
  dish({ id: 'shrimp-sausage-boil', category: 'boils', name: 'Shrimp and sausage boil', note: 'With chicken sausage', pricePence: 1700, art: 'boil', popular: true, source: 'Homepage "Most Popular" list' }),
  dish({ id: 'ms-krabs-boil', category: 'boils', name: 'Ms Krabs boil', pricePence: 2000, priceFrom: true, servesMin: 1, servesMax: 1, art: 'boil', popular: true, source: 'Homepage "Most Popular" list' }),
  dish({
    id: 'premium-seafood-boil', category: 'boils', name: 'Premium seafood boil', pricePence: 2000, priceFrom: true, servesMin: 1, servesMax: 1, art: 'boil',
    popular: true, featured: true, img: '/images/premium-seafood-boil.jpg',
    contents: ['10 prawns', '1 blue crab', '2 corn', '5 potatoes', '2 eggs'],
    internalNote: 'Photo on the product page is for display — contents are as listed here. A first ' +
      'photo supplied for this dish (premium-boils.jpg) was excluded for carrying another creator\'s ' +
      'TikTok watermark; this replacement (premium-seafood-boil.jpg) is clean and cropped to remove ' +
      'the plain background above the bowl in the original.',
    source: 'Product page (contents list read directly)',
  }),
  dish({
    id: 'seafood-boil-squid-rings', category: 'boils', name: 'Seafood boil with squid rings', pricePence: 4300, servesMin: 1, art: 'boil',
    contents: ['10 prawns', '10 mussels', '1 whole lobster', '1 whole brown crab', '2 corn', 'squid rings'],
    source: 'Product page (contents list read directly)',
  }),
  dish({
    id: 'seafood-boil-no-mussels-2023', category: 'boils', name: 'Seafood boil, no mussels (2023)', pricePence: 4000, servesMin: 1, servesMax: 1, art: 'boil',
    contents: ['1 lobster tail', '1 blue crab', '10 prawns', 'calamari rings', '5 potatoes', 'double corn'],
    source: 'Product page (contents list read directly)',
  }),
  dish({ id: 'basic-boil', category: 'boils', name: 'Basic boil', note: 'No crab or mussels · serves 1', pricePence: 2800, priceFrom: true, servesMin: 1, servesMax: 1, art: 'boil', source: '"Boils for 2 or more" collection' }),
  dish({ id: 'standard-boil-2019', category: 'boils', name: 'Standard seafood boil (2019)', note: 'No mussels · serves 1', pricePence: 3000, priceFrom: true, servesMin: 1, servesMax: 1, art: 'boil', source: '"Boils for 2 or more" collection' }),
  dish({ id: 'main-deluxe', category: 'boils', name: 'Main deluxe', pricePence: 6000, servesMin: 2, servesMax: 2, art: 'boil', source: 'Homepage "Most Popular" list' }),
  dish({
    id: 'exclusive-duo-supreme', category: 'boils', name: 'Exclusive duo supreme', pricePence: 6000, servesMin: 2, art: 'boil',
    internalNote: 'Serves 2 or more, per the collection it sits in.',
    source: '"Boils for 2 or more" collection',
  }),

  // ---- Prawns and plates ----
  dish({ id: 'slap-bang-prawns', category: 'plates', name: 'Slap bang prawns', pricePence: 850, art: 'prawns', popular: true, featured: true, img: '/images/slap-bang-prawns.jpg', source: 'SEAFOOD BOILS collection' }),
  dish({ id: 'blackanese-prawn-curry', category: 'plates', name: 'Blackanese prawn curry', pricePence: 1200, art: 'bowl', popular: true, featured: true, img: '/images/blackanese-curry.jpg', source: 'Homepage "Most Popular" list' }),
  dish({ id: 'prawns', category: 'plates', name: 'Prawns', pricePence: 1200, art: 'prawns', popular: true, source: 'Homepage "Most Popular" list' }),
  dish({
    id: 'seafood-stir-fry', category: 'plates', name: 'Seafood stir fry', pricePence: 1050, art: 'bowl',
    source: "Client's own TikTok caption, not the storefront — confirm it's still on the menu",
  }),
  dish({ id: 'fish-and-chips', category: 'plates', name: "Prestige's fish and chips", pricePence: 450, priceFrom: true, art: 'chips', popular: true, featured: true, source: 'Homepage "Most Popular" list' }),
  dish({ id: 'tempura-prawns-chips', category: 'plates', name: 'Tempura prawns with chips', pricePence: 500, priceFrom: true, art: 'chips', popular: true, source: 'Homepage "Most Popular" list' }),

  // ---- Sides and extras ----
  dish({ id: 'fries', category: 'sides', name: 'Fries', pricePence: 200, art: 'chips', source: '"Boils for 2 or more" collection' }),
  dish({ id: 'baby-octopus', category: 'sides', name: 'Baby octopus', pricePence: 300, art: 'bowl', source: '"Boils for 2 or more" collection' }),
  dish({ id: 'green-shell-mussels', category: 'sides', name: 'Cooked green shell mussels', pricePence: 300, art: 'bowl', source: '"Boils for 2 or more" collection' }),
  dish({ id: 'panko-calamari', category: 'sides', name: 'Panko crumb calamari rings', pricePence: null, art: 'chips', internalNote: 'Price not captured — confirm with client.', source: '"Boils for 2 or more" collection' }),
  dish({
    id: 'whole-crab', category: 'sides', name: 'Whole crab', pricePence: null, art: 'boil',
    contents: ['Whole cooked brown crab'],
    note: 'Sizes vary, normally large. Add to a boil or order alone.',
    internalNote: 'Price not captured — confirm with client.',
    source: 'Product page (description read directly)',
  }),
]

export const featuredDishes = menu.filter((d) => d.featured)
export const popularDishes = menu.filter((d) => d.popular)
export const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? id
