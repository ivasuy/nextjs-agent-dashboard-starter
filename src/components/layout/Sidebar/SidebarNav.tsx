'use client';

import { usePathname } from 'next/navigation';
import {
  CreditCard,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Plug,
  Settings,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';

const NAV_ITEMS = [
  {
    group: 'Overview',
    items: [{ icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' }],
  },
  {
    group: 'Manage',
    items: [
      { icon: Plug, label: 'Integrations', href: '/integrations' },
      { icon: CreditCard, label: 'Billing', href: '/billing' },
      { icon: Settings, label: 'Settings', href: '/settings' },
    ],
  },
] as const;

interface SidebarNavProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarNav({ collapsed, onToggleCollapse }: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <div
        className={cn(
          'flex h-(--header-height) shrink-0 items-center border-b border-(--border-default) px-4',
          collapsed && 'justify-center px-2',
        )}
      >
        <span className={cn('text-lg font-bold text-(--text-primary)', collapsed && 'text-base')}>
          {collapsed ? 'DS' : 'Dashboard Starter'}
        </span>
      </div>

      <div className="scrollbar-styled flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map((group) => (
          <SidebarGroup key={group.group} label={group.group} collapsed={collapsed}>
            {group.items.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={isActive(item.href)}
                collapsed={collapsed}
              />
            ))}
          </SidebarGroup>
        ))}
      </div>

      <div className="shrink-0 border-t border-(--border-default) p-3">
        <button
          onClick={onToggleCollapse}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
            'text-(--text-secondary) transition-colors hover:bg-neutral-100',
            collapsed && 'justify-center px-2',
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5 text-(--text-muted)" />
          ) : (
            <>
              <PanelLeftClose className="h-5 w-5 text-(--text-muted)" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
