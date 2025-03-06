'use client'

import omit from 'lodash/omit'
import queryString from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useIsClient, useMediaQuery } from '@/shared/hooks'
import { PRODUCT_LIST_SORT } from '@/features/product/constants'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Label } from '@/shared/components/ui/label'
import { ChevronDownIcon, Svgr } from '@/shared/components/icons'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { TriggerButton } from '@/features/product/components/client/filter-sort-control'

const TRIGGER_BUTTON_CLASS_NAME = 'border border-border/40 bg-products-button hover:border-border/70'

export default function ProductListSort() {
  const searchParams = useSearchParams()

  const isClient = useIsClient()

  const validSort = PRODUCT_LIST_SORT.find(({ value }) => value === searchParams.get('sort'))

  if (!isClient)
    return (
      <TriggerButton className={TRIGGER_BUTTON_CLASS_NAME}>
        {validSort?.name ?? 'Sắp xếp'}
        <Svgr icon={ChevronDownIcon} />
      </TriggerButton>
    )

  return <ProductListSortContent validSort={validSort} />
}

function ProductListSortContent({ validSort }: { validSort?: (typeof PRODUCT_LIST_SORT)[number] }) {
  const is768AndUp = useMediaQuery({ minWidth: 768 })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = omit(queryString.parse(searchParams.toString()), 'page')

  function handleValueChange(value: string) {
    router.push(`${pathname}?${queryString.stringify({ ...newSearchParams, sort: value })}`, { scroll: false })
  }

  return is768AndUp ? (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <TriggerButton className={TRIGGER_BUTTON_CLASS_NAME}>
          {validSort?.name ?? 'Sắp xếp'}
          <Svgr icon={ChevronDownIcon} />
        </TriggerButton>
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
        <TriggerButton className={TRIGGER_BUTTON_CLASS_NAME}>
          {validSort?.name ?? 'Sắp xếp'}
          <Svgr icon={ChevronDownIcon} />
        </TriggerButton>
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
