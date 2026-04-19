'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-(--text-secondary)">{label}</p>
      <div className="flex h-9 items-center rounded-lg border border-(--border-default) bg-(--surface-bg-secondary) px-3">
        <span className="min-w-0 truncate text-sm text-(--text-muted)">{value}</span>
      </div>
    </div>
  );
}

export function SettingsWorkspace() {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-base font-semibold text-(--text-primary)">Workspace</h2>
      </Card.Header>
      <Card.Body className="space-y-4">
        <Field label="Workspace name" value="My Workspace" />
        <Field label="Slug" value="my-workspace" />
        <Field label="Region" value="US East" />
      </Card.Body>
      <Card.Footer className="justify-end">
        <Button size="sm" variant="secondary">
          Update
        </Button>
      </Card.Footer>
    </Card>
  );
}
