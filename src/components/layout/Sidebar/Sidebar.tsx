'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TRANSITION } from '@/lib/animations';
import { SidebarNav } from './SidebarNav';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = useCallback(() => setCollapsed((p) => !p), []);

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={TRANSITION.sidebar}
        className="hidden flex-col border-r border-(--border-default) bg-(--surface-bg-sidebar) md:flex"
      >
        <SidebarNav collapsed={collapsed} onToggleCollapse={toggleCollapsed} />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION.sidebar}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={TRANSITION.sidebar}
              className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-(--border-default) bg-(--surface-bg-sidebar) md:hidden"
            >
              <button
                onClick={onMobileClose}
                className="absolute top-5 right-3 rounded-lg p-1 text-(--text-muted) hover:bg-neutral-100"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarNav collapsed={false} onToggleCollapse={toggleCollapsed} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
