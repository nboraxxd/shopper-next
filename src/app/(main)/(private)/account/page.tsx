import { Suspense } from 'react'

import {
  AccountInfoContent,
  AccountInfoSkeleton,
  AccountPaymentContent,
  AccountPaymentSkeleton,
  AccountOrderCountContent,
  AccountContainer,
  AccountOrderCountSkeleton,
  AccountWishlistContent,
  AccountWishlistSkeleton,
  AccountSectionWrapper,
} from '@/features/account/components'

export default async function AccountPage() {
  return (
    <AccountSectionWrapper>
      <h1 className="sr-only">Tài khoản</h1>
      <AccountContainer title="Thẻ thanh toán">
        <div className="mt-4 grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 md:gap-5">
          <Suspense fallback={<AccountPaymentSkeleton />}>
            <AccountPaymentContent />
          </Suspense>
        </div>
      </AccountContainer>

      <AccountContainer title="Thông tin tài khoản" className="mt-5 md:mt-7">
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Suspense fallback={<AccountInfoSkeleton />}>
            <AccountInfoContent />
          </Suspense>
        </div>
      </AccountContainer>

      <AccountContainer title="Đơn mua" className="mt-5 md:mt-7">
        <ul className="mt-4 grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-4">
          <Suspense fallback={<AccountOrderCountSkeleton />}>
            <AccountOrderCountContent />
          </Suspense>
        </ul>
      </AccountContainer>

      <AccountContainer title="Sản phẩm yêu thích" className="mt-5 md:mt-7">
        <Suspense fallback={<AccountWishlistSkeleton />}>
          <AccountWishlistContent />
        </Suspense>
      </AccountContainer>
    </AccountSectionWrapper>
  )
}
