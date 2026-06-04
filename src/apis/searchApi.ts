import api from '../utils/api';
import type { SearchRequestParams, SearchResponse } from '../models/search';

export const searchItemsByKeyword = async (params: SearchRequestParams): Promise<SearchResponse> => {
  try {
    const response = await api.get('/search', {
      params: {
        q: params.q,
        type: params.type.join(','),
        ...(params.market && { market: params.market }),
        ...(params.limit && { limit: params.limit }),
        ...(params.offset !== undefined && { offset: params.offset }),
        ...(params.include_external && { include_external: params.include_external }),
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Fail to search by keyword', { cause: error });
  }
}
