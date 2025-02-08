'use client'

import { toast } from 'sonner'
import omitBy from 'lodash/omitBy'
import { useForm } from 'react-hook-form'
import isUndefined from 'lodash/isUndefined'
import { LoaderCircleIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/shared/utils'
import { ProfileResponse } from '@/features/profile/types'
import { handleClientErrorApi } from '@/shared/utils/error'
import { validateGenderValue } from '@/features/profile/utils'
import { useUploadImageToBackendMutation } from '@/features/file/hooks'
import { useUpdateProfileToBackendMutation } from '@/features/profile/hooks'
import { UpdateProfileReqBody, updateProfileSchema } from '@/features/profile/schemas'
import { CUSTOM_PROFILE_INPUT_CLASSNAME, GENDERS } from '@/features/profile/constants'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { UserAvatar } from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { DOBSelectGroup } from '@/features/profile/components/client'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

export default function UpdateProfileForm({ profile }: { profile: ProfileResponse['data'] }) {
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  const avatarInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<UpdateProfileReqBody>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      avatar: null,
      birthday: null,
      fb: null,
      gender: null,
      phone: null,
    },
  })

  const uploadImageMutation = useUploadImageToBackendMutation()
  const updateProfileMutation = useUpdateProfileToBackendMutation()

  const isFormProcessing = isLoadingProfile || uploadImageMutation.isPending || updateProfileMutation.isPending

  useEffect(() => {
    form.reset({
      name: profile.name,
      avatar: profile.avatar,
      birthday: profile.birthday,
      fb: profile.fb,
      gender: validateGenderValue(profile.gender),
      phone: profile.phone,
    })
    setIsLoadingProfile(false)
  }, [form, profile.avatar, profile.birthday, profile.fb, profile.gender, profile.name, profile.phone])

  async function handleChangeAvatar(ev: React.ChangeEvent<HTMLInputElement>) {
    if (isFormProcessing) return

    const file = ev.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image')) {
      form.setError('avatar', { type: 'manual', message: 'File không hợp lệ' })
      return
    } else if (file.size > 1024 * 1024) {
      form.setError('avatar', { type: 'manual', message: 'Dung lượng ảnh quá lớn' })
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const uploadImageResponse = await uploadImageMutation.mutateAsync(formData)

      form.setValue('avatar', uploadImageResponse.payload.link)
    } catch (error) {
      handleClientErrorApi({ error, setError: form.setError })
    }
  }

  async function onSubmit(values: UpdateProfileReqBody) {
    if (isFormProcessing) return

    const { avatar, birthday, fb, gender, name, phone } = profile

    const changes = omitBy(
      {
        name: name === values.name ? undefined : values.name,
        birthday: birthday === values.birthday ? undefined : values.birthday,
        gender: gender === values.gender ? undefined : values.gender,
        fb: fb === values.fb ? undefined : values.fb,
        phone: phone === values.phone ? undefined : values.phone,
        avatar: avatar === values.avatar ? undefined : values.avatar,
      },
      isUndefined
    ) as UpdateProfileReqBody

    if (Object.keys(changes).length === 0) {
      toast.info('Không có thay đổi nào được thực hiện')
      return
    }

    try {
      await updateProfileMutation.mutateAsync(changes)
      toast.success('Cập nhật thông tin thành công')
    } catch (error) {
      handleClientErrorApi({ error, setError: form.setError })
    }
  }

  return (
    <Form {...form}>
      <form noValidate className="mt-3 md:mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 md:flex-row-reverse md:items-start md:gap-0">
          {/* Avatar */}
          <div className="flex justify-center md:basis-2/5 md:justify-start">
            <Separator orientation="vertical" className="mx-10 hidden h-auto md:block" />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="mx-auto flex flex-col items-center md:py-7">
                  {uploadImageMutation.isPending ? (
                    <Skeleton className="size-20 rounded-full md:size-24" />
                  ) : (
                    <Button
                      variant="ghost"
                      className="size-fit p-0"
                      onClick={() => {
                        form.clearErrors('avatar')
                        avatarInputRef.current?.click()
                      }}
                    >
                      <UserAvatar
                        avatarUrl={field.value ?? null}
                        width={108}
                        height={108}
                        name={profile.name}
                        className="size-20 shadow md:size-24"
                        fallbackClassName="cursor-pointer bg-account-highlight text-3xl"
                        imagePriority
                      />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-9 gap-1.5 bg-account-highlight/90 px-5 py-0 text-sm transition-colors hover:bg-account-highlight"
                    disabled={uploadImageMutation.isPending}
                    onClick={() => {
                      form.clearErrors('avatar')
                      avatarInputRef.current?.click()
                    }}
                  >
                    Chọn ảnh
                  </Button>
                  <Input
                    placeholder="Chọn ảnh đại diện"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={avatarInputRef}
                    onChange={handleChangeAvatar}
                  />
                  <FormDescription className="italic">Kích thước ảnh tối đa: 1MB</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Information */}
          <div className="flex flex-col gap-4 md:basis-3/5">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      className={CUSTOM_PROFILE_INPUT_CLASSNAME}
                      placeholder="Tên của bạn"
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
                      placeholder="0987654321"
                      {...field}
                      onChange={(ev) => field.onChange(ev.target.value !== '' ? ev.target.value : null)}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Birthday */}
            <FormField
              name="birthday"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Ngày sinh</FormLabel>
                  <DOBSelectGroup value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Giới tính</FormLabel>
                  <RadioGroup onValueChange={field.onChange} value={field.value ?? undefined} className="flex gap-6">
                    {GENDERS.map((item) => (
                      <FormItem key={item.value} className="flex items-center space-y-0">
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className="cursor-pointer pl-1.5 text-base font-medium">{item.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Facebook */}
            <FormField
              control={form.control}
              name="fb"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      className={cn(CUSTOM_PROFILE_INPUT_CLASSNAME)}
                      placeholder="Đường link facebook"
                      {...field}
                      onChange={(ev) => field.onChange(ev.target.value !== '' ? ev.target.value : null)}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-4 h-11 gap-1.5 rounded-full px-5 py-0 [&_svg]:size-5"
          disabled={isFormProcessing}
        >
          {updateProfileMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}
