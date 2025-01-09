import http from '@/shared/utils/http'

import type {
  ChangePasswordReqBody,
  ChangePasswordResponse,
  UpdateMeReqBody,
  UserResponse,
} from '@/features/user/types'

const USER_PREFIX = '/users'

const userClientApi = {
  // getUserFromClientToBackend sẽ được gọi từ client compoent
  // nên accessToken đã tự động được thêm vào headers.Authorization
  getUserFromClientToBackend: () => http.get<UserResponse>(USER_PREFIX),

  updateUserFromClientToBackend: (body: UpdateMeReqBody) => http.patch<UserResponse>(USER_PREFIX, body),

  changePasswordFromClientToBackend: (body: ChangePasswordReqBody) =>
    http.post<ChangePasswordResponse>(`${USER_PREFIX}/change-password`, body),
}

export default userClientApi
