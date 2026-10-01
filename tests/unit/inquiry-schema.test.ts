import { describe, it, expect } from 'vitest'
import {
  inquiryClientSchema,
  INQUIRY_TOPICS,
} from '@/features/inquiries/schemas/inquiry.schema'

describe('Inquiry Validation Schema', () => {
  it('validates a correct inquiry payload', () => {
    const validData = {
      email: 'test@example.com',
      topic: INQUIRY_TOPICS[0],
      description:
        'We would love to distribute Skinny Cans across our 50 stores.',
    }

    const result = inquiryClientSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects an invalid email format', () => {
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

  it('rejects short descriptions below minimum length', () => {
    const invalidData = {
      email: 'user@example.com',
      topic: 'Product Quality',
      description: 'Hi',
    }

    const result = inquiryClientSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('5 characters')
    }
  })
})
