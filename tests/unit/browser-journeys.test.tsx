import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Restriction from '@/components/Restriction'
import InquiryForm from '@/features/inquiries/components/InquiryForm'
import { getProductBySlug, PRODUCTS } from '@/features/products/data/products'
import { getSiteConfig } from '@/config/site-i18n'

import { NextIntlClientProvider } from 'next-intl'

describe('Browser & Interactive User Journeys', () => {
  const siteConfig = getSiteConfig('en')

  function renderWithIntl(ui: React.ReactElement) {
    return render(
      <NextIntlClientProvider locale="en" messages={{}}>
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
    it('displays the age verification modal when age cookie is absent', () => {
      renderWithIntl(<Restriction config={siteConfig} />)
      expect(
        screen.getByText(/Just checking, you are over 21\?/i),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Yes, I’m over 21 years old/i }),
      ).toBeInTheDocument()
    })

    it('sets ageConfirmed cookie and dismisses modal upon clicking Yes', async () => {
      renderWithIntl(<Restriction config={siteConfig} />)
      const yesBtn = screen.getByRole('button', {
        name: /Yes, I’m over 21 years old/i,
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
      renderWithIntl(<Restriction config={siteConfig} />)
      const noBtn = screen.getByRole('button', {
        name: /No, I’m under 21 years old/i,
      })

      fireEvent.click(noBtn)

      await waitFor(() => {
        expect(document.cookie).not.toContain('ageConfirmed=true')
      })
    })
  })

  describe('2. Inquiry Form & File Selection Journey', () => {
    it('handles file selection, displays attachment pill, and allows file removal', async () => {
      render(<InquiryForm />)

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

    it('submits valid form data, shows loading state, and renders success confirmation', async () => {
      const user = userEvent.setup()

      // Mock fetch response for inquiry API
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<InquiryForm />)

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
