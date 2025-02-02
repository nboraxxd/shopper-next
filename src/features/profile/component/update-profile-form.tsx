'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { UpdateProfileReqBody, updateProfileSchema } from '@/features/profile/schemas'
import { validateGenderValue } from '@/features/profile/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUploadImageToBackendMutation } from '@/features/file/hooks'
import { ProfileResponse } from '@/features/profile/types'
import { UserAvatar } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Separator } from '@/shared/components/ui/separator'
import { cn } from '@/shared/utils'
import { handleClientErrorApi } from '@/shared/utils/error'
import BirthdaySelect from './birthday-select'

export default function UpdateProfileForm({ profile }: { profile: ProfileResponse['data'] }) {
  const [isDisableInput, setIsDisableInput] = useState(true)

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

  useEffect(() => {
    form.reset({
      name: profile.name,
      avatar: profile.avatar,
      birthday: profile.birthday,
      fb: profile.fb,
      gender: validateGenderValue(profile.gender),
      phone: profile.phone,
    })
    setIsDisableInput(false)
  }, [form, profile.avatar, profile.birthday, profile.fb, profile.gender, profile.name, profile.phone])

  const uploadImageMutation = useUploadImageToBackendMutation()

  async function handleChangeAvatar(ev: React.ChangeEvent<HTMLInputElement>) {
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
    console.log(values)
  }

  return (
    <Form {...form}>
      <form noValidate className="mt-3 md:mt-5" onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
        <div className="flex flex-col md:flex-row-reverse md:items-start">
          {/* Avatar */}
          <div className="flex justify-center md:basis-2/5 md:justify-start">
            <Separator orientation="vertical" className="mx-10 hidden h-auto md:block" />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="mx-auto md:py-7">
                  <div className="flex flex-col items-center">
                    <Input
                      placeholder="Chọn ảnh đại diện"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={avatarInputRef}
                      onChange={handleChangeAvatar}
                    />
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
                        className="size-24 shadow"
                        fallbackClassName="cursor-pointer bg-account-highlight text-3xl"
                      />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="mt-3 h-9 gap-1.5 bg-account-highlight/90 px-5 py-0 text-sm transition-colors hover:bg-account-highlight"
                      onClick={() => {
                        form.clearErrors('avatar')
                        avatarInputRef.current?.click()
                      }}
                    >
                      Chọn ảnh
                    </Button>
                    <FormDescription className="mt-2 italic">Kích thước ảnh tối đa: 1MB</FormDescription>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Other field */}
          <div className="flex flex-col gap-4 md:basis-3/5">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-lg font-medium">Tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        'h-11 rounded-xl font-medium transition-none placeholder:text-input-placeholder focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0'
                      )}
                      placeholder="Bruce Wayne"
                      autoComplete="name"
                      disabled={isDisableInput}
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
                  <FormLabel className="text-lg font-medium">Số điện thoại</FormLabel>
                  <Input
                    className={cn(
                      'h-11 rounded-xl font-medium transition-none placeholder:text-input-placeholder focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0'
                    )}
                    placeholder="0987654321"
                    {...field}
                    onChange={(ev) => field.onChange(ev.target.value !== '' ? ev.target.value : null)}
                    value={field.value ?? ''}
                  />
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
                  <FormLabel className="text-lg font-medium">Ngày sinh</FormLabel>
                  <BirthdaySelect value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Gender */}
            {/* <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="grid gap-3 space-y-0">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? undefined}
                          value={field.value ?? undefined}
                          className="flex flex-col gap-4 sm:h-9 sm:flex-row"
                        >
                          {GENDERS.map((item) => (
                            <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
            {/* Facebook */}
            <FormField
              control={form.control}
              name="fb"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-3">
                    <FormLabel htmlFor="fb">Facebook</FormLabel>
                    <Input
                      id="fb"
                      type="url"
                      className="w-full text-ellipsis"
                      placeholder="https://www.facebook.com/bruce.wayne"
                      {...field}
                      onChange={(ev) => field.onChange(ev.target.value !== '' ? ev.target.value : null)}
                      value={field.value ?? ''}
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 h-11 gap-1.5 rounded-full px-5 py-0">
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}
