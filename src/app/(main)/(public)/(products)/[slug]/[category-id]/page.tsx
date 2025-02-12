import { notFound } from 'next/navigation'

import type { SearchParams } from '@/shared/types'
import { CATEGORY_IDS } from '@/features/category/constants'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'

import { ProductList, ProductSidebar } from '@/features/product/components/server'

interface Props {
  params: Promise<{ slug: string; 'category-id': string }>
  searchParams: SearchParams
}

export default async function CategoryPage(props: Props) {
  const [{ 'category-id': categoryId }, searchParams] = await Promise.all([props.params, props.searchParams])

  if (CATEGORY_IDS.indexOf(+categoryId as (typeof CATEGORY_IDS)[number]) === -1) notFound()

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  const productsSearchParams = sanitizeProductsSearchParams({ ...searchParams, categoryId })

  return (
    <div className="container min-h-[calc(100vh-var(--header-height))] pt-8">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
        <ProductSidebar categories={categoriesResponse.payload.data} categoryId={+categoryId} />
        <main className="mt-5 grid grid-cols-2 gap-3 pb-14 md:grid-cols-3 md:gap-4 lg:mt-0 lg:h-fit xl:grid-cols-4 2xl:grid-cols-5">
          <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
        </main>
      </div>
    </div>
  )
}
