import type { Profile, Workspace } from '../types';

export const mockProfile: Profile = {
  id: 'starter-owner',
  name: 'Starter Owner',
  email: 'starter@example.com',
  role: 'owner',
  avatarUrl: null,
};

export const mockWorkspace: Workspace = {
  id: 'workspace-starter',
  name: 'My Workspace',
  slug: 'my-workspace',
  region: 'US East',
  createdAt: new Date().toISOString(),
};
