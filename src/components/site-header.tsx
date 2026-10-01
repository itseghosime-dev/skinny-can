'use client'
import Logo from '@/assets/Logo.webp'
import { getSiteConfig } from '@/config/site-i18n'
import { Icons } from '@/components/icons'
import { Locale } from '@/i18n/request'
import LanguageSelector from './ui/LanguageSelector'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RiMenu4Fill } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import { Link, usePathname } from '@/i18n/routing'
import clsx from 'clsx'

interface SiteHeaderProps {
  locale: Locale
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const siteConfig = getSiteConfig(locale)
  const pathname = usePathname()
  const headerCo =
    pathname === '/story' || pathname === '/bbs' || pathname === '/partner'
  const headerNo = !headerCo
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 w-screen overflow-hidden transition-all duration-300',
        scrolled ? 'bg-white shadow-sm' : '',
      )}
    >
      <nav aria-label="Main Navigation">
        {/* Top Nav */}
        <section className="container py-2">
          <div className="relative flex min-h-16 w-full items-center justify-between md:px-12">
            {/* Language or Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:inline-block">
                <LanguageSelector locale={locale} scroll={scrolled} />
              </div>
              {/* Hamburger button for mobile */}
              <button
                className={`transition-colors duration-300 ease-linear ${headerCo && !scrolled ? 'text-white' : 'text-primary'} lg:hidden ${isOpen ? '-translate-x-40' : 'translate-x-0'} text-sm uppercase transition-transform duration-300 ease-in-out focus:outline-none`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
              >
                {!isOpen ? (
                  <span className="flex items-center gap-1">
                    <RiMenu4Fill className="text-xl" />
                    {siteConfig.menu}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <IoClose className="text-xl" />
                    {siteConfig.close}
                  </span>
                )}
              </button>
            </div>

            {/* Centered Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" aria-label="Skinny Cans Home">
                <Image
                  src={Logo}
                  alt="Skinny Cans Logo"
                  sizes="100%"
                  className="h-10 w-auto md:h-12 lg:h-14"
                  priority
                />
              </Link>
            </div>

            <div className="flex">
              <Link
                href="/partner"
                className={`flex items-center gap-2 font-varela text-xs transition-colors duration-300 ease-linear ${headerCo && !scrolled ? 'text-white' : 'text-primary'} uppercase`}
              >
                <span>{siteConfig.location}</span>
                <Icons.locate className="hidden h-5 w-5 md:inline-block" />
              </Link>
            </div>
          </div>
        </section>
        <div
          className={`border-b transition-colors duration-300 ease-linear ${headerCo && !scrolled ? 'border-[#E6E6E6]/30' : 'border-[#E6E6E6]'}`}
        />
        {/* Main Nav */}
        <section>
          <ul
            className={`hidden items-center justify-center gap-24 border-b transition-colors duration-300 ease-linear ${headerCo && !scrolled ? 'border-[#E6E6E6]/30' : 'border-[#E6E6E6]'} py-6 lg:flex`}
          >
            {siteConfig.mainNav.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'font-amiri text-base uppercase transition-colors duration-300',
                      (isActive && scrolled) || (isActive && headerNo)
                        ? 'font-bold text-primary'
                        : isActive && headerCo && !scrolled
                          ? 'font-bold text-white'
                          : (!isActive && scrolled) || (isActive && headerNo)
                            ? 'text-[#7A9B87] hover:text-primary'
                            : !isActive && headerCo && !scrolled
                              ? 'text-white/70 hover:text-white'
                              : 'text-[#7A9B87] hover:text-primary',
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile Nav Links */}
          <div
            className={`fixed ${isOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none invisible -translate-x-[100vw] opacity-0'} inset-0 z-50 h-screen bg-white transition-all delay-100 duration-300 ease-in-out`}
          >
            <section className="container border-b border-[#E6E6E6] py-2">
              <div className="relative flex min-h-16 w-full items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    className="text-sm uppercase text-primary focus:outline-none lg:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Menu"
                  >
                    <span className="flex items-center gap-1">
                      <IoClose className="text-xl" />
                      {siteConfig.close}
                    </span>
                  </button>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    aria-label="Skinny Cans Home"
                  >
                    <Image
                      src={Logo}
                      alt="Skinny Cans Logo"
                      sizes="100%"
                      className="h-10 w-auto md:h-12 lg:h-14"
                    />
                  </Link>
                </div>

                <div className="flex">
                  <Link
                    href="/partner"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 font-varela text-xs uppercase text-primary"
                  >
                    <span>{siteConfig.location}</span>
                    <Icons.locate className="hidden h-5 w-5 md:inline-block" />
                  </Link>
                </div>
              </div>
            </section>
            <ul className="container flex flex-col items-start gap-6 py-8">
              {siteConfig.mainNav.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={clsx(
                        'font-amiri text-base uppercase transition-colors duration-300',
                        isActive
                          ? 'font-bold text-primary'
                          : 'text-[#7A9B87] hover:text-primary',
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="container border-t border-[#E6E6E6] py-4">
              <LanguageSelector locale={locale} width="w-full" />
            </div>
          </div>
        </section>
      </nav>
    </header>
  )
}
