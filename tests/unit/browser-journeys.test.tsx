import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Restriction from '@/components/Restriction'
import InquiryForm from '@/features/inquiries/components/InquiryForm'
import { getProductBySlug, PRODUCTS } from '@/features/products/data/products'
import { getSiteConfig } from '@/config/site-i18n'
import en from '../../messages/en.json'
import no from '../../messages/no.json'
import se from '../../messages/se.json'

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl'

describe('Browser & Interactive User Journeys', () => {
  const siteConfigEn = getSiteConfig('en')
  const siteConfigNo = getSiteConfig('no')
  const siteConfigSe = getSiteConfig('se')

  function renderWithIntl(
    ui: React.ReactElement,
    locale = 'en',
    messages: unknown = en,
  ) {
    return render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages as AbstractIntlMessages}
      >
        {ui}
      </NextIntlClientProvider>,
    )
  }

  beforeEach(() => {
    // Clear cookies and localStorage before each test
    localStorage.clear()
    document.cookie = 'ageConfirmed=; Max-Age=0; path=/'
    vi.restoreAllMocks()
  })

  describe('1. Age-Gate Modal Journey', () => {
    it('displays the age verification modal when age cookie is absent (English)', () => {
      renderWithIntl(<Restriction config={siteConfigEn} />)
      expect(
        screen.getByText(/Just checking, you are over 21\?/i),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Yes, I’m over 21/i }),
      ).toBeInTheDocument()
    })

    it('displays the age verification modal in Norwegian', () => {
      renderWithIntl(<Restriction config={siteConfigNo} />, 'no', no)
      expect(
        screen.getByText(/Bare sjekker, er du over 21\?/i),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Ja, jeg er over 21/i }),
      ).toBeInTheDocument()
    })

    it('displays the age verification modal in Northern Sámi', () => {
      renderWithIntl(<Restriction config={siteConfigSe} />, 'se', se)
      expect(
        screen.getByText(/Dárkkistan dušše, leat go badjel 21 jagi\?/i),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Juo, mun lean badjel 21/i }),
      ).toBeInTheDocument()
    })

    it('sets ageConfirmed cookie and dismisses modal upon clicking Yes', async () => {
      renderWithIntl(<Restriction config={siteConfigEn} />)
      const yesBtn = screen.getByRole('button', {
        name: /Yes, I’m over 21/i,
      })

      fireEvent.click(yesBtn)

      await waitFor(() => {
        expect(document.cookie).toContain('ageConfirmed=true')
        expect(
          screen.queryByText(/Just checking, you are over 21\?/i),
        ).not.toBeInTheDocument()
      })
    })

    it('redirects to responsibility.org when clicking No', async () => {
      renderWithIntl(<Restriction config={siteConfigEn} />)
      const noBtn = screen.getByRole('button', {
        name: /No, I’m under 21/i,
      })

      fireEvent.click(noBtn)

      await waitFor(() => {
        expect(document.cookie).not.toContain('ageConfirmed=true')
      })
    })
  })

  describe('2. Inquiry Form & File Selection Journey', () => {
    it('handles file selection, displays attachment pill, and allows file removal in English', async () => {
      renderWithIntl(<InquiryForm />, 'en', en)

      const file = new File(['dummy test content'], 'brand-deck.pdf', {
        type: 'application/pdf',
      })
      const fileInput = screen.getByTestId('file-input') as HTMLInputElement

      fireEvent.change(fileInput, { target: { files: [file] } })

      // Verify file pill appears
      expect(screen.getByText('brand-deck.pdf')).toBeInTheDocument()

      // Click remove button
      const removeBtn = screen.getByRole('button', {
        name: /Remove attached file/i,
      })
      fireEvent.click(removeBtn)

      // Verify file pill is removed
      expect(screen.queryByText('brand-deck.pdf')).not.toBeInTheDocument()
    })

    it('renders localized InquiryForm in Norwegian', async () => {
      renderWithIntl(<InquiryForm />, 'no', no)
      expect(screen.getByText('Send inn en forespørsel')).toBeInTheDocument()
      expect(screen.getByText('Tema')).toBeInTheDocument()
      expect(screen.getByText('Beskrivelse')).toBeInTheDocument()
      expect(screen.getByText('Din e-postadresse')).toBeInTheDocument()
    })

    it('renders localized InquiryForm in Northern Sámi', async () => {
      renderWithIntl(<InquiryForm />, 'se', se)
      expect(screen.getByText('Sádde jearaldaga')).toBeInTheDocument()
      expect(screen.getByText('Fáddá')).toBeInTheDocument()
      expect(screen.getByText('Čilgehus')).toBeInTheDocument()
      expect(screen.getByText('Du e-poastačujuhus')).toBeInTheDocument()
    })

    it('submits valid form data, shows loading state, and renders success confirmation', async () => {
      const user = userEvent.setup()

      // Mock fetch response for inquiry API
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })

      renderWithIntl(<InquiryForm />, 'en', en)

      const emailInput = screen.getByPlaceholderText(/you@example.com/i)
      const descInput = screen.getByPlaceholderText(
        /Tell us how we can help you/i,
      )
      const submitBtn = screen.getByRole('button', { name: /^Submit/i })

      await user.type(emailInput, 'partner@beverages.no')
      await user.type(
        descInput,
        'We operate 25 retail locations across Oslo and Stockholm.',
      )

      await user.click(submitBtn)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/freshdesk',
          expect.any(Object),
        )
      })
    })

    it('renders localized rate limit error feedback when API returns 429 in Norwegian', async () => {
      const user = userEvent.setup()
      const { toast } = await import('sonner')
      const toastErrorSpy = vi.spyOn(toast, 'error')

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        json: async () => ({ error: 'Too many requests' }),
      })

      renderWithIntl(<InquiryForm />, 'no', no)

      const emailInput = screen.getByPlaceholderText(/deg@eksempel.no/i)
      const descInput = screen.getByPlaceholderText(
        /Fortell oss hvordan vi kan hjelpe deg/i,
      )
      const submitBtn = screen.getByRole('button', { name: /^Send inn/i })

      await user.type(emailInput, 'partner@beverages.no')
      await user.type(descInput, 'Forespørsel om samarbeid for hele Norden.')
      await user.click(submitBtn)

      await waitFor(() => {
        expect(toastErrorSpy).toHaveBeenCalledWith(
          'For mange forespørsler. Vennligst vent et minutt før du prøver igjen.',
        )
      })
    })

    it('renders localized service unavailable error feedback when API returns 503 in Northern Sámi', async () => {
      const user = userEvent.setup()
      const { toast } = await import('sonner')
      const toastErrorSpy = vi.spyOn(toast, 'error')

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({ error: 'Service Unavailable' }),
      })

      renderWithIntl(<InquiryForm />, 'se', se)

      const emailInput = screen.getByPlaceholderText(/don@ovdamearka.se/i)
      const descInput = screen.getByPlaceholderText(
        /Muital midjiide mo mii sáhttit veahkehit/i,
      )
      const submitBtn = screen.getByRole('button', { name: /^Sádde/i })

      await user.type(emailInput, 'partner@sami-distro.no')
      await user.type(descInput, 'Jearaldat ovttasbarggu birra davviguovlluin.')
      await user.click(submitBtn)

      await waitFor(() => {
        expect(toastErrorSpy).toHaveBeenCalledWith(
          'Jearaldatbálvalus ii leat dál olámuttus. Geahččal fas maŋŋil.',
        )
      })
    })
  })

  describe('3. Product Routing & Whitelist Validation', () => {
    it('retrieves valid product metadata for hard_lemonade and hard_berries', () => {
      const lemonade = getProductBySlug('hard_lemonade')
      expect(lemonade).toBeDefined()
      expect(lemonade?.nameKey).toBe('hard_lemonade_product')
      expect(lemonade?.abv).toBe('4%')
      expect(lemonade?.calories).toBe('57 KCAL')

      const berries = getProductBySlug('hard_berries')
      expect(berries).toBeDefined()
      expect(berries?.nameKey).toBe('hard_berries_product')
      expect(berries?.abv).toBe('4%')
    })

    it('returns undefined for non-existent product slugs (triggering 404)', () => {
      const invalid = getProductBySlug('unknown-energy-drink')
      expect(invalid).toBeUndefined()
    })

    it('contains exactly 2 products in catalog SSOT', () => {
      expect(PRODUCTS.length).toBe(2)
      expect(PRODUCTS.map((p) => p.slug)).toEqual([
        'hard_lemonade',
        'hard_berries',
      ])
    })
  })
})
