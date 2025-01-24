import http from '@/shared/utils/http'
import { LoginReqBody } from '@/features/auth/schemas'
import type { AuthResponse } from '@/features/auth/types'

const PREFIX = '/authentication/v2'

const authServerApi = {
  loginToBackend: (body: LoginReqBody) => http.post<AuthResponse>(`${PREFIX}/login`, body),

  refreshTokenToBackend: (refreshToken: string) => http.post<AuthResponse>(`${PREFIX}/refresh-token`, { refreshToken }),
}

export default authServerApi
