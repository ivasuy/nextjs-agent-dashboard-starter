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

export function SettingsProfile() {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-base font-semibold text-(--text-primary)">Profile</h2>
      </Card.Header>
      <Card.Body className="space-y-4">
        <Field label="Full name" value="Starter Owner" />
        <Field label="Email" value="starter@example.com" />
        <Field label="Role" value="Owner" />
      </Card.Body>
      <Card.Footer className="justify-end">
        <Button size="sm" variant="secondary">
          Save changes
        </Button>
      </Card.Footer>
    </Card>
  );
}
