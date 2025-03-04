'use client'

import omit from 'lodash/omit'
import queryString from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/shared/utils'
import { useIsClient, useMediaQuery } from '@/shared/hooks'
import { PRODUCT_LIST_SORT } from '@/features/product/constants'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Label } from '@/shared/components/ui/label'
import { ChevronDownIcon, Svgr } from '@/shared/components/icons'
import { Button, ButtonProps } from '@/shared/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

export default function ProductListSort() {
  const searchParams = useSearchParams()

  const isClient = useIsClient()

  const validSort = PRODUCT_LIST_SORT.find(({ value }) => value === searchParams.get('sort'))

  if (!isClient) return <TriggerButton disabled>{validSort?.name ?? 'Sắp xếp'}</TriggerButton>

  return <ProductListSortContent validSort={validSort} />
}

function ProductListSortContent({ validSort }: { validSort?: (typeof PRODUCT_LIST_SORT)[number] }) {
  const is768AndUp = useMediaQuery({ minWidth: 768 })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = omit(queryString.parse(searchParams.toString()), 'page')

  function handleValueChange(value: string) {
    router.push(`${pathname}?${queryString.stringify({ ...newSearchParams, sort: value })}`)
  }

  return is768AndUp ? (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <TriggerButton>{validSort?.name ?? 'Sắp xếp'}</TriggerButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-30 w-52 p-0" align="end" sideOffset={8}>
        <DropdownMenuRadioGroup className="py-2 font-medium" value={validSort?.value} onValueChange={handleValueChange}>
          {PRODUCT_LIST_SORT.map(({ name, value }) => (
            <DropdownMenuRadioItem
              key={value}
              className="h-9 rounded-none pl-4 pr-12 data-[state=checked]:font-semibold data-[slot=indicator]:*:left-auto data-[slot=indicator]:*:right-4"
              value={value}
            >
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Drawer>
      <DrawerTrigger asChild>
        <TriggerButton>{validSort?.name ?? 'Sắp xếp'}</TriggerButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4 pb-9">
          <DrawerHeader className="px-0 text-left sm:text-left">
            <DrawerTitle>Sắp xếp</DrawerTitle>
            <DrawerDescription className="sr-only">Chọn cách sắp xếp sản phẩm phù hợp với bạn</DrawerDescription>
          </DrawerHeader>

          <RadioGroup value={validSort?.value} onValueChange={handleValueChange}>
            {PRODUCT_LIST_SORT.map(({ name, value }) => (
              <DrawerClose asChild key={value}>
                <div className="flex h-9 items-center space-x-2">
                  <RadioGroupItem value={value} id={`sort-${value}`} />
                  <Label htmlFor={`sort-${value}`}>{name}</Label>
                </div>
              </DrawerClose>
            ))}
          </RadioGroup>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function TriggerButton({ children, disabled, className, ...rest }: ButtonProps) {
  return (
    <Button
      disabled={disabled}
      variant="ghost"
      className={cn(
        'h-9 gap-1 bg-products-sort px-3 py-0 text-products-sort-foreground focus-visible:shadow-focus-within focus-visible:ring-0 [&_svg]:size-5',
        className
      )}
      {...rest}
    >
      {children}
      <Svgr icon={ChevronDownIcon} />
    </Button>
  )
}
