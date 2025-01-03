import http from '@/utils/http'
import { UploadImageResponse } from '@/types/file.type'

const FILE_PREFIX = '/file'

const fileApi = {
  // API OF BACKEND SERVER
  uploadImageFromBrowserToBackend: (body: FormData) => http.post<UploadImageResponse>(`${FILE_PREFIX}`, body),
}

export default fileApi
