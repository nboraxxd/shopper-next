'use client'

import { InfoIcon } from 'lucide-react'
import { lastDayOfMonth } from 'date-fns'

import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogTrigger } from '@/shared/components/ui/dialog'
import { ArrowRightIcon, Svgr, VoucherIcon } from '@/shared/components/icons'
import { PromotionCard, PromotionDialogContent } from '@/features/cart/components/client'

export default function CartPromotion() {
  return (
    <section className="hidden flex-col gap-2 rounded-4xl bg-cart-section px-4 py-7 shadow-section md:flex">
      <div className="flex flex-col gap-0.5 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-sm font-medium">Shopper khuyến mãi</h2>
        <span className="text-xs font-medium text-secondary-2">(có thể chọn 1)</span>
      </div>

      <div className="flex grow flex-col justify-center gap-2">
        {[...Array(2)].map((_, index) => (
          <PromotionCard key={index} wrapperClassname="@container">
            <PromotionCard.Image
              src="/images/shopper.png"
              alt="Shopper khuyến mãi"
              width={60}
              height={60}
              wrapperClassname="!p-2 @[18.5rem]:!p-3"
            />
            <PromotionCard.Content classname="items-center @[18.5rem]:p-3">
              <p className="text-xs font-medium @[18.5rem]:text-sm">Giảm 25%</p>
              <div className="flex items-center gap-2">
                <InfoIcon className="block size-3 text-secondary-2 sm:size-4 lg:hidden" />
                <PromotionCard.Tooltip align="end" sideOffset={15} alignOffset={-100}>
                  <PromotionCard.TooltipCode code="SALE25" />
                  <PromotionCard.TooltipExpirationDate expirationDate={lastDayOfMonth(new Date())} />
                  <PromotionCard.TooltipConditions
                    conditions={[
                      'Giảm 25% giá trị đơn hàng trước thuế.',
                      'Áp dụng cho tất cả sản phẩm.',
                      'Không áp dụng đồng thời với các chương trình khuyến mãi khác.',
                    ]}
                  />
                </PromotionCard.Tooltip>
                <PromotionCard.Button>Áp dụng</PromotionCard.Button>
              </div>
            </PromotionCard.Content>
          </PromotionCard>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="group mt-auto h-auto justify-start gap-1.5 p-0 text-highlight [&_svg]:size-5"
          >
            <Svgr icon={VoucherIcon} />
            <span>Nhập hoặc chọn mã</span>
            <Svgr icon={ArrowRightIcon} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </DialogTrigger>
        <PromotionDialogContent />
      </Dialog>
    </section>
  )
}
