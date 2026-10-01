import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales, localePrefix } from './request'

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
