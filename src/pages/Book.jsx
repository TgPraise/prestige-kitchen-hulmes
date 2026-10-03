import { useState } from 'react'
import BookingPanel from '../components/book/BookingPanel'
import ReservationForm from '../components/book/ReservationForm'
import BookingConfirmation from '../components/book/BookingConfirmation'
import { site } from '../data/site'

export default function Book() {
  const [confirmed, setConfirmed] = useState(null) // { ref, summary } | null

  if (confirmed) {
    return <BookingConfirmation bookingRef={confirmed.ref} summary={confirmed.summary} />
  }

  return (
    <section className="bg-cream px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <h1 className="sr-only">Book a table at {site.name} {site.area}</h1>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="lg:sticky lg:top-24 lg:h-[calc(100svh-7.5rem)] lg:min-h-[34rem]">
            <BookingPanel />
          </div>
          <ReservationForm onSuccess={(ref, summary) => setConfirmed({ ref, summary })} />
        </div>
      </div>
    </section>
  )
}
