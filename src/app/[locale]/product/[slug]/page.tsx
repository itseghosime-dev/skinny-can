import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { Icons } from '@/components/icons'
import BgOneSlug from '@/assets/product_slug_background.png'
import { Link } from '@/i18n/routing'
import { Locale, locales } from '@/i18n/request'
import { getProductBySlug, PRODUCTS } from '@/features/products/data/products'
import { env } from '@/config/env'

interface PageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = []
  for (const locale of locales) {
    for (const product of PRODUCTS) {
      params.push({ locale, slug: product.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params: { locale, slug },
}: PageProps): Promise<Metadata> {
  const product = getProductBySlug(slug)
  if (!product) return {}

  const t = await getTranslations({ locale, namespace: 'Index' })
  const productName = t(product.nameKey)
  const productDescription = t(product.introDescKey)
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  return {
    title: `${productName} — Organic Sugar-Free RTD Cocktail`,
    description: productDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/product/${slug}`,
      languages: {
        en: `${baseUrl}/en/product/${slug}`,
        no: `${baseUrl}/no/product/${slug}`,
        se: `${baseUrl}/se/product/${slug}`,
      },
    },
    openGraph: {
      title: `${productName} | Skinny Cans`,
      description: productDescription,
      url: `${baseUrl}/${locale}/product/${slug}`,
      type: 'website',
    },
  }
}

export default async function ProductDetailPage({
  params: { locale, slug },
}: PageProps) {
  unstable_setRequestLocale(locale)
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'Index' })
  const productHighlights = (t.raw(product.highlightsKey) as string[]) || []
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(product.nameKey),
    description: t(product.introDescKey),
    category: 'Alcoholic Beverage > Ready to Drink Cocktail',
    brand: {
      '@type': 'Brand',
      name: 'Skinny Cans',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/${locale}/product/${slug}`,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Alcohol by Volume',
        value: product.abv,
      },
      {
        '@type': 'PropertyValue',
        name: 'Calories per can',
        value: product.calories,
      },
      {
        '@type': 'PropertyValue',
        name: 'Sugar content',
        value: product.sugar,
      },
    ],
  }

  return (
    <main className="mx-auto mt-20 w-screen overflow-hidden lg:mt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="relative pb-32 pt-20">
        <Image
          src={BgOneSlug}
          alt="Background decorative pattern"
          sizes="100%"
          className="pointer-events-none absolute bottom-0 left-0"
        />
        <div className="container relative z-10 space-y-28">
          <section className="space-y-5 text-center font-varela uppercase tracking-wider text-primary md:space-y-9">
            <div className="relative after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-7 after:-translate-x-1/2 after:rounded-full after:bg-primary">
              <p className="text-sm lg:text-base">{t('collection')}</p>
            </div>
            <h1 className="font-amiri text-3xl md:text-5xl lg:text-7xl">
              {t(product.nameKey)}
            </h1>
          </section>
          <section className="relative">
            <div className="relative z-10 mx-auto grid max-w-5xl items-center justify-center gap-7 lg:grid-cols-5">
              <div className="flex h-full items-center justify-center lg:col-span-2">
                <Image
                  src={product.image}
                  alt={t(product.nameKey)}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="mx-auto h-full max-h-[750px] min-h-52 w-auto object-contain"
                  priority
                />
              </div>
              <div className="relative space-y-7 py-4 lg:col-span-3">
                <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-32 md:w-52 lg:w-60">
                  <Image
                    src={product.subImage}
                    alt={`${t(product.nameKey)} fruit ingredients`}
                    sizes="(max-width: 768px) 120px, 240px"
                  />
                </div>
                <h2 className="font-amiri text-2xl text-primary md:text-3xl lg:text-4xl xl:text-5xl">
                  {t(product.titleKey)}
                </h2>
                <p className="text-base text-[#96A69C] md:text-lg">
                  {t(product.introDescKey)}
                </p>
                <p className="text-base text-[#96A69C] md:text-lg">
                  {t(product.introBlendKey)
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
                      className="font-varela text-base text-primary md:text-lg lg:text-xl"
                      key={idx}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/partner"
                  className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-3 font-varela text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] md:text-sm lg:text-base"
                >
                  {t(`${slug}_find_reseller`)}{' '}
                  <Icons.rightArrow className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
