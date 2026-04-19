import { encrypt, decrypt } from './crypto';

const STORAGE_KEY = 'ph_auth';
let inMemoryToken: string | null = null;

export const tokenStorage = {
  getAccessToken(): string | null {
    return inMemoryToken;
  },

  setAccessToken(token: string): void {
    inMemoryToken = token;
  },

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      const encrypted = sessionStorage.getItem(STORAGE_KEY);
      return encrypted ? decrypt(encrypted) : null;
    } catch {
      return null;
    }
  },

  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem(STORAGE_KEY, encrypt(token));
    } catch {
      // Storage full or unavailable
    }
  },

  clear(): void {
    inMemoryToken = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  },
};
