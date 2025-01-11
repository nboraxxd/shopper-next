import http from '@/shared/utils/http'

import type { MessageResponse } from '@/shared/types'
import { LoginReqBody } from '@/features/auth/schemas'
import envVariables from '@/shared/schemas/env-variables.schema'
import type { AuthResponse, RefreshTokenResponse, RegisterReqBody, RegisterResponse } from '@/features/auth/types'

const AUTH_SERVER_PREFIX = '/api/auth'
const USER_BACKEND_PREFIX = '/users'

const authClientApi = {
  refreshTokenToServerRequest: null as Promise<{ status: number; payload: RefreshTokenResponse }> | null,

  registerUserToBackend: (body: RegisterReqBody) =>
    http.post<RegisterResponse>(`${USER_BACKEND_PREFIX}/register`, body),

  resendEmailToBackend: (username: string) =>
    http.post<MessageResponse>(`${USER_BACKEND_PREFIX}/resend-email`, { username }),

  loginToServer: (body: LoginReqBody) =>
    http.post<AuthResponse>(`${AUTH_SERVER_PREFIX}/login`, body, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  logoutToServer: () =>
    http.post<MessageResponse>(`${AUTH_SERVER_PREFIX}/logout`, {}, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  async refreshTokenToServer() {
    if (this.refreshTokenToServerRequest) {
      return this.refreshTokenToServerRequest
    }

    this.refreshTokenToServerRequest = http.post<RefreshTokenResponse>(
      `${AUTH_SERVER_PREFIX}/refresh-token`,
      {},
      { baseUrl: envVariables.NEXT_PUBLIC_URL }
    )

    const response = await this.refreshTokenToServerRequest

    this.refreshTokenToServerRequest = null
    return response
  },
}

export default authClientApi
