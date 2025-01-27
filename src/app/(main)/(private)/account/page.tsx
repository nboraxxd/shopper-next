import { Suspense } from 'react'

import {
  AccountInfoSection,
  AccountInfoSkeleton,
  AccountPaymentSection,
  AccountPaymentSkeleton,
  AccountPurchasesSection,
} from '@/features/account/components'
import AccountWishlistSection from '@/features/account/components/account-wishlist-section'

export default async function AccountPage() {
  return (
    <>
      <Suspense fallback={<AccountPaymentSkeleton />}>
        <AccountPaymentSection />
      </Suspense>
      <Suspense fallback={<AccountInfoSkeleton />}>
        <AccountInfoSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <AccountPurchasesSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <AccountWishlistSection />
      </Suspense>
    </>
  )
}
