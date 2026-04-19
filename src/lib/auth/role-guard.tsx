'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import type { Permission } from '@/types/auth.types';

interface CanProps {
  permission: Permission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function Can({ permission, fallback = null, children }: CanProps) {
  const hasPermission = useAuthStore((state) => state.hasPermission);

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
