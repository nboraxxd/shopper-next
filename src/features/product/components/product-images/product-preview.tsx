'use client'

import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductImageSizes } from '@/features/product/types'

import 'swiper/css'
import 'swiper/css/pagination'

interface ProductPreviewProps {
  image: string
  name: string
}

interface ProductPreviewSliderProps {
  images: ProductImageSizes[]
  name: string
}

export function ProductPreview({ image, name }: ProductPreviewProps) {
  return (
    <>
      <div className="relative hidden rounded-md bg-light-1 pt-[92%] md:block md:grow lg:grow-0">
        <Image
          width={600}
          height={600}
          src={image}
          alt={name}
          className="absolute left-0 top-0 size-full object-contain"
          priority
        />
      </div>
    </>
  )
}

export function ProductPreviewSlider({ images, name }: ProductPreviewSliderProps) {
  return (
    <div className="block md:hidden">
      <Swiper
        className="mySwiper dark:rounded-md"
        spaceBetween={12}
        modules={[Pagination]}
        pagination={{
          type: 'custom',
          renderCustom(_, current, total) {
            return `<div class="text-xs text-secondary-3 bg-dark-2/75 flex justify-start w-fit rounded-md p-1.5 ml-auto mr-2">${current}/${total}</div>`
          },
        }}
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index} className="relative bg-light-1 pt-[92%] dark:rounded-md">
              <Image
                width={600}
                height={600}
                src={image.large_url}
                alt={name}
                className="absolute left-0 top-0 size-full object-contain"
                priority
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
