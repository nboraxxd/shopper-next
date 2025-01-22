import { productServerApi } from '@/features/product/api/server'
import { ProductAction } from '@/features/product/components/product-action'
import { ProductImages } from '@/features/product/components/product-images'
import { ProductResponse } from '@/features/product/types'
import { extractProductId } from '@/features/product/utils'
import { reviewServerApi } from '@/features/review/api/server'
import { ReviewsResponse } from '@/features/review/types'
import { ShieldIcon, StarIcon } from '@/shared/components/icons'
import { Separator } from '@/shared/components/ui/separator'
import { formatCurrency, formatNumberToSocialStyle } from '@/shared/utils'

import { notFound } from 'next/navigation'

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const productId = extractProductId(slug)

  if (!productId) return notFound()

  let product: ProductResponse['data'][0] | null = null
  let reviews: ReviewsResponse | null = null

  try {
    const [productResponse, reviewsResponse] = await Promise.all([
      productServerApi.getProductDetailFromBackend(productId),
      reviewServerApi.getReviewsByProductIdFromBackend(productId),
    ])

    product = productResponse.payload.data[0]
    reviews = reviewsResponse.payload
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  if (!product || !reviews) notFound()
  console.log('🔥 ~ ProductDetail ~ reviews:', reviews)

  return (
    <main className="min-h-[calc(100vh-var(--header-height))] bg-product pt-5">
      <div className="container">
        {/* Breadcrumb */}
        <section></section>

        {/* Product Detail */}
        <section className="items-start gap-4 rounded-xl bg-card p-4 md:mt-8 md:gap-8 md:rounded-none md:bg-transparent md:p-0 lg:flex">
          <div className="rounded-md dark:border-transparent md:flex md:flex-row-reverse md:border md:px-7 lg:w-1/2 lg:flex-col lg:border-none xl:w-5/12">
            <ProductImages
              name={product.name}
              images={product.images}
              configurableProducts={product.configurable_products ?? undefined}
            />
          </div>
          <div className="mt-5 md:mt-8 md:rounded-xl md:bg-product-info md:p-10 lg:mt-0 lg:w-1/2 xl:w-7/12">
            <h1 className="line-clamp-2 text-lg font-bold md:text-2xl md:font-medium">{product.name}</h1>
            <div className="mt-5 flex flex-col gap-5 md:mt-7 md:flex-row md:gap-7 lg:flex-col xl:flex-row">
              <div className="grow space-y-7 xl:w-1/2">
                {product.rating_average > 0 ? (
                  <div className="flex items-center gap-2">
                    <StarIcon className="size-6 text-primary-yellow" />
                    <div className="flex gap-1 text-lg font-medium">
                      <span>({product.rating_average.toFixed(1)})</span>
                      <span>
                        {formatNumberToSocialStyle(product.review_count)}{' '}
                        {product.review_count > 1 ? 'ratings' : 'rating'}
                      </span>
                    </div>
                  </div>
                ) : null}
                {product.price > product.real_price ? (
                  <div className="flex gap-2.5">
                    <h3 className="font-medium text-secondary-2 line-through">
                      {formatCurrency(product.price)}
                      <sup>₫</sup>
                    </h3>
                    <span className="bg-primary-green/20 px-2 py-0.5 text-sm font-medium text-primary-green">
                      -{product.discount_rate}%
                    </span>
                  </div>
                ) : null}
                <h2 className="mt-5 text-3xl font-medium">
                  {formatCurrency(product.real_price)}
                  <sup>₫</sup>
                </h2>
              </div>
              <div className="grow xl:w-1/2">
                <ProductAction stock={product.stock_item.qty} />
              </div>
            </div>
            <Separator className="mt-5 block lg:hidden xl:block" />
            <div className="block lg:hidden xl:block">
              <h3 className="mt-5 font-medium">Quyền lợi khách hàng & bảo hành</h3>
              <div className="flex flex-col gap-2 sm:flex-row">
                <h4 className="flex flex-1 items-center gap-1 text-sm font-medium">
                  <ShieldIcon className="inline-block size-6" />
                  <span className="p-1">7 ngày hoàn trả</span>
                </h4>
                <h4 className="flex flex-1 items-center gap-1 text-sm font-medium">
                  <ShieldIcon className="inline-block size-6" />
                  <span className="p-1">Bảo hành theo chính sách từ nhà bán</span>
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="mt-8">
          <h3 className="mx-auto mt-5 w-full text-lg font-medium lg:w-10/12 xl:w-8/12">Mô tả sản phẩm</h3>

          <div
            className="mx-auto mt-5 w-full lg:w-10/12 xl:w-8/12"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>

        {/* Product Review */}
        <section className="mt-8">
          {reviews.data.map((review) => (
            <div key={review._id} className="mt-5">
              <h3 className="font-medium">{review.user.name}</h3>
              <p className="mt-2">{review.content}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
