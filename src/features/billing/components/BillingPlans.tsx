'use client';

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    features: ['Up to 5 users', '10 GB storage', 'Community support'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    features: ['Unlimited users', '100 GB storage', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['SSO & SAML', 'Dedicated support', 'SLA guarantee'],
    highlight: false,
  },
] as const;

export function BillingPlans() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {plans.map(({ name, price, period, features, highlight }) => (
        <Card key={name} variant={highlight ? 'selected' : 'default'}>
          <Card.Header>
            <div>
              <p className="text-sm font-semibold text-(--text-primary)">{name}</p>
              <p className="mt-1 text-2xl font-bold text-(--text-primary)">
                {price}
                <span className="text-sm font-normal text-(--text-muted)">{period}</span>
              </p>
            </div>
          </Card.Header>
          <Card.Body className="space-y-2.5">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle2 className="text-success h-4 w-4 shrink-0" />
                <span className="text-sm text-(--text-secondary)">{f}</span>
              </div>
            ))}
          </Card.Body>
          <Card.Footer>
            <Button variant={highlight ? 'primary' : 'secondary'} size="sm" className="w-full">
              {highlight ? 'Current plan' : 'Switch plan'}
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
