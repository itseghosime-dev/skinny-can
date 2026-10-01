'use client'
import React, { Suspense } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Locale, locales, languageNames } from '@/i18n/request'
import { usePathname, useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'

interface LanguageToggleProps {
  locale: Locale
  width?: string
  scroll?: boolean
}

function LanguageSelectorContent({
  locale,
  width,
  scroll,
}: LanguageToggleProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return
    const queryString = searchParams?.toString()
    const target = queryString ? `${pathname}?${queryString}` : pathname
    router.replace(target, { locale: newLocale as Locale })
  }

  const headerCo =
    pathname === '/story' || pathname === '/bbs' || pathname === '/partner'

  return (
    <div
      className={`font-mono ${width ? width : 'min-w-[16rem]'} tracking-widest`}
    >
      <Select value={locale} defaultValue="en" onValueChange={switchLanguage}>
        <SelectTrigger
          aria-label="Select Language"
          className={`border-0 ${width ? width : ''} uppercase shadow-none focus-visible:border-0 focus-visible:ring-0 ${headerCo && !scroll ? 'text-white' : 'text-primary'} text-xs`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className={`uppercase ${width ? width : 'min-w-[16rem]'} shadow-xs rounded-none border-0`}
        >
          {locales.map((lang) => (
            <SelectItem
              key={lang}
              value={lang}
              className="cursor-pointer rounded-none py-3 text-sm text-primary"
            >
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default function LanguageSelector(props: LanguageToggleProps) {
  return (
    <Suspense
      fallback={
        <div
          className={`font-mono ${props.width ? props.width : 'min-w-[16rem]'} tracking-widest`}
        />
      }
    >
      <LanguageSelectorContent {...props} />
    </Suspense>
  )
}
