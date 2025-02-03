import Link from 'next/link'
import { Slot } from '@radix-ui/react-slot'
import { Url } from 'next/dist/shared/lib/router/router'

import PATH from '@/shared/constants/path'

import { Button } from '@/shared/components/ui/button'
import { ArrowLeftIcon, Svgr } from '@/shared/components/icons'

interface Props extends React.ComponentProps<'h1'> {
  asChild?: boolean
  prevPath?: Url
}

export default function AccountHeader({ asChild, prevPath = PATH.ACCOUNT, ...rest }: Props) {
  const Comp = asChild ? Slot : 'h1'

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="size-7 rounded-full transition-colors hover:bg-account-highlight sm:size-9 [&_svg]:size-5 [&_svg]:sm:size-6"
        asChild
      >
        <Link href={prevPath}>
          <Svgr icon={ArrowLeftIcon} />
          <span className="sr-only">Quay lại trang tài khoản</span>
        </Link>
      </Button>
      <Comp className="text-sm font-medium sm:text-lg" {...rest} />
    </div>
  )
}
