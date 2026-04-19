'use client';

import { useEffect } from 'react';
import { wsClient } from '@/lib/websocket';
import type { WSEventName, WSEventPayload } from '@/lib/websocket';

export function useWebSocket<E extends WSEventName>(
  event: E,
  handler: (data: WSEventPayload<E>) => void,
) {
  useEffect(() => {
    const unsubscribe = wsClient.subscribe(event, handler);
    return unsubscribe;
  }, [event, handler]);
}
