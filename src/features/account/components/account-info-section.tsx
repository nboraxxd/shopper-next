import Link from 'next/link'
import { cookies } from 'next/headers'
import { LucideProps } from 'lucide-react'
import { redirect } from 'next/navigation'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { UserResponse } from '@/features/user/types'
import userServerApi from '@/features/user/api/server'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import { AddressesResponse } from '@/features/address/types'
import addressServerApi from '@/features/address/api/server'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { AccountSectionWrapper } from '@/features/account/components'
import { CallingIcon, LocationIcon, MailIcon, PlusIcon, Svgr } from '@/shared/components/icons'

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
          <AccountInfoItem
            icon={MailIcon}
            title="Email"
            content={user.username}
            contentClassName="line-clamp-1 break-all"
          />
        ) : null}
        {user?.phone ? (
          <AccountInfoItem
            icon={CallingIcon}
            title="Số điện thoại"
            content={
              user.phone.length >= 10
                ? `${user.phone.slice(0, 4)} ${user.phone.slice(4, 7)} ${user.phone.slice(7, 10)} ${user.phone.slice(10)}`
                : user.phone
            }
            contentClassName="line-clamp-1"
          />
        ) : null}
        {address && address.length === 1 ? (
          <AccountInfoItem
            icon={LocationIcon}
            title="Địa chỉ"
            content={`${address[0].address}, ${address[0].district}, ${address[0].province}`}
            contentClassName="line-clamp-2"
          />
        ) : null}
        <Link
          href={PATH.ADD_ADDRESS}
          className="flex min-h-[4.625rem] flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-secondary-3"
        >
          <Svgr icon={PlusIcon} />
          <span className="text-sm font-medium">Thêm địa chỉ</span>
        </Link>
      </div>
    </AccountSectionWrapper>
  )
}

interface AccountInfoItemProps {
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  title: string
  content: string
  contentClassName?: string
}

function AccountInfoItem({ icon, title, content, contentClassName }: AccountInfoItemProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-account-info p-2.5">
      <div className="flex size-[3.375rem] shrink-0 items-center justify-center rounded-lg bg-account-info-icon">
        <Svgr icon={icon} className="size-6" />
      </div>
      <div>
        <h3 className="text-[0.9375rem] font-medium">{title}</h3>
        <h4 className={cn('text-sm', contentClassName)}>{content}</h4>
      </div>
    </div>
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
