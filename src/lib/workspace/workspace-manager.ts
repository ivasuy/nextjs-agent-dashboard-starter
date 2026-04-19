import type { QueryClient } from '@tanstack/react-query';
import { useWorkspaceStore, type Workspace, type Brand } from '@/stores/useWorkspaceStore';
import { apiClient } from '@/lib/api';
import type { ApiResponse } from '@/types/api.types';

const BRAND_DEPENDENT_KEYS = ['campaigns', 'creatives', 'analytics'];

/**
 * Orchestrates a full workspace switch:
 * 1. Set loading state
 * 2. Update store with new workspace
 * 3. Fetch brands for the new workspace
 * 4. Set first brand as active
 * 5. Invalidate all React Query cache
 * 6. Clear loading state
 */
export async function switchWorkspace(
  workspace: Workspace,
  queryClient: QueryClient,
): Promise<void> {
  const store = useWorkspaceStore.getState();
  const previousWorkspace = store.activeWorkspace;

  try {
    // 1 & 2: Update workspace in store
    store.setActiveWorkspace(workspace);

    // 3: Fetch brands for new workspace
    const response = await apiClient.get<ApiResponse<Brand[]>>(
      `/workspaces/${workspace.id}/brands`,
    );
    const brands = response.data.data;
    store.setBrands(brands);

    // 4: Set first brand as active
    const firstBrand = brands[0];
    if (firstBrand) {
      store.setActiveBrand(firstBrand);
    }

    // 5: Invalidate all queries
    await queryClient.invalidateQueries();
  } catch (error) {
    // Reset on failure
    if (previousWorkspace) {
      store.setActiveWorkspace(previousWorkspace);
    }
    throw error;
  }
}

/**
 * Switches the active brand and selectively invalidates brand-dependent queries.
 */
export async function switchBrand(brand: Brand, queryClient: QueryClient): Promise<void> {
  const store = useWorkspaceStore.getState();

  // 1: Update store with new brand
  store.setActiveBrand(brand);

  // 2: Selectively invalidate brand-dependent queries
  await Promise.all(
    BRAND_DEPENDENT_KEYS.map((key) => queryClient.invalidateQueries({ queryKey: [key] })),
  );
}
