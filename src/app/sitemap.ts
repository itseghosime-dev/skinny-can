import { MetadataRoute } from 'next'
import { env } from '@/config/env'
import { locales } from '@/i18n/request'
import { PRODUCTS } from '@/features/products/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL
  const routes = ['', '/product', '/story', '/bbs', '/partner', '/waitlist']
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Static routes per locale with alternates
  for (const route of routes) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`]),
          ),
        },
      })
    }
  }

  // Dynamic product routes
  for (const product of PRODUCTS) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/product/${product.slug}`]),
          ),
        },
      })
    }
  }

  return sitemapEntries
}
