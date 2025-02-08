'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/shared/utils'
import { Region } from '@/features/address/schemas'
import { ProvincesResponseFromBackend } from '@/features/address/types'
import { CUSTOM_PROFILE_INPUT_CLASSNAME } from '@/features/profile/constants'
import { updateAddressSchema, UpdateAddressType } from '@/features/address/schemas'
import { AddressDetailResponse, DistrictsResponseFromBackend, WardsResponseFromBackend } from '@/features/address/types'

import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { AutosizeTextarea } from '@/shared/components/ui/autosize-textarea'
import { DistrictCombobox, RegionCombobox, WardCombobox } from '@/features/address/components/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface Props {
  addressDetail: AddressDetailResponse['data']
  provinces: ProvincesResponseFromBackend
  initialDistricts?: DistrictsResponseFromBackend['districts']
  initialWards?: WardsResponseFromBackend['wards']
  currentProvince: { name: string; code?: number }
  currentDistrict: { name: string; code?: number }
  currentWard: { name?: string; code?: number }
}

export default function UpdateAddressForm(props: Props) {
  const { addressDetail, provinces, initialDistricts, initialWards, currentProvince, currentDistrict, currentWard } =
    props

  const form = useForm<UpdateAddressType>({
    resolver: zodResolver(updateAddressSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      province: { code: currentProvince.code, name: currentProvince.name },
      district: { code: currentDistrict.code, name: currentDistrict.name },
      ward: { code: currentWard.code, name: currentWard.name },
      default: addressDetail.default,
    },
  })

  useEffect(() => {
    form.reset({
      fullName: addressDetail.fullName,
      phone: addressDetail.phone,
      email: addressDetail.email,
      address: addressDetail.address.split(', ').slice(0, -1).join(', ') || addressDetail.address,
    })
  }, [addressDetail.address, addressDetail.email, addressDetail.fullName, addressDetail.phone, form])

  async function onSubmit(values: any) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form noValidate className="mt-3 space-y-4 md:mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Full name */}
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="name"
                  className={CUSTOM_PROFILE_INPUT_CLASSNAME}
                  placeholder="Họ và tên"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  className={CUSTOM_PROFILE_INPUT_CLASSNAME}
                  placeholder="Số điện thoại"
                  {...field}
                  onChange={(ev) => field.onChange(ev.target.value !== '' ? ev.target.value : null)}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="email" className={CUSTOM_PROFILE_INPUT_CLASSNAME} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
          {/* Province */}
          <FormField
            name="province"
            control={form.control}
            render={({ field }) => (
              <RegionCombobox
                label="Tỉnh/thành phố"
                regions={provinces}
                value={(field.value as Region | undefined)?.name}
                onSelect={(value: Region) => {
                  form.setValue('province', value)
                  form.resetField('district')
                  form.resetField('ward')
                }}
                isChosenParentRegion={true}
              />
            )}
          />

          {/* District */}
          <FormField
            name="district"
            control={form.control}
            render={() => (
              <DistrictCombobox
                provinceCode={(form.watch('province') as Region | undefined)?.code}
                initialDistricts={initialDistricts}
                value={(form.watch('district') as Region | undefined)?.name}
                onSelect={(value: Region) => {
                  form.setValue('district', value)
                  form.resetField('ward')
                }}
              />
            )}
          />

          {/* Ward */}
          <FormField
            name="ward"
            control={form.control}
            render={() => (
              <WardCombobox
                districtCode={(form.watch('district') as Region | undefined)?.code}
                initialWards={initialWards}
                value={(form.watch('ward') as Region | undefined)?.name}
                onSelect={(value: Region) => {
                  form.setValue('ward', value)
                }}
              />
            )}
          />
        </div>

        {/* Address */}
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <AutosizeTextarea
                  minHeight={48}
                  maxHeight={96}
                  className={cn(CUSTOM_PROFILE_INPUT_CLASSNAME, 'h-auto')}
                  placeholder="Địa chỉ cụ thể"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Default address */}
        <FormField
          control={form.control}
          name="default"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0">
              <FormControl>
                <Checkbox className="size-5" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="!mt-px ml-2 leading-none">
                <FormLabel>Đặt làm địa chỉ mặc định</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="mt-4 h-11 gap-1.5 rounded-full px-5 py-0 [&_svg]:size-5"
          // disabled={addNewAddressMutation.isPending || isNavigating}
        >
          {/* {addNewAddressMutation.isPending || isNavigating ? <LoaderCircleIcon className="animate-spin" /> : null} */}
          Thêm địa chỉ
        </Button>
      </form>
    </Form>
  )
}
