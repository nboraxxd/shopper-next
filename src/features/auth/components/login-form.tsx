'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'nextjs-toploader/app'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, LoaderCircleIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { useLoginToServerMutation } from '@/features/auth/hooks'
import { AUTH_INPUT_CLASSNAME } from '@/features/auth/constants'
import { LoginReqBody, loginReqBodySchema } from '@/features/auth/schemas'
import { ForbiddenError, handleClientErrorApi } from '@/shared/utils/error'

import { TextLink } from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { MessageIcon } from '@/shared/components/icons'
import { AuthInputWrapper, PasswordInput } from '@/features/auth/components'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'

export function LoginForm() {
  const router = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)

  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  const form = useForm<LoginReqBody>({
    resolver: zodResolver(loginReqBodySchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const loginToServerMutation = useLoginToServerMutation()

  async function onValid(values: LoginReqBody) {
    if (loginToServerMutation.isPending || isDisabled) return

    try {
      setIsDisabled(true)

      await loginToServerMutation.mutateAsync(values)

      router.push(next || PATH.HOME)
    } catch (error: any) {
      setIsDisabled(false)
      if (error instanceof ForbiddenError) {
        form.setError('password', { type: z.ZodIssueCode.custom, message: error.payload.message })
      } else {
        handleClientErrorApi({ error, setError: form.setError })
      }
    }
  }

  return (
    <Form {...form}>
      <form className="mt-8 flex w-full shrink-0 flex-col" noValidate onSubmit={form.handleSubmit(onValid)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2">
                <AuthInputWrapper>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className={cn(AUTH_INPUT_CLASSNAME)}
                    required
                    {...field}
                  />
                  <MessageIcon className="size-6 text-secondary-3" />
                </AuthInputWrapper>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-7">
              <div className="grid gap-2">
                <AuthInputWrapper>
                  <PasswordInput field={field} />
                </AuthInputWrapper>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-7 h-12 w-full gap-1.5"
          disabled={loginToServerMutation.isPending || isDisabled}
        >
          {loginToServerMutation.isPending || isDisabled ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
          Đăng nhập
        </Button>
        <LoginHelpLinks />
      </form>
    </Form>
  )
}

export function LoginFormFallback() {
  return (
    <div className="mt-8 flex w-full shrink-0 flex-col">
      <AuthInputWrapper>
        <Input readOnly placeholder="Email" className={cn(AUTH_INPUT_CLASSNAME)} />
        <MessageIcon className="size-6 text-secondary-3" />
      </AuthInputWrapper>
      <AuthInputWrapper className="mt-7">
        <Input readOnly placeholder="Mật khẩu" className={cn(AUTH_INPUT_CLASSNAME)} />
        <EyeIcon className="size-6 text-secondary-3" />
      </AuthInputWrapper>
      <Button className="mt-7 h-12 w-full gap-1.5" disabled>
        Đăng nhập
      </Button>
      <LoginHelpLinks />
    </div>
  )
}

function LoginHelpLinks() {
  return (
    <div className="mt-5 flex items-center gap-1 place-self-end text-sm xs:gap-1.5 xs:text-base">
      <TextLink href={PATH.FORGOT_PASSWORD}>Quên mật khẩu</TextLink>
      <span className="text-link">•</span>
      <TextLink href={PATH.RESEND_VERIFY_EMAIL}>Gửi lại email xác thực</TextLink>
    </div>
  )
}
