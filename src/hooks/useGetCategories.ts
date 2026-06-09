import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../apis/browseApi';

const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetCategories;
