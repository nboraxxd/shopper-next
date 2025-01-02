import Link from 'next/link'
import * as SheetPrimitive from '@radix-ui/react-dialog'

import { NAVBAR } from '@/app/(main)/constants'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, HamburgerIcon, SearchIcon, ShopperIcon } from '@/assets/icons'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-header-height bg-header shadow-section">
      <div className="container flex h-full items-center gap-4">
        <div className="flex gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="group size-auto py-1.5 pl-0.5 pr-2.5 md:mr-6 lg:hidden">
                <HamburgerIcon className="transition-transform group-hover:scale-110" />
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
                  <span className="text-bold-18 lg:text-bold-22">Shopper</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="mx-auto flex items-center gap-2 p-1.5 md:mx-0 lg:gap-3.5 lg:p-2">
          <ShopperIcon className="size-6 lg:size-8" />
          <span className="text-bold-18 lg:text-bold-22">Shopper</span>
        </Link>

        <nav className="max-lg:hidden lg:ml-10 xl:ml-32">
          <ul className="flex items-center">
            {NAVBAR.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="flex items-center px-4 py-2 text-medium-15">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 md:ml-auto">
          <Button size="icon" variant="ghost" className="group size-9 rounded-md lg:size-12">
            <SearchIcon className="transition-transform group-hover:scale-110" />
          </Button>
          <Button
            size="lg"
            className="h-9 md:bg-secondary md:text-secondary-foreground md:hover:bg-secondary/80 lg:h-12"
            asChild
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>
          <Button size="lg" className="hidden h-9 md:inline-flex lg:h-12" asChild>
            <Link href="/register">Đăng ký</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
