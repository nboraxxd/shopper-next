import { CreditCardIcon, LeafIcon, PayPalIcon, PlaneIcon } from '@/shared/components/icons'
import { cn } from '@/shared/utils'
import Image from 'next/image'

interface Props {
  _id: string
  cardName: string
  cardNumber: string
  expired: string
  type: 'card' | 'paypall'
}

export default function PaymentCard({ _id, cardName, cardNumber, expired, type }: Props) {
  const maskCardNumber = '**** **** **** ' + cardNumber.slice(-4)

  return (
    <article
      key={_id}
      className={cn(
        'relative z-0 hidden select-none rounded-xl px-3 py-5 text-light-1 first-of-type:block xs:block md:last-of-type:hidden xl:px-5',
        type === 'card' ? 'bg-[#1e2e69]' : 'bg-[#354151]'
      )}
    >
      <Image
        src={type === 'card' ? '/images/payment/plane-bg.svg' : '/images/payment/leaf-bg.svg'}
        alt="plane background"
        width={137}
        height={137}
        className="pointer-events-none absolute right-0 top-0 -z-10"
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
          <p className="text-[0.5rem]">Tên chủ thẻ</p>
          <p className="line-clamp-1 text-[0.625rem]">{cardName}</p>
        </div>
        <div className="basis-1/3">
          <p className="text-[0.5rem]">Hết hạn</p>
          <p className="text-[0.625rem]">{expired}</p>
        </div>
      </div>
    </article>
  )
}
