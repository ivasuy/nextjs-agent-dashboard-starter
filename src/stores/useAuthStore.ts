import { createAppStore } from '@/lib/store';
import { Permission, type User, type AuthTokens } from '@/types/auth.types';
import { tokenStorage } from '@/lib/auth/token-storage';

const isMockApiEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_API !== 'false';

const starterUser: User = {
  id: 'starter-owner',
  email: 'starter@example.com',
  name: 'Starter Owner',
  role: 'owner',
  permissions: Object.values(Permission),
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  hasPermission: (permission: Permission) => boolean;
}

export const useAuthStore = createAppStore<AuthState & AuthActions>(
  (set, get) => ({
    user: isMockApiEnabled ? starterUser : null,
    isAuthenticated: isMockApiEnabled,
    isLoading: false,

    login: (user, tokens) => {
      tokenStorage.setAccessToken(tokens.accessToken);
      tokenStorage.setRefreshToken(tokens.refreshToken);
      set((state) => {
        state.user = user;
        state.isAuthenticated = true;
        state.isLoading = false;
      });
    },

    logout: () => {
      tokenStorage.clear();
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
    },

    setUser: (user) => {
      set((state) => {
        state.user = user;
      });
    },

    setLoading: (loading) => {
      set((state) => {
        state.isLoading = loading;
      });
    },

    hasPermission: (permission) => {
      const { user } = get();
      if (!user) return false;
      if (user.role === 'owner') return true;
      return user.permissions.includes(permission);
    },
  }),
  { name: 'auth-store' },
);
