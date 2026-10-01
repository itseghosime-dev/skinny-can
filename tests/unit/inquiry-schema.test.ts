import { describe, it, expect } from 'vitest'
import {
  inquiryClientSchema,
  createInquiryClientSchema,
  INQUIRY_TOPICS,
} from '@/features/inquiries/schemas/inquiry.schema'
import no from '../../messages/no.json'
import se from '../../messages/se.json'

describe('Inquiry Validation Schema', () => {
  it('validates a correct inquiry payload with stable canonical topics', () => {
    for (const topic of INQUIRY_TOPICS) {
      const validData = {
        email: 'test@example.com',
        topic,
        description:
          'We would love to distribute Skinny Cans across our 50 stores.',
      }

      const result = inquiryClientSchema.safeParse(validData)
      expect(result.success).toBe(true)
    }
  })

  it('rejects an invalid email format in English', () => {
    const invalidData = {
      email: 'invalid-email',
      topic: 'Partner Inquiry',
      description: 'Valid description text here.',
    }

    const result = inquiryClientSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('valid email')
    }
  })

  it('generates localized validation error messages in Norwegian', () => {
    const tNo = (key: string) =>
      (no.Inquiry as Record<string, string>)[key] || key
    const schemaNo = createInquiryClientSchema(tNo)

    const result = schemaNo.safeParse({
      email: 'invalid-email',
      topic: 'Partner Inquiry',
      description: 'Hi',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message)
      expect(messages).toContain('Vennligst skriv inn en gyldig e-postadresse')
      expect(messages).toContain('Beskrivelsen må være på minst 5 tegn')
    }
  })

  it('generates localized validation error messages in Northern Sámi', () => {
    const tSe = (key: string) =>
      (se.Inquiry as Record<string, string>)[key] || key
    const schemaSe = createInquiryClientSchema(tSe)

    const result = schemaSe.safeParse({
      email: 'invalid-email',
      topic: 'Partner Inquiry',
      description: 'Hi',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message)
      expect(messages).toContain('Čále dohkálaš e-poastačujuhusa')
      expect(messages).toContain('Čilgehus ferte leat unnimusat 5 mearkka')
    }
  })
})
