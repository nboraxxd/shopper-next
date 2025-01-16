'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { Navigation } from 'swiper/modules'

import { cn } from '@/shared/utils'
import { ProductImageSizes } from '@/features/product/types'

import { useMediaQuery } from '@/shared/hooks'

import 'swiper/css'
import { Button } from '@/shared/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

interface Props {
  name: string
  images: ProductImageSizes[]
  activeImage: string
  setActiveImage: React.Dispatch<React.SetStateAction<string>>
}

const SLIDES_PER_VIEW = 5

export default function ProductThumb({ name, images, activeImage, setActiveImage }: Props) {
  const is1024AndUp = useMediaQuery({ minWidth: 1024 })

  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <>
      <Swiper
        className="mySwiper lg:!px-0.5"
        direction={is1024AndUp ? 'horizontal' : 'vertical'}
        autoHeight
        slidesPerView={is1024AndUp ? SLIDES_PER_VIEW : 'auto'}
        spaceBetween={12}
        slidesPerGroup={SLIDES_PER_VIEW}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              'overflow-hidden rounded-md border border-secondary-4 bg-light-1 p-1 transition-colors max-lg:flex max-lg:items-center',
              image.large_url === activeImage ? 'border-primary-yellow' : 'hover:border-secondary-2'
            )}
          >
            <div className="group/slide cursor-pointer transition-colors max-lg:size-20 lg:relative lg:pt-[100%]">
              <Image
                width={250}
                height={250}
                src={image.medium_url}
                alt={name}
                className={cn(
                  'size-full object-contain opacity-90 transition-opacity lg:absolute lg:left-0 lg:top-0',
                  image.large_url === activeImage ? 'opacity-100' : 'group-hover/slide:opacity-100'
                )}
                onClick={() => setActiveImage(image.large_url)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > SLIDES_PER_VIEW ? (
        <>
          <Button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100 lg:inline-flex"
          >
            <ChevronLeftIcon className="size-5 text-light-1" />
          </Button>
          <Button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100 lg:inline-flex"
          >
            <ChevronRightIcon className="size-5 text-light-1" />
          </Button>
        </>
      ) : null}
    </>
  )
}
