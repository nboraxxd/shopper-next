import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import { OrderDetailContent } from '@/features/order/components/server'
import PATH from '@/shared/constants/path'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Chi tiết đơn hàng',
}

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, cookieStore] = await Promise.all([params, cookies()])

  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  return (
    <AccountSectionWrapper className="h-full">
      <AccountHeader returnLabel="Quay lại trang đơn mua" prevPath={PATH.ORDER_HISTORY}>
        Chi tiết đơn hàng
      </AccountHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderDetailContent id={id} accessToken={accessToken} />
      </Suspense>
    </AccountSectionWrapper>
  )
}
