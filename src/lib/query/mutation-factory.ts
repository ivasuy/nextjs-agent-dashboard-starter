import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ApiError } from '@/types/api.types';

interface MutationFactoryOptions<TData, TVariables, TOnMutateResult = unknown> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKeys?: QueryKey[];
  successMessage?: string;
  errorMessage?: string;
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables, TOnMutateResult>, 'mutationFn'>;
}

export function createMutationHook<TData, TVariables, TOnMutateResult = unknown>(
  config: MutationFactoryOptions<TData, TVariables, TOnMutateResult>,
) {
  return function useGeneratedMutation(
    overrides?: Omit<
      UseMutationOptions<TData, ApiError, TVariables, TOnMutateResult>,
      'mutationFn'
    >,
  ) {
    const queryClient = useQueryClient();

    return useMutation<TData, ApiError, TVariables, TOnMutateResult>({
      mutationFn: config.mutationFn,
      onSuccess: (...args) => {
        if (config.invalidateKeys) {
          config.invalidateKeys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: key });
          });
        }
        if (config.successMessage) {
          toast.success(config.successMessage);
        }
        overrides?.onSuccess?.(...args);
      },
      onError: (...args) => {
        toast.error(config.errorMessage ?? args[0].message);
        overrides?.onError?.(...args);
      },
      ...config.options,
      ...overrides,
    });
  };
}
