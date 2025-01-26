import Link from 'next/link'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import paymentServerApi from '@/features/payment/api/server'
import { PaymentCard } from '@/features/payment/component'
import { PaymentsResponse } from '@/features/payment/types'
import { PlusIcon } from '@/shared/components/icons'
import PATH from '@/shared/constants/path'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Skeleton } from '@/shared/components/ui/skeleton'
import AccountSectionWrapper from '@/features/account/components/account-section-wrapper'

export async function AccountPaymentSection() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  let payments: PaymentsResponse['data'] | null = null

  try {
    const response = await paymentServerApi.getPaymentsFromBackend(accessToken)

    payments = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return payments ? (
    <AccountSectionWrapper title="Thẻ thanh toán">
      <div className="mt-4 grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 md:gap-5">
        {payments.slice(0, 3).map((payment) => (
          <PaymentCard
            key={payment._id}
            _id={payment._id}
            cardName={payment.cardName}
            cardNumber={payment.cardNumber}
            expired={payment.expired}
            type={payment.type}
          />
        ))}
        <Link
          href={PATH.ADD_PAYMENT}
          className="flex min-h-44 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-secondary-3"
        >
          <PlusIcon width={24} height={24} strokeWidth={1.5} />
          <span className="text-sm font-medium">Thêm thẻ</span>
        </Link>
      </div>
    </AccountSectionWrapper>
  ) : null
}

export function AccountPaymentSkeleton() {
  return (
    <AccountSectionWrapper title="Thẻ thanh toán">
      <div className="mt-4 grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 md:gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="hidden h-44 rounded-xl first:block last:block xs:block md:last:hidden" />
        ))}
      </div>
    </AccountSectionWrapper>
  )
}
