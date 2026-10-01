import Image from 'next/image'
import React from 'react'
import NewNeedImg from '@/assets/new_need.png'
import { useTranslations } from 'next-intl'

export default function NewNeed() {
  const t = useTranslations('BBS')

  const Benefits = t.raw('benefits') as string[]

  return (
    <>
      <div className="container relative mt-10 overflow-hidden pb-14 lg:mt-20 ">
        <section className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 ">
          <div className="relative z-10 space-y-2">
            <h3 className="font-amiri text-3xl text-primary lg:text-4xl">
              {t('whySkinnyTitle')}
            </h3>

            <p className="font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('whySkinnysubTitle')}
            </p>

            <p className="max-w-[400px] font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t('whySkinnyDescription')}
            </p>
            {Benefits.map((items, idz) => (
              <ul key={idz} className="list-inside list-disc">
                <li className="font-varela text-sm text-primary md:text-base">
                  {items}
                </li>
              </ul>
            ))}
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
              alt="Image"
              sizes="100%"
              className="h-full w-full max-w-[450px] object-cover object-center"
            />
          </div>
        </section>
      </div>
    </>
  )
}
