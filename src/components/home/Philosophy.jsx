import Reveal from '../ui/Reveal'

// Two sentences, large and centred, with generous whitespace. Reads in about four seconds.
// PLACEHOLDER copy: the plan's example shape, to be replaced with the restaurant's real philosophy.
export default function Philosophy() {
  return (
    <section aria-label="Our philosophy" className="bg-cream px-6 py-28 sm:py-36 lg:py-44">
      <Reveal>
        <p className="mx-auto max-w-3xl text-balance text-center font-display text-[clamp(1.75rem,3.4vw+0.75rem,3.35rem)] font-normal leading-[1.28] text-espresso">
          We don&rsquo;t dress food up to hide it. We dress it up because it deserves the occasion.
        </p>
      </Reveal>
    </section>
  )
}
