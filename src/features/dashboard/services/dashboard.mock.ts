import type { DashboardOverview } from '../types';

export const mockDashboardOverview: DashboardOverview = {
  metrics: [
    { key: 'routes', label: 'Starter Routes', value: '4' },
    { key: 'auth', label: 'Mock Auth', value: 'On' },
    { key: 'billing', label: 'Billing Ready', value: 'Yes' },
    { key: 'integrations', label: 'Integrations', value: 'Ready' },
  ],
  updatedAt: new Date().toISOString(),
};
