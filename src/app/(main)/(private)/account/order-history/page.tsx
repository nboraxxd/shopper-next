import { Metadata } from 'next'
import { Suspense } from 'react'

import { getAccessTokenInServer } from '@/shared/utils/server'

import { OrderItem, OrderTabs } from '@/features/order/components/client'
import { OrderTabsWrapper } from '@/features/order/components/server'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export const metadata: Metadata = {
  title: 'Đơn mua',
}

export default async function OrderHistoryPage() {
  const accessToken = await getAccessTokenInServer()

  return (
    <AccountSectionWrapper className="h-full">
      <AccountHeader>Đơn mua</AccountHeader>

      <div className="mt-1 md:mt-3">
        <Suspense fallback={<OrderTabs />}>
          <OrderTabsWrapper accessToken={accessToken} />
        </Suspense>
      </div>

      <div className="mt-3 md:mt-5">
        <OrderItem />
      </div>
    </AccountSectionWrapper>
  )
}
