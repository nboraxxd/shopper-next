import type { SearchParams } from '@/shared/types'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'

import { ProductList, ProductSidebar } from '@/features/product/components'

interface Props {
  params: Promise<{ slug: string; 'category-id': string }>
  searchParams: SearchParams
}

export default async function CategoryPage(props: Props) {
  const { 'category-id': categoryId } = await props.params
  const searchParams = await props.searchParams

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  const productsSearchParams = sanitizeProductsSearchParams({ ...searchParams, categoryId })

  return (
    <>
      <ProductSidebar categories={categoriesResponse.payload.data} categoryId={+categoryId} />
      <main className="mt-5 grid grid-cols-2 gap-3 pb-14 md:grid-cols-3 md:gap-4 lg:mt-0 xl:grid-cols-4 2xl:grid-cols-5">
        <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
      </main>
    </>
  )
}
