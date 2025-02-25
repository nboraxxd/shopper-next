import http from '@/shared/utils/http'

import type { MessageResponse } from '@/shared/types'
import envVariables from '@/shared/schemas/env-variables.schema'
import { LoginReqBody, RegisterReqBody } from '@/features/auth/schemas'
import type { AuthResponse, RefreshTokenResponse, RegisterResponse } from '@/features/auth/types'

const SERVER_PREFIX = '/api/auth'
const BACKEND_PREFIX = '/users'

const authClientApi = {
  registerUserToBackend: (body: RegisterReqBody) => http.post<RegisterResponse>(`${BACKEND_PREFIX}/register`, body),

  resendEmailRegisterToBackend: (username: string) =>
    http.post<MessageResponse>(`${BACKEND_PREFIX}/resend-email`, { username }),

  loginToServer: (body: LoginReqBody) =>
    http.post<AuthResponse>(`${SERVER_PREFIX}/login`, body, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  logoutToServer: () =>
    http.post<MessageResponse>(`${SERVER_PREFIX}/logout`, {}, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  refreshTokenToServer() {
    return http.post<RefreshTokenResponse>(
      `${SERVER_PREFIX}/refresh-token`,
      {},
      { baseUrl: envVariables.NEXT_PUBLIC_URL }
    )
  },
}

export default authClientApi
