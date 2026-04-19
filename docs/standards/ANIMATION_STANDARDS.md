# Animation Standards

## Overview

All animations use Framer Motion with centralized presets from `@/lib/animations`. No inline animation values are allowed.

## Architecture

```
@/lib/animations/
├── variants.ts      # Animation variant definitions
├── transitions.ts   # Transition presets
├── presets.ts       # Ready-to-spread motion props
└── index.ts         # Barrel export
```

## Usage Pattern

```tsx
import { fadeInUp, staggerContainer } from '@/lib/animations';

function CampaignList({ campaigns }: Props) {
  return (
    <motion.div {...staggerContainer}>
      {campaigns.map((campaign) => (
        <motion.div key={campaign.id} {...fadeInUp}>
          <CampaignCard campaign={campaign} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Available Presets

| Preset | Usage |
|---|---|
| `fadeIn` | Simple opacity fade |
| `fadeInUp` | Fade in + slide up |
| `fadeInDown` | Fade in + slide down |
| `slideInLeft` | Slide from left |
| `slideInRight` | Slide from right |
| `scaleIn` | Scale from 0.95 to 1 |
| `staggerContainer` | Parent that staggers children |
| `pageTransition` | Full page transition |
| `modalOverlay` | Modal backdrop animation |
| `modalContent` | Modal panel animation |

## Rules

1. **Never inline animation values** -- always import from `@/lib/animations`
2. **Use `AnimatePresence`** for exit animations
3. **Use `layoutId`** for shared layout animations
4. **Prefer `transform` + `opacity`** -- GPU-accelerated properties only
5. **Reduce motion** -- respect `prefers-reduced-motion` via the `useReducedMotion` hook

```tsx
// BAD: Inline values
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
/>

// GOOD: Centralized preset
<motion.div {...fadeInUp} />
```

## Custom Animations

If a preset does not exist for your use case, add it to `@/lib/animations/presets.ts`:

```ts
// lib/animations/presets.ts
export const slidePanel = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'spring', damping: 25, stiffness: 200 },
} as const;
```

Then import and use it. Never define animation values in component files.

## Exit Animations

```tsx
import { AnimatePresence } from 'framer-motion';
import { modalOverlay, modalContent } from '@/lib/animations';

function Modal({ isOpen, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div {...modalOverlay} />
          <motion.div {...modalContent}>{children}</motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

## Reduced Motion

```tsx
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...(shouldReduceMotion ? fadeIn : fadeInUp)}
    />
  );
}
```
