'use client'

import { CheckIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { useCurrentPromotion } from '@/features/cart/hooks'

import { Button } from '@/shared/components/ui/button'
import { DialogTrigger } from '@/shared/components/ui/dialog'
import PromoDialog from '@/features/promotion/components/client/promo-dialog'
import { ArrowRightIcon, Svgr, VoucherIcon } from '@/shared/components/icons'

export default function PromoTrigger({ className }: { className?: string }) {
  const currentPromotion = useCurrentPromotion((state) => state.currentPromotion)

  return (
    <div className={cn('grid grid-cols-2', className)}>
      <div className="col-span-2 col-start-1 flex items-center justify-between gap-2 lg:col-start-2">
        <h2 className="flex items-center gap-2 text-sm font-medium">
          <div className="relative">
            <Svgr icon={VoucherIcon} className="size-5 text-highlight" />
            {currentPromotion ? (
              <Svgr
                icon={CheckIcon}
                className="absolute -right-0.5 bottom-0 size-2.5 rounded-full bg-highlight text-white"
              />
            ) : null}
          </div>
          {currentPromotion ? (
            <>
              <span className="hidden sm:inline-block">{currentPromotion.title}</span>
              <span className="sm:hidden">{currentPromotion.code}</span>
            </>
          ) : (
            <span className="hidden sm:inline-block">Shopper khuyến mãi</span>
          )}
        </h2>
        <PromoDialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="group h-auto justify-start gap-0.5 p-0 text-sm text-highlight [&_svg]:size-4"
            >
              <span>Nhập hoặc chọn mã</span>
              <Svgr icon={ArrowRightIcon} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </DialogTrigger>
        </PromoDialog>
      </div>
    </div>
  )
}
