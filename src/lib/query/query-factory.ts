import { useQuery, type UseQueryOptions, type QueryKey } from '@tanstack/react-query';
import type { ApiError } from '@/types/api.types';

export function createQueryHook<TData, TParams = void>(config: {
  queryKey: (params: TParams) => QueryKey;
  queryFn: (params: TParams, signal?: AbortSignal) => Promise<TData>;
  options?: Omit<UseQueryOptions<TData, ApiError>, 'queryKey' | 'queryFn'>;
}) {
  return function useGeneratedQuery(
    params: TParams,
    overrides?: Omit<UseQueryOptions<TData, ApiError>, 'queryKey' | 'queryFn'>,
  ) {
    return useQuery<TData, ApiError>({
      queryKey: config.queryKey(params),
      queryFn: ({ signal }) => config.queryFn(params, signal),
      ...config.options,
      ...overrides,
    });
  };
}
