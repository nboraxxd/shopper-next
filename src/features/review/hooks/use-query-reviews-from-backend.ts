import { useQuery } from '@tanstack/react-query'

import { REVIEW_KEY } from '@/features/review/constants'
import { reviewClientApi } from '@/features/review/api/client'

export default function useQueryReviewsFromBackend(productId: string, enabled = true) {
  return useQuery({
    queryFn: () => reviewClientApi.getReviewsByProductIdFromBackend(productId),
    queryKey: [REVIEW_KEY.REVIEWS_BY_PRODUCT, productId],
    enabled,
  })
}
