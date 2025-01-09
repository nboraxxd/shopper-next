import http from '@/shared/utils/http'
import type { UploadImageResponse } from '@/features/file/types'

const PREFIX = '/file'

const fileApi = {
  uploadImageFromClientToBackend: (body: FormData) => http.post<UploadImageResponse>(`${PREFIX}`, body),
}

export default fileApi
