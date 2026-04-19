import { createQueryHook, createMutationHook } from '@/lib/query';
import { notificationService } from './notification.service';
import type { NotificationListResponse } from '../types/notification.types';

const NOTIFICATION_KEYS = {
  all: ['notifications'] as const,
  list: () => [...NOTIFICATION_KEYS.all, 'list'] as const,
};

export const useNotifications = createQueryHook<NotificationListResponse>({
  queryKey: () => NOTIFICATION_KEYS.list(),
  queryFn: (_params, signal) => notificationService.getNotifications(signal),
  options: {
    refetchInterval: 60_000,
    staleTime: 30_000,
  },
});

export const useMarkAsRead = createMutationHook<void, string>({
  mutationFn: (notificationId) =>
    notificationService.markAsRead(notificationId).then(() => undefined),
  invalidateKeys: [NOTIFICATION_KEYS.all],
});

export const useMarkAllRead = createMutationHook<void, void>({
  mutationFn: () => notificationService.markAllRead(),
  invalidateKeys: [NOTIFICATION_KEYS.all],
  successMessage: 'All notifications marked as read',
});
