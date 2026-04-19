'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

function formatSegment(segment: string): string {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  const breadcrumbs: BreadcrumbItem[] =
    items ??
    (() => {
      const segments = pathname.split('/').filter(Boolean);
      return segments.map((segment, index) => ({
        label: formatSegment(segment),
        href: '/' + segments.slice(0, index + 1).join('/'),
      }));
    })();

  if (breadcrumbs.length === 0) {
    return <span className="text-sm font-medium text-(--text-primary)">Dashboard</span>;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={crumb.href} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-(--text-muted)" />}
            {isLast ? (
              <span className={cn('text-sm font-medium text-(--text-primary)')} aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className={cn(
                  'text-sm text-(--text-secondary)',
                  'transition-colors hover:text-(--text-primary)',
                )}
              >
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
