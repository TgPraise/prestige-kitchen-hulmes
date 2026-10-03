import EnquiryForm from './EnquiryForm'
import MapPanel from './MapPanel'
import Reveal from '../ui/Reveal'

export default function FormAndMap() {
  return (
    <section className="bg-cream px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <EnquiryForm />
          <MapPanel />
        </Reveal>
      </div>
    </section>
  )
}
