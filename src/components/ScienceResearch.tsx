import { useTranslations } from 'next-intl'
import BGImage from '@/assets/science_research_img.png'
import BGImage1 from '@/assets/need-happen.png'
import Image from 'next/image'
import React from 'react'

export default function ScienceResearch() {
  const t = useTranslations('BBS')

  const gridInfo = [
    {
      heading: 'research_shows_heading',
      paragrahInfo: 'research_shows_paragraph',
    },

    {
      heading: 'sugar_heading',
      paragrahInfo: 'sugar_paragraph',
    },
    {
      heading: 'alcohol_heading',
      paragrahInfo: 'alcohol_paragraph',
    },
    {
      heading: 'calories',
      paragrahInfo: 'calories_paragraph',
    },
  ]

  return (
    <div className="relative ">
      <section className="container  relative pb-10">
        <Image
          src={BGImage1}
          alt="BG"
          sizes="100%"
          className="absolute -bottom-1/4 z-0 h-full w-full max-w-2xl object-contain object-bottom"
        />

        <div className="relative z-10 mx-auto grid w-fit max-w-6xl justify-center gap-16 pt-24 md:grid-cols-2 lg:gap-y-16 xl:gap-x-32">
          {gridInfo.map((items, index) => (
            <div key={index} className="space-y-4">
              <h3
                className={`font-amiri ${index === 0 ? 'uppercase' : ''} text-2xl text-primary md:text-3xl lg:text-4xl`}
              >
                {t(items.heading)}
              </h3>
              <p
                className={`font-amiri ${index === 0 ? 'capitalize text-primary md:text-base lg:text-lg xl:text-xl' : 'text-[#5F5F5F] md:text-base lg:text-lg'} max-w-[450px] font-varela text-sm `}
              >
                {t(items.paragrahInfo)
                  .split('\n')
                  .map((line, idx, arr) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx !== arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </p>
              {items.paragrahInfo === 'sugar_paragraph' ? (
                <p className="max-w-[480px] font-amiri text-sm font-bold text-primary md:text-base lg:text-lg">
                  {t('sugar_paired')}
                </p>
              ) : (
                ''
              )}
            </div>
          ))}
          <div />
          <div className="relative z-10 space-y-2">
            <h2 className="font-amiri text-2xl text-primary md:text-3xl lg:text-4xl">
              {t('new_need')}
            </h2>
            <p className="max-w-[450px] font-varela text-sm text-[#5F5F5F] md:text-base lg:text-lg">
              {t.rich('need_paragraph', {
                strong: (chunks) => (
                  <strong className="font-amiri font-bold text-primary">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
