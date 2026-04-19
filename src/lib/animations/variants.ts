import { type Variants } from 'framer-motion';
import { DURATION, EASING } from './constants';

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.normal, ease: EASING.default } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

export const slideInRight: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: DURATION.smooth, ease: EASING.smooth } },
  exit: { x: '100%', opacity: 0, transition: { duration: DURATION.normal, ease: EASING.smooth } },
};

export const scaleIn: Variants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: DURATION.normal, ...EASING.spring } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: DURATION.fast } },
};

export const staggerChildren: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

export const listItem: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASING.default } },
  exit: { opacity: 0, y: -8, transition: { duration: DURATION.fast } },
};
