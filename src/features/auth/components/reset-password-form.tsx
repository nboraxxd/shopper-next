'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useResetPasswordMutation } from '@/features/auth/hooks'
import { BadRequestError, handleClientErrorApi } from '@/shared/utils/error'
import { resetPasswordSchema, ResetPasswordType } from '@/features/auth/schemas'

import { InputWrapper } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { PasswordInput } from '@/features/auth/components'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'
import PATH from '@/shared/constants/path'

export default function ResetPasswordForm({ code }: { code: string }) {
  const router = useRouter()

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code,
      password: '',
      confirmPassword: '',
    },
  })

  const resetPasswordMutation = useResetPasswordMutation()

  async function onValid({ code, password }: ResetPasswordType) {
    if (resetPasswordMutation.isPending) return

    try {
      const response = await resetPasswordMutation.mutateAsync({ code, password })

      toast.success(response.payload.message, { duration: 5000 })
      router.push(PATH.LOGIN)
    } catch (error) {
      handleClientErrorApi({ error, setError: form.setError })
      if (error instanceof BadRequestError && error.payload.detail?.code) {
        toast.error(error.payload.detail.code)
      }
    }
  }

  return (
    <Form {...form}>
      <form className="mt-7 flex w-full shrink-0 flex-col" noValidate onSubmit={form.handleSubmit(onValid)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <InputWrapper>
                  <PasswordInput field={field} />
                </InputWrapper>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <InputWrapper>
                  <PasswordInput field={field} />
                </InputWrapper>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="mt-6 h-12 w-full gap-1.5 [&_svg]:size-5"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
          Đặt mật khẩu mới
        </Button>
      </form>
    </Form>
  )
}
