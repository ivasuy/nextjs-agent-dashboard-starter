import { AppShell } from '@/components/layout';
import { RouteGuard } from '@/lib/auth/route-guard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard>
      <AppShell>{children}</AppShell>
    </RouteGuard>
  );
}
