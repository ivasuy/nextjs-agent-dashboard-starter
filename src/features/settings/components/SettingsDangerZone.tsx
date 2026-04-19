'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function SettingsDangerZone() {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-base font-semibold text-(--text-primary)">Danger zone</h2>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-(--text-primary)">Delete workspace</p>
            <p className="text-xs text-(--text-muted)">
              Permanently removes all data. This cannot be undone.
            </p>
          </div>
          <Button variant="danger" size="sm">
            Delete workspace
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
