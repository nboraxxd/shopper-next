import http from '@/shared/utils/http'
import type { ProfileResponse } from '@/features/profile/types'

const PREFIX = '/users'

const profileServerApi = {
  getProfileFromBackend: async (accessToken: string) =>
    http.get<ProfileResponse>(PREFIX, { headers: { Authorization: `Bearer ${accessToken}` } }),
}

export default profileServerApi
