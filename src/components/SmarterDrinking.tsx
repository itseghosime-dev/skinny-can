import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import SmartFlower1 from '@/assets/smart-background-1.png'
import SmartFlower2 from '@/assets/smart-background-2.png'

export default function SmarterDrinking() {
  const t = useTranslations('Index')
  const subtext = t('smart_drinking_subtext')
  const resulttext = t('result_text')

  const sections = [
    {
      heading: t('alcohol_heading'),
      items: t.raw('alcohol_facts') as string[],
    },
    { heading: t('sugar_heading'), items: t.raw('sugar_facts') as string[] },
    {
      heading: t('calories_heading'),
      items: t.raw('calories_facts') as string[],
    },
  ]

  return (
    <div className="relative py-16 md:py-24">
      <Image
        src={SmartFlower1}
        alt="Flower"
        sizes="100%"
        className="absolute bottom-0 left-0 z-0 "
      />
      <Image
        src={SmartFlower2}
        alt="Flower"
        sizes="100%"
        className="absolute right-0 top-0 z-0 lg:bottom-0 lg:top-auto "
      />
      <div className="container relative z-10">
        <section className="text-center text-primary">
          <h2 className="font-amiri text-3xl uppercase tracking-wide md:text-4xl lg:text-5xl xl:text-6xl">
            {t('smart_drinking_title')}
          </h2>
          <div className="relative mt-2 after:absolute after:-bottom-3 after:left-1/2 after:h-0.5 after:w-10 after:-translate-x-1/2 after:rounded-full after:bg-primary">
            <p className="font-varela text-sm font-normal tracking-wider md:text-base lg:text-lg">
              {t('smart_drinking_tagline')}
            </p>
          </div>
          <h2 className="mt-10 font-amiri text-2xl md:text-3xl lg:text-4xl">
            {subtext.split('\n').map((line, idx, arr) => (
              <React.Fragment key={idx}>
                {line}
                {idx !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </section>

        <section>
          <div className="mx-auto mt-16 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="min-h-96 space-y-6 border border-[#DEDEDE] bg-white px-5 py-14 lg:px-10"
              >
                <h4 className="font-amiri text-2xl font-medium text-primary xl:text-3xl">
                  {section.heading}
                </h4>
                <div className="pl-6">
                  <ul className="list-outside list-disc space-y-4">
                    {section.items.map((fact, i) => (
                      <li
                        className="font-varela text-sm text-primary md:text-base"
                        key={i}
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mx-auto mt-10 max-w-xl text-center text-primary">
            <h5 className="font-amiri text-2xl font-semibold">
              {t('result_heading')}
            </h5>
            <p className="mt-1 font-varela text-xs md:text-base lg:text-lg">
              {resulttext.split('\n').map((line, idx, arr) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx !== arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
