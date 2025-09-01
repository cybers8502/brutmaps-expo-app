import {QueryClient} from '@tanstack/react-query';
import {persistQueryClient} from '@tanstack/react-query-persist-client';
import {createMMKVPersister} from './mmkvPersister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      retry: 1,
    },
  },
});

const persister = createMMKVPersister('my-app-cache');

persistQueryClient({
  queryClient,
  persister,
});
