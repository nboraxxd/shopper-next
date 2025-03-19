'use client'

import { cn, formatCurrency, formatVietnameseDate } from '@/shared/utils'
import { useQueryShippingMethod } from '@/features/shipping/hooks'

import { Label } from '@/shared/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { useCheckoutShippingMethodStore } from '@/features/checkout/hooks'
import { useState } from 'react'
import { extractShippingDays } from '@/features/shipping/utils'
import { ShippingTruckIcon, Svgr } from '@/shared/components/icons'
import { addDays, format } from 'date-fns'
import { CheckIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export default function ShippingMethodDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const queryShippingMethod = useQueryShippingMethod(isOpen)
  const { checkoutShippingMethod, setCheckoutShippingMethod } = useCheckoutShippingMethodStore()

  const [selectedShippingMethod, setSelectedShippingMethod] = useState(checkoutShippingMethod)

  function handleClick() {
    setCheckoutShippingMethod(selectedShippingMethod)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ButtonWithRefreshTokenState
          variant="ghost"
          className="h-auto w-fit px-1.5 py-0 text-xs text-highlight xs:px-3 xs:text-sm"
        >
          Thay đổi
        </ButtonWithRefreshTokenState>
      </DialogTrigger>
      <DialogContent
        className={cn(
          'px-0 py-4 sm:max-w-[30rem] sm:py-6',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        )}
        isDefaultAnimation={false}
      >
        <DialogHeader className="px-3 xs:px-6">
          <DialogTitle className="text-left text-sm font-medium sm:text-lg">Chọn phương thức vận chuyển</DialogTitle>
          <DialogDescription className="sr-only">Chọn phương thức vận chuyển cho đơn hàng của bạn</DialogDescription>
        </DialogHeader>

        <RadioGroup
          className="mt-4 gap-3 px-3 text-sm xs:mt-6 xs:px-6"
          value={selectedShippingMethod.code}
          onValueChange={(value) => {
            const selectedShippingMethod = queryShippingMethod.data.payload.data.find((item) => item.code === value)
            if (selectedShippingMethod) {
              setSelectedShippingMethod(selectedShippingMethod)
            }
          }}
        >
          {queryShippingMethod.data.payload.data.map((item) => {
            const [from, to] = extractShippingDays(item.description)

            return (
              <Label
                key={item.code}
                data-state={item.code === selectedShippingMethod.code ? 'checked' : 'unchecked'}
                className="rounded bg-card px-3 py-5 xs:p-5"
              >
                <div className="relative">
                  {item.code === selectedShippingMethod.code ? (
                    <CheckIcon className="absolute right-0 top-1/2 size-5 -translate-y-1/2" />
                  ) : null}
                  <RadioGroupItem value={item.code} className="hidden" />
                  <p className="flex max-w-60 flex-col justify-between gap-1.5 xs:flex-row xs:items-center">
                    <span>{item.title}</span>
                    <span className="xs:text-base">
                      {formatCurrency(item.price)}
                      <sup>₫</sup>
                    </span>
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-highlight">
                    <Svgr icon={ShippingTruckIcon} width="19" height="13" />
                    <span className="hidden xs:inline">
                      Nhận hàng từ <strong>{formatVietnameseDate(addDays(new Date(), from))}</strong> đến{' '}
                      <strong>{formatVietnameseDate(addDays(new Date(), to))}</strong>
                    </span>
                    <span className="xs:hidden">
                      Nhận hàng từ <strong>{format(addDays(new Date(), from), 'dd/MM')}</strong> đến{' '}
                      <strong>{format(addDays(new Date(), to), 'dd/MM')}</strong>
                    </span>
                  </p>
                </div>
              </Label>
            )
          })}
        </RadioGroup>

        <DialogFooter className="mt-4 px-3 xs:mt-6 xs:px-6">
          <Button className="h-9 w-full" onClick={handleClick}>
            Xong
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
