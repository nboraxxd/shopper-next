'use client'

import { z } from 'zod'
import Image from 'next/image'
import { toast } from 'sonner'
import upperCase from 'lodash/upperCase'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { format, lastDayOfMonth } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ChevronUpIcon, CopyCheckIcon, CopyIcon, InfoIcon, XIcon } from 'lucide-react'

import { useCopyToClipboard } from '@/shared/hooks'
import { useQueryCartList, useQueryPromotionDetail } from '@/features/cart/hooks'
import { BadRequestError, handleClientErrorApi } from '@/shared/utils/error'
import { GetPromotionReq, getPromotionSchema } from '@/features/cart/schemas'

import { Tooltip, TooltipContentWithoutPortal, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'
import { ArrowRightIcon, PromotionBgSmIcon, Svgr, VoucherIcon } from '@/shared/components/icons'
import { Separator } from '@/shared/components/ui/separator'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useMutationState } from '@tanstack/react-query'
import { CHECKOUT_KEY } from '@/features/checkout/constants'
import { PreCheckoutResponse } from '@/features/checkout/types'
import { formatCurrency } from '@/shared/utils'

export default function CartPromotionSticky() {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const [promotionValue, setPromotionValue] = useState<string | undefined>(undefined)
  const hasCopiedText = Boolean(copiedText)

  const form = useForm<GetPromotionReq>({
    resolver: zodResolver(getPromotionSchema),
    defaultValues: {
      promotion: '',
    },
  })

  const queryCartList = useQueryCartList()
  const { error } = useQueryPromotionDetail(promotionValue)

  const dataPreCheckout = useMutationState({
    filters: { mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT], exact: true, status: 'success' },
    select: (mutation) => mutation.state.data as { payload: PreCheckoutResponse } | undefined,
  })

  const latestPreCheckout = dataPreCheckout.at(-1)

  useEffect(() => {
    if (error) {
      if (error instanceof BadRequestError) {
        form.setError('promotion', {
          type: z.ZodIssueCode.custom,
          message: error.payload.message.replace('giãm giá', `giảm giá ${upperCase(form.getValues('promotion'))}`),
        })
      } else {
        handleClientErrorApi({ error, setError: form.setError })
      }
      setPromotionValue(undefined)
      form.setValue('promotion', '')
    }
  }, [error, form])

  useEffect(() => {
    if (hasCopiedText) {
      setTimeout(() => {
        copyToClipboard(null)
      }, 2000)
    }
  }, [copyToClipboard, hasCopiedText])

  return (
    <div className="sticky inset-x-0 bottom-0 mt-7 xl:hidden">
      <div className="md:container">
        <div className="flex h-full flex-col gap-2 border-t border-dashed border-border bg-cart-section py-3 shadow-[0px_-25px_32px_-23px_rgba(0,0,0,0.2)] dark:shadow-[0px_-25px_32px_-23px_rgba(150,150,150,0.08)]">
          <div className="grid grid-cols-2 px-3 sm:px-7">
            <div className="col-span-2 col-start-1 flex items-center justify-between gap-2 lg:col-start-2">
              <h2 className="flex items-center gap-1 text-sm font-medium">
                <Svgr icon={VoucherIcon} className="size-5" />
                <span className="hidden sm:inline-block">Shopper khuyến mãi</span>
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group h-auto justify-start gap-0.5 p-0 text-sm text-highlight [&_svg]:size-4"
                  >
                    <span>Nhập hoặc chọn mã</span>
                    <Svgr icon={ArrowRightIcon} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="px-0 py-4 sm:max-w-[30rem] sm:py-6" isCloseIcon={false}>
                  <DialogHeader className="space-y-4 px-2 sm:space-y-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-medium">Shopper khuyến mãi</DialogTitle>
                      <DialogPrimitive.Close className="rounded-sm opacity-75 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <XIcon className="size-5" />
                        <span className="sr-only">Close</span>
                      </DialogPrimitive.Close>
                    </div>
                    <DialogDescription className="sr-only">
                      Nhập hoặc chọn mã giảm giá để nhận ưu đãi từ Shopper
                    </DialogDescription>
                    <Form {...form}>
                      <form
                        className="flex w-full gap-3"
                        noValidate
                        onSubmit={form.handleSubmit(({ promotion }) => setPromotionValue(promotion))}
                      >
                        <FormField
                          control={form.control}
                          name="promotion"
                          render={({ field }) => (
                            <FormItem className="grow space-y-1">
                              <div className="relative">
                                <Svgr
                                  icon={VoucherIcon}
                                  className="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-secondary-3"
                                />
                                <Input
                                  placeholder="Nhập mã giảm giá"
                                  className="h-10 text-ellipsis rounded-md pl-10 font-medium transition-none focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0"
                                  required
                                  {...field}
                                />
                              </div>
                              <FormMessage className="line-clamp-1" />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="h-10 px-2" size="sm">
                          Áp dụng
                        </Button>
                      </form>
                    </Form>
                  </DialogHeader>
                  <ScrollArea className="mt-4 h-[500px] overflow-y-auto sm:mt-6">
                    <div className="space-y-3 px-2 sm:px-6">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="relative">
                          <PromotionBgSmIcon className="w-full fill-[#E5F2FF] text-[#017FFF] [filter:drop-shadow(0px_1px_3px_rgba(0,0,0,0.15))] dark:fill-[#1E293B] dark:text-light-2" />
                          <div className="absolute inset-0 flex items-center">
                            <div className="flex h-full w-[21%] items-center justify-center p-2 xs:p-3">
                              <Image
                                src="/images/shopper.png"
                                alt="Voucher"
                                width={60}
                                height={60}
                                className="size-9 rounded object-contain sm:size-12"
                              />
                            </div>
                            <div className="flex h-full grow p-2 xs:p-3">
                              <div className="flex w-full justify-between gap-1">
                                <div className="flex flex-col gap-0.5 sm:justify-between">
                                  <p className="text-xs font-medium sm:text-base">Giảm 25%</p>
                                  <p className="text-[0.625rem] text-secondary-2 sm:text-sm">
                                    HSD: <span>{format(lastDayOfMonth(new Date()), 'dd/MM/yyyy')}</span>
                                  </p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                  <InfoIcon className="block size-3 text-secondary-2 sm:size-4 lg:hidden" />
                                  <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="hidden size-auto p-0.5 lg:inline-flex [&_svg]:size-4"
                                        >
                                          <InfoIcon className="text-secondary-2" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContentWithoutPortal
                                        className="bg-cart-section p-0 text-foreground shadow-popover"
                                        side="bottom"
                                        sideOffset={10}
                                        align="end"
                                        alignOffset={-25}
                                      >
                                        <div className="py-2">
                                          <div className="flex items-center gap-8 px-4 py-2 text-sm">
                                            <span className="inline-block min-w-10 font-medium">Mã</span>
                                            <div className="flex items-center gap-2">
                                              <span>SALE25</span>
                                              <Button
                                                variant="ghost"
                                                className="size-auto rounded-full p-1.5 text-highlight hover:bg-highlight/10 [&_svg]:size-4"
                                                onClick={() => {
                                                  if (hasCopiedText) return
                                                  copyToClipboard('SALE25')
                                                  toast.success('Đã sao chép mã giảm giá')
                                                }}
                                              >
                                                {hasCopiedText ? <CopyCheckIcon /> : <CopyIcon />}
                                              </Button>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-8 px-4 py-2 text-sm">
                                            <span className="inline-block min-w-10 font-medium">HSD</span>
                                            <span>{format(lastDayOfMonth(new Date()), 'dd/MM/yyyy')}</span>
                                          </div>
                                        </div>
                                      </TooltipContentWithoutPortal>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <Button className="h-6 px-2 py-0 text-[0.625rem] font-medium sm:h-7 sm:text-xs">
                                    Áp dụng
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <DialogFooter className="mt-4 px-2 sm:mt-6 sm:px-6">
                    <Button className="h-9 w-full sm:h-11">Xong</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Separator className="h-0 w-full border-t border-dashed border-border bg-transparent" />
          <div className="flex grow items-center px-3 sm:px-7">
            <div className="hidden items-center gap-2 md:flex lg:w-1/2">
              <Checkbox className="size-5" />
              <span className="text-sm font-medium">
                Chọn tất cả ({queryCartList.data?.payload.data.listItems.length || 0})
              </span>
            </div>
            <div className="group flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-1 md:grow md:justify-end lg:justify-start">
              <span className="hidden sm:inline-block">Tổng thanh toán:</span>
              <span className="text-[0.625rem] sm:hidden">Tổng tiền</span>
              <div className="flex items-center gap-1 sm:ml-1 lg:ml-auto">
                <span className="text-sm font-bold text-primary-red sm:text-base md:text-lg">
                  {formatCurrency(latestPreCheckout?.payload.data.viewCartTotal || 0)}
                  <sup>₫</sup>
                </span>
                <ChevronUpIcon className="size-4 text-secondary-2 transition-colors group-hover:text-cart-icon-highlight" />
              </div>
            </div>
            <Button className="ml-auto h-9 rounded-md text-sm font-medium md:ml-4">
              Mua hàng ({latestPreCheckout?.payload.data.listItems.length || 0})
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
