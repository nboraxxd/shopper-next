import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import PATH from '@/shared/constants/path'

import { ACCESS_TOKEN } from '@/features/auth/constants'
import { PaymentContent } from '@/features/payment/components/server'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'
import Link from 'next/link'
import { PlusIcon, Svgr } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/ui/skeleton'

export default async function PaymentPage() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  return (
    <AccountSectionWrapper className="h-full">
      <AccountHeader>Thông tin thanh toán</AccountHeader>
      <Link
        href={PATH.ADD_PAYMENT}
        className="mt-3 flex h-20 items-center justify-center gap-3.5 rounded-xl border border-dashed border-secondary-3 md:mt-5"
      >
        <Svgr icon={PlusIcon} />
        <span className="text-sm font-medium">Thêm thẻ mới</span>
      </Link>
      <div className="mt-3 grid grid-cols-1 gap-3 xs:grid-cols-2 md:mt-5 md:grid-cols-3 md:gap-4">
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-44 rounded-xl" />
          ))}
        >
          <PaymentContent accessToken={accessToken} />
        </Suspense>
      </div>
    </AccountSectionWrapper>
  )
}
