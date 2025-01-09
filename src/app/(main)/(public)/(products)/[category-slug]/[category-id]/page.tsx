import { Suspense } from 'react'

import { SearchParams } from '@/types'
import { productServerApi } from '@products/_api/server'
import { sanitizeProductsSearchParams } from '@products/_utils/server'

import { ProductList, Sidebar } from '@products/_components'

interface Props {
  params: Promise<{ 'category-slug': string; 'category-id': string }>
  searchParams: SearchParams
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const categoriesResponse = await productServerApi.getCategoriesFromServerToBackend()

  const productsSearchParams = sanitizeProductsSearchParams({ ...searchParams, categoryId: params['category-id'] })

  return (
    <>
      <Sidebar categories={categoriesResponse.payload.data} />
      <main className="mt-5 grid grid-cols-2 gap-3 pb-14 md:grid-cols-3 md:gap-4 lg:mt-0 xl:grid-cols-4 2xl:grid-cols-5">
        <Suspense fallback={<div className="text-8xl">Loading...</div>}>
          <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
        </Suspense>
      </main>
    </>
  )
}
