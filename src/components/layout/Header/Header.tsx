'use client';

import { Menu } from 'lucide-react';
import { cn } from '@/utils/cn';
import { HeaderActions } from './HeaderActions';
import { Breadcrumbs } from '../Breadcrumbs';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex h-(--header-height) shrink-0 items-center justify-between',
        'border-b border-(--border-default) bg-(--surface-bg-primary)',
        'px-4 md:px-6',
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className={cn(
            'rounded-lg p-2 text-(--text-secondary) md:hidden',
            'transition-colors hover:bg-neutral-100',
          )}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Breadcrumbs />
      </div>
      <HeaderActions />
    </header>
  );
}
