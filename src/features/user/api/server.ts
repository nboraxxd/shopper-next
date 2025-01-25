import http from '@/shared/utils/http'
import type { UserResponse } from '@/features/user/types'

const USER_PREFIX = '/users'

const userServerApi = {
  getUserFromBackend: async (accessToken: string) =>
    http.get<UserResponse>(USER_PREFIX, { headers: { Authorization: `Bearer ${accessToken}` } }),
}

export default userServerApi
