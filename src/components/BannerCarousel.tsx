'use client'
import { AnimatePresence, motion } from 'framer-motion'

import BannerBgOne from '@/assets/banner-bg-one.svg'

import SlideOneFlowerLeft from '@/assets/slider-one-flower-left.svg'
import SlideOneFlowerRight from '@/assets/Flower & Butterfly.png'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Slider from './CarouselSlide'
import { SiteConfig } from '@/config/site-i18n'

const backgroundImages = [BannerBgOne, BannerBgOne, BannerBgOne]

export default function BannerCarousel(tran: SiteConfig) {
  const [activeBg, setActiveBg] = useState(0)
  const [prevBg, setPrevBg] = useState(0)

  const flowerSets = [
    { left: SlideOneFlowerLeft, right: SlideOneFlowerRight },
    { left: SlideOneFlowerLeft, right: SlideOneFlowerRight },
    { left: SlideOneFlowerLeft, right: SlideOneFlowerRight },
  ]

  useEffect(() => {
    if (activeBg !== prevBg) {
      setPrevBg(activeBg)
    }
  }, [activeBg, prevBg])

  return (
    <div className="container py-20 md:pt-28 ">
      <div className="relative mx-auto w-full max-w-[270px] md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {/* 🪻 BACKGROUND FLOWERS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${activeBg}`}
            initial={{ x: 150, opacity: 0, scale: 0 }}
            animate={{ x: -80, opacity: 1, scale: 1 }}
            exit={{ x: 150, opacity: 0, scale: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute',
              top: '0',
              transform: 'translateY(-50%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
            className="left-[5%] md:-left-[5%] xl:-left-[9%]"
          >
            <Image
              src={flowerSets[activeBg].left}
              alt="Flower"
              sizes="100%"
              className="h-40 w-auto md:h-64 xl:h-96"
            />
          </motion.div>
          <motion.div
            key={`right-${activeBg}`}
            initial={{ x: -150, opacity: 0, scale: 0 }}
            animate={{ x: 200, opacity: 1, scale: 1 }}
            exit={{ x: -150, opacity: 0, scale: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute',
              top: 0,
              transform: 'translateY(-50%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
            className="left-[12%] md:left-auto md:right-[10%] xl:right-0"
          >
            <Image
              src={flowerSets[activeBg].right}
              alt="Flower"
              sizes="100%"
              className="h-40 w-auto md:h-64 xl:h-96"
            />
          </motion.div>
        </AnimatePresence>

        {/* Previous Background - fading out and zoomed in */}
        <Image
          src={backgroundImages[prevBg]}
          alt="Background Carousel Previous"
          fill
          sizes="100%"
          className={clsx(
            'duration-[3000ms] absolute z-0 h-auto w-full scale-[1.25] object-cover object-center opacity-0 transition-all ease-out',
          )}
        />

        {/* Active Background - zoomed out and fading in */}
        <Image
          src={backgroundImages[activeBg]}
          alt="Background Carousel Active"
          fill
          sizes="100%"
          className={clsx(
            'duration-[3000ms] absolute z-0 h-auto w-full scale-100 object-cover object-center opacity-100 transition-all ease-out',
          )}
        />

        <section className="relative bottom-4 left-4 z-10 md:bottom-6 md:left-6 ">
          <Slider setActiveBg={setActiveBg} translation={tran} />
        </section>
      </div>
    </div>
  )
}
