'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import ProductImage from '@/assets/overview_product_image.webp'
import ProductImage1 from '@/assets/overview_product_image_2.png'
import Image, { StaticImageData } from 'next/image'

export default function ProductCarousel() {
  const slides: { image: StaticImageData; alt: string }[] = [
    { image: ProductImage, alt: 'Skinny Cans Hard Lemonade showcase' },
    { image: ProductImage1, alt: 'Skinny Cans Hard Berries showcase' },
  ]

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
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="h-full">
            <div className="flex h-full items-center justify-center">
              <Image
                src={slide.image}
                alt={slide.alt}
                sizes="(max-width: 768px) 320px, 450px"
                className="h-auto w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
