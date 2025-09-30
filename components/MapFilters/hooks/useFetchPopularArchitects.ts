import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useApiQuery} from '@/hooks/useApiQuery';
import {ArchitectsResponse} from '@/interfaces/Architects.interface';

export function useFetchPopularArchitects() {
  const url = `${env.API_BASE_URL}${apiRoutes.popularArchitects}`;

  return useApiQuery<ArchitectsResponse[]>(['popularArchitects'], url);
}
