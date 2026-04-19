import type { z } from 'zod';
import type {
  profileSchema,
  updateProfileSchema,
  workspaceSchema,
  updateWorkspaceSchema,
  userRoleSchema,
} from './settings.schema';

export type Profile = z.infer<typeof profileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
