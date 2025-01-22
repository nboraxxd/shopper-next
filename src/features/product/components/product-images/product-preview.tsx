'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductImageSizes } from '@/features/product/types'

import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

interface Props {
  image: string
  images: ProductImageSizes[]
  name: string
}

export default function ProductPreview({ image, images, name }: Props) {
  return (
    <>
      <div className="relative hidden bg-light-1 pt-[92%] md:block md:grow lg:grow-0">
        <Image
          width={500}
          height={500}
          src={image}
          alt={name}
          className="absolute left-0 top-0 size-full object-contain"
          priority
        />
      </div>
      <div className="block md:hidden">
        <Swiper
          className="mySwiper"
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
              <SwiperSlide key={index} className="relative bg-light-1 pt-[92%]">
                <Image
                  width={500}
                  height={500}
                  src={image.large_url}
                  alt={name}
                  className="absolute left-0 top-0 size-full object-contain"
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}
