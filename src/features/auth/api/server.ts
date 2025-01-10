import http from '@/shared/utils/http'
import { LoginReqBody } from '@/features/auth/schemas'
import type { AuthResponse } from '@/features/auth/types'

const PREFIX = '/authentication/v2'

const authServerApi = {
  loginFromServerToBackend: (body: LoginReqBody) => http.post<AuthResponse>(`${PREFIX}/login`, body),

  refreshTokenFromServerToBackend: (refreshToken: string) =>
    http.post<AuthResponse>(`${PREFIX}/refresh-token`, { refreshToken }),
}

export default authServerApi
