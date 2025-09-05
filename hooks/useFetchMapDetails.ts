import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {IMapLayers} from '@/components/MapLayers/MapLayers.interface';
import {useApiQuery} from '@/hooks/useApiQuery';

interface CommonMap {
  featureCollection: IMapLayers;
}

export function useFetchMapDetails(architect?: string, type?: string) {
  const baseUrl = `${env.API_BASE_URL}${apiRoutes.objectsPost}`;
  const url = new URL(baseUrl);

  if (architect) {
    url.searchParams.append('architect', architect);
  }

  if (type) {
    url.searchParams.append('type', type);
  }

  return useApiQuery<CommonMap>(['mapDetails', architect, type], url.toString());
}
