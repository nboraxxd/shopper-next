'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import { ProductImageSizes } from '@/features/product/types'
import { ThumbControlButton } from '@/features/product/components/product-images'

import 'swiper/css'

interface Props {
  name: string
  images: ProductImageSizes[]
  activeImage: string
  setActiveImage: React.Dispatch<React.SetStateAction<string>>
}

const SLIDES_PER_VIEW = 5

export function HorizontalProductThumb({ name, images, activeImage, setActiveImage }: Props) {
  const swiperRef = useRef<SwiperRef | null>(null)

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  return (
    <div className="group/swiper relative hidden select-none p-4 lg:block">
      <Swiper
        className="mySwiper"
        direction="horizontal"
        spaceBetween={12}
        slidesPerView={SLIDES_PER_VIEW}
        slidesPerGroup={SLIDES_PER_VIEW}
        onSlideChange={(swiper) => {
          if (swiper.isBeginning) {
            setIsBeginning(true)
          } else {
            setIsBeginning(false)
          }

          if (swiper.isEnd) {
            setIsEnd(true)
          } else {
            setIsEnd(false)
          }
        }}
        modules={[Navigation]}
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              '!mr-3 !w-[4.0875rem] cursor-pointer overflow-hidden rounded-md border-2 border-light-2 bg-light-1 2xl:!w-[84.4px]',
              {
                '!border-highlight': image.large_url === activeImage,
              }
            )}
          >
            <div className="group/slide relative pt-[100%]">
              <Image
                width={100}
                height={100}
                src={image.medium_url}
                alt={name}
                className={cn(
                  'absolute left-0 top-0 size-full object-contain opacity-90 transition-opacity',
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
            <ThumbControlButton className="left-0" onClick={() => swiperRef.current?.swiper?.slidePrev()}>
              <ChevronLeftIcon />
            </ThumbControlButton>
          ) : null}
          {!isEnd ? (
            <ThumbControlButton className="right-0" onClick={() => swiperRef.current?.swiper?.slideNext()}>
              <ChevronRightIcon />
            </ThumbControlButton>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export function VerticalProductThumb({ name, images, activeImage, setActiveImage }: Props) {
  return (
    <div className="mr-8 hidden select-none py-8 md:flex lg:hidden">
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
              'group/slide !mb-3 cursor-pointer overflow-hidden rounded-md border-2 border-light-2 bg-light-1',
              {
                '!border-highlight': image.large_url === activeImage,
              }
            )}
          >
            <Image
              width={100}
              height={100}
              src={image.medium_url}
              alt={name}
              className={cn(
                'size-full object-contain opacity-90 transition-opacity',
                image.large_url === activeImage ? 'opacity-100' : 'group-hover/slide:opacity-100'
              )}
              onClick={() => setActiveImage(image.large_url)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
