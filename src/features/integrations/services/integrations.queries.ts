import { createQueryHook, createMutationHook } from '@/lib/query';
import { integrationsService } from './integrations.service';
import type { PaginatedResponse } from '@/types/api.types';
import type { Integration, CreateIntegrationInput, IntegrationFilters } from '../types';

const INTEGRATION_KEYS = {
  all: ['integrations'] as const,
  list: (f?: IntegrationFilters) => [...INTEGRATION_KEYS.all, 'list', f] as const,
};

export const useIntegrationList = createQueryHook<
  PaginatedResponse<Integration>,
  IntegrationFilters | undefined
>({
  queryKey: (filters) => INTEGRATION_KEYS.list(filters),
  queryFn: (filters) => integrationsService.getAll(filters),
});

export const useIntegrationCreate = createMutationHook<Integration, CreateIntegrationInput>({
  mutationFn: (input) => integrationsService.create(input),
  invalidateKeys: [INTEGRATION_KEYS.all],
  successMessage: 'Integration connected successfully',
});

export const useIntegrationDelete = createMutationHook<void, string>({
  mutationFn: (id) => integrationsService.delete(id),
  invalidateKeys: [INTEGRATION_KEYS.all],
  successMessage: 'Integration disconnected',
});
