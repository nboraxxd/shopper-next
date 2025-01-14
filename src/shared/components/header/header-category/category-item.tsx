'use client'

import Link from 'next/link'
import keyBy from 'lodash/keyBy'
import { CameraIcon, EarthIcon, LaptopIcon, StoreIcon } from 'lucide-react'

import { useCategoryHoverStore } from '@/shared/stores'
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
  SportOutdoorIcon,
  TechGadgetIcon,
  VoucherIcon,
} from '@/shared/components/icons'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'

interface Props {
  id: number | 'all'
  href: string
  title: string
}

const CATEGORY_IMAGES = [
  {
    id: 'all',
    icon: StoreIcon,
  },
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

export default function CategoryItem({ id, href, title }: Props) {
  const categoriesImage = keyBy(CATEGORY_IMAGES, 'id')
  const Icon = categoriesImage[id].icon

  const pathname = usePathname()
  const currentCategoryId = pathname && pathname.split('/').length === 3 ? pathname.split('/')[2] : null

  const setIsOpen = useCategoryHoverStore((state) => state.setIsOpen)

  return (
    <li>
      <Link
        href={href}
        className={cn('flex items-center gap-2 py-2 text-base font-medium transition-colors hover:text-link', {
          'text-link': (currentCategoryId && +currentCategoryId === id) || (pathname === PATH.PRODUCTS && id === 'all'),
        })}
        onClick={() => setIsOpen(false)}
      >
        <Icon className="size-6" />
        <h3>{title}</h3>
      </Link>
    </li>
  )
}
