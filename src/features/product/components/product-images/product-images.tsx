'use client'

import { useState } from 'react'
import flatten from 'lodash/flatten'

import { PRODUCT_ERROR_IMAGES } from '@/features/product/constants'
import { ConfigurableProduct, Product, ProductImagedata } from '@/features/product/types'

import { ProductPreview, ProductThumb } from '@/features/product/components/product-images'

interface Props {
  name: Product['name']
  images: ProductImagedata[]
  configurableProducts?: ConfigurableProduct[]
}

export default function ProductImages({ name, images, configurableProducts }: Props) {
  const mergedImages = configurableProducts
    ? [...images, ...flatten(configurableProducts.map((product) => product.images))]
    : images

  const uniqueLargeUrls = new Set()

  const uniqueImages = mergedImages.filter((item) => {
    if (uniqueLargeUrls.has(item.large_url)) {
      return false
    }
    uniqueLargeUrls.add(item.large_url)
    return true
  })

  const validProductImages = uniqueImages.filter((item) => PRODUCT_ERROR_IMAGES.indexOf(item.large_url) === -1)

  const [activeImage, setActiveImage] = useState(validProductImages[0].large_url)

  return (
    <>
      <ProductPreview image={activeImage || images[0].large_url} images={validProductImages} name={name} />
      <ProductThumb name={name} images={validProductImages} activeImage={activeImage} setActiveImage={setActiveImage} />
    </>
  )
}