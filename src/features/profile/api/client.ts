import http from '@/shared/utils/http'

import type { ChangePasswordResponse, ProfileResponse } from '@/features/profile/types'
import { ChangePasswordReqBody, UpdateProfileReqBody } from '@/features/profile/schemas'

const PREFIX = '/users'

const profileClientApi = {
  // getProfileFromBackend sẽ được gọi từ client compoent
  // nên accessToken đã tự động được thêm vào headers.Authorization
  getProfileFromBackend: () => http.get<ProfileResponse>(PREFIX),

  updateProfileToBackend: (body: UpdateProfileReqBody) => http.patch<ProfileResponse>(PREFIX, body),

  changePasswordToBackend: (body: ChangePasswordReqBody) =>
    http.post<ChangePasswordResponse>(`${PREFIX}/change-password`, body),
}

export default profileClientApi
