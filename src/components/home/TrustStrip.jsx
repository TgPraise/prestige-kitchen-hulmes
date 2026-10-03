import { site } from '../../data/site'

// Verified social proof only. If site.trust is null (nothing confirmed), this section is
// left out of the build entirely, never filled with a placeholder number.
export default function TrustStrip() {
  if (!site.trust?.text) return null
  const inner = <span className="font-display text-lg text-espresso sm:text-xl">{site.trust.text}</span>
  return (
    <section aria-label="What guests say" className="bg-cream px-6 py-10 text-center">
      {site.trust.href ? (
        <a href={site.trust.href} className="underline decoration-terracotta decoration-2 underline-offset-[6px]" target="_blank" rel="noreferrer">
          {inner}
        </a>
      ) : (
        inner
      )}
    </section>
  )
}
