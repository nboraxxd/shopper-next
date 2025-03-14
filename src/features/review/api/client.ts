import http from '@/shared/utils/http'

import { ReviewsResponse } from '@/features/review/types'

const PREFIX = '/review'

export const reviewClientApi = {
  getReviewsByProductIdFromBackend: (productId: number) => http.get<ReviewsResponse>(`${PREFIX}/${productId}`),
}
