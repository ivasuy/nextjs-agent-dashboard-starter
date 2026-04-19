'use client';

import { Globe, Plus, Webhook, Zap } from 'lucide-react';
import { GridWrapper } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const providers = [
  {
    name: 'Webhook Receiver',
    icon: Webhook,
    description: 'Receive and process incoming webhooks from any external source.',
  },
  {
    name: 'API Connector',
    icon: Zap,
    description: 'Connect to external REST APIs with configurable auth and retry logic.',
  },
  {
    name: 'External Source',
    icon: Globe,
    description: 'Sync data from a third-party platform on a recurring schedule.',
  },
] as const;

export function IntegrationProviders() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-(--text-secondary)">Available providers</p>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add Integration
        </Button>
      </div>

      <GridWrapper layout="equal3">
        {providers.map(({ name, icon: Icon, description }) => (
          <Card key={name} variant="interactive">
            <Card.Header>
              <div className="flex items-center gap-3">
                <div className="bg-primary-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-primary-600 h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--text-primary)">{name}</p>
                  <p className="text-xs text-(--text-muted)">Not connected</p>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <p className="text-sm text-(--text-secondary)">{description}</p>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="sm">
                Connect
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </GridWrapper>
    </div>
  );
}
