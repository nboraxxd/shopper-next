import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import type { SearchParamsPromise } from '@/shared/types'
import { PRODUCT_SORT_OPTIONS } from '@/features/product/constants'
import type { ProductSortOptionsValue, ProductsSearchParams } from '@/features/product/types'

type ProductFilterOptions = Awaited<SearchParamsPromise> & { categoryId?: string }

export function sanitizeProductsSearchParams(productFilterOptions: ProductFilterOptions): ProductsSearchParams {
  const { name, page, minPrice, maxPrice, filterRating, sort, categoryId } = productFilterOptions

  return omitBy(
    {
      sort:
        typeof sort === 'string' && Object.values(PRODUCT_SORT_OPTIONS).includes(sort as ProductSortOptionsValue)
          ? (sort as ProductSortOptionsValue)
          : undefined,
      name,
      page: Number(page) && Number(page) > 0 ? page : undefined,
      minPrice:
        Number(minPrice) && Number(minPrice) >= 0 && Number(minPrice) <= Number(maxPrice ?? Infinity)
          ? minPrice
          : undefined,
      maxPrice:
        Number(maxPrice) && Number(maxPrice) >= 0 && Number(maxPrice) >= Number(minPrice ?? -Infinity)
          ? maxPrice
          : undefined,
      filterRating: Number(filterRating) > 5 || Number(filterRating) < 1 ? undefined : filterRating,
      categories: categoryId,
    },
    isUndefined
  )
}
