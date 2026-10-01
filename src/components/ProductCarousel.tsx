'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import ProductImage from '@/assets/overview_product_image.png'
import ProductImage1 from '@/assets/overview_product_image_2.png'
import Image, { StaticImageData } from 'next/image'

export default function ProductCarousel() {
  const Carousel = { ProductImage, ProductImage1 }
  return (
    <div className="flex justify-center">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-full w-full max-w-[320px] md:max-w-full"
      >
        {(Object.values(Carousel) as StaticImageData[]).map(
          (_image: StaticImageData, i: number) => (
            <SwiperSlide key={i} className="h-full">
              <div className="h-full">
                <Image
                  src={_image}
                  alt="Product Overview"
                  sizes="100%"
                  className="h-auto w-full"
                />
              </div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </div>
  )
}
