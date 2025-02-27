import { Metadata } from 'next'

import { CardTitle } from '@/shared/components/ui/card'
import { ResendVerificationEmailForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu',
}

export default function ResetPasswordPage() {
  return (
    <>
      <CardTitle className="mb-7 text-center text-xl font-medium">Đặt lại mật khẩu</CardTitle>
      <ResendVerificationEmailForm />
    </>
  )
}
