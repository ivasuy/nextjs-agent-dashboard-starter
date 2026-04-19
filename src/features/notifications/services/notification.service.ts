import { apiClient } from '@/lib/api';
import type { ApiResponse } from '@/types/api.types';
import type { Notification, NotificationListResponse } from '../types/notification.types';

const BASE_URL = '/notifications';

export const notificationService = {
  async getNotifications(signal?: AbortSignal): Promise<NotificationListResponse> {
    const response = await apiClient.get<ApiResponse<NotificationListResponse>>(BASE_URL, {
      signal,
    });
    return response.data.data;
  },

  async markAsRead(notificationId: string): Promise<Notification> {
    const response = await apiClient.patch<ApiResponse<Notification>>(
      `${BASE_URL}/${notificationId}/read`,
    );
    return response.data.data;
  },

  async markAllRead(): Promise<void> {
    await apiClient.patch(`${BASE_URL}/read-all`);
  },
};
