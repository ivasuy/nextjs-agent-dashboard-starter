import { PageWrapper } from '@/components/layout';
import { BillingPlans, BillingInvoices } from '@/features/billing/components';

export default function BillingPage() {
  return (
    <PageWrapper
      title="Billing"
      description="Manage your subscription, invoices, and payment methods."
    >
      <BillingPlans />
      <div className="mt-(--gap-page-sections)">
        <BillingInvoices />
      </div>
    </PageWrapper>
  );
}
