import Link from 'next/link'
import Image from 'next/image'
import keyBy from 'lodash/keyBy'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import type { Category } from '@/features/category/types'
import { CATEGORY_IMAGES } from '@/features/category/constants'
import { extractCategorySlug } from '@/features/category/utils'

interface Props {
  categories: Category[]
  categoryId?: number
}

export default async function ProductSidebar({ categories, categoryId }: Props) {
  const categoriesImage = keyBy(CATEGORY_IMAGES, 'id')

  return (
    <aside className="mt-8 lg:mt-0">
      <div className="scrollbar-hide lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:h-[calc(100vh-var(--header-height)-2rem)] lg:overflow-y-auto lg:pb-14">
        <div className="p-3 lg:rounded-xl lg:bg-products-sidebar lg:py-5">
          <p className="text-lg font-medium md:text-2xl md:font-bold">Danh mục</p>
          <div className="mt-3 grid grid-flow-col grid-rows-2 gap-2.5 overflow-x-auto lg:block lg:overflow-x-visible">
            <CategoryItem
              href={PATH.PRODUCTS}
              imageSrc="/images/categories/all.png"
              title="Tất cả sản phẩm"
              isActive={categoryId === undefined}
            />

            {categories.map((category) => {
              const categoryImage = categoriesImage[category.id].image
              const categorySlug = extractCategorySlug(category.slug)

              return (
                <CategoryItem
                  key={category.id}
                  href={`/${categorySlug}/${category.id}`}
                  imageSrc={categoryImage}
                  title={category.title}
                  isActive={categoryId === category.id}
                />
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

interface CategoryProps extends ComponentProps<typeof Link> {
  imageSrc: string
  title: string
  isActive?: boolean
}

function CategoryItem(props: CategoryProps) {
  const { imageSrc, title, isActive = false, ...rest } = props

  return (
    <Link
      className={cn(
        'flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80 max-lg:w-[6.5rem] max-lg:flex-col lg:h-14'
      )}
      {...rest}
    >
      <div className="overflow-hidden rounded-[35%] border border-secondary-3/30 lg:overflow-visible lg:rounded-none lg:border-none">
        <Image width={64} height={64} src={imageSrc} alt={title} className={cn('size-12 object-contain lg:size-9')} />
      </div>
      <h3
        className={cn('text-balance text-center text-xs font-medium capitalize lg:text-wrap lg:text-left lg:text-sm', {
          'text-active-category': isActive,
        })}
      >
        {title}
      </h3>
    </Link>
  )
}
