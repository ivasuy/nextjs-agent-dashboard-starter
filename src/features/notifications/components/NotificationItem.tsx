'use client';

import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { relativeDate } from '@/helpers/date';
import type { Notification } from '../types/notification.types';

const ICON_MAP = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
} as const;

const ICON_COLOR_MAP = {
  info: 'text-primary-500',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
} as const;

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onNavigate?: (url: string) => void;
}

export function NotificationItem({ notification, onRead, onNavigate }: NotificationItemProps) {
  const Icon = ICON_MAP[notification.type];

  function handleClick() {
    if (!notification.read) {
      onRead?.(notification.id);
    }
    if (notification.actionUrl) {
      onNavigate?.(notification.actionUrl);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex w-full gap-3 px-4 py-3 text-left transition-colors',
        'hover:bg-neutral-50',
        !notification.read && 'bg-primary-50/50',
      )}
    >
      <div className={cn('mt-0.5 shrink-0', ICON_COLOR_MAP[notification.type])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              'truncate text-sm',
              notification.read
                ? 'font-normal text-(--text-secondary)'
                : 'font-medium text-(--text-primary)',
            )}
          >
            {notification.title}
          </p>
          {!notification.read && (
            <span className="bg-primary mt-1.5 h-2 w-2 shrink-0 rounded-full" />
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-(--text-muted)">{notification.message}</p>
        <p className="mt-1 text-xs text-(--text-muted)">{relativeDate(notification.createdAt)}</p>
      </div>
    </button>
  );
}
