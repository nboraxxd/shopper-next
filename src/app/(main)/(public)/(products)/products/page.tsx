import type { SearchParams } from '@/shared/types'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'

import { ProductList, ProductSidebar } from '@/features/product/components'

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  const productsSearchParams = sanitizeProductsSearchParams(searchParams)

  return (
    <div className="container min-h-[calc(100vh-var(--header-height))] pt-8">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
        <ProductSidebar categories={categoriesResponse.payload.data} />
        <main className="mt-5 grid w-full grid-cols-2 gap-3 self-start pb-14 md:grid-cols-3 md:gap-4 lg:mt-0 lg:h-fit xl:grid-cols-4 2xl:grid-cols-5">
          <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
        </main>
      </div>
    </div>
  )
}
