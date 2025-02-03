import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'
import { PlusIcon, Svgr } from '@/shared/components/icons'
import PATH from '@/shared/constants/path'
import Link from 'next/link'

export default function AddressPage() {
  return (
    <AccountSectionWrapper>
      <AccountHeader>Sổ địa chỉ</AccountHeader>
      <Link
        href={PATH.ADD_ADDRESS}
        className="mt-3 flex h-20 items-center justify-center gap-3.5 rounded-xl border border-dashed border-secondary-3 md:mt-5"
      >
        <Svgr icon={PlusIcon} />
        <span className="text-sm font-medium">Thêm địa chỉ mới</span>
      </Link>
    </AccountSectionWrapper>
  )
}
