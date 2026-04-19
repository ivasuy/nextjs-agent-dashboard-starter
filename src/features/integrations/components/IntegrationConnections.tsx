'use client';

import { Plug } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function IntegrationConnections() {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-base font-semibold text-(--text-primary)">Active connections</h2>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Plug className="h-8 w-8 text-(--text-muted)" />
          <p className="text-sm font-medium text-(--text-secondary)">No providers connected</p>
          <p className="text-xs text-(--text-muted)">
            Connect a provider above to start syncing data.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
