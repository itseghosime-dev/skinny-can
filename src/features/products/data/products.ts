import type { StaticImageData } from 'next/image'
import SodaOne from '@/assets/skinny-can-one.webp'
import SodaTwo from '@/assets/skinny-can-two.webp'
import ProductSubImageOne from '@/assets/skinny-crisp.png'
import ProductSubImageTwo from '@/assets/skinny-juicy.png'

export interface ProductItem {
  id: string
  slug: 'hard_lemonade' | 'hard_berries'
  nameKey: string
  titleKey: string
  introDescKey: string
  introBlendKey: string
  highlightsKey: string
  image: StaticImageData
  subImage: StaticImageData
  abv: string
  calories: string
  sugar: string
}

export const PRODUCTS: ProductItem[] = [
  {
    id: '1',
    slug: 'hard_lemonade',
    nameKey: 'hard_lemonade_product',
    titleKey: 'hard_lemonade_product_intro_title',
    introDescKey: 'hard_lemonade_product_intro_description',
    introBlendKey: 'hard_lemonade_product_intro_blend',
    highlightsKey: 'hard_lemonade_product_highlights',
    image: SodaOne,
    subImage: ProductSubImageOne,
    abv: '4%',
    calories: '57 KCAL',
    sugar: '0g',
  },
  {
    id: '2',
    slug: 'hard_berries',
    nameKey: 'hard_berries_product',
    titleKey: 'hard_berries_product_intro_title',
    introDescKey: 'hard_berries_product_intro_description',
    introBlendKey: 'hard_berries_product_intro_blend',
    highlightsKey: 'hard_berries_product_highlights',
    image: SodaTwo,
    subImage: ProductSubImageTwo,
    abv: '4%',
    calories: '57 KCAL',
    sugar: '0g',
  },
]

export const VALID_PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug)

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}
