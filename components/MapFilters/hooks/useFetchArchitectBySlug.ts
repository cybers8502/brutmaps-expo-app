import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useApiQuery} from '@/hooks/useApiQuery';
import {ArchitectsResponse} from '@/interfaces/Architects.interface';

export function useFetchArchitectBySlug(id: string) {
  const url = `${env.API_BASE_URL}${apiRoutes.architectByID}/${id}`;

  return useApiQuery<ArchitectsResponse>(['popularArchitects', id], url, {enabled: !!id});
}
