import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { SearchParamsPromise } from '@/shared/types'

import { CardTitle } from '@/shared/components/ui/card'
import { RecoveryHelperLinks, ResetPasswordForm } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu',
}

export default async function ResetPasswordPage(props: { searchParams: SearchParamsPromise }) {
  const searchParams = await props.searchParams

  const code = searchParams.code

  if (!code || typeof code !== 'string') {
    redirect(PATH.HOME)
  }

  return (
    <>
      <CardTitle className="text-center text-xl font-medium">Đặt lại mật khẩu</CardTitle>
      <ResetPasswordForm code={code} />
      <RecoveryHelperLinks />
    </>
  )
}
