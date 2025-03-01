import Link from 'next/link'
import { Suspense } from 'react'

import PATH from '@/shared/constants/path'
import { getAccessTokenInServer } from '@/shared/utils/server'

import { PlusIcon, Svgr } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { AddressContent } from '@/features/address/components/server'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export default async function AddressPage() {
  const accessToken = await getAccessTokenInServer()

  return (
    <AccountSectionWrapper className="h-full">
      <AccountHeader>Sổ địa chỉ</AccountHeader>
      <Link
        href={PATH.ADD_ADDRESS}
        className="mt-3 flex h-20 items-center justify-center gap-3.5 rounded-xl border border-dashed border-secondary-3 md:mt-5"
      >
        <Svgr icon={PlusIcon} />
        <span className="text-sm font-medium">Thêm địa chỉ mới</span>
      </Link>

      <div className="mt-3 space-y-3 md:mt-5 md:space-y-4">
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[8.875rem] rounded-xl md:h-[8.125rem]" />
          ))}
        >
          <AddressContent accessToken={accessToken} />
        </Suspense>
      </div>
    </AccountSectionWrapper>
  )
}
