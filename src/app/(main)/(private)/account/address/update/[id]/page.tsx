import { Suspense } from 'react'

import { UpdateAddressContent } from '@/features/address/components/server'

import { ACCESS_TOKEN } from '@/features/auth/constants'
import PATH from '@/shared/constants/path'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export default async function UpdateAddressPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, cookieStore] = await Promise.all([params, cookies()])

  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  return (
    <AccountSectionWrapper>
      <AccountHeader prevPath={PATH.ADDRESS}>Cập nhật địa chỉ</AccountHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateAddressContent id={id} accessToken={accessToken} />
      </Suspense>
    </AccountSectionWrapper>
  )
}
