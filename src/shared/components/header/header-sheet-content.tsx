'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import keyBy from 'lodash/keyBy'
import { usePathname, useRouter } from 'next/navigation'
import { ClipboardListIcon, LogInIcon, LogOutIcon, StoreIcon, UserRoundPlusIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { useLogoutMutation } from '@/features/auth/hooks'
import { useAuthStore } from '@/features/auth/auth-store'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useQueryCategories } from '@/features/category/hooks'
import { CATEGORY_IMAGES } from '@/features/category/constants'
import { extractCategorySlug } from '@/features/category/utils'

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet'
import ModeToggle from '@/shared/components/mode-toggle'
import { CartQuantity } from '@/shared/components/header'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { Button, ButtonProps } from '@/shared/components/ui/button'
import { ArrowLeftIcon, CartIcon, Svgr } from '@/shared/components/icons'

export default function HeaderSheetContent() {
  const authState = useAuthStore((state) => state.authState)

  return (
    <SheetContent side="left" className="gap-0 pb-6 pt-4">
      <SheetHeader className="flex h-sheet-header shrink-0 flex-col gap-2 border-b border-border px-4 pb-4 sm:pl-6">
        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 h-auto w-fit px-2 text-foreground/80 hover:text-foreground [&_svg]:size-8"
          >
            <Svgr icon={ArrowLeftIcon} width={32} height={32} />
            <span className="sr-only">Đóng menu điều hướng</span>
          </Button>
        </SheetClose>
        <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
        <SheetDescription className="sr-only">
          Menu điều hướng của trang web, bao gồm các liên kết đến các trang khác
        </SheetDescription>

        {authState === 'loading' ? (
          <>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex h-9 items-center gap-2 sm:gap-3 sm:px-4">
                <Skeleton className="size-6 rounded" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </>
        ) : null}

        {authState === 'unauthenticated' ? (
          <>
            <SheetButton asChild className="justify-center text-foreground/80 hover:text-foreground [&_span]:mt-0.5">
              <Link href={PATH.LOGIN}>
                <LogInIcon strokeWidth={2} />
                <span>Đăng nhập</span>
              </Link>
            </SheetButton>
            <SheetButton asChild className="justify-center text-foreground/80 hover:text-foreground [&_span]:mt-0.5">
              <Link href={PATH.REGISTER}>
                <UserRoundPlusIcon strokeWidth={2} />
                <span>Đăng ký</span>
              </Link>
            </SheetButton>
          </>
        ) : null}

        {authState === 'authenticated' ? (
          <>
            <SheetItem asChild className="text-foreground/80 hover:text-foreground [&_span]:mt-0.5">
              <Link href={PATH.CART}>
                <Svgr icon={CartIcon} strokeWidth={2} />
                <span>
                  Giỏ hàng (<CartQuantity />)
                </span>
              </Link>
            </SheetItem>
            <SheetItem asChild className="text-foreground/80 hover:text-foreground data-[slot=title]:*:mt-0.5">
              <Link href={PATH.ORDER_HISTORY}>
                <Svgr icon={ClipboardListIcon} />
                <span data-slot="title">Đơn mua</span>
              </Link>
            </SheetItem>
          </>
        ) : null}
      </SheetHeader>

      {/* 1rem is padding top, 1.5rem is padding bottom */}
      <ScrollArea className="h-[calc(100vh-var(--sheet-header-height)-var(--sheet-footer-height)-1rem-1.5rem)] px-4 sm:pl-6">
        <ScrollAreaContent />
      </ScrollArea>

      <SheetFooter className="flex h-sheet-footer shrink-0 flex-col gap-2 border-t border-border px-4 pt-4 sm:pl-6">
        {authState === 'authenticated' ? <LogoutButton /> : null}
        {/* <LogoutButton /> */}
        <div className="mt-auto self-end">
          <ModeToggle className="bg-footer" />
        </div>
      </SheetFooter>
    </SheetContent>
  )
}

function ScrollAreaContent() {
  const categoriesImage = keyBy(CATEGORY_IMAGES, 'id')

  const queryCategories = useQueryCategories()

  if (queryCategories.isError) return null

  return (
    <nav className="flex flex-col gap-2 py-4">
      {queryCategories.isLoading
        ? Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="flex h-9 items-center gap-2 sm:gap-3 sm:px-4">
              <Skeleton className="size-5 rounded xs:size-6" />
              <Skeleton className="h-5 w-3/4 xs:h-6" />
            </div>
          ))
        : null}

      {queryCategories.isSuccess ? (
        <>
          <SheetItem asChild categoryId="all" className="text-sm xs:text-base [&_svg]:size-5 xs:[&_svg]:size-6">
            <Link href={PATH.PRODUCTS}>
              <Svgr icon={StoreIcon} strokeWidth={2} />
              <span className="mt-0.5">Tất cả sản phẩm</span>
            </Link>
          </SheetItem>
          {queryCategories.data.payload.data.map((category) => {
            const categorySlug = extractCategorySlug(category.slug)
            const CategoryIcon = categoriesImage[category.id].icon
            return (
              <SheetItem
                asChild
                key={category.id}
                categoryId={category.id}
                className="text-sm xs:text-base [&_svg]:size-5 xs:[&_svg]:size-6"
              >
                <Link href={`/${categorySlug}/${category.id}`}>
                  <Svgr icon={CategoryIcon} strokeWidth={2} />
                  <span className="mt-0.5">{category.title}</span>
                </Link>
              </SheetItem>
            )
          })}
        </>
      ) : null}
    </nav>
  )
}

function SheetButton({ categoryId, className, children, ...rest }: ButtonProps & { categoryId?: number | 'all' }) {
  const pathname = usePathname()

  // TODO: Refactor this, it's not a good practice to use split('/') to get the current category id
  const currentCategoryId = pathname && pathname.split('/').length === 3 ? pathname.split('/')[2] : null

  return (
    <Button
      variant="ghost"
      className={cn(
        'h-9 shrink-0 justify-start whitespace-normal p-0 hover:text-highlight sm:gap-3 sm:px-4',
        className,
        {
          'text-highlight':
            (currentCategoryId && +currentCategoryId === categoryId) ||
            (pathname === PATH.PRODUCTS && categoryId === 'all'),
        }
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}

function SheetItem({ children, ...rest }: ButtonProps & { categoryId?: number | 'all' }) {
  return (
    <SheetClose asChild>
      <SheetButton {...rest}>{children}</SheetButton>
    </SheetClose>
  )
}

function LogoutButton() {
  const router = useRouter()

  const logoutMutation = useLogoutMutation()

  async function handleLogout() {
    if (logoutMutation.isPending) return

    try {
      const response = await logoutMutation.mutateAsync()

      router.refresh()
      toast.success(response.payload.message)
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  return (
    <SheetItem className="justify-center text-destructive/80 hover:text-destructive" onClick={handleLogout}>
      <LogOutIcon />
      <span className="mt-0.5">Đăng xuất</span>
    </SheetItem>
  )
}
