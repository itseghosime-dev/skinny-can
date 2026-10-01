import Image from 'next/image'
import React from 'react'
import StoryBg from '@/assets/alcohol_background.webp'
import { useTranslations } from 'next-intl'

export default function AlcoholBackground() {
  const t = useTranslations('Index')

  return (
    <section
      className="relative flex items-center justify-center py-36 lg:py-64"
      aria-label="Brand Mission"
    >
      <Image
        src={StoryBg}
        alt="Skinny Cans brand mission backdrop"
        fill
        sizes="100%"
        className="absolute z-0 h-full w-full object-cover object-center"
      />
      <div className="container relative z-20 flex flex-col items-center space-y-4 text-center uppercase text-white">
        <div className="relative after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-7 after:-translate-x-1/2 after:rounded-full after:bg-white">
          <p className="text-sm uppercase tracking-wider md:text-base lg:text-lg">
            {t('mission')}
          </p>
        </div>
        <h2 className="font-amiri text-4xl md:text-5xl lg:text-6xl">
          {t('mission_heading')}
        </h2>
      </div>
    </section>
  )
}
