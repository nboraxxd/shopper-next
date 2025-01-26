import Link from 'next/link'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import paymentServerApi from '@/features/payment/api/server'
import { PaymentCard } from '@/features/payment/component'
import { PaymentsResponse } from '@/features/payment/types'
import { PlusIcon } from '@/shared/components/icons'
import PATH from '@/shared/constants/path'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AccountPaymentSection() {
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
    <section>
      <h2 className="text-lg font-medium">Thẻ thanh toán</h2>
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
          <span className="text-sm font-medium">Thêm thẻ mới</span>
        </Link>
      </div>
    </section>
  ) : null
}
