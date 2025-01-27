import Image from 'next/image'

import { cn } from '@/shared/utils'
import { PaymentType } from '@/features/payment/types'

import { CreditCardIcon, LeafIcon, PayPalIcon, PlaneIcon } from '@/shared/components/icons'

interface Props {
  _id: string
  cardName: string
  cardNumber: string
  expired: string
  type: PaymentType
  className?: string
}

export default function PaymentCard({ _id, cardName, cardNumber, expired, type, className }: Props) {
  const maskCardNumber = '**** **** **** ' + cardNumber.slice(-4)

  return (
    <div
      key={_id}
      className={cn(
        'relative z-0 flex min-h-44 select-none flex-col justify-center overflow-hidden rounded-xl p-3 text-light-1 xl:p-5',
        type === 'card' ? 'bg-[#1e2e69]' : 'bg-[#354151]',
        className
      )}
    >
      <Image
        src={type === 'card' ? '/images/payment/plane-bg.svg' : '/images/payment/leaf-bg.svg'}
        alt={type === 'card' ? 'plane background' : 'leaf background'}
        width={137}
        height={137}
        priority
        className="pointer-events-none absolute right-0 top-0 -z-10 size-auto"
      />

      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1">
          {type === 'card' ? <PlaneIcon /> : <LeafIcon />}
          <span className="text-sm font-medium">{type === 'card' ? 'Thẻ tín dụng' : 'PayPal'}</span>
        </div>
        {type === 'card' ? <CreditCardIcon /> : <PayPalIcon className="size-7" width={28} height={28} />}
      </div>

      <div className="mt-9 text-lg font-medium">{maskCardNumber}</div>

      <div className="mt-5 flex items-center gap-2 font-medium">
        <div className="basis-2/3">
          <p className="text-[0.5rem]">Chủ thẻ</p>
          <p className="line-clamp-1 text-[0.625rem]">{cardName}</p>
        </div>
        <div className="basis-1/3">
          <p className="text-[0.5rem]">Hết hạn</p>
          <p className="text-[0.625rem]">{expired}</p>
        </div>
      </div>
    </div>
  )
}
