import { createQueryHook, createMutationHook } from '@/lib/query';
import { billingService } from './billing.service';
import type { BillingOverview, ChangePlanInput } from '../types';

const BILLING_KEYS = {
  all: ['billing'] as const,
  overview: () => [...BILLING_KEYS.all, 'overview'] as const,
};

export const useBillingOverview = createQueryHook<BillingOverview>({
  queryKey: () => BILLING_KEYS.overview(),
  queryFn: (_params, signal) => billingService.getOverview(signal),
  options: { staleTime: 30_000 },
});

export const useChangePlan = createMutationHook<void, ChangePlanInput>({
  mutationFn: (input) => billingService.changePlan(input),
  invalidateKeys: [BILLING_KEYS.all],
  successMessage: 'Plan updated successfully',
});
