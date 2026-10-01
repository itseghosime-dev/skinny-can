import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import Backing1 from '@/assets/backing.webp'
import Backing2 from '@/assets/backing_2.webp'
import Backing3 from '@/assets/backing_3.webp'
import BackingBg from '@/assets/backingb.webp'
import { Icons } from './icons'

export default function ScientificBacking() {
  const t = useTranslations('BBS')
  return (
    <section
      className="relative overflow-hidden py-24"
      aria-label="Scientific Backing & Research Studies"
    >
      <div className="container relative z-10 mx-auto max-w-7xl space-y-14">
        <div className="mx-auto grid w-fit max-w-7xl justify-center gap-24 text-center md:grid-cols-2 lg:grid-cols-3">
          <article className="space-y-4">
            <div className="max-h-60 overflow-hidden">
              <Image
                src={Backing1}
                alt="Scientific study on sugar-sweetened alcoholic drinks"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="mx-auto h-[180px] w-auto object-contain object-center"
              />
            </div>
            <p className="max-w-[450px] text-pretty font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('backing-1')}
            </p>
            <a
              href="https://www.sciencedirect.com/science/article/abs/pii/S002231662216596X"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto inline-flex max-w-[270px] items-center justify-center gap-2 bg-primary px-8 py-3 font-varela text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
            >
              {t('read')} <Icons.rightArrow className="h-5 w-5" />
            </a>
          </article>

          <article className="space-y-4">
            <div className="max-h-60 overflow-hidden">
              <Image
                src={Backing2}
                alt="Scientific research on beverages and liver fat accumulation"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="mx-auto h-[180px] w-auto object-contain object-center"
              />
            </div>
            <p className="max-w-[450px] text-pretty font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('backing-2')}
            </p>
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/30949667/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto inline-flex max-w-[270px] items-center justify-center gap-2 bg-primary px-8 py-3 font-varela text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
            >
              {t('read')} <Icons.rightArrow className="h-5 w-5" />
            </a>
          </article>

          <article className="space-y-4">
            <div className="max-h-60 overflow-hidden">
              <Image
                src={Backing3}
                alt="Scientific paper on dietary sugars and chronic low-grade inflammation"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="mx-auto h-[180px] w-auto object-contain object-center"
              />
            </div>
            <p className="max-w-[450px] text-pretty font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('backing-3')}
            </p>
            <a
              href="https://www.frontiersin.org/articles/10.3389/fimmu.2022.988481/full"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto inline-flex max-w-[270px] items-center justify-center gap-2 bg-primary px-8 py-3 font-varela text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
            >
              {t('read')} <Icons.rightArrow className="h-5 w-5" />
            </a>
          </article>
        </div>
      </div>
      <Image
        src={BackingBg}
        alt="Decorative background illustration"
        sizes="100%"
        className="pointer-events-none absolute bottom-0 z-0 h-auto max-h-[800px] w-full object-cover md:-bottom-20 md:object-contain md:object-[150px]"
      />
    </section>
  )
}
