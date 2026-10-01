import { useTranslations } from 'next-intl'
import React from 'react'

import Moment1 from '@/assets/moments/moment_one.png'
import Moment2 from '@/assets/moments/moment_two_new.png'
import Moment3 from '@/assets/moments/moment_three.png'
import Moment4 from '@/assets/moments/moment_four.png'
import Moment5 from '@/assets/moments/moment_five.png'
import MomentsBg from '@/assets/moments/moments_bg.svg'
import Image from 'next/image'

export default function Moments() {
  const t = useTranslations('Index')

  return (
    <div className="container relative mt-10 md:mt-16 xl:mt-32">
      <Image
        src={MomentsBg}
        alt="Flower Background"
        sizes="100%"
        fill
        className="h-full w-full object-cover object-top opacity-40 md:opacity-100"
      />
      <div className="relative z-10 space-y-4 pb-32 text-primary md:space-y-5 lg:space-y-7">
        <div className="relative w-fit after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-7 after:rounded-full after:bg-primary">
          <p className="font-varela text-xs uppercase tracking-wide md:text-sm lg:text-base">
            {t('moments')}
          </p>
        </div>
        <h2 className="font-amiri text-2xl uppercase md:text-3xl lg:text-5xl">
          {t('moments_heading')}
        </h2>
        <div className="grid items-center gap-5 pt-4 md:grid-cols-12 lg:pt-10">
          <div className="md:col-span-5">
            <Image
              src={Moment1}
              alt="Sips and Moments"
              sizes="100%"
              className="h-auto w-full"
            />
          </div>

          <div className="md:col-span-4">
            <Image
              src={Moment2}
              alt="Sips and Moments"
              sizes="100%"
              className="h-auto w-full"
            />
          </div>

          <div className="self-start md:col-span-3 md:pt-10 lg:pt-16">
            <Image
              src={Moment3}
              alt="Sips and Moments"
              sizes="100%"
              className="h-auto w-full"
            />
          </div>

          <div className="md:col-span-5">
            <Image
              src={Moment4}
              alt="Sips and Moments"
              sizes="100%"
              className="h-auto w-full"
            />
          </div>

          {/* Bottom-right image */}
          <div className="self-start md:col-span-7 md:-mt-4">
            <Image
              src={Moment5}
              alt="Sips and Moments"
              sizes="100%"
              className="h-auto w-full"
            />
            <p className="mt-10 text-right font-varela text-sm uppercase tracking-wide">
              {t('moments_footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
