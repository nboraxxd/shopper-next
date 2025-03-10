import { Metadata } from 'next'
import { Suspense } from 'react'

import { UpdateProfileContent } from '@/features/profile/components/server'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'
import { ChangePasswordForm, UpdateProfileSkeleton } from '@/features/profile/components/client'

export const metadata: Metadata = {
  title: 'Thông tin cá nhân',
}

export default function ProfilePage() {
  return (
    <>
      <AccountSectionWrapper>
        <h1 className="sr-only">Thông tin cá nhân</h1>
        <AccountHeader asChild>
          <h2>Chỉnh sửa thông tin cá nhân</h2>
        </AccountHeader>
        <Suspense fallback={<UpdateProfileSkeleton />}>
          <UpdateProfileContent />
        </Suspense>
      </AccountSectionWrapper>

      <AccountSectionWrapper className="mt-5 lg:mt-7">
        <h2 className="text-sm font-medium sm:text-lg">Đổi mật khẩu</h2>
        <ChangePasswordForm />
      </AccountSectionWrapper>
    </>
  )
}
