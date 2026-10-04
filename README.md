# Prestige Kitchen Hulme: build, phase 1 (Home)

    npm install
    npm run dev

- Replay the cloche intro any time with `/?intro=1` (it plays once per browser session otherwise).
- Swap placeholders: `src/data/site.js` (address, hours, phone, hero photo, trust line),
  `src/data/menu.js` (dishes, prices, photos), `src/data/room.js` (room photos).
- Palette and fonts live in `src/index.css` (`@theme`).
- Menu, Order, Book and Contact routes show a "coming next" page until they are built.

## Phase 2 (Menu)

- Real menu, sourced from prestigekitchenhulme.com (see the top-of-file comment in
  `src/data/menu.js` for exactly what was verified vs. still needs client confirmation).
- Category tabs sync to `?cat=boils|plates|sides` for shareable/deep links.
- Dish quick-view modal shows itemised contents where the client's product page listed them.
- Sticky "Start your order" bar appears once inside the listings, and clears the footer.
- Live "Open now / Closed" badge reads real hours in Europe/London — **the two hours sources on
  the client's own channels disagree (Instagram vs TikTok), so this MUST be confirmed.**
- `dish.note` is customer-facing and renders on the site. `dish.internalNote` and `dish.source`
  are build-review only and are never rendered — check them before going live.
- No product photos are wired in yet (see `src/lib/images.js`) — every dish uses illustrated
  placeholder art matched to its category (boil / prawns / bowl / chips).

## Phase 3 (Order)

- Cart summary + a collapsible "Add more items" accordion, sticky alongside the checkout form on
  desktop; stacked (cart, add-more, form) on mobile.
- **EmailJS is not wired up yet** — see `src/lib/emailjs.js`. Create a free account at emailjs.com,
  add an Email Service pointed at the restaurant's inbox, and an Email Template using the variables
  listed in `buildOrderParams`/`sendOrderEmail` (order_ref, customer_name, order_lines, order_total,
  etc). Drop the three IDs into the placeholders at the top of that file. Until then, a real
  submission shows an honest "something went wrong, call us" error rather than failing silently.
- Spam protection: a hidden honeypot field plus a minimum-time-on-page check (2.5s). Either one
  triggers a silent "success" (no email sent, cart cleared, confirmation shown) so bots can't tell
  they were caught — verified both paths independently.
- Delivery/Collection toggle changes the required fields and the requested-time list, which is
  built from real opening hours (`lib/hours.js`) rather than a fixed set of times.
- Confirmation screen never implies a guaranteed/instant order — matches the plan's request vs.
  confirmation distinction — and includes an order reference plus a recap of what was ordered.
- Footer now has real Instagram + TikTok icon links (both handles confirmed from the client's own
  channels).

## Phase 4 (Book)

