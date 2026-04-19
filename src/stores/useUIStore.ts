import { createAppStore } from '@/lib/store';

interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  notificationCount: number;
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  setTheme: (t: 'light' | 'dark' | 'system') => void;
  setNotificationCount: (n: number) => void;
}

export const useUIStore = createAppStore<UIState & UIActions>(
  (set) => ({
    sidebarCollapsed: false,
    theme: 'system',
    notificationCount: 0,

    toggleSidebar: () => {
      set((state) => {
        state.sidebarCollapsed = !state.sidebarCollapsed;
      });
    },

    setSidebarCollapsed: (v) => {
      set((state) => {
        state.sidebarCollapsed = v;
      });
    },

    setTheme: (t) => {
      set((state) => {
        state.theme = t;
      });
    },

    setNotificationCount: (n) => {
      set((state) => {
        state.notificationCount = n;
      });
    },
  }),
  { name: 'ui-store', persistOptions: {} },
);
