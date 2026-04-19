export type Role = 'owner' | 'admin' | 'manager' | 'member' | 'viewer';

export enum Permission {
  // Campaign
  CAMPAIGN_CREATE = 'campaign:create',
  CAMPAIGN_READ = 'campaign:read',
  CAMPAIGN_UPDATE = 'campaign:update',
  CAMPAIGN_DELETE = 'campaign:delete',
  // Brand
  BRAND_CREATE = 'brand:create',
  BRAND_READ = 'brand:read',
  BRAND_UPDATE = 'brand:update',
  BRAND_DELETE = 'brand:delete',
  // Creative
  CREATIVE_CREATE = 'creative:create',
  CREATIVE_READ = 'creative:read',
  CREATIVE_UPDATE = 'creative:update',
  CREATIVE_DELETE = 'creative:delete',
  // Integration
  INTEGRATION_MANAGE = 'integration:manage',
  // Billing
  BILLING_MANAGE = 'billing:manage',
  BILLING_VIEW = 'billing:view',
  // Settings
  SETTINGS_MANAGE = 'settings:manage',
  // Team
  TEAM_INVITE = 'team:invite',
  TEAM_REMOVE = 'team:remove',
  TEAM_MANAGE_ROLES = 'team:manage_roles',
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: Role;
  permissions: Permission[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
