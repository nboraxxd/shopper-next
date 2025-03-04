import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import type { SearchParamsPromise } from '@/shared/types'
import { extractCategorySlug } from '@/features/category/utils'
import envVariables from '@/shared/schemas/env-variables.schema'
import { baseOpenGraph } from '@/shared/constants/shared-metadata'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'
import { CATEGORY_IDS, PRODUCT_CATEGORIES } from '@/features/category/constants'

import { ProductList, ProductListSkeleton, ProductSidebar } from '@/features/product/components/server'

interface Props {
  params: Promise<{ slug: string; 'category-id': string }>
  searchParams: SearchParamsPromise
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'category-id': categoryId } = await params

  const category = PRODUCT_CATEGORIES.find((category) => category.id === +categoryId)

  if (!category) {
    return {
      title: 'Không tìm thấy danh mục sản phẩm',
      description: 'Không tìm thấy danh mục sản phẩm',
    }
  }

  const url = `${envVariables.NEXT_PUBLIC_URL}/${extractCategorySlug(category.slug)}/${category.id}`
  const title = category.title
  const description = category.description
  const image = envVariables.NEXT_PUBLIC_URL + category.image

  return {
    title,
    description,
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function CategoryPage(props: Props) {
  const [{ 'category-id': categoryId }, searchParams] = await Promise.all([props.params, props.searchParams])

  if (CATEGORY_IDS.indexOf(+categoryId as (typeof CATEGORY_IDS)[number]) === -1) notFound()

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  const productsSearchParams = sanitizeProductsSearchParams({ ...searchParams, categoryId })

  const category = PRODUCT_CATEGORIES.find((category) => category.id === +categoryId)

  return (
    <div className="container min-h-[calc(100vh-var(--header-height))] pt-8">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
        <ProductSidebar categories={categoriesResponse.payload.data} categoryId={+categoryId} />
        <main className="mt-5 lg:mt-0">
          <h1 className="text-lg font-medium md:text-2xl md:font-bold">{category?.title ?? 'Danh mục sản phẩm'}</h1>
          <div className="mt-4 grid grid-cols-2 gap-3 pb-14 md:mt-7 md:grid-cols-3 md:gap-4 lg:h-fit xl:grid-cols-4 2xl:grid-cols-5">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
