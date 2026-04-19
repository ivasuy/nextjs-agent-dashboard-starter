'use client';

import { useEffect } from 'react';
import { wsClient } from '@/lib/websocket';
import { useAuthStore } from '@/stores/useAuthStore';

const isMockApiEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_API !== 'false';

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || isMockApiEnabled) {
      wsClient.disconnect();
      return;
    }

    if (isAuthenticated) {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:8000/ws';
      wsClient.connect(wsUrl);
    }
    return () => wsClient.disconnect();
  }, [isAuthenticated]);

  return <>{children}</>;
}
