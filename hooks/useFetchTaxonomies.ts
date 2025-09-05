import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useApiQuery} from '@/hooks/useApiQuery';

export function useFetchTaxonomies<T>(query: string) {
  const url = `${env.API_BASE_URL}${apiRoutes.architectsStyles}?taxonomy=${query}`;

  return useApiQuery<T>(['taxonomies', query], url);
}
