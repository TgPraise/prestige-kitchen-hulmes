// The Room: 3 to 5 photos of the dining room, bar or open kitchen.
// Set `src` once real photography exists for a slot; until then a designed placeholder is drawn.
// `scene` only affects the placeholder art.
export const roomImages = [
  { id: 'dining', title: 'The dining room', alt: 'A candlelit table set for dinner, with more tables in the room beyond', scene: 'dining', src: '/images/room-dining.jpg' },
  { id: 'bar', title: 'The bar', alt: 'Friends toasting with drinks at the bar', scene: 'bar', src: '/images/room-bar.jpg' },
  { id: 'kitchen', title: 'The kitchen', alt: 'A seafood boil cooking on the stove in the kitchen', scene: 'kitchen', src: '/images/room-kitchen.jpg' },
  // 'corner' stays on its illustrated placeholder: a photo was supplied for this slot, but it
  // visibly showed a different restaurant's interior (a "LAYLA KITCHEN & COFFEE" sign and menu
  // were in shot), so it was excluded rather than published as if it were this venue. Needs a
  // real photo of Prestige Kitchen's own corner tables before this slot gets one.
  { id: 'corner', title: 'Corner tables', alt: 'A quiet corner table for two', scene: 'dining', src: null },
]
