'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon, MailCheckIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { useForgotPasswordMutation } from '@/features/auth/hooks'
import { CUSTOM_INPUT_CLASSNAME } from '@/shared/constants/class-name'
import { BadRequestError, handleClientErrorApi } from '@/shared/utils/error'
import { forgotPasswordSchema, ForgotPasswordType } from '@/features/auth/schemas'

import { InputWrapper } from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { MailIcon, Svgr } from '@/shared/components/icons'
import { CountdownButton } from '@/features/auth/components'
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'
import envVariables from '@/shared/schemas/env-variables.schema'
import { useState } from 'react'

export default function ForgotPasswordForm() {
  const [isFirstSubmited, setIsFirstSubmited] = useState(false)
  const [enableCountdown, setEnableCountdown] = useState(false)

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: '',
    },
  })

  const forgotPasswordMutation = useForgotPasswordMutation()

  async function onValid({ username }: ForgotPasswordType) {
    if (forgotPasswordMutation.isPending || enableCountdown) return

    try {
      await forgotPasswordMutation.mutateAsync({
        username,
        redirect: `${envVariables.NEXT_PUBLIC_URL}${PATH.RESET_PASSWORD}`,
      })

      setEnableCountdown(true)
      setIsFirstSubmited(true)
    } catch (error) {
      if (error instanceof BadRequestError && !error.payload.detail) {
        form.setError('username', { type: z.ZodIssueCode.custom, message: error.payload.message })
      } else {
        handleClientErrorApi({ error, setError: form.setError })
      }
    }
  }

  return (
    <>
      {forgotPasswordMutation.isSuccess ? (
        <Alert variant="success" className="mb-7">
          <MailCheckIcon className="size-5" />
          <AlertTitle className="text-sm sm:text-base">Email đã được gửi.</AlertTitle>
          <AlertDescription className="mt-1">
            Vui lòng kiểm tra email để đặt lại mật khẩu. Bạn có thể đóng tab này.
          </AlertDescription>
        </Alert>
      ) : null}
      <Form {...form}>
        <form className="flex w-full shrink-0 flex-col gap-6" noValidate onSubmit={form.handleSubmit(onValid)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <InputWrapper>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="Email của bạn"
                    className={cn(CUSTOM_INPUT_CLASSNAME)}
                    required
                    {...field}
                  />
                  <Svgr icon={MailIcon} className="size-6 text-secondary-3" />
                </InputWrapper>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {!isFirstSubmited ? (
            <Button
              type="submit"
              className="h-12 w-full gap-1.5 [&_svg]:size-5"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
              Gửi
            </Button>
          ) : (
            <CountdownButton
              timer={60}
              type="submit"
              className="h-12 w-full gap-1.5 [&_svg]:size-5"
              disabled={forgotPasswordMutation.isPending}
              isLoading={forgotPasswordMutation.isPending}
              enableCountdown={enableCountdown}
              setEnableCountdown={setEnableCountdown}
            >
              Gửi lại email
            </CountdownButton>
          )}
        </form>
      </Form>
    </>
  )
}
