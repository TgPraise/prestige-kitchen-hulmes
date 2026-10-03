// Minus/plus stepper, min 44px targets throughout for phone use.
export default function QtyStepper({ qty, onInc, onDec, label }) {
  return (
    <div className="inline-flex items-center rounded-full border-2 border-espresso/15" role="group" aria-label={label}>
      <button
        type="button"
        onClick={onDec}
        aria-label={`Remove one ${label}`}
        className="flex h-11 w-11 items-center justify-center text-xl font-medium text-espresso transition-colors hover:bg-espresso/5"
      >
        &minus;
      </button>
      <span className="w-7 text-center font-sans text-base font-semibold tabular-nums text-espresso" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`Add one more ${label}`}
        className="flex h-11 w-11 items-center justify-center text-xl font-medium text-espresso transition-colors hover:bg-espresso/5"
      >
        +
      </button>
    </div>
  )
}
