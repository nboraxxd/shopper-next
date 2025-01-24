import { cookies } from 'next/headers'

import http from '@/shared/utils/http'
import type { UserResponse } from '@/features/user/types'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import { ForbiddenError } from '@/shared/utils/error'

const USER_PREFIX = '/users'

const userServerApi = {
  // `getUserFromBackend` sẽ được gọi từ Next.js server nên cần tự thêm accessToken vào headers.Authorization
  // EXPERIMENT: Nếu cookies() làm các page gọi các API khác `getUserFromBackend` bị chuyển thành Dynamic rendering
  // thì phải tự truyền accessToken vào method này
  getUserFromBackend: async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(ACCESS_TOKEN)

    if (!accessToken) {
      throw new ForbiddenError({ message: 'Access token is required', error_code: 'MISSING_TOKEN' })
    }

    return http.get<UserResponse>(USER_PREFIX, { headers: { Authorization: `Bearer ${accessToken.value}` } })
  },
}

export default userServerApi
