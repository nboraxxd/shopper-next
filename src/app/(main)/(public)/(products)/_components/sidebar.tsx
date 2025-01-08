import keyBy from 'lodash/keyBy'

import { extractCategorySlug } from '@/utils'
import { Category } from '@/types/product.type'
import { CATEGORIES_IMAGE } from '@/constants/list'

import { CategoryItem } from '@/app/(main)/(public)/(products)/_components'

interface Props {
  categories: Category[]
  categoryId?: number
}

export default async function Sidebar({ categories, categoryId }: Props) {
  const categoriesImage = keyBy(CATEGORIES_IMAGE, 'id')

  return (
    <aside className="scrollbar-hide mt-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:mt-0 lg:h-[calc(100vh-var(--header-height)-2rem)] lg:overflow-y-auto lg:pb-14">
      <div className="p-3 lg:rounded-xl lg:bg-products-sidebar lg:py-5">
        <p className="text-lg font-medium md:text-2xl md:font-bold">Danh mục</p>
        <div className="mt-3 grid grid-flow-col grid-rows-2 gap-2.5 overflow-x-auto lg:block lg:overflow-x-visible">
          <CategoryItem
            href="/san-pham"
            img="/images/categories/all.png"
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
                img={categoryImage}
                title={category.title}
                isActive={categoryId === category.id}
              />
            )
          })}
        </div>
      </div>
    </aside>
  )
}
