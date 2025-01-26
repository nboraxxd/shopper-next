import { Suspense } from 'react'

import {
  AccountInfoSection,
  AccountInfoSkeleton,
  AccountPaymentSection,
  AccountPaymentSkeleton,
} from '@/features/account/components'

export default async function AccountPage() {
  return (
    <>
      <Suspense fallback={<AccountPaymentSkeleton />}>
        <AccountPaymentSection />
      </Suspense>
      <Suspense fallback={<AccountInfoSkeleton />}>
        <AccountInfoSection />
      </Suspense>
    </>
  )
}
