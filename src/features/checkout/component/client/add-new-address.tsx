'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import lowerFirst from 'lodash/lowerFirst'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/shared/utils'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useProfileStore } from '@/features/profile/profile-store'
import { CUSTOM_ACCOUNT_INPUT_CLASSNAME } from '@/features/account/constants'
import { addNewAddressSchema, AddNewAddressType, Region } from '@/features/address/schemas'
import { useAddNewAddressToBackendMutation, useQueryProvincesFromServer } from '@/features/address/hooks'

import { Input } from '@/shared/components/ui/input'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { DialogFooter } from '@/shared/components/ui/dialog'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { ButtonWithRefreshTokenState } from '@/shared/components'
import { AutosizeTextarea } from '@/shared/components/ui/autosize-textarea'
import { DistrictCombobox, RegionCombobox, WardCombobox } from '@/features/address/components/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'

interface Props {
  onSubmitNavigate: () => void
  isDefaultCheckboxVisible?: boolean
}

export default function AddNewAddress({ onSubmitNavigate, isDefaultCheckboxVisible = true }: Props) {
  const profile = useProfileStore((state) => state.profile)

  const queryProvinces = useQueryProvincesFromServer()

  const form = useForm<AddNewAddressType>({
    resolver: zodResolver(addNewAddressSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: profile?.username ?? '',
    },
  })

  const addNewAddressMutation = useAddNewAddressToBackendMutation()

  async function onSubmit(values: AddNewAddressType) {
    if (addNewAddressMutation.isPending) return

    const { province, district, ward, address, fullName, phone, email, default: isDefault } = values

    try {
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

      toast.success('Thêm địa chỉ thành công')
      onSubmitNavigate()
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
              id="add-new-address-form"
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
                      <Input {...field} placeholder="Số điện thoại" className={CUSTOM_ACCOUNT_INPUT_CLASSNAME} />
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
                        form.resetField('district')
                        form.resetField('ward')
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
                  render={({ field }) => (
                    <DistrictCombobox
                      provinceCode={(form.watch('province') as Region | undefined)?.code}
                      value={(field.value as Region | undefined)?.name}
                      onSelect={(value: Region) => {
                        form.setValue('district', value)
                        form.resetField('ward')
                      }}
                      enablePopoverPortal={false}
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
              {/* Default address */}
              {isDefaultCheckboxVisible ? (
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
              ) : null}
            </form>
          </Form>
        </div>
      </ScrollArea>

      <DialogFooter className="flex-row justify-end gap-1 border-t border-t-border px-3 pt-4 shadow-custom-up sm:px-6">
        <ButtonWithRefreshTokenState size="sm" variant="outline" className="h-9 min-w-24" onClick={onSubmitNavigate}>
          Trở lại
        </ButtonWithRefreshTokenState>

        {/* Submit */}
        <ButtonWithRefreshTokenState
          size="sm"
          type="submit"
          form="add-new-address-form"
          className="h-9 min-w-24 gap-1 [&_svg]:size-4"
          disabled={addNewAddressMutation.isPending}
        >
          {addNewAddressMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
          Hoàn thành
        </ButtonWithRefreshTokenState>
      </DialogFooter>
    </>
  )
}
