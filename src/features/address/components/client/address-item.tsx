'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2Icon } from 'lucide-react'

import PATH from '@/shared/constants/path'
import { cn, formatPhoneNumber } from '@/shared/utils'

import { Button } from '@/shared/components/ui/button'
import { PencilSquareIcon, Svgr } from '@/shared/components/icons'
import { NonDefaultAddressDropdown } from '@/features/address/components/client'

interface Props {
  id: string
  fullName: string
  address: string
  phone: string
  email: string
  isDefault: boolean
}

export default function AddressItem({ id, address, email, fullName, isDefault, phone }: Props) {
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <div
      className={cn('space-y-1.5 rounded-xl bg-address-item p-3 md:p-4', {
        'opacity-50': isDisabled,
      })}
    >
      <div className="flex items-start justify-between">
        {/*  Name and default address */}
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-[0.9375rem] font-medium">{fullName}</p>
          {isDefault ? (
            <div className="flex shrink-0 items-center gap-1 text-highlight">
              <CheckCircle2Icon className="size-4" />
              <span className="mt-0.5 text-xs font-medium">Địa chỉ mặc định</span>
            </div>
          ) : null}
        </div>

        {/* More actions */}
        {isDefault ? (
          <Button variant="ghost" size="icon" className="size-[1.375rem] hover:bg-account-highlight [&_svg]:size-4">
            <Link href={`${PATH.UPDATE_ADDRESS}/${id}`}>
              <Svgr icon={PencilSquareIcon} className="size-4" />
            </Link>
          </Button>
        ) : (
          <NonDefaultAddressDropdown id={id} isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
        )}
      </div>

      {/* Address */}
      <p className="text-sm">
        <span className="font-medium text-muted-foreground">Địa chỉ: </span>
        {address}
      </p>

      {/* Phone */}
      <p className="text-sm">
        <span className="font-medium text-muted-foreground">Điện thoại: </span>
        <span>{formatPhoneNumber(phone)}</span>
      </p>

      {/* Email */}
      <p className="line-clamp-1 break-all text-sm">
        <span className="font-medium text-muted-foreground">Email: </span>
        {email}
      </p>
    </div>
  )
}
