import http from '@/shared/utils/http'

import type {
  ChangePasswordReqBody,
  ChangePasswordResponse,
  UpdateMeReqBody,
  UserResponse,
} from '@/features/user/types'

const USER_PREFIX = '/users'

const userClientApi = {
  // getUserFromBackend sẽ được gọi từ client compoent
  // nên accessToken đã tự động được thêm vào headers.Authorization
  getUserFromBackend: () => http.get<UserResponse>(USER_PREFIX),

  updateUserToBackend: (body: UpdateMeReqBody) => http.patch<UserResponse>(USER_PREFIX, body),

  changePasswordToBackend: (body: ChangePasswordReqBody) =>
    http.post<ChangePasswordResponse>(`${USER_PREFIX}/change-password`, body),
}

export default userClientApi
