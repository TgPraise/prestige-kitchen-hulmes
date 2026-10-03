import SocialIcon from '../ui/SocialIcon'
import Reveal from '../ui/Reveal'
import { site } from '../../data/site'

function IconCircle({ children }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/12 text-terracotta-deep">
      {children}
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3 4.3 5.6 5.6l1.9-1.9c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C9.9 20.5 3.5 14.1 3.5 5.9c0-.6.4-1 1-1H8c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1l-1.8 1.9z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 6.5l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const cards = [
  {
    key: 'phone',
    icon: <PhoneIcon />,
    title: 'Call us',
    body: 'Best for same-day questions and larger bookings.',
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    cta: `Call ${site.phone}`,
  },
  {
    key: 'email',
    icon: <MailIcon />,
    title: 'Email us',
    body: "We'll reply as soon as we can.",
    value: site.email,
    href: `mailto:${site.email}`,
    cta: 'Send an email',
  },
]

export default function ContactCards() {
  return (
    <section className="bg-cream px-5 pb-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.key} className="flex flex-col items-start rounded-2xl bg-white/70 p-6 ring-1 ring-espresso/10">
              <IconCircle>{c.icon}</IconCircle>
              <h2 className="mt-4 font-display text-xl font-medium text-espresso">{c.title}</h2>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-taupe">{c.body}</p>
              <p className="mt-3 break-all font-sans text-[0.9375rem] font-semibold text-espresso">{c.value}</p>
              <a
                href={c.href}
                className="mt-4 inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 font-sans text-[0.9375rem] font-semibold text-on-terracotta hover:bg-terracotta-deep"
              >
                {c.cta}
              </a>
            </div>
          ))}

          <div className="flex flex-col items-start rounded-2xl bg-white/70 p-6 ring-1 ring-espresso/10">
            <IconCircle>
              <SocialIcon name="instagram" className="h-[22px] w-[22px]" />
            </IconCircle>
            <h2 className="mt-4 font-display text-xl font-medium text-espresso">Follow us</h2>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-taupe">
              The fastest way to see what&rsquo;s fresh today.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-espresso/15 text-espresso transition-colors hover:border-terracotta hover:bg-terracotta hover:text-on-terracotta"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
