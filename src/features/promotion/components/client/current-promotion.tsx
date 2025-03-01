'use client'

import { InfoIcon } from 'lucide-react'

import {
  PromotionButton,
  PromotionCard,
  PromotionContent,
  PromotionImage,
  PromotionTooltip,
  PromotionTooltipCode,
  PromotionTooltipConditions,
  PromotionTooltipExpirationDate,
} from '@/features/promotion/components/client'
import { useCurrentPromotion } from '@/features/cart/hooks'

export default function CurrentPromotion() {
  const currentPromotion = useCurrentPromotion((state) => state.currentPromotion)
  const setCurrentPromotion = useCurrentPromotion((state) => state.setCurrentPromotion)

  return currentPromotion ? (
    <PromotionCard wrapperClassname="@container">
      <PromotionImage
        src={currentPromotion.image}
        alt={currentPromotion.title}
        width={60}
        height={60}
        wrapperClassname="!p-2 @[18.5rem]:!p-3"
      />
      <PromotionContent classname="items-center @[18.5rem]:p-3">
        <p className="text-xs font-medium @[18.5rem]:text-sm">{currentPromotion.code}</p>
        <div className="flex items-center gap-2">
          <InfoIcon className="block size-3 text-secondary-2 sm:size-4 lg:hidden" />
          <PromotionTooltip align="end" sideOffset={15} alignOffset={-100}>
            <PromotionTooltipCode code={currentPromotion.code} />
            <PromotionTooltipExpirationDate expirationDate={new Date(currentPromotion.exp)} />
            <PromotionTooltipConditions conditions={currentPromotion.conditions} />
          </PromotionTooltip>
          <PromotionButton onClick={() => setCurrentPromotion(null)}>Bỏ chọn</PromotionButton>
        </div>
      </PromotionContent>
    </PromotionCard>
  ) : (
    <PromotionCard wrapperClassname="@container">
      <PromotionImage
        priority
        src="/images/promotion/promo-default.png"
        alt="Chưa chọn mã giảm giá"
        width={60}
        height={60}
        wrapperClassname="!p-2 @[18.5rem]:!p-3"
        className="rotate-12"
      />
      <PromotionContent classname="items-center @[18.5rem]:p-3">
        <p className="text-sm font-medium">Bạn chưa chọn mã giảm giá.</p>
      </PromotionContent>
    </PromotionCard>
  )
}
