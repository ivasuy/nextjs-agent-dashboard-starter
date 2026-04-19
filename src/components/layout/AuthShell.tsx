import { Cormorant_Garamond } from 'next/font/google';
import { cn } from '@/utils/cn';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const leftFeatures = [
  'Responsive dashboard shell with sidebar navigation',
  'Mock-first auth for frictionless local development',
  'Scaffold pages for billing, settings & integrations',
];

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className={cn('flex min-h-screen', cormorant.variable)}>
      {/* ── Left branding panel ── */}
      <div
        className="relative hidden flex-col overflow-hidden lg:flex lg:w-1/2"
        style={{ background: 'linear-gradient(160deg, #09090f 0%, #0b0c1a 100%)' }}
      >
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(65,117,255,0.18) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: '5%',
            right: '-15%',
            width: '65%',
            height: '55%',
            background: 'radial-gradient(ellipse, rgba(65,117,255,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between px-14 py-12">
          {/* Logo mark */}
          <div className="flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="12" height="12" fill="#4175ff" rx="2" />
              <rect x="16" width="12" height="12" fill="#4175ff" rx="2" opacity="0.45" />
              <rect y="16" width="12" height="12" fill="#4175ff" rx="2" opacity="0.45" />
              <rect x="16" y="16" width="12" height="12" fill="#4175ff" rx="2" />
            </svg>
            <span
              className="text-xs uppercase"
              style={{ color: '#3a3a5c', letterSpacing: '0.22em' }}
            >
              Platform
            </span>
          </div>

          {/* Headline block */}
          <div className="space-y-10">
            <div>
              <p
                className="mb-5 text-xs uppercase"
                style={{ color: 'rgba(65,117,255,0.65)', letterSpacing: '0.25em' }}
              >
                Dashboard Starter
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: '#edeae0',
                  fontSize: '4.75rem',
                  lineHeight: 1.04,
                  fontWeight: 300,
                  fontStyle: 'italic',
                }}
              >
                Build fast.
                <br />
                <span style={{ fontStyle: 'normal', fontWeight: 600 }}>Ship better.</span>
              </h1>
            </div>

            <div style={{ width: 40, height: 1, background: 'rgba(65,117,255,0.35)' }} />

            <ul className="space-y-4">
              {leftFeatures.map((f) => (
                <li key={f} className="flex items-start gap-4">
                  <span
                    className="mt-2 block shrink-0"
                    style={{ width: 16, height: 1, background: 'rgba(65,117,255,0.45)' }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#5e5e80' }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs" style={{ color: '#1e1e30' }}>
            © 2026 Dashboard Starter
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2 lg:hidden">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="12" height="12" fill="#4175ff" rx="2" />
            <rect x="16" width="12" height="12" fill="#4175ff" rx="2" opacity="0.45" />
            <rect y="16" width="12" height="12" fill="#4175ff" rx="2" opacity="0.45" />
            <rect x="16" y="16" width="12" height="12" fill="#4175ff" rx="2" />
          </svg>
          <span className="text-base font-semibold text-(--text-primary)">Platform</span>
        </div>

        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
