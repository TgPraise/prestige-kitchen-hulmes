import { Link } from 'react-router-dom'

// The two real intents a visitor arrives with, stated as plainly as possible right before the footer.
const panels = [
  {
    to: '/order',
    question: 'Ordering in?',
    line: 'Pick your dishes and send your order in a couple of minutes.',
    cta: 'Order Now',
    panel: 'bg-terracotta text-on-terracotta hover:bg-terracotta-deep',
    pill: 'bg-cream text-espresso group-hover:bg-espresso group-hover:text-cream',
  },
  {
    to: '/book',
    question: 'Coming to see us?',
    line: 'Request a table and we will get back to you to confirm it.',
    cta: 'Book a Table',
    panel: 'bg-espresso-soft text-cream hover:bg-[#46301f]',
    pill: 'border-2 border-cream/70 text-cream group-hover:bg-cream group-hover:text-espresso',
  },
]

export default function SplitClose() {
  return (
    <section aria-label="Order or book" className="grid md:grid-cols-2">
      {panels.map((p) => (
        <Link
          key={p.to}
          to={p.to}
          className={`group flex min-h-[21rem] flex-col justify-end gap-6 px-7 py-12 transition-colors duration-500 sm:min-h-[26rem] sm:px-12 sm:py-16 lg:px-16 ${p.panel}`}
        >
          <div>
            <h2 className="font-display text-[clamp(2.1rem,3.5vw+0.75rem,3.6rem)] font-medium leading-[1.08]">{p.question}</h2>
            <p className="mt-3 max-w-[34ch] text-[1.0625rem] leading-relaxed">{p.line}</p>
          </div>
          <span
            className={`inline-flex min-h-14 w-fit items-center rounded-full px-8 font-sans text-[1.0625rem] font-semibold transition-colors duration-300 ${p.pill}`}
          >
            {p.cta}
          </span>
        </Link>
      ))}
    </section>
  )
}
