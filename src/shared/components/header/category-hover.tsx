'use client'

import Link from 'next/link'
import { useState } from 'react'
import keyBy from 'lodash/keyBy'
import { usePathname } from 'next/navigation'
import { LucideProps, StoreIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { useQueryCategories } from '@/features/category/hooks'
import { CATEGORY_IMAGES } from '@/features/category/constants'
import { extractCategorySlug } from '@/features/category/utils'

import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { CategoriesIcon, Svgr } from '@/shared/components/icons'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card'

export default function CategoryHover() {
  const [isOpen, setIsOpen] = useState(false)

  const categoriesImage = keyBy(CATEGORY_IMAGES, 'id')

  const queryCategories = useQueryCategories()

  if (queryCategories.isError) return null

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
            {queryCategories.isLoading
              ? Array.from({ length: 16 }).map((_, index) => (
                  <li key={index} className="py-2">
                    <Skeleton className="h-6 w-3/4" />
                  </li>
                ))
              : null}
            {queryCategories.isSuccess ? (
              <>
                <CategoryItem
                  id="all"
                  href={PATH.PRODUCTS}
                  icon={StoreIcon}
                  title="Tất cả sản phẩm"
                  setIsOpen={setIsOpen}
                />
                {queryCategories.data.payload.data.map((category) => {
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
