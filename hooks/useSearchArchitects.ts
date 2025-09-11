import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useApiQuery} from '@/hooks/useApiQuery';
import {ArchitectsResponse} from '@/interfaces/Architects.interface';

export function useSearchArchitects(query: string) {
  const url = `${env.API_BASE_URL}${apiRoutes.architectsSearch}?query=${query}`;

  return useApiQuery<ArchitectsResponse[]>(['searchArchitects', query], url);
}
