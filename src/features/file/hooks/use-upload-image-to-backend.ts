import { useMutation } from '@tanstack/react-query'

import fileApi from '@/features/file/api/client'

export default function useUploadImageToBackendMutation() {
  return useMutation({
    mutationFn: fileApi.uploadImageToBackend,
  })
}
