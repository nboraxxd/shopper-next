import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { USER_KEY } from '@/features/user/constants'
import userClientApi from '@/features/user/api/client'
import { useUserStore } from '@/features/user/user-store'

export default function useQueryUserFromBackend() {
  const setProfile = useUserStore((state) => state.setProfile)

  const queryUserFromBackend = useQuery({
    queryFn: userClientApi.getUserFromBackend,
    queryKey: [USER_KEY.USER],
  })

  useEffect(() => {
    if (queryUserFromBackend.isSuccess) {
      setProfile(queryUserFromBackend.data.payload.data)
    }
  }, [queryUserFromBackend.data?.payload.data, queryUserFromBackend.isSuccess, setProfile])

  return queryUserFromBackend
}
