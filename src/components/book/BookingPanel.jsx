import RoomArt from '../home/RoomArt'
import SocialIcon from '../ui/SocialIcon'
import OpenBadge from '../ui/OpenBadge'
import { site } from '../../data/site'
import { formatTime } from '../../lib/format'

// The plan's "alternative to the form" section: a phone (and WhatsApp, once confirmed) link for
// anyone who'd rather just call — especially larger parties or same-day requests — set against
// the same warm dining-room scene used in the Home page's "The Room".
export default function BookingPanel() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-espresso text-cream">
      <div className="absolute inset-0" aria-hidden="true">
        <RoomArt scene="dining" label="" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(43,28,20,0.35) 0%, rgba(20,12,8,0.88) 78%)' }}
        />
      </div>

      <div className="relative flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
        <div>
          <OpenBadge className="text-cream/85" />
          <h2 className="mt-4 font-display text-[clamp(1.7rem,2.6vw+0.9rem,2.5rem)] font-medium leading-[1.12]">
            Request a table at {site.name} {site.area}
          </h2>
          <p className="mt-3 max-w-[32ch] text-[1.0625rem] leading-relaxed text-cream/80">
            We&rsquo;ll call or email to confirm — this form isn&rsquo;t checking live availability.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cream px-5 font-sans text-[0.9375rem] font-semibold text-espresso hover:bg-white"
            >
              Call {site.phone}
            </a>
            {site.whatsappHref && (
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-cream/60 px-5 font-sans text-[0.9375rem] font-semibold text-cream hover:bg-cream hover:text-espresso"
              >
                WhatsApp us
              </a>
            )}
          </div>
          <p className="text-[0.9rem] text-cream/70">
            Best for larger parties or same-day requests.
          </p>

          <dl className="border-t border-cream/15 pt-4 text-[0.9375rem] text-cream/85">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 py-0.5">
                <dt>{h.days}</dt>
                <dd>{formatTime(h.open)} to {formatTime(h.close)}</dd>
              </div>
            ))}
          </dl>

          {site.socials.length > 0 && (
            <div className="flex items-center gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-espresso"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
