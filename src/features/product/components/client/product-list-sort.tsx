'use client'

import omit from 'lodash/omit'
import queryString from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { PRODUCT_LIST_SORT } from '@/features/product/constants'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import { ChevronDownIcon, Svgr } from '@/shared/components/icons'

export default function ProductListSort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const validSortParameter = PRODUCT_LIST_SORT.find(({ value }) => value === searchParams.get('sort'))

  const newSearchParams = omit(queryString.parse(searchParams.toString()), 'page')

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-1 bg-products-sort px-3 py-0 text-products-sort-foreground focus-visible:shadow-focus-within focus-visible:ring-0 [&_svg]:size-5"
        >
          {validSortParameter?.name ?? 'Sắp xếp'}
          <Svgr icon={ChevronDownIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-30 w-52 p-0" align="end" sideOffset={8}>
        <DropdownMenuRadioGroup
          className="py-2 font-medium"
          value={validSortParameter?.value}
          onValueChange={(value) => {
            router.push(`${pathname}?${queryString.stringify({ ...newSearchParams, sort: value })}`)
          }}
        >
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
  )
}
