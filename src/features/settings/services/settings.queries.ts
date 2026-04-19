import { createQueryHook, createMutationHook } from '@/lib/query';
import { settingsService } from './settings.service';
import type { Profile, UpdateProfileInput, Workspace, UpdateWorkspaceInput } from '../types';

const SETTINGS_KEYS = {
  all: ['settings'] as const,
  profile: () => [...SETTINGS_KEYS.all, 'profile'] as const,
  workspace: () => [...SETTINGS_KEYS.all, 'workspace'] as const,
};

export const useProfile = createQueryHook<Profile>({
  queryKey: () => SETTINGS_KEYS.profile(),
  queryFn: (_params, signal) => settingsService.getProfile(signal),
  options: { staleTime: 60_000 },
});

export const useUpdateProfile = createMutationHook<Profile, UpdateProfileInput>({
  mutationFn: (input) => settingsService.updateProfile(input),
  invalidateKeys: [SETTINGS_KEYS.all],
  successMessage: 'Profile updated successfully',
});

export const useWorkspace = createQueryHook<Workspace>({
  queryKey: () => SETTINGS_KEYS.workspace(),
  queryFn: (_params, signal) => settingsService.getWorkspace(signal),
  options: { staleTime: 60_000 },
});

export const useUpdateWorkspace = createMutationHook<Workspace, UpdateWorkspaceInput>({
  mutationFn: (input) => settingsService.updateWorkspace(input),
  invalidateKeys: [SETTINGS_KEYS.all],
  successMessage: 'Workspace updated successfully',
});

export const useDeleteWorkspace = createMutationHook<void, void>({
  mutationFn: () => settingsService.deleteWorkspace(),
  invalidateKeys: [SETTINGS_KEYS.all],
  successMessage: 'Workspace deleted',
});
