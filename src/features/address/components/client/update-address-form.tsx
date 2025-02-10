'use client'

import { toast } from 'sonner'
import omitBy from 'lodash/omitBy'
import { useForm } from 'react-hook-form'
import lowerFirst from 'lodash/lowerFirst'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import isUndefined from 'lodash/isUndefined'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { useAuthStore } from '@/features/auth/auth-store'
import { handleClientErrorApi } from '@/shared/utils/error'
import { ProvincesResponseFromBackend } from '@/features/address/types'
import { Region, UpdateAddressReqBody } from '@/features/address/schemas'
import { useUpdateAddressToBackendMutation } from '@/features/address/hooks'
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
  currentProvince: { name: string; code?: number }
  currentDistrict: { name: string; code?: number }
  currentWard: { name?: string; code?: number }
  currentAddress: AddressDetailResponse['data']
  provinces: ProvincesResponseFromBackend
  initialDistricts?: DistrictsResponseFromBackend['districts']
  initialWards?: WardsResponseFromBackend['wards']
}

export default function UpdateAddressForm(props: Props) {
  const { currentAddress, provinces, initialDistricts, initialWards, currentProvince, currentDistrict, currentWard } =
    props

  const [isLoadingAddress, setIsLoadingAddress] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)

  const [localWards, setLocalWards] = useState(initialWards)
  const [localDistricts, setLocalDistricts] = useState(initialDistricts)

  const router = useRouter()

  const authState = useAuthStore((state) => state.authState)

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
      default: currentAddress.default,
    },
  })

  const updateAddressMutation = useUpdateAddressToBackendMutation()

  const isFormProcessing =
    isLoadingAddress || authState === 'loading' || authState === 'refreshing' || updateAddressMutation.isPending

  useEffect(() => {
    form.reset({
      fullName: currentAddress.fullName,
      phone: currentAddress.phone,
      email: currentAddress.email,
      address: currentAddress.address.split(', ').slice(0, -1).join(', ') || currentAddress.address,
    })
    setIsLoadingAddress(false)
  }, [currentAddress.address, currentAddress.email, currentAddress.fullName, currentAddress.phone, form])

  async function onSubmit(values: UpdateAddressType) {
    if (isFormProcessing || isNavigating) return

    if (currentAddress.default === true && values.default === false) {
      form.setError('default', { message: 'Không thể thay đổi địa chỉ mặc định' })
      return
    }

    const { province, district, ward, address, fullName, phone, email, default: isDefault } = values

    const newAddress = `${address}, ${lowerFirst(ward.name as string)}`

    const changes = omitBy(
      {
        fullName: fullName !== currentAddress.fullName ? fullName : undefined,
        phone: phone !== currentAddress.phone ? phone : undefined,
        email: email !== currentAddress.email ? email : undefined,
        province: province.name !== currentProvince.name ? province.name : undefined,
        district: district.name !== currentDistrict.name ? district.name : undefined,
        address: newAddress !== currentAddress.address ? newAddress : undefined,
        default: isDefault !== currentAddress.default ? isDefault : undefined,
      },
      isUndefined
    ) as UpdateAddressReqBody

    if (Object.keys(changes).length === 0) {
      toast.info('Không có thay đổi nào được thực hiện')
      return
    }

    try {
      setIsNavigating(true)

      await updateAddressMutation.mutateAsync({
        addressId: currentAddress._id,
        body: {
          ...changes,
        },
      })
      toast.success('Cập nhật địa chỉ thành công')

      router.push(PATH.ADDRESS)
    } catch (error) {
      setIsNavigating(false)
      handleClientErrorApi({ error, setError: form.setError })
    }
  }

  return (
    <Form {...form}>
      <form
        noValidate
        className="mt-3 space-y-4 md:mt-5"
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
      >
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

                  form.clearErrors('province')

                  form.resetField('ward')
                  form.resetField('district')

                  if (localDistricts) setLocalDistricts(undefined)
                  if (localWards) setLocalWards(undefined)
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
                initialDistricts={localDistricts}
                value={(form.watch('district') as Region | undefined)?.name}
                onSelect={(value: Region) => {
                  form.setValue('district', value)

                  form.clearErrors('district')

                  form.resetField('ward')

                  if (localWards) setLocalWards(undefined)
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
                initialWards={localWards}
                value={(form.watch('ward') as Region | undefined)?.name}
                onSelect={(value: Region) => {
                  form.setValue('ward', value)

                  form.clearErrors('ward')
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
        {!currentAddress.default ? (
          <FormField
            control={form.control}
            name="default"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex flex-row items-center space-y-0">
                  <FormControl>
                    <Checkbox className="size-5" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="!mt-px ml-2 leading-none">
                    <FormLabel>Đặt làm địa chỉ mặc định</FormLabel>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="flex flex-row items-center space-y-0 opacity-50">
            <Checkbox className="size-5 cursor-auto" checked={currentAddress.default} />
            <div className="!mt-px ml-2 leading-none">
              <FormLabel>Địa chỉ mặc định</FormLabel>
            </div>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="mt-4 h-11 gap-1.5 rounded-full px-5 py-0 [&_svg]:size-5"
          disabled={isFormProcessing || isNavigating}
        >
          {updateAddressMutation.isPending || isNavigating ? <LoaderCircleIcon className="animate-spin" /> : null}
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}
