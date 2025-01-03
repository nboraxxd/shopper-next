import http from '@/utils/http'
import { UserResponse, RegisterReqBody, UpdateMeReqBody, ChangePasswordReqBody } from '@/types/user.type'
import { MessageResponse } from '@/types'

type MessageExtendResponse = MessageResponse & { success: boolean }

const USER_PREFIX = '/users'

const userApi = {
  // API OF BACKEND SERVER
  registerFromBrowserToBackend: (body: RegisterReqBody) =>
    http.post<MessageExtendResponse>(`${USER_PREFIX}/register`, body),

  resendEmailFromBrowserToBackend: (username: string) =>
    http.post<MessageResponse>(`${USER_PREFIX}/resend-email`, { username }),

  // getUserFromBrowserToBackend sẽ được gọi từ browser
  // nên accessToken đã tự động được thêm vào headers.Authorization http
  getUserFromBrowserToBackend: () => http.get<UserResponse>(USER_PREFIX),

  // getUserFromServerToBackend sẽ được gọi từ Next.js server nên cần tự thêm accessToken vào headers.Authorization
  getUserFromServerToBackend: (accessToken: string) =>
    http.get<UserResponse>(USER_PREFIX, { headers: { Authorization: `Bearer ${accessToken}` } }),

  updateUserFromBrowserToBackend: (body: UpdateMeReqBody) => http.patch<UserResponse>(USER_PREFIX, body),

  changePasswordFromBrowserToBackend: (body: ChangePasswordReqBody) =>
    http.post<MessageExtendResponse>(`${USER_PREFIX}/change-password`, body),

  // API OF NEXT.JS SERVER
}

export default userApi
