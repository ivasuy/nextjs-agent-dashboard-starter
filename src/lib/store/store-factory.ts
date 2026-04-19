import { create, type StateCreator } from 'zustand';
import { devtools, persist, type PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface StoreFactoryOptions<T> {
  name: string;
  persistOptions?: Omit<PersistOptions<T>, 'name'>;
}

export function createAppStore<T extends object>(
  initializer: StateCreator<T, [['zustand/immer', never], ['zustand/devtools', never]]>,
  options: StoreFactoryOptions<T>,
) {
  const { name, persistOptions } = options;

  if (persistOptions) {
    return create<T>()(
      persist(immer(devtools(initializer, { name })), {
        name,
        ...persistOptions,
      }),
    );
  }

  return create<T>()(immer(devtools(initializer, { name })));
}
