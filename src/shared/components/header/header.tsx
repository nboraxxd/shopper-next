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
import { ArrowLeftIcon, AlignLeftIcon, SearchIcon, ShopperIcon, CartIcon, ProfileIcon } from '@/shared/components/icons'
import { CategoriesDropdown } from '@/shared/components/header'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-header-height bg-header shadow-section">
      <div className="mx-auto flex h-full max-w-[calc(1340px+var(--container-gutter))] items-center gap-4 px-[calc(var(--container-gutter)*0.5)] lg:px-[var(--container-gutter)]">
        <div className="flex gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="group size-auto py-1.5 pl-0.5 pr-2.5 lg:hidden">
                <AlignLeftIcon className="transition-transform group-hover:scale-110" />
                <span className="sr-only">Menu điều hướng</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 pb-12 pt-0">
              <SheetHeader className="h-sheet-header-height justify-center">
                <SheetPrimitive.Close className="flex size-11 items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  <ArrowLeftIcon className="size-6" />
                  <span className="sr-only">Đóng menu điều hướng</span>
                </SheetPrimitive.Close>
                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu điều hướng của trang web, bao gồm các liên kết đến các trang khác
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="mx-auto flex items-center gap-2 p-1.5 md:mx-0 lg:gap-3.5 lg:p-2">
                  <ShopperIcon className="size-6 lg:size-8" />
                  <span className="text-lg font-bold lg:text-xl">Shopper</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Button size="icon" variant="ghost" className="group size-9 rounded-md md:hidden lg:size-12">
          <SearchIcon className="transition-transform group-hover:scale-110" />
        </Button>

        <Link href="/" className="mx-auto flex items-center gap-2 p-1.5 md:mx-0 lg:gap-3.5 lg:p-2">
          <ShopperIcon className="size-6 lg:size-8" />
          <span className="sr-only text-lg font-bold xs:not-sr-only lg:text-xl">Shopper</span>
        </Link>

        <CategoriesDropdown />

        <div className="mx-auto hidden max-w-[840px] flex-1 items-center rounded-lg border border-input bg-light-1 p-[3px] shadow-sm focus-within:ring-1 focus-within:ring-ring md:flex lg:p-[5px]">
          <Input className="h-7 border-none py-0 text-secondary-1 shadow-none focus-visible:ring-0 lg:h-9" />
          <Button size="icon" className="h-7 w-11 shrink-0 lg:h-9 lg:w-14 [&_svg]:size-4 lg:[&_svg]:size-5">
            <SearchIcon />
          </Button>
        </div>

        <Button
          variant="ghost"
          className="gap-1 rounded-lg bg-muted px-2 py-0 shadow transition-opacity hover:opacity-90 md:bg-popover md:px-4 lg:h-12 lg:gap-2 [&_svg]:size-6 lg:[&_svg]:size-8"
          asChild
        >
          <Link href={PATH.CART}>
            <CartIcon />
            <span>01</span>
            <span className="sr-only">Giỏ hàng</span>
          </Link>
        </Button>
        <Button
          size="lg"
          className="h-9 bg-muted px-1.5 text-foreground hover:bg-muted/75 md:bg-primary md:px-5 md:text-primary-foreground md:hover:bg-primary/90 lg:h-12"
          asChild
        >
          <Link href={PATH.LOGIN}>
            <ProfileIcon className="md:hidden" />
            <span className="sr-only md:not-sr-only">Đăng nhập</span>
          </Link>
        </Button>
        {/* </div> */}
      </div>
    </header>
  )
}
