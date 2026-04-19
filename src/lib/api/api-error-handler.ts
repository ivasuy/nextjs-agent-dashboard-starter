import { AxiosError } from 'axios';
import type { ApiError } from '@/types/api.types';

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const response = error.response;
    return {
      status: response?.status ?? 0,
      message: response?.data?.message ?? error.message ?? 'An unexpected error occurred',
      code: response?.data?.code,
      errors: response?.data?.errors,
    };
  }

  if (error instanceof Error) {
    return {
      status: 0,
      message: error.message,
    };
  }

  return {
    status: 0,
    message: 'An unknown error occurred',
  };
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
}
