import type { z } from 'zod';
import type { dashboardMetricSchema, dashboardOverviewSchema } from './dashboard.schema';

export type DashboardMetric = z.infer<typeof dashboardMetricSchema>;
export type DashboardOverview = z.infer<typeof dashboardOverviewSchema>;
