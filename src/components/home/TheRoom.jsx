import { useRef } from 'react'
import { roomImages } from '../../data/room'
import { site } from '../../data/site'
import { useMotionPrefs } from '../../lib/motion'
import RoomArt from './RoomArt'
import Reveal from '../ui/Reveal'

// Left edge of the strip matches the heading's container (max-w-7xl + page padding)
const EDGE = 'max(1.25rem, calc((100% - 80rem) / 2 + 2rem))'

function Chevron({ dir }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// A photography-led strip with scroll-snap. Swipes on touch; arrow buttons on larger screens;
// the strip itself is focusable so keyboard users can scroll it with the arrow keys.
export default function TheRoom() {
  const scroller = useRef(null)
  const { reduced } = useMotionPrefs()

  const nudge = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section aria-labelledby="room-heading" className="bg-espresso py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
          <div>
            <h2 id="room-heading" className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-medium leading-tight">
              The room
            </h2>
            <p className="mt-3 max-w-[44ch] text-[1.0625rem] leading-relaxed text-cream/80">
              Somewhere warm to sit down and slow down.
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            {['left', 'right'].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => nudge(dir === 'left' ? -1 : 1)}
                aria-label={dir === 'left' ? 'Previous photos' : 'Next photos'}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cream/60 text-cream transition-colors hover:bg-cream hover:text-espresso"
              >
                <Chevron dir={dir} />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Photos of the restaurant. Scroll sideways to see more."
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-5"
        style={{ paddingInline: EDGE, scrollPaddingInline: EDGE }}
      >
        {roomImages.map((img) => (
          <figure key={img.id} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-cream/10">
              {img.src ? (
                <img
                  src={img.src}
                  srcSet={img.srcSet ?? undefined}
                  sizes="(min-width:1024px) 31vw, (min-width:640px) 46vw, 80vw"
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <RoomArt scene={img.scene} label={img.alt} />
              )}
            </div>
            <figcaption className="mt-3 text-base text-cream/80">{img.title}</figcaption>
          </figure>
        ))}
      </div>

      {site.galleryUrl && (
        <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
          <a href={site.galleryUrl} className="inline-flex min-h-12 items-center font-semibold text-terracotta-glow underline decoration-2 underline-offset-[6px] hover:text-cream">
            See the full gallery
          </a>
        </div>
      )}
    </section>
  )
}
