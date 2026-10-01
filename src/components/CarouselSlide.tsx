'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'
import CarouselContent, { CarouselItem } from './CarouselContent'

import 'swiper/css'
import 'swiper/css/pagination'
import { SiteConfig } from '@/config/site-i18n'

const sliderImages: CarouselItem[] = [
  {
    src: require('@/assets/slider-bg-one.svg'),
    heading: 'brewed',
    description: 'banner_description',
    btn: 'button_banner',
  },
  {
    src: require('@/assets/slider-bg-two.png'),
    heading: 'backed',
    description: 'banner_description',
    btn: 'button_banner',
  },
  {
    src: require('@/assets/slider-bg-three.png'),
    heading: 'built',
    description: 'banner_description',
    btn: 'button_banner',
  },
]

interface SliderProps {
  setActiveBg: (index: number) => void
  translation: SiteConfig
}

export default function Slider({ setActiveBg, translation }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <Swiper
      centeredSlides
      loop
      speed={1500}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      onSlideChange={(swiper) => {
        const realIndex = swiper.realIndex ?? 0
        setActiveBg(realIndex)
        setCurrentIndex(realIndex)
      }}
      grabCursor={false}
      allowTouchMove={false}
      simulateTouch={false}
      pagination={{ clickable: true, el: '.custom-pagination' }}
      modules={[Autoplay, Pagination]}
      className="mySwiper relative"
    >
      {sliderImages.map((cont, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-80 overflow-hidden from-black/50 after:absolute after:inset-y-0 after:left-0 after:z-0 after:w-1/2 after:bg-gradient-to-r after:content-[''] md:h-full">
            <Image
              src={cont.src}
              alt={`Slide ${i}`}
              sizes="100%"
              className="h-full w-full object-cover object-right"
            />
            {/* 👇 Force re-render of CarouselContent on slide change */}
            {i === currentIndex && (
              <CarouselContent
                key={`content-${currentIndex}`}
                cont={cont}
                translation={translation}
              />
            )}
          </div>
        </SwiperSlide>
      ))}
      <div className="custom-pagination" />
    </Swiper>
  )
}
