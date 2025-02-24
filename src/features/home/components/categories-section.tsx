import Link from 'next/link'
import Image from 'next/image'
import keyBy from 'lodash/keyBy'
import { Url } from 'next/dist/shared/lib/router/router'

import PATH from '@/shared/constants/path'
import { PRODUCT_CATEGORIES } from '@/features/category/constants'
import { categoryServerApi } from '@/features/category/api/server'
import { extractCategorySlug } from '@/features/category/utils'

export default async function CategoriesSection() {
  const categoriesImage = keyBy(PRODUCT_CATEGORIES, 'id')

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  return (
    <section className="pt-16 lg:pt-24">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Danh mục sản phẩm</h2>
        <Link
          href={PATH.PRODUCTS}
          className="hidden text-sm font-semibold text-highlight hover:text-highlight/90 sm:block"
        >
          Xem tất cả
          <span> &rarr;</span>
        </Link>
      </div>

      <div className="mt-5 grid grid-flow-col grid-rows-2 gap-5 overflow-x-auto pb-3 xl:mt-10 xl:gap-10">
        <CategoryItem href={PATH.PRODUCTS} title="Tất cả sản phẩm" image="/images/categories/all.png" />
        {categoriesResponse.payload.data.map((category) => {
          const categoryImage = categoriesImage[category.id].image
          const categorySlug = extractCategorySlug(category.slug)

          return (
            <CategoryItem
              key={category.id}
              href={`/${categorySlug}/${category.id}`}
              title={category.title}
              image={categoryImage}
            />
          )
        })}
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <Link href={PATH.PRODUCTS} className="block text-sm font-semibold text-highlight hover:text-highlight/90">
          Xem tất cả
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </section>
  )
}

function CategoryItem({ href, title, image }: { href: Url; title: string; image: string }) {
  return (
    <Link
      href={href}
      className="flex w-[6.75rem] shrink-0 grow flex-col items-center gap-3 justify-self-center transition-opacity hover:opacity-80 md:w-28 xl:w-32"
    >
      <div className="overflow-hidden rounded-[35%] border border-border">
        <Image
          src={image}
          alt={title}
          width={96}
          height={96}
          className="size-16 object-contain md:size-20 xl:size-24"
        />
      </div>
      <h3 className="text-balance text-center text-xs font-medium capitalize xl:text-sm">{title}</h3>
    </Link>
  )
}
