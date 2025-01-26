import { Suspense } from 'react'

import { AccountPaymentSection, AccountPaymentSkeleton } from '@/features/account/components'

export default async function AccountPage() {
  return (
    <>
      <Suspense fallback={<AccountPaymentSkeleton />}>
        <AccountPaymentSection />
      </Suspense>
    </>
  )
}
