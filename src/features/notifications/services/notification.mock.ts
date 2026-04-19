import type { Notification, NotificationListResponse } from '../types/notification.types';

const now = new Date();

function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
}

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'success',
    title: 'Starter Ready',
    message: 'The dashboard starter is running with seeded data and mock auth enabled.',
    read: false,
    createdAt: hoursAgo(0.5),
    actionUrl: '/dashboard',
  },
  {
    id: 'notif-2',
    type: 'info',
    title: 'New Team Member',
    message: 'Sarah Johnson has joined your workspace.',
    read: false,
    createdAt: hoursAgo(2),
  },
  {
    id: 'notif-3',
    type: 'warning',
    title: 'Starter Checklist',
    message: 'Wire your real API by turning mock mode off after your backend is ready.',
    read: false,
    createdAt: hoursAgo(5),
    actionUrl: '/dashboard',
  },
  {
    id: 'notif-4',
    type: 'success',
    title: 'Integration Connected',
    message: 'Use the integrations page as the starting point for third-party connections.',
    read: true,
    createdAt: hoursAgo(12),
    actionUrl: '/integrations',
  },
  {
    id: 'notif-5',
    type: 'error',
    title: 'Billing Setup',
    message: 'Add your own subscription, invoice, or entitlements flow in the billing module.',
    read: false,
    createdAt: hoursAgo(24),
    actionUrl: '/billing',
  },
  {
    id: 'notif-6',
    type: 'info',
    title: 'Starter Structure',
    message: 'Use dashboard, billing, integrations, and settings as the initial product surfaces.',
    read: true,
    createdAt: hoursAgo(36),
    actionUrl: '/dashboard',
  },
  {
    id: 'notif-7',
    type: 'success',
    title: 'Report Ready',
    message:
      'The dashboard shell, notifications, and cards are ready to be adapted to your domain.',
    read: true,
    createdAt: hoursAgo(48),
    actionUrl: '/settings',
  },
  {
    id: 'notif-8',
    type: 'info',
    title: 'Starter Tip',
    message:
      'Replace the reference modules incrementally instead of rewriting the whole shell at once.',
    read: true,
    createdAt: hoursAgo(72),
    actionUrl: '/settings',
  },
];

export function getMockNotificationListResponse(): NotificationListResponse {
  return {
    notifications: mockNotifications,
    unreadCount: mockNotifications.filter((n) => !n.read).length,
  };
}
