import { apiClient } from '@/lib/api';
import type { ApiResponse } from '@/types/api.types';
import type { BillingOverview, ChangePlanInput } from '../types';

const BASE = '/billing';

export const billingService = {
  getOverview: async (signal?: AbortSignal): Promise<BillingOverview> => {
    const { data } = await apiClient.get<ApiResponse<BillingOverview>>(BASE, { signal });
    return data.data;
  },

  changePlan: async (input: ChangePlanInput): Promise<void> => {
    await apiClient.post(`${BASE}/change-plan`, input);
  },
};