- Two-column layout: a decorative panel (reusing the Home page's dining-room art) with the phone
  number, hours and socials for anyone who'd rather call than fill the form, alongside the
  reservation form itself. Stacks (panel above form) on mobile.
- Date + time are driven by real opening hours (`lib/hours.js`'s `slotsForDate`), for *any* date,
  not just today — a closed day and "open today but past the last bookable slot" show different,
  accurate messages rather than one generic "no times" string.
- Party size stepper caps at 10 with a "larger group? call us" prompt, matching the plan.
- Same EmailJS pattern as Order: **not configured yet** (see `src/lib/emailjs.js`,
  `EMAILJS_BOOKING_TEMPLATE_ID`), with the same honest error-banner-on-failure behaviour, and the
  same honeypot + timing-guard spam protection (independently verified for both).
- Confirmation screen reuses the Order page's cloche-echo checkmark (now extracted to
  `components/ui/ConfirmMark.jsx`) and is careful to say "request sent", never "table confirmed."
- `site.whatsappHref` is `null` until the client gives us a real WhatsApp number — the panel only
  shows a WhatsApp button when it's set, rather than guessing from the phone number.
- Field-level validation errors now clear as soon as the person fixes that field, instead of
  lingering until the next submit attempt — fixed in both this form and the Order page's.

## Phase 5 (Contact)

- Hero, then three cards (Call, Email, Follow — both real social handles), then a combined
  enquiry-form-and-map section. All five nav pages are now real (no more "coming next" stubs).
- **No confirmed street address exists** (see `site.js`), so the map and "Get directions" link
  deliberately search by business name (`lib/map.js`) rather than guess at an address — this
  self-corrects to wherever the restaurant is actually listed on Google, and stays honest about
  what we don't know (a visible note says so on the page, only while unconfirmed).
- Enquiry form reuses the same honeypot + timing-guard spam protection as Order/Book (independently
  verified again here), third EmailJS template (`EMAILJS_ENQUIRY_TEMPLATE_ID`, also not configured
  yet), and an inline success state (checkmark + reference) rather than a full-page takeover, since
  this is the "lightweight" form by design.
- The map iframe will show a network error in sandboxed/offline preview environments — that's an
  environment restriction, not a code issue; it's a standard public Google Maps embed and works in
  any normal browser.

## Phase 6 (First real photography)

- Five photos supplied; four used, one excluded.
  - **Hero** (`public/images/hero-seafood.jpg`): the seafood lineup photo, physically rotated 90°
    from its original portrait orientation to landscape, which reads much better full-frame.
  - **Prestige boil** (`prestige-boil.jpg`), **Slap bang prawns** (`slap-bang-prawns.jpg`),
    **Blackanese prawn curry** (`blackanese-curry.jpg`) — wired into `data/menu.js`'s `img` field,
    which now shows on every surface that renders a dish: Home's Signature Dishes, Menu listings,
    Chef's Picks, the dish quick-view modal, and the Order page's cart/add-more thumbnails.
  - **Premium seafood boil** (`premium-seafood-boil.jpg`): a replacement photo was supplied after
    the first one was excluded for a visible third-party TikTok watermark. This one is clean, but
    had a lot of plain background above the bowl (typical food-blog styling) — pre-cropped to a
    near-square frame focused on the food itself, rather than relying on CSS center-crop, so it
    doesn't carry empty space into any of the card layouts it appears in.

All five featured dishes on the Home page and in Chef's Picks now use real photography.
- Fixed a real bug while wiring this up: `components/home/SignatureDishes.jsx` was checking
  `dish.image` (singular, old field name) instead of `dish.img` (the field every other component
  and `data/menu.js` actually uses), so real photos silently failed to show there. Also added the
  same real-photo support to `ChefsPicks.jsx` and the Order page's `CartLine.jsx` /
  `AddMoreItems.jsx`, which previously always rendered the illustration even when a photo existed.

## Phase 7 (Hero redesign: full-bleed background)

- The hero photo is now the section's true full-bleed background (behind the nav, the cloche, and
  the text), not a framed card above the headline. The cloche still sits centered over it and
  lifts away on the same reveal timing as before — only the layout changed, not the animation.
- Added two static gradient scrims (top, for nav legibility; bottom, for headline/CTA legibility)
  so text reads clearly regardless of what's in that part of the photo, without flattening the
  photo itself.
- Re-verified every existing hero behaviour still holds after the rewrite: skip button, Esc-to-skip,
  once-per-session play, `?intro=1` replay, reduced-motion instant state, and CTA focus being
  inert until visible — all pass.

## Phase 8 (The Room: first real interior photos)

- Three of four supplied photos used in `data/room.js`: dining room, bar, kitchen — cropped to the
  strip's 4:5 card ratio (upper-middle-biased crop, since that's usually where the interest sits
  in a portrait interior shot).
- **Excluded**: the fourth photo, supplied for "Corner tables", visibly showed a different,
  established restaurant's interior — a "LAYLA KITCHEN & COFFEE" neon sign and a menu booklet
  labelled "LAYLA" are both in shot, plus a "@reallygreatsite" (Canva template) watermark. Using it
  would have shown a real competitor's venue as if it were Prestige Kitchen's own, so it was left
  out entirely. That slot stays on its illustrated placeholder in `data/room.js` until a real photo
  of the restaurant's own corner tables is supplied.
