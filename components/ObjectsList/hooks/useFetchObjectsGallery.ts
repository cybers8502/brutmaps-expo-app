import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useInfiniteQuery} from '@tanstack/react-query';
import {ApiResponse} from '@/hooks/useApiQuery';

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

export interface PhotoPost {
  post_id: string;
  title: string;
  link: string;
  preview_image_url: string;
  first_gallery_image_url: string;
  author: ImageAuthor;
}

export interface ObjectsGallery {
  seed: string;
  current_page: string;
  total_pages: string;
  total_posts: string;
  posts: PhotoPost[];
}

const SEED = 'abc1234';

async function fetchPage(page: number, pageSize = 12): Promise<ObjectsGallery> {
  const baseUrl = `${env.API_BASE_URL}${apiRoutes.instagramGalleryList}`;
  const query = new URLSearchParams({
    page: String(page),
    per_page: String(pageSize),
    seed: SEED,
  }).toString();

  const res = await fetch(`${baseUrl}?${query}`);
  const json: ApiResponse<ObjectsGallery> = await res.json();

  if (json.status === 'success' && json.data) return json.data;
  throw new Error(json.message || 'Failed to fetch data');
}

export function useFetchObjectsGallery(pageSize = 6) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['objects', SEED, pageSize],
    queryFn: ({pageParam}) => fetchPage(pageParam, pageSize),
    getNextPageParam: (lastPage) => {
      const current = Number(lastPage.current_page);
      const total = Number(lastPage.total_pages);
      return current < total ? current + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
