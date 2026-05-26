import { useQuery } from '@tanstack/react-query';
import { getNewReleases } from '../apis/albumApi';
import { useAuth } from './useAuth';

const useGetNewReleases = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['new-releases', token],
    queryFn: () => getNewReleases(token!),
    enabled: !!token,
  });
};

export default useGetNewReleases;