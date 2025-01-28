import http from '@/shared/utils/http'

import type {
  ChangePasswordReqBody,
  ChangePasswordResponse,
  UpdateProfileReqBody,
  ProfileResponse,
} from '@/features/profile/types'

const PREFIX = '/users'

const profileClientApi = {
  // getUserFromBackend sẽ được gọi từ client compoent
  // nên accessToken đã tự động được thêm vào headers.Authorization
  getProfileFromBackend: () => http.get<ProfileResponse>(PREFIX),

  updateProfileToBackend: (body: UpdateProfileReqBody) => http.patch<ProfileResponse>(PREFIX, body),

  changePasswordToBackend: (body: ChangePasswordReqBody) =>
    http.post<ChangePasswordResponse>(`${PREFIX}/change-password`, body),
}

export default profileClientApi
