import { z } from 'zod';

export const dashboardMetricSchema = z.object({
  key: z.string(),
  label: z.string(),
  value: z.string(),
  trend: z
    .object({
      value: z.number(),
      label: z.string().optional(),
    })
    .optional(),
});

export const dashboardOverviewSchema = z.object({
  metrics: z.array(dashboardMetricSchema),
  updatedAt: z.string().datetime(),
});
