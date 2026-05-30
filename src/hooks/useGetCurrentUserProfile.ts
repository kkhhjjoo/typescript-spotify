import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getCurrentUserProfile } from '../apis/userApi'
import type { User } from '../models/user';
import { useAuth } from './useAuth';

const useGetCurrentProfile = ():UseQueryResult<User, Error> => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['current-user-profile'],
    queryFn: getCurrentUserProfile,
    enabled: !!token
  })
}

export default useGetCurrentProfile;