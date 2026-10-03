import Button from '../components/ui/Button'

// Stand-in for pages that are planned but not built yet, so every nav link already works.
export default function ComingNext({ title, note }) {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center bg-cream px-6 pb-24 pt-36 text-center">
      <h1 className="font-display text-[clamp(2.2rem,4vw+1rem,3.75rem)] font-medium text-espresso">{title}</h1>
      <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-taupe">{note}</p>
      <Button to="/" variant="outlineDark" className="mt-8">Back to home</Button>
    </section>
  )
}
