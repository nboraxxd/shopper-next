'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'nextjs-toploader/app'
import { usePathname, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, LoaderCircleIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { useLoginToServerMutation } from '@/features/auth/hooks'
import { LoginReqBody, loginSchema } from '@/features/auth/schemas'
import { CUSTOM_INPUT_CLASSNAME } from '@/shared/constants/class-name'
import { ForbiddenError, handleClientErrorApi } from '@/shared/utils/error'

import { InputWrapper } from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { MailIcon, Svgr } from '@/shared/components/icons'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'
import { AuthHelperLinks, LinkItem, PasswordInput } from '@/features/auth/components'

const HELPER_LINKS: [LinkItem, LinkItem] = [
  { href: PATH.RESEND_VERIFICATION_EMAIL, label: 'Gửi lại email xác thực' },
  { href: PATH.FORGOT_PASSWORD, label: 'Quên mật khẩu' },
]

export function LoginForm() {
  const [isNavigating, setIsNavigating] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  const form = useForm<LoginReqBody>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const loginToServerMutation = useLoginToServerMutation()

  async function onValid(values: LoginReqBody) {
    if (loginToServerMutation.isPending || isNavigating) return

    try {
      setIsNavigating(true)

      await loginToServerMutation.mutateAsync(values)

      const from = new URLSearchParams({ from: pathname })

      router.push(next ? `${next}?${from}` : PATH.HOME)
      router.refresh()
    } catch (error: any) {
      setIsNavigating(false)
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
        <div className="flex flex-col gap-6">
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
                    className={cn(CUSTOM_INPUT_CLASSNAME)}
                    required
                    {...field}
                  />
                  <Svgr icon={MailIcon} className="size-6 text-secondary-3" />
                </InputWrapper>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <Button
          type="submit"
          className="mt-7 h-12 w-full gap-1.5 [&_svg]:size-5"
          disabled={loginToServerMutation.isPending || isNavigating}
        >
          {loginToServerMutation.isPending || isNavigating ? <LoaderCircleIcon className="animate-spin" /> : null}
          Đăng nhập
        </Button>
        <AuthHelperLinks links={HELPER_LINKS} className="mt-5" />
      </form>
    </Form>
  )
}

export function LoginFormFallback() {
  return (
    <div className="mt-8 flex w-full shrink-0 flex-col">
      <InputWrapper>
        <Input readOnly placeholder="Email" className={cn(CUSTOM_INPUT_CLASSNAME)} />
        <Svgr icon={MailIcon} className="size-6 text-secondary-3" />
      </InputWrapper>
      <InputWrapper className="mt-7">
        <Input readOnly placeholder="••••••••" className={cn(CUSTOM_INPUT_CLASSNAME)} />
        <EyeIcon className="size-6 text-secondary-3" />
      </InputWrapper>
      <Button className="mt-7 h-12 w-full gap-1.5" disabled>
        Đăng nhập
      </Button>
      <AuthHelperLinks links={HELPER_LINKS} />
    </div>
  )
}
