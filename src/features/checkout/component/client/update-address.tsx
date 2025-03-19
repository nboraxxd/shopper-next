'use client'

import { toast } from 'sonner'
import omitBy from 'lodash/omitBy'
import { useForm } from 'react-hook-form'
import upperFirst from 'lodash/upperFirst'
import lowerFirst from 'lodash/lowerFirst'
import isUndefined from 'lodash/isUndefined'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect } from 'react'

import {
  useQueryWardsFromServer,
  useQueryProvincesFromServer,
  useQueryDistrictsFromServer,
  useUpdateAddressToBackendMutation,
} from '@/features/address/hooks'
import { cn } from '@/shared/utils'
import { Address } from '@/features/address/types'
import { DialogMode } from '@/features/checkout/types'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useCheckoutAddressStore } from '@/features/checkout/hooks'
import { CUSTOM_ACCOUNT_INPUT_CLASSNAME } from '@/features/account/constants'
import { Region, UpdateAddressReqBody, updateAddressSchema, UpdateAddressType } from '@/features/address/schemas'

import { Input } from '@/shared/components/ui/input'
import { DialogFooter } from '@/shared/components/ui/dialog'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { AutosizeTextarea } from '@/shared/components/ui/autosize-textarea'
import { DistrictCombobox, RegionCombobox, WardCombobox } from '@/features/address/components/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface Props {
  addressToUpdate: Address
  setMode: Dispatch<SetStateAction<DialogMode>>
}

export default function UpdateAddress({ addressToUpdate, setMode }: Props) {
  const form = useForm<UpdateAddressType>({
    resolver: zodResolver(updateAddressSchema),
    defaultValues: {
      fullName: addressToUpdate.fullName,
      phone: addressToUpdate.phone,
      email: addressToUpdate.email,
      address: addressToUpdate.address.split(', ').slice(0, -1).join(', ') || addressToUpdate.address,
    },
  })

  const { checkoutAddress, setCheckoutAddress } = useCheckoutAddressStore()

  const queryProvinces = useQueryProvincesFromServer()

  const queryDistricts = useQueryDistrictsFromServer(
    queryProvinces.data?.payload.data.find((province) => province.name === addressToUpdate.province)?.code
  )
  const queryWards = useQueryWardsFromServer(
    queryDistricts.data?.payload.data.find((district) => district.name === addressToUpdate.district)?.code
  )

  const updateAddressMutation = useUpdateAddressToBackendMutation()

  useEffect(() => {
    const wardName =
      addressToUpdate.address.split(', ').length > 1 ? upperFirst(addressToUpdate.address.split(', ').pop()) : undefined

    form.reset({
      province: {
        code: queryProvinces.data?.payload.data.find((province) => province.name === addressToUpdate.province)?.code,
        name: addressToUpdate.province,
      },
      district: {
        code: queryDistricts.data?.payload.data.find((district) => district.name === addressToUpdate.district)?.code,
        name: addressToUpdate.district,
      },
      ward: {
        code: queryWards.data?.payload.data.find((ward) => ward.name === wardName)?.code,
        name: wardName,
      },
    })
  }, [
    addressToUpdate.address,
    addressToUpdate.district,
    addressToUpdate.province,
    form,
    queryDistricts.data?.payload.data,
    queryProvinces.data?.payload.data,
    queryWards.data?.payload.data,
  ])

  async function onSubmit(values: UpdateAddressType) {
    const { province, district, ward, address, fullName, phone, email } = values

    const newAddress = `${address}, ${lowerFirst(ward.name as string)}`

    const changes = omitBy(
      {
        fullName: fullName !== addressToUpdate.fullName ? fullName : undefined,
        phone: phone !== addressToUpdate.phone ? phone : undefined,
        email: email !== addressToUpdate.email ? email : undefined,
        province: province.name !== addressToUpdate.province ? province.name : undefined,
        district: district.name !== addressToUpdate.district ? district.name : undefined,
        address: newAddress !== addressToUpdate.address ? newAddress : undefined,
      },
      isUndefined
    ) as UpdateAddressReqBody

    if (Object.keys(changes).length === 0) {
      setMode('list')
      return
    }

    try {
      await updateAddressMutation.mutateAsync({
        addressId: addressToUpdate._id,
        body: {
          ...changes,
        },
      })

      toast.success('Cập nhật địa chỉ thành công')

      if (checkoutAddress?._id === addressToUpdate._id) {
        setCheckoutAddress({
          ...checkoutAddress,
          ...changes,
        })
      }

      setMode('list')
    } catch (error) {
      handleClientErrorApi({ error, setError: form.setError })
    }
  }

  return (
    <>
      <ScrollArea className="h-[38rem]">
        <div className="px-3 sm:px-6">
          <Form {...form}>
            <form
              noValidate
              className="mb-8 mt-4 space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
              id="update-address-form"
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
                        className={CUSTOM_ACCOUNT_INPUT_CLASSNAME}
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
                        className={CUSTOM_ACCOUNT_INPUT_CLASSNAME}
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
                      <Input
                        {...field}
                        autoComplete="email"
                        className={CUSTOM_ACCOUNT_INPUT_CLASSNAME}
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                {/* Province */}
                <FormField
                  name="province"
                  control={form.control}
                  render={({ field }) => (
                    <RegionCombobox
                      label="Tỉnh/thành phố"
                      isQueryRegionLoading={queryProvinces.isLoading}
                      regions={queryProvinces.data?.payload.data ?? []}
                      value={(field.value as Region | undefined)?.name}
                      onSelect={(value: Region) => {
                        form.setValue('province', value)
                        form.clearErrors('province')
                        form.setValue('district', { code: undefined, name: undefined })
                        form.setValue('ward', { code: undefined, name: undefined })
                      }}
                      isChosenParentRegion={true}
                      enablePopoverPortal={false}
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
                      value={(form.watch('district') as Region | undefined)?.name}
                      onSelect={(value: Region) => {
                        form.setValue('district', value)
                        form.clearErrors('district')
                        form.setValue('ward', { code: undefined, name: undefined })
                      }}
                      enablePopoverPortal={false}
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
                      value={(form.watch('ward') as Region | undefined)?.name}
                      onSelect={(value: Region) => {
                        form.setValue('ward', value)
                        form.clearErrors('ward')
                      }}
                      enablePopoverPortal={false}
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
                        className={cn(CUSTOM_ACCOUNT_INPUT_CLASSNAME, 'h-auto')}
                        placeholder="Địa chỉ cụ thể"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </ScrollArea>

      <DialogFooter className="flex-row justify-end gap-1 border-t border-t-border px-3 pt-4 shadow-custom-up sm:px-6">
        <ButtonWithRefreshTokenState
          size="sm"
          variant="outline"
          className="h-9 min-w-24"
          onClick={() => setMode('list')}
        >
          Trở lại
        </ButtonWithRefreshTokenState>
        <ButtonWithRefreshTokenState size="sm" type="submit" form="update-address-form" className="h-9 min-w-24">
          Hoàn thành
        </ButtonWithRefreshTokenState>
      </DialogFooter>
    </>
  )
}
