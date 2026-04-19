'use client';

import { CreditCard, LayoutDashboard, Plug, Sparkles } from 'lucide-react';
import { GridWrapper } from '@/components/layout';
import { MetricCard } from '@/components/ui/MetricCard';

const metrics = [
  {
    title: 'Starter Routes',
    value: '4',
    icon: <LayoutDashboard className="text-primary-500 h-5 w-5" />,
  },
  { title: 'Mock Auth', value: 'On', icon: <Sparkles className="text-primary-500 h-5 w-5" /> },
  {
    title: 'Billing Ready',
    value: 'Yes',
    icon: <CreditCard className="text-primary-500 h-5 w-5" />,
  },
  { title: 'Integrations', value: 'Ready', icon: <Plug className="text-primary-500 h-5 w-5" /> },
] as const;

export function DashboardMetrics() {
  return (
    <GridWrapper layout="metrics">
      {metrics.map((m) => (
        <MetricCard key={m.title} title={m.title} value={m.value} icon={m.icon} />
      ))}
    </GridWrapper>
  );
}
