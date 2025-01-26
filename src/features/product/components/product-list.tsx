import Link from 'next/link'
import keyBy from 'lodash/keyBy'

import type { Category } from '@/features/category/types'
import { productServerApi } from '@/features/product/api/server'
import { PRODUCTS_FIELDS } from '@/features/product/constants'
import type { Product, ProductsField, ProductsSearchParams } from '@/features/product/types'

import { ProductCard } from '@/features/product/components'

interface Props {
  productsSearchParams: ProductsSearchParams
  categories: Category[]
}

export default async function ProductList({ productsSearchParams, categories }: Props) {
  const categoryById = keyBy(categories, 'id')

  const productsResponse = await productServerApi.getProductsFromBackend<Pick<Product, ProductsField>>({
    fields: PRODUCTS_FIELDS,
    limit: '30',
    ...productsSearchParams,
  })

  return productsResponse.payload.data.map((product) => {
    const {
      categories,
      configurable_products,
      discount_rate,
      id,
      images,
      name,
      rating_average,
      real_price,
      review_count,
      slug,
    } = product

    const category = categoryById[categories] as Category | undefined

    return (
      <ProductCard key={id} asChild>
        <Link href={`/${slug}`}>
          <ProductCard.Images
            width={256}
            height={256}
            configurableProducts={configurable_products}
            discountRate={discount_rate}
            images={images}
            name={name}
          />
          <ProductCard.Content>
            <ProductCard.Title name={name} />
            <ProductCard.Category category={category?.title} />
            <ProductCard.Info>
              <ProductCard.Price realPrice={real_price} />
              <ProductCard.Rating ratingAverage={rating_average} reviewCount={review_count} />
            </ProductCard.Info>
          </ProductCard.Content>
        </Link>
      </ProductCard>
    )
  })
}
