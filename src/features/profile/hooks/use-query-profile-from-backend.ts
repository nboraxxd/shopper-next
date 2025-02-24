import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { PROFILE_KEY } from '@/features/profile/constants'
import profileClientApi from '@/features/profile/api/client'
import { useProfileStore } from '@/features/profile/profile-store'

export default function useQueryProfileFromBackend() {
  const setProfile = useProfileStore((state) => state.setProfile)

  const queryProfileFromBackend = useQuery({
    queryFn: profileClientApi.getProfileFromBackend,
    queryKey: [PROFILE_KEY.PROFILE],
    staleTime: Infinity,
  })

  useEffect(() => {
    if (queryProfileFromBackend.isSuccess) {
      setProfile(queryProfileFromBackend.data.payload.data)
    }
  }, [queryProfileFromBackend.data?.payload.data, queryProfileFromBackend.isSuccess, setProfile])

  return queryProfileFromBackend
}
