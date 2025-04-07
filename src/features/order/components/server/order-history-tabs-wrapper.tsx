import orderServerApi from '@/features/order/api/server'
import { ORDER_STATUS } from '@/features/order/constants'
import { OrderCountResponse } from '@/features/order/types'
import { OrderHistoryTabs } from '@/features/order/components/client'

const ORDER_STATUSES = [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRM, ORDER_STATUS.SHIPPING] as const

export default async function OrderHistoryTabsWrapper({ accessToken }: { accessToken: string }) {
  const orderCounts: Record<(typeof ORDER_STATUSES)[number], OrderCountResponse['count'] | null> = {
    pending: null,
    confirm: null,
    shipping: null,
  }

  try {
    const responses = await Promise.all(
      ORDER_STATUSES.map((status) => orderServerApi.getOrderCountFromBackend(accessToken, status))
    )

    responses.forEach((response, index) => {
      orderCounts[ORDER_STATUSES[index]] = response.payload.count
    })
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return <OrderHistoryTabs orderCounts={orderCounts} />
}
