import {useQuery, UseQueryResult} from '@tanstack/react-query';

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
}

// Generic fetcher
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const json: ApiResponse<T> = await res.json();
  if (json.status === 'success' && json.data) {
    return json.data;
  }
  throw new Error(json.message || 'Failed to fetch data');
}

// Generic hook
export function useApiQuery<T>(
  key: (string | number | undefined)[],
  url: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  },
): UseQueryResult<T, Error> {
  return useQuery({
    queryKey: key,
    queryFn: () => fetchData<T>(url),
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
    gcTime: options?.gcTime ?? 1000 * 60 * 60 * 24,
    enabled: options?.enabled ?? true,
  });
}
