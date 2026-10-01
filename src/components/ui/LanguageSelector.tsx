'use client'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Locale, locales, languageNames } from '@/i18n'

interface LanguageToggleProps {
  locale: Locale
  width?: string
  scroll?: boolean
}

export default function LanguageSelector({
  locale,
  width,
  scroll,
}: LanguageToggleProps) {
  const router = useRouter()
  const pathname = usePathname()
  const normalizedPath = pathname.replace(`/${locale}`, '') || '/'
  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return

    const segments = pathname.split('/')
    segments[1] = newLocale // replaces locale segment
    const newPath = segments.join('/')
    router.push(newPath)
  }

  const headerCo =
    normalizedPath === '/story' ||
    normalizedPath === '/bbs' ||
    normalizedPath === '/partner'

  return (
    <div
      className={`font-mono ${width ? width : 'min-w-[16rem]'} tracking-widest`}
    >
      <Select value={locale} defaultValue="en" onValueChange={switchLanguage}>
        <SelectTrigger
          className={`border-0 ${width ? width : ''} uppercase shadow-none  focus-visible:border-0 focus-visible:ring-0 ${headerCo && !scroll ? 'text-white' : 'text-primary'} text-xs`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className={`uppercase  ${width ? width : 'min-w-[16rem]'} shadow-xs rounded-none border-0`}
        >
          {locales.map((lang) => (
            <SelectItem
              key={lang}
              value={lang}
              className={`rounded-none py-3 text-sm text-primary`}
            >
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
