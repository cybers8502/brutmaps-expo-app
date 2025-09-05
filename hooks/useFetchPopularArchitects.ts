import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useApiQuery} from '@/hooks/useApiQuery';

type ArchitectsPicture = {
  url: string;
  name: string;
  alt: string;
};

export type ArchitectsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  image: ArchitectsPicture;
  sights_count: string;
};

export function useFetchPopularArchitects() {
  const url = `${env.API_BASE_URL}${apiRoutes.popularArchitects}`;

  return useApiQuery<ArchitectsResponse[]>(['popularArchitects'], url);
}
