import { createAppStore } from '@/lib/store';

type SettingsSection = 'profile' | 'workspace' | 'danger';

interface SettingsUIState {
  activeSection: SettingsSection;
  setActiveSection: (section: SettingsSection) => void;
}

export const useSettingsUIStore = createAppStore<SettingsUIState>(
  (set) => ({
    activeSection: 'profile',
    setActiveSection: (section) =>
      set((state) => {
        state.activeSection = section;
      }),
  }),
  { name: 'settings-ui-store' },
);
