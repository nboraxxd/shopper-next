import http from '@/shared/utils/http'

import type { MessageResponse } from '@/shared/types'
import envVariables from '@/shared/schemas/env-variables.schema'
import type {
  AuthResponse,
  LoginReqBody,
  RefreshTokenResponse,
  RegisterReqBody,
  RegisterResponse,
} from '@/features/auth/types'

const AUTH_PREFIX = '/api/auth'
const USER_PREFIX = '/users'

const authClientApi = {
  refreshTokenFromClientToServerRequest: null as Promise<{ status: number; payload: RefreshTokenResponse }> | null,

  registerFromClientToBackend: (body: RegisterReqBody) => http.post<RegisterResponse>(`${USER_PREFIX}/register`, body),

  resendEmailFromClientToBackend: (username: string) =>
    http.post<MessageResponse>(`${USER_PREFIX}/resend-email`, { username }),

  loginFromClientToServer: (body: LoginReqBody) =>
    http.post<AuthResponse>(`${AUTH_PREFIX}/login`, body, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  logoutFromClientToServer: () =>
    http.post<MessageResponse>(`${AUTH_PREFIX}/logout`, {}, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  async refreshTokenFromClientToServer() {
    if (this.refreshTokenFromClientToServerRequest) {
      return this.refreshTokenFromClientToServerRequest
    }

    this.refreshTokenFromClientToServerRequest = http.post<RefreshTokenResponse>(
      `${AUTH_PREFIX}/refresh-token`,
      {},
      { baseUrl: envVariables.NEXT_PUBLIC_URL }
    )

    const response = await this.refreshTokenFromClientToServerRequest

    this.refreshTokenFromClientToServerRequest = null
    return response
  },
}

export default authClientApi
