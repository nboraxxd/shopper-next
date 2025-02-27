import http from '@/shared/utils/http'

import type { MessageResponse } from '@/shared/types'
import envVariables from '@/shared/schemas/env-variables.schema'
import { ForgotPasswordReqBody, LoginReqBody, RegisterReqBody, ResetPasswordReqBody } from '@/features/auth/schemas'
import type { AuthResponse, RefreshTokenResponse, RegisterResponse } from '@/features/auth/types'

const SERVER_PREFIX = '/api/auth'
const BACKEND_PREFIX = '/users'

const authClientApi = {
  registerUserToBackend: (body: RegisterReqBody) => http.post<RegisterResponse>(`${BACKEND_PREFIX}/register`, body),

  resendVerificationEmailToBackend: (username: string) =>
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

  loginByCodeToServer(code: string) {
    return http.post<AuthResponse>(
      `${SERVER_PREFIX}/login-by-code`,
      { code },
      { baseUrl: envVariables.NEXT_PUBLIC_URL }
    )
  },

  // Function để gửi request đến backend server
  // Để gửi email với URL chứa mã code để đặt lại mật khẩu
  forgotPasswordToBackend: (body: ForgotPasswordReqBody) =>
    http.post<MessageResponse>(`${BACKEND_PREFIX}/reset-password`, body),

  // Function để gửi request đến Next.js server
  // Từ đó, Next.js server sẽ gửi request đến backend server
  // Để thực hiện đặt lại mật khẩu cho user
  // Nó cùng tên với function ở trên vì backend server đã quy định endpoint đó trước
  resetPasswordToServer: (body: ResetPasswordReqBody) =>
    http.post<MessageResponse>(`${SERVER_PREFIX}/reset-password`, body, { baseUrl: envVariables.NEXT_PUBLIC_URL }),
}

export default authClientApi
