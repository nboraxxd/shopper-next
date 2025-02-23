'use client'

import { InfoIcon, XIcon } from 'lucide-react'
import { format, lastDayOfMonth } from 'date-fns'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/shared/utils'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { PromotionCard, PromotionForm } from '@/features/cart/components/client'

export default function PromotionDialogContent() {
  return (
    <DialogContent
      className={cn(
        'px-0 py-4 sm:max-w-[30rem] sm:py-6',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
      )}
      isCloseIcon={false}
      isDefaultAnimation={false}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <DialogHeader className="space-y-4 px-3 sm:space-y-6 sm:px-6">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-base font-medium">Shopper khuyến mãi</DialogTitle>
          <DialogPrimitive.Close className="rounded-sm opacity-75 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </div>
        <DialogDescription className="sr-only">Nhập hoặc chọn mã giảm giá để nhận ưu đãi từ Shopper</DialogDescription>
        <PromotionForm />
      </DialogHeader>

      <ScrollArea className="mt-4 h-[500px] overflow-y-auto sm:mt-6">
        <div className="space-y-3 p-3 sm:px-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <PromotionCard key={index}>
              <PromotionCard.Image src="/images/shopper.png" alt="Shopper khuyến mãi" width={60} height={60} />
              <PromotionCard.Content>
                <div className="flex flex-col gap-0.5 sm:justify-between">
                  <p className="text-xs font-medium sm:text-base">Giảm 25%</p>
                  <p className="text-[0.625rem] text-secondary-2 sm:text-sm">
                    HSD: <span>{format(lastDayOfMonth(new Date()), 'dd/MM/yyyy')}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <InfoIcon className="block size-3 text-secondary-2 sm:size-4 lg:hidden" />
                  <PromotionCard.Tooltip side="bottom" sideOffset={10} align="end" alignOffset={-25}>
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
      </ScrollArea>
      <DialogFooter className="mt-4 px-2 sm:mt-6 sm:px-6">
        <DialogPrimitive.Close asChild>
          <Button className="h-9 w-full sm:h-11">Xong</Button>
        </DialogPrimitive.Close>
      </DialogFooter>
    </DialogContent>
  )
}
