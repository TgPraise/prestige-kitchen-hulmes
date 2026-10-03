import { useState } from 'react'
import { site } from '../../data/site'
import { mapEmbedSrc, directionsHref } from '../../lib/map'
import { formatTime } from '../../lib/format'

export default function MapPanel() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="overflow-hidden rounded-3xl bg-white/70 ring-1 ring-espresso/10">
      <div className="relative aspect-[4/3] w-full bg-cream-deep sm:aspect-[16/10]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-[0.9rem] text-taupe">
            Loading map…
          </div>
        )}
        <iframe
          title={`Map showing ${site.name} ${site.area}`}
          src={mapEmbedSrc()}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="p-5 sm:p-6">
        {!site.addressConfirmed && (
          <p className="mb-3 rounded-lg bg-cream-deep px-3 py-2 text-[0.8125rem] leading-snug text-taupe">
            Full street address coming soon — the map and directions below search by our name, so
            they&rsquo;ll always point to the right place.
          </p>
        )}
        <h2 className="font-display text-lg font-medium text-espresso">{site.name} {site.area}</h2>
        {site.addressConfirmed && (
          <address className="mt-1 text-[0.9375rem] not-italic leading-relaxed text-taupe">
            {site.address.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
        )}
        <dl className="mt-3 space-y-1 border-t border-espresso/10 pt-3 text-[0.9375rem] text-taupe">
          {site.hours.map((h) => (
            <div key={h.days} className="flex justify-between gap-4">
              <dt>{h.days}</dt>
              <dd className="text-espresso">{formatTime(h.open)} to {formatTime(h.close)}</dd>
            </div>
          ))}
        </dl>
        <a
          href={directionsHref()}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex min-h-11 items-center font-sans text-[0.9375rem] font-semibold text-terracotta-deep underline decoration-2 underline-offset-[6px] hover:text-espresso"
        >
          Get directions
        </a>
      </div>
    </div>
  )
}
