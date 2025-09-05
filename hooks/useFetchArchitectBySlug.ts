import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useApiQuery} from '@/hooks/useApiQuery';

type ArchitectsPicture = {
  url: string;
  name: string;
};

export type ArchitectsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  image: ArchitectsPicture;
  sights_count: string;
};

export function useFetchArchitectBySlug(id: string) {
  const url = `${apiRoutes.architectByID}/${id}`;

  return useApiQuery<ArchitectsResponse>(['popularArchitects', id], url, {enabled: !!id});
}
