import { Suspense } from 'react'

import type { SearchParams } from '@/shared/types'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'

import { ProductList, ProductSidebar } from '@/features/product/components'

interface Props {
  params: Promise<{ 'category-slug': string; 'category-id': string }>
  searchParams: SearchParams
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const categoriesResponse = await categoryServerApi.getCategoriesFromServerToBackend()

  const productsSearchParams = sanitizeProductsSearchParams({ ...searchParams, categoryId: params['category-id'] })

  return (
    <>
      <ProductSidebar categories={categoriesResponse.payload.data} />
      <main className="mt-5 grid grid-cols-2 gap-3 pb-14 md:grid-cols-3 md:gap-4 lg:mt-0 xl:grid-cols-4 2xl:grid-cols-5">
        <Suspense fallback={<div className="text-8xl">Loading...</div>}>
          <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
        </Suspense>
      </main>
    </>
  )
}
