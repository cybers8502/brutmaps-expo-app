import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useApiQuery} from '@/hooks/useApiQuery';

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

export function useFetchObjectPost(sightSlug: string) {
  const url = `${env.API_BASE_URL}${apiRoutes.objectsPost}/${sightSlug}`;

  return useApiQuery<ObjectPost>(['objectPost', sightSlug], url, {enabled: !!sightSlug});
}
