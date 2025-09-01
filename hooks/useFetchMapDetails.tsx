import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {IMapLayers} from '@/components/MapLayers/MapLayers.interface';
import {useApiQuery} from '@/hooks/useApiQuery';

interface CommonMap {
  featureCollection: IMapLayers;
}

export function useFetchMapDetails(architect?: string, type?: string) {
  const url = `${env.API_BASE_URL}${apiRoutes.objectsPost}`;

  return useApiQuery<CommonMap>(['mapDetails', architect, type], url);
}
