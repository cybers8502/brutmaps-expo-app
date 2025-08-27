import {useEffect, useState, useCallback} from 'react';
import {useLocalSearchParams} from 'expo-router';
import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';

interface ImageAuthor {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  full_name: string;
  instagram: string;
  figcaption: string;
  link: string;
}

export interface ImageItem {
  id: number;
  url: string;
  title: string;
  alt: string;
  source: string;
  author: ImageAuthor;
}

interface Coordinates {
  lat: string;
  long: string;
}

export interface ObjectPost {
  id: number;
  slug: string;
  title: string;
  address: string;
  coordinates: Coordinates;
  description: string;
  gallery: ImageItem[];
  topGallery: ImageItem[];
}

interface ResponseData {
  status: string;
  data?: ObjectPost;
  message?: string;
}

export default function useFetchObjectPost(sightSlug: string) {
  const [data, setData] = useState<ObjectPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = `${env.API_BASE_URL}${apiRoutes.objectsPost}/${sightSlug}`;
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
  }, [sightSlug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {objectPost: data, isLoading, isError: error, refetch: fetchData};
}
