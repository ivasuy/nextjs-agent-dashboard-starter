import { apiClient } from '@/lib/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { Integration, CreateIntegrationInput, IntegrationFilters } from '../types';

const BASE = '/integrations';

export const integrationsService = {
  getAll: async (filters?: IntegrationFilters): Promise<PaginatedResponse<Integration>> => {
    const { data } = await apiClient.get<PaginatedResponse<Integration>>(BASE, {
      params: filters,
    });
    return data;
  },

  create: async (input: CreateIntegrationInput): Promise<Integration> => {
    const { data } = await apiClient.post<ApiResponse<Integration>>(BASE, input);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};
