import type { PaginatedResponse } from '@/types/api.types';
import type { Integration } from '../types';

export const mockIntegrationListResponse: PaginatedResponse<Integration> = {
  success: true,
  data: [],
  pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
};
