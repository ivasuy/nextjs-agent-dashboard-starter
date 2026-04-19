import { DURATION, EASING } from './constants';

export const TRANSITION = {
  sidebar: { duration: DURATION.smooth, ease: EASING.smooth },
  modal: { duration: DURATION.normal, ...EASING.spring },
  dropdown: { duration: DURATION.fast, ease: EASING.default },
  hover: { duration: DURATION.instant, ease: EASING.default },
  page: { duration: DURATION.slow, ease: EASING.smooth },
} as const;
