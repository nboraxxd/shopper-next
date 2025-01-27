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
import { CallingIcon, LocationIcon, MailIcon, PlusIcon, Svgr } from '@/shared/components/icons'

export async function AccountInfoContent() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  let user: UserResponse['data'] | null = null
  let defaultAddress: AddressesResponse['data'] | null = null

  try {
    const [userResponse, addressResponse] = await Promise.all([
      userServerApi.getUserFromBackend(accessToken),
      addressServerApi.getAddressesFromBackend({ accessToken, isDefault: true }),
    ])

    user = userResponse.payload.data
    defaultAddress = addressResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <>
      {user?.username ? (
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
      {/* If user.phone is not available, show the phone number from the default address */}
      {!user?.phone && defaultAddress && defaultAddress.length >= 1 ? (
        <AccountInfoItem
          icon={CallingIcon}
          title="Số điện thoại"
          content={
            defaultAddress[0].phone.length >= 10
              ? `${defaultAddress[0].phone.slice(0, 4)} ${defaultAddress[0].phone.slice(4, 7)} ${defaultAddress[0].phone.slice(7, 10)} ${defaultAddress[0].phone.slice(10)}`
              : defaultAddress[0].phone
          }
          contentClassName="line-clamp-1"
        />
      ) : null}
      {defaultAddress && defaultAddress.length >= 1 ? (
        <AccountInfoItem
          icon={LocationIcon}
          title="Địa chỉ"
          content={`${defaultAddress[0].address}, ${defaultAddress[0].district}, ${defaultAddress[0].province}`}
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
    </>
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
  return Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-[4.625rem] rounded-xl" />)
}
