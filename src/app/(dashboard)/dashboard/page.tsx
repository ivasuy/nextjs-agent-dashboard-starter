import { PageWrapper } from '@/components/layout';
import { DashboardMetrics, DashboardPageLinks } from '@/features/dashboard/components';

export default function DashboardPage() {
  return (
    <PageWrapper
      title="Dashboard"
      description="Default starter landing page for overview widgets and your first product modules."
    >
      <DashboardMetrics />
      <DashboardPageLinks />
    </PageWrapper>
  );
}
