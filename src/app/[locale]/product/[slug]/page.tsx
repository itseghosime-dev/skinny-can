import { useTranslations } from 'next-intl'
import React from 'react'
import SodaOne from '@/assets/skinny-can-one.png'
import SodaTwo from '@/assets/skinny-can-two.png'
import Image from 'next/image'
import { Icons } from '@/components/icons'
import BgOneSlug from '@/assets/product_slug_background.png'
import ProductSubImage from '@/assets/skinny-crisp.png'
import ProductSubImage1 from '@/assets/skinny-juicy.png'

interface PageProps {
  params: { slug: string }
}

export default function Page({ params }: PageProps) {
  const { slug } = params
  const t = useTranslations('Index')
  const productHighlights = t.raw(`${slug}_product_highlights`) as string[]

  return (
    <main className="mx-auto mt-20 w-screen overflow-hidden lg:mt-40">
      <div className="relative pb-32 pt-20">
        <Image
          src={BgOneSlug}
          alt="Background"
          sizes="100%"
          className="absolute bottom-0 left-0"
        />
        <div className="container relative z-10 space-y-28">
          <section className="space-y-5 text-center font-varela uppercase tracking-wider text-primary md:space-y-9 ">
            <div className="relative after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-7 after:-translate-x-1/2 after:rounded-full after:bg-primary">
              <p className="text-sm lg:text-base">{t('collection')}</p>
            </div>
            <h1 className="font-amiri text-3xl md:text-5xl lg:text-7xl">
              {t(`${slug}_product`)}
            </h1>
          </section>
          <section className="relative">
            <div className="relative z-10 mx-auto grid max-w-5xl items-center justify-center gap-7 lg:grid-cols-5">
              <div className="flex h-full items-center justify-center lg:col-span-2">
                <Image
                  src={slug === 'hard_lemonade' ? SodaOne : SodaTwo}
                  alt={t(`${slug}_product`)}
                  sizes="100%"
                  className="mx-auto h-full max-h-[750px] min-h-52 w-auto "
                />
              </div>
              <div className="relative space-y-7 py-4 lg:col-span-3">
                <div className="absolute bottom-0 right-0 z-0 h-auto w-32 md:w-52 lg:w-60">
                  <Image
                    src={
                      slug === 'hard_lemonade'
                        ? ProductSubImage
                        : ProductSubImage1
                    }
                    alt={t(`${slug}_product`)}
                    sizes="100%"
                  />
                </div>
                <h3 className="font-amiri text-2xl text-primary md:text-3xl lg:text-4xl xl:text-5xl">
                  {t(`${slug}_product_intro_title`)}
                </h3>
                <p className="text-base text-[#96A69C] md:text-lg">
                  {t(`${slug}_product_intro_description`)}
                </p>
                <p className="text-base text-[#96A69C] md:text-lg">
                  {t(`${slug}_product_intro_blend`)
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>

                <ul className="list-disc space-y-1 py-3 pl-4">
                  {productHighlights.map((item, idx) => (
                    <li
                      className="text-base text-primary md:text-lg lg:text-xl"
                      key={idx}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center justify-center gap-2 bg-primary px-8 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base">
                  {t(`${slug}_find_reseller`)}{' '}
                  <Icons.rightArrow className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
