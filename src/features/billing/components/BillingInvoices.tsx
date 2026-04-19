'use client';

import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function BillingInvoices() {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-base font-semibold text-(--text-primary)">Recent invoices</h2>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <FileText className="h-8 w-8 text-(--text-muted)" />
          <p className="text-sm font-medium text-(--text-secondary)">No invoices yet</p>
          <p className="text-xs text-(--text-muted)">
            Invoices will appear here once billing is active.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
