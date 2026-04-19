'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { TRANSITION } from '@/lib/animations';

interface SidebarGroupProps {
  label: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

export function SidebarGroup({ label, collapsed = false, children }: SidebarGroupProps) {
  return (
    <div className="space-y-1">
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION.sidebar}
            className={cn(
              'px-3 pt-3 pb-1 text-xs font-semibold tracking-wider uppercase',
              'text-(--text-muted)',
            )}
          >
            {label}
          </motion.p>
        )}
      </AnimatePresence>
      {collapsed && <div className="mx-auto my-2 h-px w-8 bg-(--border-default)" />}
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  );
}
