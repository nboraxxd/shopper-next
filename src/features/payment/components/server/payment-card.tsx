import Image from 'next/image'
import { BadgeCheckIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { PaymentCardType } from '@/features/payment/types'

import { CreditCardIcon, LeafIcon, PayPalIcon, PlaneIcon } from '@/shared/components/icons'
import { PaymentCardDropdown, PaymentCardOverlay } from '@/features/payment/components/client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'

interface Props {
  _id: string
  cardName: string
  cardNumber: string
  expired: string
  type: PaymentCardType
  isDefault?: boolean
  isHasAction?: boolean
  className?: string
}

export default function PaymentCard({
  _id,
  cardName,
  cardNumber,
  expired,
  type,
  isDefault = false,
  isHasAction = false,
  className,
}: Props) {
  const maskCardNumber = '**** **** **** ' + cardNumber.slice(-4)

  return (
    <div
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

      <div className="mt-9 flex text-lg font-medium">
        <span>{maskCardNumber}</span>

        {isDefault ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="ml-2 mt-1 hidden size-4 text-primary-yellow shadow-md lg:block">
                  <BadgeCheckIcon />
                </TooltipTrigger>
                <TooltipContent className="bg-background text-foreground">Thẻ mặc định</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <BadgeCheckIcon className="ml-1 mt-1 size-4 text-primary-yellow shadow-md lg:hidden" />
          </>
        ) : null}
      </div>

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

      {isHasAction ? <PaymentCardDropdown id={_id} isDefault={isDefault} /> : null}

      <PaymentCardOverlay />
    </div>
  )
}
