import { z } from 'zod';

export const userRoleSchema = z.enum(['owner', 'admin', 'member']);

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  role: userRoleSchema,
  avatarUrl: z.string().url().nullable(),
});

export const updateProfileSchema = profileSchema.pick({ name: true });

export const workspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(100),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens'),
  region: z.string(),
  createdAt: z.string().datetime(),
});

export const updateWorkspaceSchema = workspaceSchema.pick({ name: true, slug: true });
