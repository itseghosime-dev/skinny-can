import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import { Icons } from './icons'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Green from '../../public/images/marker-green.png'
import Gold from '../../public/images/marker-gold.png'
import Silver from '../../public/images/marker-silver.png'

const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })
export default function PartnersInfo() {
  const t = useTranslations('Partner')

  const mapper = [
    {
      icon: Green,
      text: 'next',
    },
    {
      icon: Silver,
      text: 'warehouse',
    },
    {
      icon: Gold,
      text: 'live',
    },
  ]

  return (
    <div className="container pb-24">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="space-y-12">
          <div className="max-w-80">
            <h4 className="font-amiri text-xl font-semibold text-primary md:text-2xl">
              {t('partnering_heading')}
            </h4>
            <p className="max-w-[450px] font-varela text-sm text-[#96A69C] md:text-base lg:text-lg">
              {t('partnering_description')}
            </p>
          </div>
          <div className="max-w-80">
            <h4 className="font-amiri text-xl font-semibold text-primary md:text-2xl">
              {t('logistics_partnership')}
            </h4>
            <p className="max-w-[450px] font-varela text-sm text-[#96A69C] md:text-base lg:text-lg">
              {t('logistics_description')}
            </p>
          </div>
          <div className="max-w-80">
            <h4 className="font-amiri text-xl font-semibold text-primary md:text-2xl">
              {t('launch_announcement')}
            </h4>
            <p className="max-w-[450px] font-varela text-sm text-[#96A69C] md:text-base lg:text-lg">
              {t('launch_description')}
            </p>
          </div>
          <Link
            href={''}
            className="flex max-w-[220px] items-center justify-center gap-2 bg-primary px-8 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
          >
            {t('contact')} <Icons.rightArrow className="h-5 w-5" />
          </Link>
        </div>
        <div className="md:col-span-2">
          <WorldMap />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-12">
            {mapper.map((items, idx) => (
              <div key={idx} className="flex items-center justify-center gap-5">
                <Image
                  src={items.icon}
                  alt="Marker"
                  sizes="100%"
                  className="h-5 w-auto"
                />
                <p className="font-varela text-sm text-primary md:text-base lg:text-lg">
                  {t(items.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
