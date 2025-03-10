import Link from 'next/link'
import { LucideProps } from 'lucide-react'
import lowerFirst from 'lodash/lowerFirst'

import PATH from '@/shared/constants/path'
import { cn, formatPhoneNumber } from '@/shared/utils'
import { ProfileResponse } from '@/features/profile/types'
import profileServerApi from '@/features/profile/api/server'
import addressServerApi from '@/features/address/api/server'
import { DefaultAddressResponse } from '@/features/address/types'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { CallingIcon, LocationIcon, MailIcon, PlusIcon, Svgr } from '@/shared/components/icons'

export async function AccountInfoContent({ accessToken }: { accessToken: string }) {
  let profile: ProfileResponse['data'] | null = null
  let defaultAddress: DefaultAddressResponse['data'] | null = null

  try {
    const [profileResponse, defaultAddressResponse] = await Promise.all([
      profileServerApi.getProfileFromBackend(accessToken),
      addressServerApi.getDefaultAddressFromBackend({ accessToken }),
    ])

    profile = profileResponse.payload.data
    defaultAddress = defaultAddressResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <>
      {profile?.username ? (
        <AccountInfoItem
          icon={MailIcon}
          title="Email"
          content={profile.username}
          contentClassName="line-clamp-1 break-all"
        />
      ) : null}
      {profile?.phone ? (
        <AccountInfoItem
          icon={CallingIcon}
          title="Số điện thoại"
          content={formatPhoneNumber(profile.phone)}
          contentClassName="line-clamp-1"
        />
      ) : null}
      {/* If user.phone is not available, show the phone number from the default address */}
      {!profile?.phone && defaultAddress?.[0] ? (
        <AccountInfoItem
          icon={CallingIcon}
          title="Số điện thoại"
          content={formatPhoneNumber(defaultAddress[0].phone)}
          contentClassName="line-clamp-1"
        />
      ) : null}
      {defaultAddress?.[0] ? (
        <AccountInfoItem
          icon={LocationIcon}
          title="Địa chỉ"
          content={`${defaultAddress[0].address}, ${lowerFirst(defaultAddress[0].district)}, ${lowerFirst(defaultAddress[0].province)}`}
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
        <h4 className={cn('mt-1 text-sm', contentClassName)}>{content}</h4>
      </div>
    </div>
  )
}

export function AccountInfoSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <Skeleton
      key={index}
      className="h-[4.625rem] rounded-xl md:last-of-type:h-[5.375rem] md:second-last-of-type:h-[5.375rem]"
    />
  ))
}
