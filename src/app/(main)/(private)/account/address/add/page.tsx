import { Suspense } from 'react'

import PATH from '@/shared/constants/path'

import { AddAddressContent } from '@/features/address/components/server'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export default async function AddNewAddressPage() {
  return (
    <AccountSectionWrapper>
      <AccountHeader prevPath={PATH.ADDRESS}>Thêm địa chỉ mới</AccountHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <AddAddressContent />
      </Suspense>
    </AccountSectionWrapper>
  )
}
