import { PageWrapper } from '@/components/layout';
import { IntegrationProviders, IntegrationConnections } from '@/features/integrations/components';

export default function IntegrationsPage() {
  return (
    <PageWrapper
      title="Integrations"
      description="Connect providers, manage webhooks, and monitor sync status."
    >
      <IntegrationProviders />
      <div className="mt-(--gap-page-sections)">
        <IntegrationConnections />
      </div>
    </PageWrapper>
  );
}
