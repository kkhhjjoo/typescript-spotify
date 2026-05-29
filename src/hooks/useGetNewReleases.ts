import { useQuery } from '@tanstack/react-query';
import { getNewReleases } from '../apis/albumApi';
import useClientCredentialToken from './useClientCredentialToken';

const useGetNewReleases = () => {
  const token = useClientCredentialToken();
  return useQuery({
    queryKey: ['new-releases'],
    queryFn: () => getNewReleases(token!),
    enabled: !!token,
  });
};

export default useGetNewReleases;
