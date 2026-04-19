import axios from 'axios';
import { handleApiError } from './api-error-handler';
import { setupAuthInterceptor } from '@/lib/auth/auth-interceptor';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1',
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 30000),
  headers: { 'Content-Type': 'application/json' },
});

// Auth interceptor — attach JWT, handle 401 refresh
setupAuthInterceptor(apiClient, () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
});

// Response interceptor — unwrap data, normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleApiError(error)),
);
