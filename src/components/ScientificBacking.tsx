import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import Backing1 from '@/assets/backing_1.png'
import Backing2 from '@/assets/backing_2.png'
import Backing3 from '@/assets/backing_3.jpg'
import BackingBg from '@/assets/backingb.png'
import Link from 'next/link'
import { Icons } from './icons'

export default function ScientificBacking() {
  const t = useTranslations('BBS')
  return (
    <div className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto max-w-7xl space-y-14">
        <div className="mx-auto grid w-fit max-w-7xl justify-center gap-24 text-center  md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="max-h-60 overflow-hidden">
              <Image
                src={Backing1}
                alt="Study Image"
                sizes="100%"
                className="mx-auto h-[180px] w-auto object-contain object-center"
              />
            </div>
            <p className="max-w-[450px] text-pretty font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('backing-1')}
            </p>
            <Link
              href={
                'https://www.sciencedirect.com/science/article/abs/pii/S002231662216596X'
              }
              target="_blank"
              className="mx-auto flex max-w-[270px] items-center justify-center gap-2 bg-primary px-8 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
            >
              {t('read')} <Icons.rightArrow className="h-5 w-5" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="max-h-60 overflow-hidden">
              <Image
                src={Backing2}
                alt="Study Image"
                sizes="100%"
                className="mx-auto h-[180px] w-auto object-contain object-center"
              />
            </div>
            <p className="max-w-[450px] text-pretty font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('backing-2')}
            </p>
            <Link
              href={'https://pubmed.ncbi.nlm.nih.gov/30949667/'}
              target="_blank"
              className="mx-auto flex max-w-[270px] items-center justify-center gap-2 bg-primary px-8 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
            >
              {t('read')} <Icons.rightArrow className="h-5 w-5" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="max-h-60 overflow-hidden">
              <Image
                src={Backing3}
                alt="Study Image"
                sizes="100%"
                className="mx-auto h-[180px] w-auto object-contain object-center"
              />
            </div>
            <p className="max-w-[450px] text-pretty font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('backing-3')}
            </p>
            <Link
              href={
                'https://www.frontiersin.org/articles/10.3389/fimmu.2022.988481/full'
              }
              target="_blank"
              className="mx-auto flex max-w-[270px] items-center justify-center gap-2 bg-primary px-8 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
            >
              {t('read')} <Icons.rightArrow className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <Image
        src={BackingBg}
        alt="Background"
        sizes="100%"
        className="absolute bottom-0 z-0 h-auto max-h-[800px] w-full object-cover md:-bottom-20 md:object-contain md:object-[150px]"
      />
    </div>
  )
}
