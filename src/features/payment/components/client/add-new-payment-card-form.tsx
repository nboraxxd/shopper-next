'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PatternFormat } from 'react-number-format'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCardIcon, LoaderCircleIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { handleClientErrorApi } from '@/shared/utils/error'
import { PAYMENT_CARD_TYPE } from '@/features/payment/constants'
import { CUSTOM_ACCOUNT_INPUT_CLASSNAME } from '@/features/account/constants'
import { useAddNewPaymentCardToBackendMutation } from '@/features/payment/hooks'
import { AddNewPaymentCardReqBody, addNewPaymentCardSchema } from '@/features/payment/schemas'

import { Svgr } from '@/shared/components/icons'
import { Input } from '@/shared/components/ui/input'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

export default function AddNewPaymentCardForm() {
  const [isNavigating, setIsNavigating] = useState(false)

  const router = useRouter()

  const form = useForm<AddNewPaymentCardReqBody>({
    resolver: zodResolver(addNewPaymentCardSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expired: '',
      cvv: '',
    },
  })

  const addNewPaymentCardMutation = useAddNewPaymentCardToBackendMutation()

  const isFormProcessing = addNewPaymentCardMutation.isPending || isNavigating

  async function onSubmit(values: AddNewPaymentCardReqBody) {
    if (isFormProcessing) return

    try {
      setIsNavigating(true)

      await addNewPaymentCardMutation.mutateAsync(values)

      toast.success('Thêm thẻ thành công')
      router.push(PATH.PAYMENT)
    } catch (error) {
      setIsNavigating(false)
      handleClientErrorApi({ error, setError: form.setError })
    }
  }

  return (
    <Form {...form}>
      <form noValidate className="mt-3 space-y-4 md:mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Card type */}
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center gap-4">
                <FormLabel>Loại thẻ</FormLabel>
                <RadioGroup onValueChange={field.onChange} value={field.value ?? undefined} className="flex gap-4">
                  {PAYMENT_CARD_TYPE.map(({ icon: Icon, label, value }) => (
                    <FormItem key={value} className="flex items-center space-y-0">
                      <FormControl>
                        <RadioGroupItem value={value} className="hidden" />
                      </FormControl>
                      <FormLabel
                        className="cursor-pointer rounded-md border p-1.5 data-[state=checked]:border-highlight"
                        data-state={field.value === value ? 'checked' : 'unchecked'}
                      >
                        <Svgr icon={Icon} width={30} height={20} />
                        <span className="sr-only">{label}</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card name */}
        <FormField
          name="cardName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Tên chủ thẻ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="name"
                  placeholder="Nhập tên trên thẻ"
                  className={CUSTOM_ACCOUNT_INPUT_CLASSNAME}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card number */}
        <FormField
          name="cardNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Số thẻ</FormLabel>
              <div className="relative">
                <CreditCardIcon className="absolute left-2 top-1/2 size-6 -translate-y-1/2 text-secondary-3" />
                <FormControl>
                  <PatternFormat
                    {...field}
                    customInput={Input}
                    mask="_"
                    format="#### #### #### ####"
                    placeholder="Nhập số thẻ"
                    className={cn(CUSTOM_ACCOUNT_INPUT_CLASSNAME, 'pl-10')}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 xs:grid-cols-2">
          {/* Expiry date */}
          <FormField
            name="expired"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Ngày hết hạn</FormLabel>
                <FormControl>
                  <PatternFormat
                    {...field}
                    customInput={Input}
                    type="text"
                    mask="_"
                    format={field.value.length >= 2 ? '##/##' : '####'}
                    placeholder="MM/YY"
                    className={CUSTOM_ACCOUNT_INPUT_CLASSNAME}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CVV */}
          <FormField
            name="cvv"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <PatternFormat
                    {...field}
                    customInput={Input}
                    mask="_"
                    format="###"
                    placeholder="Nhập CVV"
                    className={CUSTOM_ACCOUNT_INPUT_CLASSNAME}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Default card */}
        <FormField
          control={form.control}
          name="default"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0">
              <FormControl>
                <Checkbox className="size-5" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="!mt-px ml-2 leading-none">
                <FormLabel>Đặt làm thẻ mặc định</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit */}
        <ButtonWithRefreshTokenState
          type="submit"
          className="mt-4 h-11 gap-1.5 rounded-full px-5 py-0 [&_svg]:size-5"
          disabled={isFormProcessing}
        >
          {isFormProcessing ? <LoaderCircleIcon className="animate-spin" /> : null}
          Thêm thẻ
        </ButtonWithRefreshTokenState>
      </form>
    </Form>
  )
}
