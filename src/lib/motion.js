import { useReducedMotion } from 'framer-motion'

// Shared easing: gentle, like table service. Nothing sharp.
export const EASE = [0.22, 0.61, 0.36, 1]

// One hook so every animation in the site honours reduced-motion the same way.
export function useMotionPrefs() {
  const reduced = useReducedMotion()
  return { reduced: !!reduced }
}
