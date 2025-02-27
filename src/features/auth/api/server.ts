import http from '@/shared/utils/http'
import type { AuthResponse } from '@/features/auth/types'
import { LoginReqBody, ResetPasswordReqBody } from '@/features/auth/schemas'

const AUTH_PREFIX = '/authentication/v2'
const USERS_PREFIX = '/users'

const authServerApi = {
  loginToBackend: (body: LoginReqBody) => http.post<AuthResponse>(`${AUTH_PREFIX}/login`, body),

  loginByCodeToBackend: (code: string) => http.post<AuthResponse>(`${AUTH_PREFIX}/login-by-code`, { code }),

  refreshTokenToBackend: (refreshToken: string) =>
    http.post<AuthResponse>(`${AUTH_PREFIX}/refresh-token`, { refreshToken }),

  resetPasswordToBackend: (body: ResetPasswordReqBody) =>
    http.post<AuthResponse>(`${USERS_PREFIX}/change-password-by-code`, body),
}

export default authServerApi
