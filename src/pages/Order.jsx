import { useState } from 'react'
import CartSummary from '../components/order/CartSummary'
import AddMoreItems from '../components/order/AddMoreItems'
import CheckoutForm from '../components/order/CheckoutForm'
import OrderConfirmation from '../components/order/OrderConfirmation'
import OpenBadge from '../components/ui/OpenBadge'
import { site } from '../data/site'

export default function Order() {
  const [confirmed, setConfirmed] = useState(null) // { ref, summary } | null

  if (confirmed) {
    return <OrderConfirmation orderRef={confirmed.ref} summary={confirmed.summary} />
  }

  return (
    <section className="bg-cream px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-[clamp(2.1rem,3.4vw+1rem,3.5rem)] font-medium leading-tight text-espresso">
            Your order
          </h1>
          <OpenBadge className="text-taupe" />
        </div>
        <p className="mt-2 max-w-[56ch] text-[1.0625rem] leading-relaxed text-taupe">
          Review your items, add anything else, then send your order to {site.name} {site.area}.
        </p>

        <div className="mt-9 lg:flex lg:items-start lg:gap-8">
          <div className="space-y-6 lg:sticky lg:top-24 lg:order-2 lg:w-[26rem] lg:shrink-0">
            <CartSummary />
            <AddMoreItems />
          </div>
          <div className="mt-8 lg:order-1 lg:mt-0 lg:min-w-0 lg:flex-1">
            <CheckoutForm onSuccess={(ref, summary) => setConfirmed({ ref, summary })} />
          </div>
        </div>
      </div>
    </section>
  )
}
