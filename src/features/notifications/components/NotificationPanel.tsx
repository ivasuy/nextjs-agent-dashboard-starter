'use client';

import { cn } from '@/utils/cn';
import { NotificationItem } from './NotificationItem';
import type { Notification } from '../types/notification.types';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAllRead?: () => void;
  onMarkRead?: (id: string) => void;
  onNavigate?: (url: string) => void;
}

export function NotificationPanel({
  notifications,
  onMarkAllRead,
  onMarkRead,
  onNavigate,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={cn(
        'w-80 overflow-hidden rounded-xl border border-(--border-default)',
        'bg-(--surface-bg-primary) shadow-lg',
      )}
    >
      <div className="flex items-center justify-between border-b border-(--border-default) px-4 py-3">
        <h3 className="text-sm font-semibold text-(--text-primary)">Notifications</h3>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-primary-600 hover:text-primary-700 text-xs font-medium transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-(--text-muted)">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-(--border-default)">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={onMarkRead}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
