'use client'

import { useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import { cn } from '@/shared/utils'
import { ProductImageSizes } from '@/features/product/types'

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
  const swiperRef = useRef<SwiperRef | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)

  return (
    <>
      <div className="group/swiper relative hidden select-none p-4 lg:block">
        <Swiper
          className="mySwiper"
          autoHeight={true}
          direction="horizontal"
          spaceBetween={12}
          slidesPerView={SLIDES_PER_VIEW}
          slidesPerGroup={SLIDES_PER_VIEW}
          onSlideChange={(swiper) => {
            console.log(swiper)
            if (swiper.isBeginning) {
              setIsBeginning(true)
            } else {
              setIsBeginning(false)
            }
          }}
          modules={[Navigation]}
          ref={swiperRef}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className={cn(
                '!mr-3 !w-[4.0875rem] overflow-hidden rounded-md border border-secondary-4 !bg-light-1 p-1 transition-colors 2xl:!w-[84.4px]',
                image.large_url === activeImage ? 'border-primary-yellow' : 'hover:border-secondary-2'
              )}
            >
              <div className="group/slide cursor-pointer transition-colors lg:relative lg:pt-[100%]">
                <Image
                  width={100}
                  height={100}
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
            {!isBeginning ? (
              <Button
                onClick={() => swiperRef.current?.swiper?.slidePrev()}
                className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100 lg:inline-flex"
              >
                <ChevronLeftIcon className="size-5 text-light-1" />
              </Button>
            ) : null}
            <Button
              onClick={() => swiperRef.current?.swiper?.slideNext()}
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100 lg:inline-flex"
            >
              <ChevronRightIcon className="size-5 text-light-1" />
            </Button>
          </>
        ) : null}
      </div>
      <div className="hidden select-none md:mr-8 md:flex md:py-8 lg:hidden">
        <Swiper
          className="mySwiper !w-[5.625rem] [&_.swiper-wrapper]:h-[5.625rem] [&_.swiper-wrapper]:flex-col"
          direction="vertical"
          autoHeight
          slidesPerView="auto"
          spaceBetween={12}
          slidesPerGroup={SLIDES_PER_VIEW}
          modules={[Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className={cn(
                '!mb-3 rounded-md border border-secondary-4 bg-light-1 p-1 transition-colors max-lg:flex max-lg:items-center',
                image.large_url === activeImage ? 'border-primary-yellow' : 'hover:border-secondary-2'
              )}
            >
              <div className="group/slide cursor-pointer transition-colors lg:relative lg:pt-[100%]">
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
      </div>
    </>
  )
}
