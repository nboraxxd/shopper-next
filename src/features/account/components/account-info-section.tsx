import { AccountSectionWrapper } from '@/features/account/components'
import addressServerApi from '@/features/address/api/server'
import { AddressesResponse } from '@/features/address/types'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import userServerApi from '@/features/user/api/server'
import { UserResponse } from '@/features/user/types'
import { MessageIcon, PlusIcon } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/ui/skeleton'
import PATH from '@/shared/constants/path'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export async function AccountInfoSection() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  let user: UserResponse['data'] | null = null
  let address: AddressesResponse['data'] | null = null

  try {
    const [userResponse, addressResponse] = await Promise.all([
      userServerApi.getUserFromBackend(accessToken),
      addressServerApi.getAddressesFromBackend({ accessToken, isDefault: true }),
    ])

    user = userResponse.payload.data
    address = addressResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <AccountSectionWrapper title="Thông tin tài khoản" className="mt-7">
      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        {user ? (
          <article className="flex items-center gap-2 rounded-xl bg-account-info p-2.5">
            <div className="flex size-[3.375rem] shrink-0 items-center justify-center rounded-lg bg-account-info-icon">
              <MessageIcon className="size-6" width={24} height={24} />
            </div>
            <div>
              <h3 className="text-[0.9375rem] font-medium">Địa chỉ email</h3>
              <p className="line-clamp-1 break-all text-sm">{user.username}</p>
            </div>
          </article>
        ) : null}
        {user ? (
          <article className="flex items-center gap-2 rounded-xl bg-account-info p-2.5">
            <div className="flex size-[3.375rem] shrink-0 items-center justify-center rounded-lg bg-account-info-icon">
              <MessageIcon className="size-6" width={24} height={24} />
            </div>
            <div>
              <h3 className="text-[0.9375rem] font-medium">Số điện thoại</h3>
              <p className="text-sm">{user.phone}</p>
            </div>
          </article>
        ) : null}
        {address && address.length === 1 ? (
          <article className="flex items-center gap-2 rounded-xl bg-account-info p-2.5">
            <div className="flex size-[3.375rem] shrink-0 items-center justify-center rounded-lg bg-account-info-icon">
              <MessageIcon className="size-6" width={24} height={24} />
            </div>
            <div>
              <h3 className="text-[0.9375rem] font-medium">Địa chỉ</h3>
              <p className="line-clamp-2 text-sm">
                {address[0].address}, {address[0].district}, {address[0].province}
              </p>
            </div>
          </article>
        ) : null}
        <Link
          href={PATH.ADD_PAYMENT}
          className="flex min-h-[4.625rem] flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-secondary-3"
        >
          <PlusIcon width={24} height={24} strokeWidth={1.5} />
          <span className="text-sm font-medium">Thêm địa chỉ</span>
        </Link>
      </div>
    </AccountSectionWrapper>
  )
}

export function AccountInfoSkeleton() {
  return (
    <AccountSectionWrapper title="Thông tin tài khoản" className="mt-7">
      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[4.625rem] rounded-xl" />
        ))}
      </div>
    </AccountSectionWrapper>
  )
}
