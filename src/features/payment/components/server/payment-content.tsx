import paymentServerApi from '@/features/payment/api/server'
import { PaymentCardListResponse } from '@/features/payment/types'

import { SmileStarIcon } from '@/shared/components/icons'
import { PaymentCard } from '@/features/payment/components/server'
import { PaymentCardProvider } from '@/features/payment/components/client'

export default async function PaymentContent({ accessToken }: { accessToken: string }) {
  let cardList: PaymentCardListResponse['data'] | null = null

  try {
    const response = await paymentServerApi.getPaymentsFromBackend(accessToken)

    cardList = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  if (!cardList) return null

  return cardList.length > 0 ? (
    cardList
      .sort((a, b) => Number(b.default) - Number(a.default))
      .map((card) => (
        <PaymentCardProvider key={card._id}>
          <PaymentCard
            _id={card._id}
            cardName={card.cardName}
            cardNumber={card.cardNumber}
            expired={card.expired}
            type={card.type}
            isDefault={card.default}
            isHasAction={true}
          />
        </PaymentCardProvider>
      ))
  ) : (
    <div className="col-span-full flex h-96 flex-col items-center justify-center gap-2">
      <SmileStarIcon />
      <p className="text-center text-sm leading-relaxed sm:text-base">
        Chưa có thẻ nào, thêm ngay <br /> để mua sắm dễ dàng hơn
      </p>
    </div>
  )
}
