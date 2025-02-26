import Link from 'next/link'
import * as SheetPrimitive from '@radix-ui/react-dialog'

import PATH from '@/shared/constants/path'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { AuthButton, CartQuantity, CategoryHover } from '@/shared/components/header'
import { ArrowLeftIcon, AlignLeftIcon, SearchIcon, ShopperIcon, CartIcon, Svgr } from '@/shared/components/icons'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-header-height bg-header shadow-section">
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
            <SheetContent side="left" className="p-4 pb-12 pt-0">
              <SheetHeader className="h-sheet-header-height justify-center">
                <SheetPrimitive.Close className="flex size-11 items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  <Svgr icon={ArrowLeftIcon} />
                  <span className="sr-only">Đóng menu điều hướng</span>
                </SheetPrimitive.Close>
                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu điều hướng của trang web, bao gồm các liên kết đến các trang khác
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href={PATH.HOME} className="mx-auto flex items-center gap-2 p-1.5 md:mx-0 lg:gap-3.5 lg:p-2">
                  <Svgr icon={ShopperIcon} width={32} height={32} className="size-6 text-secondary-blue lg:size-8" />
                  <span className="text-lg font-bold lg:text-xl">Shopper</span>
                </Link>
              </nav>
            </SheetContent>
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
