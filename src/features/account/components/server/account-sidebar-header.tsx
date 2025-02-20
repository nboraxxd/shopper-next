import profileServerApi from '@/features/profile/api/server'
import { ProfileResponse } from '@/features/profile/types'
import { UserAvatar } from '@/shared/components'

export default async function AccountSidebarHeader({ accessToken }: { accessToken: string }) {
  let profile: ProfileResponse['data'] | null = null

  try {
    const profileResponse = await profileServerApi.getProfileFromBackend(accessToken)

    profile = profileResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return profile ? (
    <>
      <UserAvatar
        avatarUrl={profile.avatar}
        name={profile.name}
        height={142}
        width={142}
        className="size-[7.875rem] border-[5px] border-light-1/20 text-4xl font-medium shadow"
        fallbackClassName="bg-account-highlight text-5xl"
      />
      <h2 className="mt-2 line-clamp-1 text-lg font-bold text-light-1">{profile.name}</h2>
    </>
  ) : null
}
