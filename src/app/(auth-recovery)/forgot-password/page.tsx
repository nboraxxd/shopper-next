import { Metadata } from 'next'

import { CardDescription, CardTitle } from '@/shared/components/ui/card'
import { ForgotPasswordForm, RecoveryHelperLinks } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
}

export default function ResetPasswordPage() {
  return (
    <>
      <CardTitle className="text-center text-xl font-medium">Quên mật khẩu?</CardTitle>
      <CardDescription className="mb-7 mt-1 text-balance text-center">
        Đừng lo, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu cho bạn.
      </CardDescription>
      <ForgotPasswordForm />
      <RecoveryHelperLinks />
    </>
  )
}
