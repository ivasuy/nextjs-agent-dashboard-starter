'use client';

import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { TRANSITION } from '@/lib/animations';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  collapsed?: boolean;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive = false,
  collapsed = false,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        'hover:bg-neutral-100',
        isActive ? 'bg-primary-50 text-primary-700' : 'text-(--text-secondary)',
        collapsed && 'justify-center px-2',
      )}
      title={collapsed ? label : undefined}
    >
      <Icon
        className={cn(
          'h-5 w-5 shrink-0',
          isActive ? 'text-primary-600' : 'text-(--text-muted) group-hover:text-(--text-secondary)',
        )}
      />
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={TRANSITION.sidebar}
            className="truncate"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
