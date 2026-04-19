import { createAppStore } from '@/lib/store';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  workspaceId: string;
}

interface WorkspaceState {
  activeWorkspace: Workspace | null;
  activeBrand: Brand | null;
  workspaces: Workspace[];
  brands: Brand[];
}

interface WorkspaceActions {
  setActiveWorkspace: (workspace: Workspace) => void;
  setActiveBrand: (brand: Brand) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setBrands: (brands: Brand[]) => void;
  reset: () => void;
}

export const useWorkspaceStore = createAppStore<WorkspaceState & WorkspaceActions>(
  (set) => ({
    activeWorkspace: null,
    activeBrand: null,
    workspaces: [],
    brands: [],

    setActiveWorkspace: (workspace) => {
      set((state) => {
        state.activeWorkspace = workspace;
      });
    },

    setActiveBrand: (brand) => {
      set((state) => {
        state.activeBrand = brand;
      });
    },

    setWorkspaces: (workspaces) => {
      set((state) => {
        state.workspaces = workspaces;
      });
    },

    setBrands: (brands) => {
      set((state) => {
        state.brands = brands;
      });
    },

    reset: () => {
      set((state) => {
        state.activeWorkspace = null;
        state.activeBrand = null;
        state.workspaces = [];
        state.brands = [];
      });
    },
  }),
  { name: 'workspace-store', persistOptions: {} },
);
