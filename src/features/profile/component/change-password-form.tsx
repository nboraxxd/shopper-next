'use client'

import { ChangePasswordReqBody, changePasswordSchema } from '@/features/profile/schemas'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { CUSTOM_PROFILE_LABEL_CLASSNAME } from '@/features/profile/constants'
import { InputWrapper } from '@/shared/components'
import { PasswordInput } from '@/features/auth/components'
import { useChangePasswordToBackendMutation } from '@/features/profile/hooks'
import { LoaderCircleIcon } from 'lucide-react'
import { ForbiddenError, handleClientErrorApi } from '@/shared/utils/error'
import { toast } from 'sonner'

export default function ChangePasswordForm() {
  const form = useForm<ChangePasswordReqBody>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const changePasswordMutation = useChangePasswordToBackendMutation()

  async function onSubmit(values: ChangePasswordReqBody) {
    if (changePasswordMutation.isPending) return

    const { currentPassword, newPassword } = values

    try {
      await changePasswordMutation.mutateAsync({ currentPassword, newPassword })

      form.reset()
      toast.success('Đổi mật khẩu thành công')
    } catch (error) {
      if (error instanceof ForbiddenError) {
        form.setError(error.payload.message.includes('Password cũ không đúng') ? 'currentPassword' : 'newPassword', {
          type: 'server',
          message: error.payload.message,
        })
      } else {
        handleClientErrorApi({ error, setError: form.setError })
      }
    }
  }

  return (
    <Form {...form}>
      <form noValidate className="mx-auto mt-3 max-w-lg space-y-4 md:mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Current password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className={CUSTOM_PROFILE_LABEL_CLASSNAME}>Mật khẩu hiện tại</FormLabel>
              <InputWrapper className="h-11">
                <PasswordInput field={field} />
              </InputWrapper>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className={CUSTOM_PROFILE_LABEL_CLASSNAME}>Mật khẩu mới</FormLabel>
              <InputWrapper className="h-11">
                <PasswordInput field={field} />
              </InputWrapper>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm new password */}
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className={CUSTOM_PROFILE_LABEL_CLASSNAME}>Nhập lại mật khẩu mới</FormLabel>
              <InputWrapper className="h-11">
                <PasswordInput field={field} />
              </InputWrapper>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="h-11 gap-1.5 rounded-full px-5 py-0 [&_svg]:size-5"
          disabled={changePasswordMutation.isPending}
        >
          {changePasswordMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
          Lưu thay đổi
        </Button>
      </form>
    </Form>
  )
}
