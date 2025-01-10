import React from 'react'
import Link from 'next/link'
import keyBy from 'lodash/keyBy'
import { LucideProps, StoreIcon } from 'lucide-react'
import { CameraIcon, EarthIcon, LaptopIcon } from 'lucide-react'

import PATH from '@/shared/constants/path'
import { extractCategorySlug } from '@/features/category/utils'
import { categoryServerApi } from '@/features/category/api/server'

import {
  BookIcon,
  CarIcon,
  CategoriesIcon,
  DailyFoodIcon,
  ElectronicIcon,
  HealthBeautyIcon,
  HomeApplianceIcon,
  HomeLivingIcon,
  MomBabyIcon,
  PhoneIcon,
  SportOutdoorIcon,
  TechGadgetIcon,
  VoucherIcon,
} from '@/shared/components/icons'
import { Button } from '@/shared/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card'

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
    icon: SportOutdoorIcon,
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

export default async function CategoriesDropdown() {
  const categoriesImage = keyBy(CATEGORY_IMAGES, 'id')

  const categoriesResponse = await categoryServerApi.getCategoriesFromServerToBackend()

  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className="hidden size-12 transition-opacity hover:opacity-90 lg:inline-flex"
          size="icon"
        >
          <CategoriesIcon />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        sideOffset={10}
        align="start"
        alignOffset={-100}
        className="w-auto rounded-3xl p-8 !shadow-popover"
      >
        <nav>
          <ul className="grid lg:grid-cols-2 lg:gap-x-3.5">
            <CategoryItem href={PATH.PRODUCTS} icon={StoreIcon} title="Tất cả sản phẩm" />
            {categoriesResponse.payload.data.map((category) => {
              const CategoryIcon = categoriesImage[category.id].icon
              const categorySlug = extractCategorySlug(category.slug)

              return (
                <CategoryItem
                  key={category.id}
                  href={`/${categorySlug}/${category.id}`}
                  icon={CategoryIcon}
                  title={category.title}
                />
              )
            })}
          </ul>
        </nav>
      </HoverCardContent>
    </HoverCard>
  )
}

interface Props {
  href: string
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  title: string
}

function CategoryItem({ href, icon: Icon, title }: Props) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 py-2 text-base font-medium transition-colors hover:text-link"
      >
        <Icon className="size-6" />
        <h3>{title}</h3>
      </Link>
    </li>
  )
}
