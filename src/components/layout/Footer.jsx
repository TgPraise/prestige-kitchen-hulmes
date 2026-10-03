import Button from '../ui/Button'
import SocialIcon from '../ui/SocialIcon'
import { ClocheMark } from './Wordmark'
import { site } from '../../data/site'
import { formatTime } from '../../lib/format'

// The last chance to convert on every page: real CTAs and readable details, not small grey print.
export default function Footer() {
  return (
    <footer className="bg-espresso px-6 pb-safe pt-16 text-cream sm:px-8 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-b border-cream/15 pb-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[18ch] font-display text-[clamp(1.9rem,2.6vw+1rem,2.9rem)] font-medium leading-[1.1]">
            Hungry, or just curious?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button to="/order" size="lg" variant="primary">Order Now</Button>
            <Button to="/book" size="lg" variant="outline">Book a Table</Button>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <ClocheMark />
              <span className="font-display text-xl font-medium">{site.name} {site.area}</span>
            </div>
            <p className="mt-3 max-w-[28ch] text-base leading-relaxed text-cream/85">
              {site.tagline}, served the way it deserves.
            </p>
            {site.socials.length > 0 && (
              <ul className="mt-5 flex items-center gap-2.5">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${site.name} on ${s.label}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-espresso"
                    >
                      <SocialIcon name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="font-display text-xl font-medium">Find us</h2>
            <address className="mt-3 text-base not-italic leading-relaxed text-cream/85">
              {site.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <a
              href="/contact"
              className="mt-2 inline-flex min-h-11 items-center font-medium text-terracotta-glow underline decoration-2 underline-offset-[6px] hover:text-cream"
            >
              Get directions
            </a>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium">Opening hours</h2>
            <dl className="mt-3 space-y-1.5 text-base leading-relaxed text-cream/85">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt className="font-medium text-cream">{h.days}</dt>
                  <dd>{formatTime(h.open)} to {formatTime(h.close)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium">Get in touch</h2>
            <ul className="mt-3 text-base text-cream/85">
              <li>
                <a href={`tel:${site.phoneHref}`} className="inline-flex min-h-11 items-center hover:text-cream hover:underline">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:text-cream hover:underline">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="border-t border-cream/15 pt-6 text-[0.9375rem] text-cream/70">
          &copy; {new Date().getFullYear()} {site.name} {site.area}. Please ask a member of staff about allergens.
        </p>
      </div>
    </footer>
  )
}
