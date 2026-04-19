import { apiClient } from '@/lib/api';
import type { ApiResponse } from '@/types/api.types';
import type { DashboardOverview } from '../types';

const BASE = '/dashboard';

export const dashboardService = {
  getOverview: async (signal?: AbortSignal): Promise<DashboardOverview> => {
    const { data } = await apiClient.get<ApiResponse<DashboardOverview>>(BASE, { signal });
    return data.data;
  },
};
