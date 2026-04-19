import type { z } from 'zod';
import type {
  integrationSchema,
  createIntegrationSchema,
  integrationStatusSchema,
  integrationFiltersSchema,
} from './integrations.schema';

export type Integration = z.infer<typeof integrationSchema>;
export type CreateIntegrationInput = z.infer<typeof createIntegrationSchema>;
export type IntegrationStatus = z.infer<typeof integrationStatusSchema>;
export type IntegrationFilters = z.infer<typeof integrationFiltersSchema>;
