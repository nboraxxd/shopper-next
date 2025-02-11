import Link from 'next/link'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { PaymentCardListResponse } from '@/features/payment/types'
import paymentServerApi from '@/features/payment/api/server'

import { PlusIcon, Svgr } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { PaymentCard } from '@/features/payment/components/server'

export async function AccountPaymentContent({ accessToken }: { accessToken: string }) {
  let cardList: PaymentCardListResponse['data'] | null = null

  try {
    const response = await paymentServerApi.getPaymentsFromBackend(accessToken)

    cardList = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return cardList ? (
    <>
      {cardList
        .sort((a, b) => Number(b.default) - Number(a.default))
        .slice(0, 3)
        .map((card) => (
          <PaymentCard
            key={card._id}
            _id={card._id}
            cardName={card.cardName}
            cardNumber={card.cardNumber}
            expired={card.expired}
            type={card.type}
            isDefault={card.default}
            className={cn({
              'last-of-type:hidden second-last-of-type:hidden xs:last-of-type:flex xs:second-last-of-type:flex md:last-of-type:hidden':
                cardList.length >= 3,
              'last-of-type:hidden md:last-of-type:flex': cardList.length === 2,
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
