import { ACCESS_TOKEN } from '@/features/auth/constants'
import paymentServerApi from '@/features/payment/api/server'
import { PaymentsResponse } from '@/features/payment/types'
import { CreditCardIcon, PayPalIcon, PlaneIcon } from '@/shared/components/icons'
import PATH from '@/shared/constants/path'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AccountPaymentSection() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/login')

  let payments: PaymentsResponse['data'] | null = null

  try {
    const response = await paymentServerApi.getPaymentsFromBackend(accessToken)

    payments = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }
  console.log('🔥 ~ AccountPaymentSection ~ payments:', payments)

  return payments ? (
    <section>
      <h2 className="text-lg font-medium">Thẻ thanh toán</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 md:gap-5">
        {payments.slice(0, 3).map((payment) => {
          const maskCardNumber = '**** **** **** ' + payment.cardNumber.slice(-4)

          return (
            <article
              key={payment._id}
              className="relative z-0 hidden select-none rounded-xl bg-[#1e2e69] px-3 py-5 text-light-1 first-of-type:block xs:block md:last-of-type:hidden xl:px-5"
            >
              <Image
                src="/images/payment/plane-bg.svg"
                alt="plane background"
                width={137}
                height={137}
                className="pointer-events-none absolute right-0 top-0 -z-10"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <PlaneIcon />
                  <span className="text-sm font-medium">{payment.type === 'card' ? 'Thẻ thanh toán' : 'PayPal'}</span>
                </div>
                {payment.type === 'card' ? (
                  <CreditCardIcon />
                ) : (
                  <PayPalIcon className="size-7" width={28} height={28} />
                )}
              </div>

              <div className="mt-9 text-lg font-medium">{maskCardNumber}</div>

              <div className="mt-5 flex items-center gap-2 font-medium">
                <div className="basis-2/3">
                  <p className="text-[0.5rem]">Tên chủ thẻ</p>
                  <p className="line-clamp-1 text-[0.625rem]">{payment.cardName}</p>
                </div>
                <div className="basis-1/3">
                  <p className="text-[0.5rem]">Hết hạn</p>
                  <p className="text-[0.625rem]">{payment.expired}</p>
                </div>
              </div>
            </article>
          )
        })}

        <Link
          href={PATH.PAYMENT}
          className="flex min-h-44 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-foreground"
        >
          <CreditCardIcon />
          <span className="text-sm font-medium">Thêm thẻ mới</span>
        </Link>
      </div>
    </section>
  ) : null
}
