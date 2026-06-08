import { useInfiniteQuery } from '@tanstack/react-query'
import { searchItemsByKeyword } from '../apis/searchApi';
import type { SearchRequestParams } from '../models/search';

export const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  return useInfiniteQuery({
    queryKey: ['search', params],
    queryFn: ({ pageParam = 0 }) =>
      searchItemsByKeyword({ ...params, offset: pageParam as number }),
    enabled: !!params.q,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageUrl =
        lastPage.tracks?.next ||
        lastPage.artists?.next ||
        lastPage.albums?.next ||
        lastPage.playlists?.next ||
        lastPage.show?.next ||
        lastPage.episode?.next ||
        lastPage.audiobook?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get('offset');
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    }
  });
}
