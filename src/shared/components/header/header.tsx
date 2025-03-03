import Link from 'next/link'

import PATH from '@/shared/constants/path'

import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Sheet, SheetTrigger } from '@/shared/components/ui/sheet'
import { AlignLeftIcon, CartIcon, SearchIcon, ShopperIcon, Svgr } from '@/shared/components/icons'
import { AuthButton, CartQuantity, CategoryHover, HeaderSheetContent } from '@/shared/components/header'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-header bg-header shadow-section">
      <div className="mx-auto flex h-full max-w-[calc(1340px+var(--container-gutter))] items-center gap-4 px-[calc(var(--container-gutter)*0.5)] lg:px-[var(--container-gutter)]">
        <div className="flex gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 transition-colors hover:bg-header-button/90 lg:hidden"
              >
                <Svgr icon={AlignLeftIcon} strokeWidth={2} />
                <span className="sr-only">Menu điều hướng</span>
              </Button>
            </SheetTrigger>
            <HeaderSheetContent />
          </Sheet>
        </div>

        <Button size="icon" variant="ghost" className="group size-10 rounded-md md:hidden lg:size-12">
          <Svgr icon={SearchIcon} className="transition-transform group-hover:scale-110" />
        </Button>

        <Link
          href={PATH.HOME}
          className="mx-auto flex h-10 items-center gap-2 px-1.5 md:mx-0 lg:h-12 lg:gap-3.5 lg:px-2"
        >
          <Svgr icon={ShopperIcon} width={32} height={32} className="size-6 text-secondary-blue lg:size-8" />
          <span className="sr-only text-lg font-bold xs:not-sr-only lg:text-xl">Shopper</span>
        </Link>

        <CategoryHover />

        <div className="mx-auto hidden h-10 max-w-[840px] flex-1 items-center rounded-lg border border-input bg-light-1 p-1 shadow-sm focus-within:shadow-focus-within md:flex lg:h-12">
          <Input className="h-full border-none py-0 text-secondary-1 shadow-none focus-visible:ring-0" />
          <Button size="icon" className="h-full w-11 shrink-0 lg:w-14 [&_svg]:size-4 lg:[&_svg]:size-5">
            <Svgr icon={SearchIcon} strokeWidth={2} />
          </Button>
        </div>

        <Button
          variant="ghost"
          className="h-10 gap-1 rounded-lg bg-header-button px-1.5 py-0 shadow transition-colors hover:bg-header-button/90 md:px-2 lg:h-12 [&_svg]:size-6 lg:[&_svg]:size-8"
          asChild
        >
          <Link href={PATH.CART}>
            <Svgr icon={CartIcon} />
            <CartQuantity />
            <span className="sr-only">Giỏ hàng</span>
          </Link>
        </Button>

        <AuthButton />
      </div>
    </header>
  )
}
