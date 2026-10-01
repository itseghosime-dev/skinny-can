import Image from 'next/image'
import React from 'react'
import NewNeedImg from '@/assets/new_need.webp'
import { useTranslations } from 'next-intl'

export default function NewNeed() {
  const t = useTranslations('BBS')
  const benefits = (t.raw('benefits') as string[]) || []

  return (
    <div className="container relative mt-10 overflow-hidden pb-14 lg:mt-20">
      <section
        className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2"
        aria-label="Why Skinny Exists"
      >
        <div className="relative z-10 space-y-2">
          <h2 className="font-amiri text-3xl text-primary lg:text-4xl">
            {t('whySkinnyTitle')}
          </h2>

          <p className="font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
            {t('whySkinnysubTitle')}
          </p>

          <p className="max-w-[400px] font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
            {t('whySkinnyDescription')}
          </p>
          <ul className="list-inside list-disc space-y-1 py-2">
            {benefits.map((item, idx) => (
              <li
                key={idx}
                className="font-varela text-sm text-primary md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="max-w-[450px] font-varela text-sm text-[#5F5F5F] lg:text-base xl:text-lg">
            {t.rich('enjoyWithoutCompromise', {
              strong: (chunks) => (
                <strong className="font-amiri text-sm font-bold text-primary lg:text-base xl:text-lg">
                  {chunks}
                </strong>
              ),
            })}
          </p>
          <p className="max-w-[450px] font-varela text-sm text-[#5F5F5F] lg:text-base xl:text-lg">
            {t('enjoy_drink')}
          </p>
          <p className="max-w-[450px] font-amiri text-sm font-bold text-primary lg:text-base xl:text-lg">
            {t('enjoy_smarter')}
          </p>
        </div>
        <div>
          <Image
            src={NewNeedImg}
            alt="Skinny Cans beverage can and fresh ingredients"
            sizes="(max-width: 768px) 100vw, 450px"
            className="mx-auto h-full w-full max-w-[450px] object-cover object-center"
          />
        </div>
      </section>
    </div>
  )
}
