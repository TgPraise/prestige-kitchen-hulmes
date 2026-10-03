import OpenBadge from '../ui/OpenBadge'
import Reveal from '../ui/Reveal'
import { site } from '../../data/site'

export default function ContactHero() {
  return (
    <section className="bg-cream px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-[clamp(2.1rem,3.4vw+1rem,3.5rem)] font-medium leading-tight text-espresso">
            Get in touch
          </h1>
          <OpenBadge className="text-taupe" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-2 max-w-[56ch] text-[1.0625rem] leading-relaxed text-taupe">
            Questions, press, large bookings, or just want to say hello — here&rsquo;s every way to
            reach {site.name} {site.area}.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
