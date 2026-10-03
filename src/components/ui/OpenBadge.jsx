import { useEffect, useState } from 'react'
import { openStatus } from '../../lib/hours'
import { formatTime } from '../../lib/format'

// Live "Open now / Closed" read against real opening hours (Europe/London), not the visitor's
// clock. Re-checks every minute so it never goes stale on a page left open.
export default function OpenBadge({ className = '' }) {
  const [status, setStatus] = useState(openStatus)
  useEffect(() => {
    const id = setInterval(() => setStatus(openStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={`inline-flex items-center gap-2 font-sans text-sm font-medium ${className}`}>
      <span className={`h-2 w-2 rounded-full ${status.isOpen ? 'bg-[#6fae5c]' : 'bg-taupe/60'}`} aria-hidden="true" />
      {status.isOpen ? (
        <>Open now · closes {formatTime(status.closesAt)}</>
      ) : (
        <>Closed now · opens {formatTime(status.opensAt)}</>
      )}
    </span>
  )
}
