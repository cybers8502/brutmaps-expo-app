import {useEffect, useState, useCallback} from 'react';
import {useLocalSearchParams} from 'expo-router';
import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {IMapLayers} from '@/components/MapLayers/MapLayers.interface';

interface CommonMap {
  featureCollection: IMapLayers;
}

interface ResponseData {
  status: string;
  data?: CommonMap;
  message?: string;
}

export default function useFetchMapDetails() {
  const {architect, type} = useLocalSearchParams<{
    architect?: string;
    type?: string;
  }>();

  const [data, setData] = useState<CommonMap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = `${env.API_BASE_URL}${apiRoutes.objectsPost}?architects[]=${architect ?? ''}&taxonomy_terms[]=${type ?? ''}`;
      const res = await fetch(url);
      const json: ResponseData = await res.json();
      if (json.status === 'success' && json.data) {
        setData(json.data);
      } else {
        throw new Error(json.message || 'Failed to fetch map data');
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [architect, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {featureCollection: data?.featureCollection, isLoading, isError: error, refetch: fetchData};
}
