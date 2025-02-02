import http from '@/shared/utils/http'
import type { UploadImageResponse } from '@/features/file/types'

const PREFIX = '/file'

const fileApi = {
  uploadImageToBackend: (body: FormData) => http.post<UploadImageResponse>(`${PREFIX}`, body),
}

export default fileApi
