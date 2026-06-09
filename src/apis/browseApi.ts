import api from '../utils/api';

export interface Category {
  id: string;
  name: string;
  href: string;
  icons: { url: string; height: number | null; width: number | null }[];
}

export interface GetCategoriesResponse {
  categories: {
    items: Category[];
    next: string | null;
    total: number;
  };
}

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const response = await api.get('/browse/categories', {
    params: { locale: 'ko_KR', country: 'KR', limit: 50 },
  });
  return response.data;
};
