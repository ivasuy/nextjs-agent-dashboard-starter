import { apiClient } from '@/lib/api';
import type { ApiResponse } from '@/types/api.types';
import type { Profile, UpdateProfileInput, Workspace, UpdateWorkspaceInput } from '../types';

export const settingsService = {
  getProfile: async (signal?: AbortSignal): Promise<Profile> => {
    const { data } = await apiClient.get<ApiResponse<Profile>>('/profile', { signal });
    return data.data;
  },

  updateProfile: async (input: UpdateProfileInput): Promise<Profile> => {
    const { data } = await apiClient.patch<ApiResponse<Profile>>('/profile', input);
    return data.data;
  },

  getWorkspace: async (signal?: AbortSignal): Promise<Workspace> => {
    const { data } = await apiClient.get<ApiResponse<Workspace>>('/workspace', { signal });
    return data.data;
  },

  updateWorkspace: async (input: UpdateWorkspaceInput): Promise<Workspace> => {
    const { data } = await apiClient.patch<ApiResponse<Workspace>>('/workspace', input);
    return data.data;
  },

  deleteWorkspace: async (): Promise<void> => {
    await apiClient.delete('/workspace');
  },
};
