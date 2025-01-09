import keyBy from 'lodash/keyBy'
import { CameraIcon, EarthIcon, LaptopIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card'
import { categoryServerApi } from '@/features/category/api/server'
import { extractCategorySlug } from '@/features/category/utils'
import Link from 'next/link'

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
            {categoriesResponse.payload.data.map((category) => {
              const CategoryIcon = categoriesImage[category.id].icon
              const categorySlug = extractCategorySlug(category.slug)

              return (
                <li key={category._id}>
                  <Link
                    href={`/${categorySlug}/${category.id}`}
                    className="flex items-center gap-2 py-2 text-base transition-colors hover:text-heading-3"
                  >
                    <CategoryIcon className="size-6" />
                    <h3>{category.title}</h3>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </HoverCardContent>
    </HoverCard>
  )
}
