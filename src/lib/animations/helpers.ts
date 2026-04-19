export function getMotionDuration(durationSeconds: number): number {
  if (typeof window === 'undefined') return durationSeconds;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReduced ? 0 : durationSeconds;
}
