import { useEffect, useState } from 'react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import { OrderStatus } from '@/features/order/types'
import { ORDER_KEY } from '@/features/order/constants'
import orderClientApi from '@/features/order/api/client'

export default function useQueryOrders(status?: OrderStatus) {
  const [isInitialRender, setIsInitialRender] = useState(true)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    return () => {
      queryClient.removeQueries({ queryKey: [ORDER_KEY.ORDERS, status] })
    }
  }, [isInitialRender, queryClient, status])

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => orderClientApi.getOrdersFromBackend({ status, page: pageParam }),
    queryKey: [ORDER_KEY.ORDERS, status],
    getNextPageParam: (lastPage) =>
      lastPage.payload.paginate.nextPage ? String(lastPage.payload.paginate.nextPage) : undefined,
    initialPageParam: '1',
  })
}
