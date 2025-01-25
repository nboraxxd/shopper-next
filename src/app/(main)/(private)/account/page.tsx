import { Suspense } from 'react'

import { AccountPaymentSection } from '@/features/account/components'

export default async function AccountPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AccountPaymentSection />
      </Suspense>
    </>
  )
}
