'use client'

import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/shared/utils'
import { productListFilterSchema, ProductListFilterType } from '@/features/product/schemas'

import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { StarIcon, Svgr } from '@/shared/components/icons'
import { NumberInput } from '@/shared/components/quantity-input'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  currentMinPrice?: string
  currentMaxPrice?: string
  currentFilterRating?: string
}

const PRICE_INPUTS = [
  { name: 'minPrice', label: 'Từ', placeholder: '10.000' },
  { name: 'maxPrice', label: 'Đến', placeholder: '99.000' },
] as const

export default function ProductFilterForm(props: Props) {
  const { setIsOpen, currentMinPrice = '', currentMaxPrice = '', currentFilterRating = '' } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams)

  const form = useForm<ProductListFilterType>({
    resolver: zodResolver(productListFilterSchema),
    values: {
      filterRating: currentFilterRating as ProductListFilterType['filterRating'],
      minPrice: currentMinPrice,
      maxPrice: currentMaxPrice,
    },
  })

  function onValid(values: ProductListFilterType) {
    if (
      values.minPrice === currentMinPrice &&
      values.maxPrice === currentMaxPrice &&
      values.filterRating === currentFilterRating
    )
      return

    newSearchParams.delete('page')

    const params = ['minPrice', 'maxPrice', 'filterRating'] as const
    params.forEach((param) => {
      if (values[param]) {
        newSearchParams.set(param, values[param])
      } else {
        newSearchParams.delete(param)
      }
    })

    setIsOpen(false)
    router.push(`${pathname}?${newSearchParams}`, { scroll: false })
  }

  function onReset() {
    if (!currentMinPrice && !currentMaxPrice && !currentFilterRating) return

    form.reset()

    newSearchParams.delete('page')
    newSearchParams.delete('minPrice')
    newSearchParams.delete('maxPrice')
    newSearchParams.delete('filterRating')

    setIsOpen(false)
    router.push(`${pathname}?${newSearchParams}`, { scroll: false })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValid)} onReset={onReset} className="mx-auto w-fit md:mx-0 md:w-full">
        <Label className="text-lg font-medium">Khoảng giá</Label>
        <div className="mt-2">
          <div className="flex gap-5">
            {PRICE_INPUTS.map(({ label, name, placeholder }) => (
              <FormField
                key={name}
                name={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm md:text-sm">{label}</FormLabel>
                    <FormControl>
                      <NumberInput
                        className="w-32 transition-none focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0"
                        placeholder={placeholder}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="my-1 min-h-5">
            <FormMessage className="text-center">
              {form.formState.errors.minPrice?.message || form.formState.errors.maxPrice?.message}
            </FormMessage>
          </div>
        </div>

        {/* rating */}
        <FormField
          control={form.control}
          name="filterRating"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Đánh giá</FormLabel>
              <RadioGroup value={field.value} onValueChange={field.onChange} className="flex items-center gap-0">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FormItem key={index} className="flex items-center space-y-0">
                    <FormLabel
                      className="cursor-pointer rounded-md border border-transparent p-0.5 transition-transform active:scale-90"
                      data-state={index + 1 === parseInt(field.value as string) ? 'checked' : 'unchecked'}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={(index + 1).toString()}
                          className="sr-only"
                          onClick={(e) => {
                            if (e.currentTarget.value === field.value) {
                              field.onChange('')
                            }
                          }}
                        />
                      </FormControl>
                      <span className="sr-only">{`${index + 1} sao`}</span>
                      <Svgr
                        icon={StarIcon}
                        stroke="#FFB700"
                        className={cn('text-transparent [filter:drop-shadow(0px_1px_3px_rgba(0,0,0,0.1))]', {
                          'text-primary-yellow': index + 1 <= parseInt(field.value as string),
                        })}
                      />
                    </FormLabel>
                  </FormItem>
                ))}
                {field.value ? (
                  <span className="ml-2.5 mt-0.5 text-sm font-medium">
                    {+field.value === 5 ? `${field.value} sao` : `${field.value} sao trở lên`}
                  </span>
                ) : null}
              </RadioGroup>
              <div className="!my-1 min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button
            type="reset"
            variant="ghost"
            className="hover:bg-secondary-3/15"
            disabled={!currentMinPrice && !currentMaxPrice && !currentFilterRating}
          >
            Đặt lại
          </Button>
          <Button type="submit">Áp dụng</Button>
        </div>
      </form>
    </Form>
  )
}
