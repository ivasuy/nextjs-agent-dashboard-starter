import { z } from 'zod';

export const integrationStatusSchema = z.enum(['connected', 'disconnected', 'error', 'pending']);

export const integrationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(100),
  provider: z.string().min(1),
  status: integrationStatusSchema,
  webhookUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createIntegrationSchema = integrationSchema.pick({
  name: true,
  provider: true,
  webhookUrl: true,
});

export const integrationFiltersSchema = z.object({
  status: integrationStatusSchema.optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(20),
});
