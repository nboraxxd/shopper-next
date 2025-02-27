'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/shared/utils'
import { CUSTOM_INPUT_CLASSNAME } from '@/shared/constants/class-name'
import { useResendVerificationEmailMutation } from '@/features/auth/hooks'
import { BadRequestError, handleClientErrorApi } from '@/shared/utils/error'
import { ResendVerificationEmailReqBody, resendVerificationEmailSchema } from '@/features/auth/schemas'

import { InputWrapper } from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { MailIcon, Svgr } from '@/shared/components/icons'
import { Form, FormField, FormItem, FormMessage } from '@/shared/components/ui/form'

export default function ResendVerificationEmailForm() {
  const form = useForm<ResendVerificationEmailReqBody>({
    resolver: zodResolver(resendVerificationEmailSchema),
    defaultValues: {
      username: '',
    },
  })

  const resendEmailMutation = useResendVerificationEmailMutation()

  async function onValid({ username }: ResendVerificationEmailReqBody) {
    if (resendEmailMutation.isPending) return

    try {
      const response = await resendEmailMutation.mutateAsync(username)

      toast.success(response.payload.message)
    } catch (error) {
      if (error instanceof BadRequestError && !error.payload.detail) {
        form.setError('username', { type: z.ZodIssueCode.custom, message: error.payload.message })
      } else {
        handleClientErrorApi({ error, setError: form.setError })
      }
    }
  }

  return (
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
                  placeholder="Email đã đăng ký"
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

        <Button type="submit" className="h-12 w-full gap-1.5 [&_svg]:size-5" disabled={resendEmailMutation.isPending}>
          {resendEmailMutation.isPending ? <LoaderCircleIcon className="animate-spin" /> : null}
          Gửi
        </Button>
      </form>
    </Form>
  )
}
