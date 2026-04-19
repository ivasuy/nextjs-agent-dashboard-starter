import Link from 'next/link';
import { ArrowRight, LayoutDashboard, ShieldCheck, Blocks } from 'lucide-react';
import { AuthShell } from '@/components/layout';
import { Button } from '@/components/ui/Button';

const isMockApiEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_API !== 'false';

const features = [
  { icon: LayoutDashboard, label: 'Responsive shell with sidebar navigation' },
  { icon: ShieldCheck, label: 'Mock-first auth for instant local access' },
  { icon: Blocks, label: 'Billing, settings & integrations scaffold' },
] as const;

export default function LoginPage() {
  return (
    <AuthShell>
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.15em] text-(--text-muted) uppercase">
            Starter Access
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-(--text-primary)">
            Open the dashboard
          </h2>
          <p className="text-sm leading-relaxed text-(--text-secondary)">
            {isMockApiEnabled
              ? 'Mock auth is enabled — explore the starter right now.'
              : 'Mock auth is disabled. Add your real sign-in flow here.'}
          </p>
        </div>

        <div className="space-y-3">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="bg-primary-50 flex h-7 w-7 shrink-0 items-center justify-center rounded-md">
                <Icon className="text-primary-600 h-3.5 w-3.5" />
              </div>
              <span className="text-sm text-(--text-secondary)">{label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          <Button asChild className="w-full">
            <Link href="/dashboard" className="flex items-center justify-center gap-2">
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href="https://nextjs.org/docs/app" target="_blank" rel="noreferrer">
              Next.js Docs
            </Link>
          </Button>
        </div>

        <p className="text-xs text-(--text-muted)">
          Replace this with your product&apos;s real auth flow when ready.
        </p>
      </div>
    </AuthShell>
  );
}
