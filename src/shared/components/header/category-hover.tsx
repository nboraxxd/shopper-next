'use client'

import { Button } from '@/shared/components/ui/button'
import { CategoriesIcon, Svgr } from '@/shared/components/icons'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card'
import { useState } from 'react'
import { useQueryCategoriesFromBackend } from '@/features/category/hooks'
import PATH from '@/shared/constants/path'
import { extractCategorySlug } from '@/features/category/utils'

import { CameraIcon, EarthIcon, LaptopIcon, LucideProps, StoreIcon } from 'lucide-react'

import {
  BookIcon,
  CarIcon,
  DailyFoodIcon,
  ElectronicIcon,
  HealthBeautyIcon,
  HomeApplianceIcon,
  HomeLivingIcon,
  MomBabyIcon,
  PhoneIcon,
  BasketballIcon,
  TechGadgetIcon,
  VoucherIcon,
} from '@/shared/components/icons'
import { keyBy } from 'lodash'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/shared/utils'
import { Skeleton } from '@/shared/components/ui/skeleton'

export const CATEGORY_IMAGES = [
  {
    id: 1789,
    icon: PhoneIcon,
  },
  {
    id: 4221,
    icon: ElectronicIcon,
  },
  {
    id: 1815,
    icon: TechGadgetIcon,
  },
  {
    id: 1846,
    icon: LaptopIcon,
  },
  {
    id: 1801,
    icon: CameraIcon,
  },
  {
    id: 1882,
    icon: HomeApplianceIcon,
  },
  {
    id: 1883,
    icon: HomeLivingIcon,
  },
  {
    id: 4384,
    icon: DailyFoodIcon,
  },
  {
    id: 2549,
    icon: MomBabyIcon,
  },
  {
    id: 1520,
    icon: HealthBeautyIcon,
  },
  {
    id: 1975,
    icon: BasketballIcon,
  },
  {
    id: 8594,
    icon: CarIcon,
  },
  {
    id: 17166,
    icon: EarthIcon,
  },
  {
    id: 8322,
    icon: BookIcon,
  },
  {
    id: 11312,
    icon: VoucherIcon,
  },
] as const

export default function CategoryHover() {
  const [isOpen, setIsOpen] = useState(false)

  const categoriesImage = keyBy(CATEGORY_IMAGES, 'id')

  const queryCategoriesFromBackend = useQueryCategoriesFromBackend()

  if (queryCategoriesFromBackend.isError) return null

  return (
    <HoverCard openDelay={300} open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className="hidden size-12 transition-opacity hover:opacity-90 lg:inline-flex"
          size="icon"
        >
          <Svgr icon={CategoriesIcon} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        sideOffset={10}
        align="start"
        alignOffset={-100}
        className="w-auto min-w-[37.5rem] rounded-3xl border-transparent p-8 !shadow-popover"
      >
        <nav>
          <ul className="grid lg:grid-cols-2 lg:gap-x-3.5">
            {queryCategoriesFromBackend.isLoading
              ? Array.from({ length: 16 }).map((_, index) => (
                  <li key={index} className="py-2">
                    <Skeleton className="h-6 w-3/4" />
                  </li>
                ))
              : null}
            {queryCategoriesFromBackend.isSuccess ? (
              <>
                <CategoryItem
                  id="all"
                  href={PATH.PRODUCTS}
                  icon={StoreIcon}
                  title="Tất cả sản phẩm"
                  setIsOpen={setIsOpen}
                />
                {queryCategoriesFromBackend.data.payload.data.map((category) => {
                  const CategoryIcon = categoriesImage[category.id].icon
                  const categorySlug = extractCategorySlug(category.slug)

                  return (
                    <CategoryItem
                      id={category.id}
                      key={category.id}
                      icon={CategoryIcon}
                      href={`/${categorySlug}/${category.id}`}
                      title={category.title}
                      setIsOpen={setIsOpen}
                    />
                  )
                })}
              </>
            ) : null}
          </ul>
        </nav>
      </HoverCardContent>
    </HoverCard>
  )
}

interface Props {
  id: number | 'all'
  href: string
  title: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

function CategoryItem({ icon, href, title, setIsOpen, id }: Props) {
  const pathname = usePathname()

  // TODO: Refactor this, it's not a good practice to use split('/') to get the current category id
  const currentCategoryId = pathname && pathname.split('/').length === 3 ? pathname.split('/')[2] : null

  return (
    <li>
      <Link
        href={href}
        className={cn('flex items-center gap-2 py-2 text-base font-medium transition-colors hover:text-highlight', {
          'text-highlight':
            (currentCategoryId && +currentCategoryId === id) || (pathname === PATH.PRODUCTS && id === 'all'),
        })}
        onClick={() => setIsOpen(false)}
      >
        <Svgr icon={icon} className="size-6" strokeWidth={2} />
        <h3>{title}</h3>
      </Link>
    </li>
  )
}
