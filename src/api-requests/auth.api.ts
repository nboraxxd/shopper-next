import http from '@/utils/http'
import envConfig from '@/constants/config'
import { MessageResponse } from '@/types'
import { AuthResponse, LoginReqBody } from '@/types/auth.type'

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
    http.post<AuthResponse>(`/api/auth/login`, body, { baseUrl: envConfig.NEXT_URL }),

  logoutFromBrowserToServer: () => http.post<MessageResponse>(`/api/auth/logout`, {}, { baseUrl: envConfig.NEXT_URL }),

  async refreshTokenFromBrowserToServer() {
    if (this.refreshTokenFromBrowserToServerRequest) {
      return this.refreshTokenFromBrowserToServerRequest
    }

    this.refreshTokenFromBrowserToServerRequest = http.post<RefreshTokenResponse>(
      `/api/auth/refresh-token`,
      {},
      { baseUrl: envConfig.NEXT_URL }
    )

    const response = await this.refreshTokenFromBrowserToServerRequest

    this.refreshTokenFromBrowserToServerRequest = null
    return response
  },
}

export default authApi
