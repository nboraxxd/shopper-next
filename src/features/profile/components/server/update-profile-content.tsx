import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import { ProfileResponse } from '@/features/profile/types'
import profileServerApi from '@/features/profile/api/server'

import { UpdateProfileForm } from '@/features/profile/components/client'

export default async function UpdateProfileContent() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

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
