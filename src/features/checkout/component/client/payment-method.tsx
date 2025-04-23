'use client'

import { useState } from 'react'
import { CheckIcon, PlusIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { PaymentCard } from '@/features/payment/types'
import { isCardExpired } from '@/features/payment/utils'
import { useQueryPayments } from '@/features/payment/hooks'
import { CheckoutPaymentMethod } from '@/features/checkout/types'
import { CHECKOUT_PAYMENT_TABS } from '@/features/checkout/constants'
import { useCheckoutPaymentMethodStore } from '@/features/checkout/hooks'

import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { CreditCardIcon, PayPalIcon, Svgr } from '@/shared/components/icons'
import { ButtonWithRefreshTokenState, SectionTitle } from '@/shared/components'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export default function PaymentMethod() {
  const { checkoutPaymentMethod, setCheckoutPaymentMethod } = useCheckoutPaymentMethodStore()
  const queryPayments = useQueryPayments(checkoutPaymentMethod === 'card')

  const [selectedCard, setSelectedCard] = useState<PaymentCard | null>(null)

  return (
    <Tabs
      value={checkoutPaymentMethod}
      onValueChange={(value) => setCheckoutPaymentMethod(value as CheckoutPaymentMethod)}
    >
      <TabsList
        className={cn(
          'h-auto w-full flex-col items-baseline gap-2 bg-transparent p-0 text-inherit md:flex-row md:items-center md:justify-normal',
          'px-3 py-4 xs:px-4 md:py-7 lg:px-7'
        )}
      >
        <SectionTitle title="Phương thức thanh toán" className="md:min-w-60" />
        <div className="flex w-full flex-1 flex-col gap-2 xs:w-auto xs:flex-row xs:items-center">
          {CHECKOUT_PAYMENT_TABS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                'data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                'relative h-8 rounded border border-border md:h-10',
                'data-[state=active]:border-highlight data-[state=active]:text-highlight'
              )}
              asChild
            >
              <ButtonWithRefreshTokenState isPlainButton>
                {item.label}
                <span
                  className={cn(
                    "absolute bottom-0 right-0 size-4 overflow-hidden before:absolute before:-right-4 before:bottom-0 before:border-[16px] before:border-transparent before:transition-colors before:content-['']",
                    {
                      'before:border-b-highlight': checkoutPaymentMethod === item.value,
                    }
                  )}
                >
                  <CheckIcon className="absolute bottom-0 right-0 size-2 text-checkout-section" />
                </span>
              </ButtonWithRefreshTokenState>
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <Separator />
      <TabsContent
        value="card"
        className="mt-0 flex flex-col gap-2 data-[state=active]:px-3 data-[state=active]:py-4 data-[state=active]:xs:px-4 md:flex-row data-[state=active]:md:py-7 data-[state=active]:lg:px-7"
      >
        <h3 className="min-w-60 text-sm font-bold xs:text-base sm:text-lg md:mt-3">Chọn thẻ</h3>
        <div>
          {queryPayments.isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-11 w-36" />
              ))}
            </div>
          ) : null}
          {queryPayments.isSuccess ? (
            <RadioGroup
              className="gap-3"
              value={selectedCard?._id}
              onValueChange={(value) => {
                const selectedCard = queryPayments.data.payload.data.find((item) => item._id === value)

                if (selectedCard) {
                  setSelectedCard(selectedCard)
                }
              }}
            >
              {queryPayments.data.payload.data.map((item) => {
                const Icon = item.type === 'card' ? CreditCardIcon : PayPalIcon
                const disabled = isCardExpired(item.expired)

                return (
                  <Label key={item._id} className="flex cursor-pointer items-center gap-2 text-sm">
                    <RadioGroupItem value={item._id} className={cn({ 'opacity-50': disabled })} disabled={disabled} />
                    <div className="rounded border border-border px-3 py-1">
                      <Svgr icon={Icon} className={cn('size-8', { 'opacity-50': disabled })} />
                      <span className="sr-only">{item.type === 'card' ? 'Thẻ tín dụng' : 'PayPal'}</span>
                    </div>
                    <span className={cn({ 'opacity-50': disabled })}>**** {item.cardNumber.slice(-4)}</span>
                    {disabled ? <span className="ml-3 text-primary-red">Hết hạn</span> : null}
                  </Label>
                )
              })}
            </RadioGroup>
          ) : null}
          <Button
            variant="outline"
            className="mt-3 h-[2.625rem] gap-2 bg-transparent px-3 py-0 hover:bg-accent/30 [&_svg]:size-4"
          >
            <PlusIcon />
            Thêm thẻ
          </Button>
        </div>
      </TabsContent>
      <TabsContent
        value="money"
        className="mt-0 flex flex-col gap-2 data-[state=active]:px-3 data-[state=active]:py-4 data-[state=active]:xs:px-4 md:flex-row data-[state=active]:md:py-7 data-[state=active]:lg:px-7"
      >
        <h3 className="min-w-60">Thanh toán khi nhận hàng</h3>
        <p>
          Phí thu hộ: 0<sup>₫</sup>
        </p>
      </TabsContent>
    </Tabs>
  )
}
