export const TOAST_MESSAGES = {
  auth: {
    loginSuccess: 'Welcome back!',
    logoutSuccess: 'You have been logged out',
    otpSent: 'Verification code sent to your email',
    otpInvalid: 'Invalid verification code. Please try again',
    sessionExpired: 'Your session has expired. Please log in again',
  },
  campaign: {
    created: 'Campaign created successfully',
    updated: 'Campaign updated',
    deleted: 'Campaign deleted',
    duplicated: 'Campaign duplicated',
    statusChanged: (status: string) => `Campaign ${status}`,
  },
  brand: {
    updated: 'Brand profile updated',
    logoUpdated: 'Brand logo updated',
  },
  creative: {
    uploaded: 'Asset uploaded successfully',
    deleted: 'Asset deleted',
    generated: 'Creative generated successfully',
  },
  integration: {
    connected: (platform: string) => `${platform} connected successfully`,
    disconnected: (platform: string) => `${platform} disconnected`,
    syncStarted: 'Data sync started',
    syncComplete: 'Data sync complete',
  },
  billing: {
    planChanged: 'Subscription plan updated',
    paymentSuccess: 'Payment processed successfully',
    paymentFailed: 'Payment failed. Please try again',
  },
  upload: {
    success: 'File uploaded successfully',
    error: 'Failed to upload file',
    tooLarge: (maxSize: string) => `File exceeds ${maxSize} limit`,
    invalidType: 'File type not supported',
  },
  generic: {
    saved: 'Changes saved',
    deleted: 'Item deleted',
    copied: 'Copied to clipboard',
    error: 'Something went wrong. Please try again',
    networkError: 'Network error. Check your connection',
  },
} as const;
