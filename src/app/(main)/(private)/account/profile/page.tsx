import { UpdateProfileContent } from '@/features/profile/component'
import { ArrowLeftIcon, Svgr } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui/button'
import PATH from '@/shared/constants/path'
import Link from 'next/link'
import { Suspense } from 'react'

export default function ProfilePage() {
  return (
    <>
      <h1 className="sr-only">Thông tin cá nhân</h1>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 rounded-full transition-colors hover:bg-account-highlight sm:size-9 [&_svg]:size-5 [&_svg]:sm:size-6"
          asChild
        >
          <Link href={PATH.ACCOUNT}>
            <Svgr icon={ArrowLeftIcon} />
            <span className="sr-only">Quay lại trang tài khoản</span>
          </Link>
        </Button>
        <h2 className="text-sm font-medium sm:text-lg">Chỉnh sửa thông tin cá nhân</h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateProfileContent />
      </Suspense>
    </>
  )
}
