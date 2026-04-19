'use client';

import { User } from 'lucide-react';
import { cn } from '@/utils/cn';
import { NotificationBell } from '@/features/notifications';

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <NotificationBell />

      <button
        className={cn(
          'flex items-center gap-2 rounded-lg p-1.5 pl-2',
          'transition-colors hover:bg-neutral-100',
        )}
        aria-label="User menu"
      >
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            'bg-primary-100 text-primary-700',
          )}
        >
          <User className="h-4 w-4" />
        </div>
      </button>
    </div>
  );
}
