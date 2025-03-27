import { Metadata } from 'next'
import { Suspense } from 'react'

import { getAccessTokenInServer } from '@/shared/utils/server'

import { OrderHistoryTabs } from '@/features/order/components/client'
import { OrderHistoryTabsWrapper } from '@/features/order/components/server'
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
        <Suspense fallback={<OrderHistoryTabs />}>
          <OrderHistoryTabsWrapper accessToken={accessToken} />
        </Suspense>
      </div>
    </AccountSectionWrapper>
  )
}
