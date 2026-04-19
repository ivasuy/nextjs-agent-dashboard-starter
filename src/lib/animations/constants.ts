export const DURATION = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.25,
  smooth: 0.35,
  slow: 0.5,
} as const;

export const EASING = {
  default: [0.25, 0.1, 0.25, 1] as const,
  spring: { type: 'spring' as const, stiffness: 300, damping: 24 },
  bounce: { type: 'spring' as const, stiffness: 400, damping: 17 },
  smooth: [0.4, 0, 0.2, 1] as const,
} as const;

export type DurationKey = keyof typeof DURATION;
export type EasingKey = keyof typeof EASING;
