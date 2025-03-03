import { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ACCESS_TOKEN } from '@/features/auth/constants'
import PATH from '@/shared/constants/path'

import { AddressFormSkeleton } from '@/features/address/components/client'
import { UpdateAddressContent } from '@/features/address/components/server'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export const metadata: Metadata = {
  title: 'Cập nhật địa chỉ',
}

export default async function UpdateAddressPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, cookieStore] = await Promise.all([params, cookies()])

  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  return (
    <AccountSectionWrapper>
      <AccountHeader prevPath={PATH.ADDRESS}>Cập nhật địa chỉ</AccountHeader>
      <Suspense fallback={<AddressFormSkeleton />}>
        <UpdateAddressContent id={id} accessToken={accessToken} />
      </Suspense>
    </AccountSectionWrapper>
  )
}
