import { createAppStore } from '@/lib/store';

interface IntegrationUIState {
  isConnectPanelOpen: boolean;
  openConnectPanel: () => void;
  closeConnectPanel: () => void;
}

export const useIntegrationUIStore = createAppStore<IntegrationUIState>(
  (set) => ({
    isConnectPanelOpen: false,
    openConnectPanel: () =>
      set((state) => {
        state.isConnectPanelOpen = true;
      }),
    closeConnectPanel: () =>
      set((state) => {
        state.isConnectPanelOpen = false;
      }),
  }),
  { name: 'integration-ui-store' },
);
