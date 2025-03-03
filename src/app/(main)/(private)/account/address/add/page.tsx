import { Metadata } from 'next'
import { Suspense } from 'react'

import PATH from '@/shared/constants/path'

import { AddressFormSkeleton } from '@/features/address/components/client'
import { AddNewAddressContent } from '@/features/address/components/server'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export const metadata: Metadata = {
  title: 'Thêm địa chỉ mới',
}

export default async function AddNewAddressPage() {
  return (
    <AccountSectionWrapper>
      <AccountHeader prevPath={PATH.ADDRESS}>Thêm địa chỉ mới</AccountHeader>
      <Suspense fallback={<AddressFormSkeleton />}>
        <AddNewAddressContent />
      </Suspense>
    </AccountSectionWrapper>
  )
}
