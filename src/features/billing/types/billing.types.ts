import type { z } from 'zod';
import type {
  planSchema,
  invoiceSchema,
  billingOverviewSchema,
  planTierSchema,
  invoiceStatusSchema,
  changePlanSchema,
} from './billing.schema';

export type Plan = z.infer<typeof planSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type BillingOverview = z.infer<typeof billingOverviewSchema>;
export type PlanTier = z.infer<typeof planTierSchema>;
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;
export type ChangePlanInput = z.infer<typeof changePlanSchema>;
