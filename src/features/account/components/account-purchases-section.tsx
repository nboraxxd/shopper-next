import { AccountSectionWrapper } from '@/features/account/components'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import orderServerApi from '@/features/order/api/server'
import { OrderCount } from '@/features/order/types'
import PATH from '@/shared/constants/path'
import { WalletIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AccountPurchasesSection() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  let pendingCount: OrderCount['count'] | null = null
  let confirmCount: OrderCount['count'] | null = null
  let shippingCount: OrderCount['count'] | null = null
  let finishedCount: OrderCount['count'] | null = null

  try {
    const [pendingCountResponse, confirmCountResponse, shippingCountResponse, finishedCountResponse] =
      await Promise.all([
        orderServerApi.getOrderCountFromBackend(accessToken, 'pending'),
        orderServerApi.getOrderCountFromBackend(accessToken, 'confirm'),
        orderServerApi.getOrderCountFromBackend(accessToken, 'shipping'),
        orderServerApi.getOrderCountFromBackend(accessToken, 'finished'),
      ])

    pendingCount = pendingCountResponse.payload.count
    confirmCount = confirmCountResponse.payload.count
    shippingCount = shippingCountResponse.payload.count
    finishedCount = finishedCountResponse.payload.count
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <AccountSectionWrapper title="Đơn mua" className="mt-7">
      <ul className="grid grid-cols-4">
        <li className="relative">
          <Link href={PATH.PURCHASE} className="flex flex-col items-center">
            <WalletIcon className="size-6" />
            <span>Chờ xác nhận</span>
            <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-lg bg-red-500 px-1 py-0.5">
              {pendingCount}
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href={PATH.PURCHASE} className="flex flex-col items-center">
            <WalletIcon className="size-6" />
            <span>Đang xử lý</span>
            <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-lg bg-red-500 px-1 py-0.5">
              {confirmCount}
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href={PATH.PURCHASE} className="flex flex-col items-center">
            <WalletIcon className="size-6" />
            <span>Đang giao</span>
            <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-lg bg-red-500 px-1 py-0.5">
              {shippingCount}
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href={PATH.PURCHASE} className="flex flex-col items-center">
            <WalletIcon className="size-6" />
            <span>Đã giao</span>
            <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-lg bg-red-500 px-1 py-0.5">
              {finishedCount}
            </span>
          </Link>
        </li>
      </ul>
    </AccountSectionWrapper>
  )
}
