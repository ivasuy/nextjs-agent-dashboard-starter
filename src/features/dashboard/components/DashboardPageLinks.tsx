'use client';

import Link from 'next/link';
import { ArrowRight, CreditCard, Plug, Settings } from 'lucide-react';
import { GridWrapper } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const starterPages = [
  {
    title: 'Integrations',
    description: 'Provider setup, account linking, sync status, and webhooks.',
    href: '/integrations',
    icon: Plug,
  },
  {
    title: 'Billing',
    description: 'Pricing, invoices, entitlements, or seat management.',
    href: '/billing',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    description: 'Profile, workspace, permissions, and product preferences.',
    href: '/settings',
    icon: Settings,
  },
] as const;

export function DashboardPageLinks() {
  return (
    <GridWrapper layout="equal3" className="mt-(--gap-page-sections)">
      {starterPages.map(({ title, description, href, icon: Icon }) => (
        <Card key={href} variant="interactive">
          <Card.Header className="flex items-center gap-3">
            <Icon className="text-primary-500 h-5 w-5" />
            <h2 className="text-base font-semibold text-(--text-primary)">{title}</h2>
          </Card.Header>
          <Card.Body>
            <p className="text-sm text-(--text-secondary)">{description}</p>
          </Card.Body>
          <Card.Footer>
            <Button asChild variant="ghost" size="sm">
              <Link href={href}>
                Open {title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </GridWrapper>
  );
}
