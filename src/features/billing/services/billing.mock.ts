import type { BillingOverview } from '../types';

export const mockBillingOverview: BillingOverview = {
  currentTier: 'starter',
  plans: [
    {
      id: 'plan-starter',
      tier: 'starter',
      name: 'Starter',
      price: 0,
      currency: 'USD',
      interval: 'month',
      features: ['Up to 5 users', '10 GB storage', 'Community support'],
      isCurrent: true,
    },
    {
      id: 'plan-pro',
      tier: 'pro',
      name: 'Pro',
      price: 49,
      currency: 'USD',
      interval: 'month',
      features: ['Unlimited users', '100 GB storage', 'Priority support'],
      isCurrent: false,
    },
    {
      id: 'plan-enterprise',
      tier: 'enterprise',
      name: 'Enterprise',
      price: 0,
      currency: 'USD',
      interval: 'month',
      features: ['SSO & SAML', 'Dedicated support', 'SLA guarantee'],
      isCurrent: false,
    },
  ],
  invoices: [],
};
