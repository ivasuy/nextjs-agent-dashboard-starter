'use client';

import { useEffect, useSyncExternalStore, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/** Simple external store for navigation progress state. */
let navigating = false;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return navigating;
}

function setNavigating(value: boolean) {
  if (navigating !== value) {
    navigating = value;
    listeners.forEach((cb) => cb());
  }
}

export function RouteProgress() {
  const pathname = usePathname();
  const isNavigating = useSyncExternalStore(subscribe, getSnapshot, () => false);

  // End progress when the pathname actually changes
  useEffect(() => {
    setNavigating(false);
  }, [pathname]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;
      if (href === pathname) return;
      setNavigating(true);
    },
    [pathname],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [handleClick]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="bg-primary-500 fixed top-0 right-0 left-0 z-100 h-0.5"
          initial={{ width: '0%' }}
          animate={{ width: '80%' }}
          exit={{ width: '100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
