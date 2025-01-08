import keyBy from 'lodash/keyBy'

import productApi from '@/api-requests/product.api'

import { Sidebar } from '@/app/(main)/(public)/(products)/_components'
import { ProductListFieldType, ProductSortOptionsValue, ProductsSearchParams, ProductType } from '@/types/product.type'
import omitBy from 'lodash/omitBy'
import { SearchParams } from '@/types'
import isUndefined from 'lodash/isUndefined'
import { PRODUCT_LIST_QUERY_FIELDS, PRODUCT_SORT_OPTIONS } from '@/constants'
import { ProductCard } from '@/app/(main)/_components'

interface Props {
  params: Promise<{ categorySlug: string; categoryId: string }>
  searchParams: SearchParams
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categoryId } = await params

  const { name, page, minPrice, maxPrice, filterRating, sort } = await searchParams

  const categoriesResponse = await productApi.getCategoriesFromServerToBackend()
  const categoryById = keyBy(categoriesResponse.payload.data, 'id')

  const filteredProductSearchParams: ProductsSearchParams = omitBy(
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
      categories: categoryId,
    },
    isUndefined
  )

  const productsResponse = await productApi.getProductsFromServerToBackend<Pick<ProductType, ProductListFieldType>>({
    fields: PRODUCT_LIST_QUERY_FIELDS,
    limit: '60',
    ...filteredProductSearchParams,
  })

  return (
    <>
      <Sidebar categories={categoriesResponse.payload.data} />
      <main className="mt-5 grid grid-cols-2 gap-3 pb-14 md:grid-cols-3 md:gap-4 lg:mt-0 xl:grid-cols-4 2xl:grid-cols-5">
        {productsResponse.payload.data.map((product) => {
          const category = categoryById[product.categories]

          return <ProductCard key={product.id} product={product} category={category?.title} />
        })}
      </main>
    </>
  )
}
