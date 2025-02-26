import { Metadata } from 'next'

import { CardTitle } from '@/shared/components/ui/card'
import { ResendVerificationEmailForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Gửi lại email xác thực',
}

export default function ResendVerificationEmailPage() {
  return (
    <>
      <CardTitle className="mb-7 text-center text-xl font-medium">Gửi lại email xác thực</CardTitle>
      <ResendVerificationEmailForm />
    </>
  )
}
