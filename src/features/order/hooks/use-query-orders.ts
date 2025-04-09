import { useInfiniteQuery } from '@tanstack/react-query'

import orderClientApi from '@/features/order/api/client'
import { ORDER_KEY } from '@/features/order/constants'
import { OrderStatus } from '@/features/order/types'

export default function useQueryOrders(status?: OrderStatus) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => orderClientApi.getOrdersFromBackend({ status, page: pageParam }),
    queryKey: [ORDER_KEY.ORDERS, status],
    getNextPageParam: (lastPage) =>
      lastPage.payload.paginate.nextPage ? String(lastPage.payload.paginate.nextPage) : undefined,
    initialPageParam: '1',
  })
}
