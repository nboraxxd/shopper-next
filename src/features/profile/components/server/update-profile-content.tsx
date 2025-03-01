import { ProfileResponse } from '@/features/profile/types'
import profileServerApi from '@/features/profile/api/server'
import { getAccessTokenInServer } from '@/shared/utils/server'

import { UpdateProfileForm } from '@/features/profile/components/client'

export default async function UpdateProfileContent() {
  const accessToken = await getAccessTokenInServer()

  let profile: ProfileResponse['data'] | null = null

  try {
    const profileResponse = await profileServerApi.getProfileFromBackend(accessToken)

    profile = profileResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return profile ? <UpdateProfileForm profile={profile} /> : null
}
