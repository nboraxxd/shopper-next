'use client'

import { useForm } from 'react-hook-form'
import lowerFirst from 'lodash/lowerFirst'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useProfileStore } from '@/features/profile/profile-store'
import { ProvincesResponseFromBackend } from '@/features/address/types'
import { useAddNewAddressToBackendMutation } from '@/features/address/hooks'
import { CUSTOM_PROFILE_INPUT_CLASSNAME } from '@/features/profile/constants'
import { AddNewAddressType, addNewAddressSchema, Region } from '@/features/address/schemas'

import { Input } from '@/shared/components/ui/input'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { AutosizeTextarea } from '@/shared/components/ui/autosize-textarea'
import { DistrictCombobox, WardCombobox, RegionCombobox } from '@/features/address/components/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

export default function AddNewAddressForm({ provinces }: { provinces: ProvincesResponseFromBackend }) {
  const [isNavigating, setIsNavigating] = useState(false)

  const router = useRouter()
  const profile = useProfileStore((state) => state.profile)

  const form = useForm<AddNewAddressType>({
    resolver: zodResolver(addNewAddressSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: profile?.username ?? '',
    },
  })

  const addNewAddressMutation = useAddNewAddressToBackendMutation()

  useEffect(() => {
    if (form.getValues('email') === '') {
      form.setValue('email', profile?.username ?? '')
    }
  }, [form, profile?.username])

  const isFormProcessing = addNewAddressMutation.isPending || isNavigating

  async function onSubmit(values: AddNewAddressType) {
    if (isFormProcessing) return

    const { province, district, ward, address, fullName, phone, email, default: isDefault } = values

    try {
      setIsNavigating(true)

      // [region].name is guaranteed to be a string
      // because it's validated by superRefine in schema
      await addNewAddressMutation.mutateAsync({
        address: `${address}, ${lowerFirst(ward.name as string)}`,
        district: district.name as string,
        province: province.name as string,
        email,
        fullName,
        phone,
        default: isDefault,
      })

      router.push(PATH.ADDRESS)
    } catch (error) {
      setIsNavigating(false)
      handleClientErrorApi({ error, setError: form.setError })
    }
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
            render={({ field }) => (
              <DistrictCombobox
                provinceCode={(form.watch('province') as Region | undefined)?.code}
                value={(field.value as Region | undefined)?.name}
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
            render={({ field }) => (
              <WardCombobox
                districtCode={(form.watch('district') as Region | undefined)?.code}
                value={(field.value as Region | undefined)?.name}
                onSelect={(value: Region) => form.setValue('ward', value)}
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
        <ButtonWithRefreshTokenState
          type="submit"
          className="mt-4 h-11 gap-1.5 rounded-full px-5 py-0 [&_svg]:size-5"
          disabled={isFormProcessing}
        >
          {addNewAddressMutation.isPending || isNavigating ? <LoaderCircleIcon className="animate-spin" /> : null}
          Thêm địa chỉ
        </ButtonWithRefreshTokenState>
      </form>
    </Form>
  )
}
