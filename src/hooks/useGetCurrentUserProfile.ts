import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useGetCurrentUserProfile } from '../apis/userApi'
import type { User } from '../models/user';


const useGetCurrentProfile = ():UseQueryResult<User, Error> => { 
  const accessToken = localStorage.getItem('access_token');
  return useQuery({
    queryKey: ['current-user-profile'],
    queryFn: useGetCurrentUserProfile,
    enabled: !!accessToken
  })
}

export default useGetCurrentProfile;