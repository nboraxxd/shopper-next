import { useMutation, useQueryClient } from '@tanstack/react-query'

import { PROFILE_KEY } from '@/features/profile/constants'
import profileClientApi from '@/features/profile/api/client'
import { useProfileStore } from '@/features/profile/profile-store'

export default function useUpdateProfileToBackendMutation() {
  const queryClient = useQueryClient()
  const setProfile = useProfileStore((state) => state.setProfile)

  return useMutation({
    mutationFn: profileClientApi.updateProfileToBackend,
    onSuccess: (response) => {
      setProfile(response.payload.data)
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEY.PROFILE] })
    },
  })
}
