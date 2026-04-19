import { z } from 'zod';

export const planTierSchema = z.enum(['starter', 'pro', 'enterprise']);

export const invoiceStatusSchema = z.enum(['paid', 'pending', 'failed', 'void']);

export const planSchema = z.object({
  id: z.string(),
  tier: planTierSchema,
  name: z.string(),
  price: z.number().nonnegative(),
  currency: z.string().default('USD'),
  interval: z.enum(['month', 'year']).default('month'),
  features: z.array(z.string()),
  isCurrent: z.boolean().default(false),
});

export const invoiceSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().nonnegative(),
  currency: z.string().default('USD'),
  status: invoiceStatusSchema,
  issuedAt: z.string().datetime(),
  paidAt: z.string().datetime().nullable(),
  invoiceUrl: z.string().url().nullable(),
});

export const billingOverviewSchema = z.object({
  currentTier: planTierSchema,
  plans: z.array(planSchema),
  invoices: z.array(invoiceSchema),
});

export const changePlanSchema = z.object({
  tier: planTierSchema,
});
