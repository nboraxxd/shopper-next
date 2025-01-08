import http from '@/utils/http'

import { MessageResponse } from '@/types'
import { AuthResponse, LoginReqBody } from '@/types/auth.type'
import envVariables from '@/schemas/env-variables.schema'

type RefreshTokenResponse = {
  data: Pick<AuthResponse['data'], 'accessToken'>
}

const AUTH_PREFIX = '/authentication/v2'

const authApi = {
  refreshTokenFromBrowserToServerRequest: null as Promise<{ status: number; payload: RefreshTokenResponse }> | null,

  // API OF BACKEND SERVER
  loginFromServerToBackend: (body: LoginReqBody) => http.post<AuthResponse>(`${AUTH_PREFIX}/login`, body),

  refreshTokenFromServerToBackend: (refreshToken: string) =>
    http.post<AuthResponse>(`${AUTH_PREFIX}/refresh-token`, { refreshToken }),

  // API OF NEXT.JS SERVER
  loginFromBrowserToServer: (body: LoginReqBody) =>
    http.post<AuthResponse>(`/api/auth/login`, body, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  logoutFromBrowserToServer: () =>
    http.post<MessageResponse>(`/api/auth/logout`, {}, { baseUrl: envVariables.NEXT_PUBLIC_URL }),

  async refreshTokenFromBrowserToServer() {
    if (this.refreshTokenFromBrowserToServerRequest) {
      return this.refreshTokenFromBrowserToServerRequest
    }

    this.refreshTokenFromBrowserToServerRequest = http.post<RefreshTokenResponse>(
      `/api/auth/refresh-token`,
      {},
      { baseUrl: envVariables.NEXT_PUBLIC_URL }
    )

    const response = await this.refreshTokenFromBrowserToServerRequest

    this.refreshTokenFromBrowserToServerRequest = null
    return response
  },
}

export default authApi
