'use client'

import { addDays, format } from 'date-fns'

import { extractShippingDays } from '@/features/shipping/utils'
import { cn, formatCurrency, formatVietnameseDate } from '@/shared/utils'
import { useCheckoutShippingMethodStore, useNoteStore } from '@/features/checkout/hooks'
import { CUSTOM_ACCOUNT_INPUT_CLASSNAME } from '@/features/account/constants'

import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { ShippingTruckIcon, Svgr } from '@/shared/components/icons'
import { ShippingMethodDialog } from '@/features/shipping/components/client'

export default function ShippingMethod() {
  const setNote = useNoteStore((state) => state.setNote)
  const checkoutShippingMethod = useCheckoutShippingMethodStore((state) => state.checkoutShippingMethod)
  const [from, to] = extractShippingDays(checkoutShippingMethod.description)

  return (
    <div className="grid py-4 md:py-7 lg:grid-cols-5">
      <div className="px-3 font-medium xs:px-4 lg:order-2 lg:col-span-3 lg:px-7">
        <p className="text-sm xs:text-base">Phương thức vận chuyển:</p>
        <div className="mt-1 flex items-center justify-between gap-3 text-sm xs:grid xs:grid-cols-4">
          <span className="text-xs xs:col-span-2 xs:text-sm">
            {checkoutShippingMethod.title}
            <span className="xs:hidden">
              {''} - {formatCurrency(checkoutShippingMethod.price)}
              <sup>₫</sup>
            </span>
          </span>
          <div className="text-center xs:col-span-1">
            <ShippingMethodDialog />
          </div>
          <span className="hidden text-end xs:col-span-1 xs:inline">
            {formatCurrency(checkoutShippingMethod.price)}
            <sup>₫</sup>
          </span>
        </div>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-primary-green">
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

      <div className="mt-3 space-y-1 border-dashed border-border px-3 text-sm xs:px-4 xs:text-base lg:order-1 lg:col-span-2 lg:mt-0 lg:border-r lg:px-7">
        <Label htmlFor="note">Lời nhắn:</Label>
        <Input
          className={cn(CUSTOM_ACCOUNT_INPUT_CLASSNAME, 'h-9 rounded')}
          id="note"
          onBlur={(ev) => {
            if (ev.target.value) {
              setNote(ev.target.value)
            }
          }}
        />
      </div>
    </div>
  )
}
