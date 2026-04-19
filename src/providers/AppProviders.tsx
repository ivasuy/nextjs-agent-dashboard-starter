'use client';

import { QueryProvider } from './QueryProvider';
import { WebSocketProvider } from './WebSocketProvider';
import { ConfirmProvider } from './ConfirmProvider';
import { Toaster } from 'sonner';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <WebSocketProvider>
        <ConfirmProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              className: 'text-sm',
            }}
          />
        </ConfirmProvider>
      </WebSocketProvider>
    </QueryProvider>
  );
}
