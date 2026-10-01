import Image from 'next/image'
import React from 'react'

import StoryBg from '@/assets/skinny-story.webp'
import { useTranslations } from 'next-intl'
import { Icons } from './icons'
import Link from 'next/link'

export default function SkinnyStory() {
  const t = useTranslations('Index')

  return (
    <div className="relative flex items-center justify-center py-36 lg:py-64">
      <Image
        src={StoryBg}
        alt="Background Image"
        fill
        sizes="100%"
        className="absolute z-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="container relative z-20 flex flex-col items-center space-y-4 text-center uppercase text-white">
        <div className="relative after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-7 after:-translate-x-1/2 after:rounded-full after:bg-white">
          <p className="text-sm uppercase md:text-base">{t('discover')}</p>
        </div>
        <h2 className="font-amiri text-4xl md:text-5xl lg:text-6xl">
          {t('skinny_story')}
        </h2>
        <Link
          href={'/story'}
          className="flex items-center justify-center gap-2 bg-white px-8 py-3 text-sm uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          {t('full_story')} <Icons.rightArrow className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
