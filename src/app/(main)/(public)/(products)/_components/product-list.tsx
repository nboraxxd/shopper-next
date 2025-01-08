import {
  Category,
  ProductListFieldType,
  ProductSortOptionsValue,
  ProductsSearchParams,
  ProductType,
} from '@/types/product.type'
import omitBy from 'lodash/omitBy'
import { SearchParams } from '@/types'
import isUndefined from 'lodash/isUndefined'
import { PRODUCT_LIST_QUERY_FIELDS, PRODUCT_SORT_OPTIONS } from '@/constants'
import productApi from '@/api-requests/product.api'
import { keyBy } from 'lodash'
import { ProductCard } from '@/app/(main)/_components'

export default async function ProductList({
  searchParams,
  categories,
}: {
  searchParams: Awaited<SearchParams>
  categories: Category[]
}) {
  const { name, page, minPrice, maxPrice, filterRating, sort } = searchParams

  const categoryById = keyBy(categories, 'id')

  const sanitizedProductFilters: ProductsSearchParams = omitBy(
    {
      sort:
        typeof sort === 'string' && Object.values(PRODUCT_SORT_OPTIONS).includes(sort as ProductSortOptionsValue)
          ? (sort as ProductSortOptionsValue)
          : undefined,
      name,
      page: Number(page) ? page : undefined,
      minPrice:
        Number(minPrice) && Number(minPrice) >= 0 && Number(minPrice) <= Number(maxPrice ?? Infinity)
          ? minPrice
          : undefined,
      maxPrice:
        Number(maxPrice) && Number(maxPrice) >= 0 && Number(maxPrice) >= Number(minPrice ?? -Infinity)
          ? maxPrice
          : undefined,
      filterRating: Number(filterRating) > 5 || Number(filterRating) < 1 ? undefined : filterRating,
    },
    isUndefined
  )

  const productsResponse = await productApi.getProductsFromServerToBackend<Pick<ProductType, ProductListFieldType>>({
    fields: PRODUCT_LIST_QUERY_FIELDS,
    limit: '60',
    ...sanitizedProductFilters,
  })

  return productsResponse.payload.data.map((product) => {
    const category = categoryById[product.categories] as Category | undefined

    return <ProductCard key={product.id} product={product} category={category?.title} />
  })
}
