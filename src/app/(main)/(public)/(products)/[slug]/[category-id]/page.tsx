import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import type { SearchParams } from '@/shared/types'
import { extractCategorySlug } from '@/features/category/utils'
import envVariables from '@/shared/schemas/env-variables.schema'
import { baseOpenGraph } from '@/shared/constants/shared-metadata'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'
import { CATEGORY_IDS, PRODUCT_CATEGORIES } from '@/features/category/constants'

import { ProductList, ProductSidebar } from '@/features/product/components/server'

interface Props {
  params: Promise<{ slug: string; 'category-id': string }>
  searchParams: SearchParams
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
  const title = `${category.title} - hàng chính hãng, giao nhanh ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
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
