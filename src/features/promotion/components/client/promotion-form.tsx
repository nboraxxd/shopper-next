'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import upperCase from 'lodash/upperCase'
import { zodResolver } from '@hookform/resolvers/zod'

import { useQueryPromotionDetail } from '@/features/promotion/hooks'
import { BadRequestError, handleClientErrorApi } from '@/shared/utils/error'
import { GetPromotionReq, getPromotionSchema } from '@/features/promotion/schemas'

import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Svgr, VoucherIcon } from '@/shared/components/icons'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'

export default function PromotionForm() {
  const [promotionValue, setPromotionValue] = useState<string | undefined>(undefined)

  const form = useForm<GetPromotionReq>({
    resolver: zodResolver(getPromotionSchema),
    defaultValues: {
      promotion: '',
    },
  })

  const { error } = useQueryPromotionDetail(promotionValue)

  useEffect(() => {
    if (error) {
      if (error instanceof BadRequestError && !error.payload.detail) {
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

  return (
    <Form {...form}>
      <form
        className="flex w-full gap-2 md:gap-3"
        noValidate
        onSubmit={form.handleSubmit(({ promotion }) => setPromotionValue(promotion))}
      >
        <FormField
          control={form.control}
          name="promotion"
          render={({ field }) => (
            <FormItem className="grow space-y-1">
              <div className="relative">
                <Svgr icon={VoucherIcon} className="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-secondary-3" />
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
  )
}
