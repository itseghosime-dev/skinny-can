import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import OverviewFlower from '@/assets/overview_background.png'
import { Icons } from './icons'
import ProductCarousel from './ProductCarousel'

export default function ProductOverview() {
  const t = useTranslations('Index')
  const benefits = t.raw('product_overview_benefits') as string[]
  return (
    <div className="relative">
      <Image
        src={OverviewFlower}
        alt="Flower"
        sizes="100%"
        className="absolute left-0 top-0 z-0 "
      />
      <div className="container relative z-10 pt-20 md:pt-28">
        <div className="mx-auto max-w-4xl space-y-12">
          <h3 className="text-center font-amiri text-2xl font-normal uppercase text-primary lg:text-3xl">
            {t('product_overview')}
          </h3>
          <div>
            <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
              <ProductCarousel />

              <div>
                <h2 className="font-amiri text-2xl uppercase text-primary md:text-3xl lg:text-4xl">
                  {t('product_overview_head')}
                </h2>
                <ul className="my-10 space-y-1 md:mt-14">
                  {benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className=" font-varela text-lg text-[#96A69C] md:text-xl"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center justify-center gap-2 bg-primary px-8 py-3 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] lg:text-base">
                  {t('product_overview_call_to_action')}{' '}
                  <Icons.rightArrow className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
