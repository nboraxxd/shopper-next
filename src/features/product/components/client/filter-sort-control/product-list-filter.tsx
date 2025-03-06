'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useIsClient, useMediaQuery } from '@/shared/hooks'
import { FilterIcon, Svgr } from '@/shared/components/icons'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { ProductFilterForm, TriggerButton } from '@/features/product/components/client/filter-sort-control'

export default function ProductListFilter() {
  const searchParams = useSearchParams()

  const isClient = useIsClient()

  const { filterRating, maxPrice, minPrice } = sanitizeProductsSearchParams({
    filterRating: searchParams.get('filterRating') ?? undefined,
    minPrice: searchParams.get('minPrice') ?? undefined,
    maxPrice: searchParams.get('maxPrice') ?? undefined,
  })

  if (!isClient)
    return (
      <TriggerButton variant="ghost">
        Lọc
        <span className="relative">
          <Svgr icon={FilterIcon} strokeWidth={1.5} />
          {minPrice || maxPrice || filterRating ? (
            <span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-primary-red" />
          ) : null}
        </span>
      </TriggerButton>
    )

  return (
    <ProductListFilterContent
      currentMinPrice={minPrice}
      currentMaxPrice={maxPrice}
      currentFilterRating={filterRating}
    />
  )
}

interface ProductListFilterContentProps {
  currentMinPrice?: string
  currentMaxPrice?: string
  currentFilterRating?: string
}

function ProductListFilterContent(props: ProductListFilterContentProps) {
  const { currentMinPrice, currentMaxPrice, currentFilterRating } = props

  const is768AndUp = useMediaQuery({ minWidth: 768 })

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return is768AndUp ? (
    <Popover modal={false} open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <TriggerButton variant="ghost">
          Lọc
          <span className="relative">
            <Svgr icon={FilterIcon} strokeWidth={1.5} />
            {currentMinPrice || currentMaxPrice || currentFilterRating ? (
              <span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-primary-red" />
            ) : null}
          </span>
        </TriggerButton>
      </PopoverTrigger>
      <PopoverContent className="z-30 w-full rounded-xl p-7" align="center" sideOffset={8}>
        <ProductFilterForm
          setIsOpen={setPopoverOpen}
          currentMinPrice={currentMinPrice}
          currentMaxPrice={currentMaxPrice}
          currentFilterRating={currentFilterRating}
        />
      </PopoverContent>
    </Popover>
  ) : (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <TriggerButton variant="ghost">
          Lọc
          <span className="relative">
            <Svgr icon={FilterIcon} strokeWidth={1.5} />
            {currentMinPrice || currentMaxPrice || currentFilterRating ? (
              <span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-primary-red" />
            ) : null}
          </span>
        </TriggerButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4 pb-9">
          <DrawerHeader className="p-0 text-left sm:text-left">
            <DrawerTitle className="sr-only">Bộ lọc</DrawerTitle>
            <DrawerDescription className="sr-only">Chọn cách lọc sản phẩm phù hợp với bạn</DrawerDescription>
          </DrawerHeader>

          <ProductFilterForm
            setIsOpen={setDrawerOpen}
            currentMinPrice={currentMinPrice}
            currentMaxPrice={currentMaxPrice}
            currentFilterRating={currentFilterRating}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
