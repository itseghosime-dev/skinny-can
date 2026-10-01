import { useTranslations } from 'next-intl'
import React from 'react'
import { Icons } from './icons'

import WaitlistBg from '@/assets/waitlist_bg.png'
import Image from 'next/image'
import WaitlistFlower from '@/assets/waitlist-flower.svg'

export default function Waitlist() {
  const t = useTranslations('Index')

  return (
    <div className="relative pb-32">
      <div className="container relative z-10">
        <div className="relative">
          <Image
            alt="Beer Pump"
            src={WaitlistBg}
            sizes="100%"
            fill
            className="absolute z-0 h-full w-full object-cover object-center"
          />
          <section className="relative z-10 bg-gradient-to-r from-black/75 to-black/30 to-70% px-5 py-14 text-left font-varela text-white md:px-14 md:py-20 lg:to-black/0 lg:to-70%">
            <div className="space-y-5 tracking-wider md:space-y-6 lg:space-y-8">
              <div className="relative w-fit max-w-72 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-7 after:rounded-full after:bg-white">
                <p className="font-varela text-xs uppercase md:text-sm">
                  {t('waitlist')}
                </p>
              </div>
              <h2 className="max-w-72 font-amiri text-2xl uppercase md:text-3xl lg:text-5xl">
                {t('waitlist_heading')}
              </h2>
              <p className="max-w-80 text-sm leading-5 md:text-base lg:text-lg">
                {t('waitlist_description')}
              </p>
              <div className="md:pt-5">
                <button className="flex items-center justify-center gap-2 bg-[#F1F1F1] px-8 py-3 text-sm uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-primary hover:text-white lg:text-base">
                  {t('join_waitlist')} <Icons.rightArrow className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Image
        src={WaitlistFlower}
        alt="FLower"
        sizes="100%"
        className="absolute -bottom-1/2 z-0 h-auto w-64 -translate-y-1/3 md:w-72"
      />
    </div>
  )
}
