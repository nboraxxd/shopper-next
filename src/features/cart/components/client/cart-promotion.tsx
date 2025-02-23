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
import { CopyCheckIcon, CopyIcon, InfoIcon, XIcon } from 'lucide-react'

import { useCopyToClipboard } from '@/shared/hooks'
import { useQueryPromotionDetail } from '@/features/cart/hooks'
import { BadRequestError, handleClientErrorApi } from '@/shared/utils/error'
import { GetPromotionReq, getPromotionSchema } from '@/features/cart/schemas'

import {
  Tooltip,
  TooltipContent,
  TooltipContentWithoutPortal,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
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

export default function CartPromotion() {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const [promotionValue, setPromotionValue] = useState<string | undefined>(undefined)
  const hasCopiedText = Boolean(copiedText)

  const form = useForm<GetPromotionReq>({
    resolver: zodResolver(getPromotionSchema),
    defaultValues: {
      promotion: '',
    },
  })

  const { error } = useQueryPromotionDetail(promotionValue)

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
    <section className="flex flex-col gap-4 rounded-4xl bg-cart-section px-4 py-7 shadow-section">
      <div className="flex flex-col gap-0.5 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="font-medium">Shopper khuyến mãi</h2>
        <span className="text-xs font-medium text-secondary-2">(có thể chọn 1)</span>
      </div>

      <div className="relative self-center">
        <PromotionBgSmIcon className="w-full fill-[#E5F2FF] text-[#017FFF] [filter:drop-shadow(0px_1px_3px_rgba(0,0,0,0.15))] dark:fill-[#1E293B] dark:text-light-2" />
        <div className="absolute inset-0 flex items-center">
          <div className="flex h-full w-[21%] items-center justify-center p-2">
            <Image
              src="/images/shopper.png"
              alt="Voucher"
              width={44}
              height={44}
              className="size-9 rounded object-contain"
            />
          </div>
          <div className="flex grow p-2">
            <div className="flex w-full items-center justify-between gap-1">
              <span className="text-sm font-medium">Giảm 25%</span>
              <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="size-auto p-0.5 [&_svg]:size-4">
                        <InfoIcon className="text-secondary-2" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-cart-section p-0 text-foreground shadow-popover"
                      side="bottom"
                      sideOffset={15}
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
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button className="h-7 px-2 py-1 text-xs font-medium">Áp dụng</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="group h-auto justify-start gap-1.5 p-0 text-highlight [&_svg]:size-5">
            <Svgr icon={VoucherIcon} />
            <span>Khuyến mãi tháng {new Date().getMonth() + 1}</span>
            <Svgr icon={ArrowRightIcon} className="transition-transform group-hover:translate-x-1" />
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
    </section>
  )
}
