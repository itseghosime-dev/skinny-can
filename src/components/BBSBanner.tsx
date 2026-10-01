import React from 'react'
import CounterBg from '@/assets/bbsbbg-1.png'
import CounterBg1 from '@/assets/bbsbbg-2.png'
import Image from 'next/image'
import Apos from '@/assets/apos-1.png'
import { useTranslations } from 'next-intl'

export default function BBSBanner() {
  const t = useTranslations('BBS')

  return (
    <div className="relative overflow-hidden bg-[#F4EA48] py-6">
      <Image
        src={CounterBg1}
        alt="Flower"
        sizes="100%"
        className="absolute right-0 top-0 z-0 hidden h-full w-auto object-cover object-center md:block "
      />
      <Image
        src={CounterBg}
        alt="Flower"
        sizes="100%"
        className="absolute left-0 top-0 z-0 h-full w-auto object-cover object-center "
      />
      <div className="container relative z-10">
        <div className="mx-auto w-full max-w-4xl py-5">
          <div className="relative">
            <Image
              src={Apos}
              alt="Apostrophe"
              sizes="100%"
              className="absolute -left-5 top-0 h-5 w-5 md:-left-7"
            />
            <h3 className="text-pretty text-center font-amiri text-xl italic text-primary md:text-2xl lg:text-[32px]">
              {t('bbs_header')}
            </h3>
            <Image
              src={Apos}
              alt="Apostrophe"
              sizes="100%"
              className="absolute -right-5 bottom-0 h-5 w-5 rotate-180  md:-right-7"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
