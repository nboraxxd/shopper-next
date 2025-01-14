import PATH from '@/shared/constants/path'
import { extractCategorySlug } from '@/features/category/utils'
import { categoryServerApi } from '@/features/category/api/server'

import { CategoryItem } from '@/shared/components/header/header-category'

export default async function CategoryList() {
  const categoriesResponse = await categoryServerApi.getCategoriesFromServerToBackend()

  return (
    <ul className="grid lg:grid-cols-2 lg:gap-x-3.5">
      <CategoryItem href={PATH.PRODUCTS} id="all" title="Tất cả sản phẩm" />
      {categoriesResponse.payload.data.map((category) => {
        const categorySlug = extractCategorySlug(category.slug)

        return (
          <CategoryItem
            key={category.id}
            id={category.id}
            href={`/${categorySlug}/${category.id}`}
            title={category.title}
          />
        )
      })}
    </ul>
  )
}
