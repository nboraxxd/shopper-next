import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import { PaymentsResponse } from '@/features/payment/types'
import paymentServerApi from '@/features/payment/api/server'

import { PlusIcon, Svgr } from '@/shared/components/icons'
import { PaymentCard } from '@/features/payment/components'
import { Skeleton } from '@/shared/components/ui/skeleton'

export async function AccountPaymentContent() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  let payments: PaymentsResponse['data'] | null = null

  try {
    const response = await paymentServerApi.getPaymentsFromBackend(accessToken)

    const defaultPayment = response.payload.data.find((payment) => payment.default === true)

    const otherPayments = response.payload.data.filter((payment) => payment.default === false)

    payments = defaultPayment ? [defaultPayment, ...otherPayments] : response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return payments ? (
    <>
      {payments.slice(0, 3).map((payment) => (
        <PaymentCard
          key={payment._id}
          _id={payment._id}
          cardName={payment.cardName}
          cardNumber={payment.cardNumber}
          expired={payment.expired}
          type={payment.type}
          className={cn({
            'last-of-type:hidden second-last-of-type:hidden xs:last-of-type:flex xs:second-last-of-type:flex md:last-of-type:hidden':
              payments.length >= 3,
            'last-of-type:hidden md:last-of-type:flex': payments.length === 2,
          })}
        />
      ))}
      <Link
        href={PATH.ADD_PAYMENT}
        className="flex min-h-44 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-secondary-3"
      >
        <Svgr icon={PlusIcon} />
        <span className="text-sm font-medium">Thêm thẻ</span>
      </Link>
    </>
  ) : null
}

export function AccountPaymentSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <Skeleton
      key={index}
      className={cn(
        'h-44 rounded-xl',
        'last-of-type:hidden second-last-of-type:hidden',
        'md:second-last-of-type:block'
      )}
    />
  ))
}
