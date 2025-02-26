'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon, MailCheckIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import envVariables from '@/shared/schemas/env-variables.schema'
import { registerSchema, RegisterType } from '@/features/auth/schemas'
import { CUSTOM_INPUT_CLASSNAME } from '@/shared/constants/class-name'
import { BadRequestError, handleClientErrorApi } from '@/shared/utils/error'
import { useRegisterToBackendMutation, useResendVerificationEmailMutation } from '@/features/auth/hooks'

import { InputWrapper } from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { MailIcon, Svgr } from '@/shared/components/icons'
import { AuthHelperLinks, PasswordInput } from '@/features/auth/components'
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'

export default function RegisterForm() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useRegisterToBackendMutation()
  const resendEmailMutation = useResendVerificationEmailMutation()

  async function onValid({ name, password, username }: RegisterType) {
    if (registerMutation.isPending || registerMutation.isSuccess) return

    try {
      await registerMutation.mutateAsync({
        name,
        password,
        username,
        redirect: `${envVariables.NEXT_PUBLIC_URL}/${PATH.VERIFY_ACCOUNT}`,
      })
    } catch (error: any) {
      if (error instanceof BadRequestError && !error.payload.detail) {
        form.setError('username', { type: z.ZodIssueCode.custom, message: error.payload.message })
      } else {
        handleClientErrorApi({ error, setError: form.setError })
      }
    }
  }

  async function handleResendEmail() {
    if (resendEmailMutation.isPending) return

    form.clearErrors('username')

    try {
      const response = await resendEmailMutation.mutateAsync(form.getValues('username'))

      toast.success(response.payload.message)
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  return (
    <>
      {registerMutation.isSuccess ? (
        <Alert variant="success" className="mt-4 md:mt-7">
          <MailCheckIcon className="size-5" />
          <AlertTitle className="text-sm sm:text-base">Đăng ký tài khoản thành công!</AlertTitle>
          <AlertDescription className="mt-1">
            Vui lòng kiểm tra email để xác nhận tài khoản. Bạn có thể đóng tab này.
          </AlertDescription>
        </Alert>
      ) : null}

      <Form {...form}>
        <form className="mt-4 flex w-full shrink-0 flex-col md:mt-7" noValidate onSubmit={form.handleSubmit(onValid)}>
          <div className="flex flex-col gap-5">
            {!registerMutation.isSuccess ? (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <InputWrapper>
                      <Input
                        autoComplete="name"
                        placeholder="Tên của bạn"
                        className={cn(CUSTOM_INPUT_CLASSNAME)}
                        required
                        {...field}
                      />
                    </InputWrapper>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <InputWrapper>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      className={cn(CUSTOM_INPUT_CLASSNAME, { '!opacity-80': registerMutation.isSuccess })}
                      required
                      {...field}
                      readOnly={registerMutation.isSuccess}
                      disabled={field.disabled || registerMutation.isSuccess}
                      onChange={(ev) => {
                        if (registerMutation.isSuccess) return
                        field.onChange(ev)
                      }}
                    />
                    <Svgr icon={MailIcon} className="size-6 text-secondary-3" />
                  </InputWrapper>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!registerMutation.isSuccess ? (
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
            ) : null}

            {!registerMutation.isSuccess ? (
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
            ) : null}
          </div>

          {!registerMutation.isSuccess ? (
            <Button
              type="submit"
              className="mt-7 h-12 w-full gap-1.5 [&_svg]:size-5"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
              Đăng ký
            </Button>
          ) : (
            <Button
              type="button"
              className="mt-7 h-12 w-full gap-1.5 [&_svg]:size-5"
              onClick={handleResendEmail}
              disabled={resendEmailMutation.isPending}
            >
              {resendEmailMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
              Gửi lại email xác thực
            </Button>
          )}

          <AuthHelperLinks
            links={[
              { href: PATH.RESEND_VERIFICATION_EMAIL, label: 'Gửi lại email xác thực' },
              { href: PATH.SUPPORT, label: 'Bạn cần hỗ trợ?' },
            ]}
            className="mt-5"
          />
        </form>
      </Form>
    </>
  )
}
