import { createQueryHook } from '@/lib/query';
import { dashboardService } from './dashboard.service';
import type { DashboardOverview } from '../types';

const DASHBOARD_KEYS = {
  all: ['dashboard'] as const,
  overview: () => [...DASHBOARD_KEYS.all, 'overview'] as const,
};

export const useDashboardOverview = createQueryHook<DashboardOverview>({
  queryKey: () => DASHBOARD_KEYS.overview(),
  queryFn: (_params, signal) => dashboardService.getOverview(signal),
  options: { staleTime: 60_000 },
});
