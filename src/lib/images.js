// Product photos are not yet sourced — the client's live site blocks hotlinking / direct CDN
// access from outside a browser session, so paths can't be safely guessed or scraped here.
// LAUNCH TODO: get real photo exports from the client (or screenshot each product page) and
// drop the files into /public/images, then set `img` on the dish in data/menu.js to that path.
// Until then every dish renders the illustrated DishArt placeholder — see components/ui/DishArt.jsx.
export const imageSrcSet = () => undefined
