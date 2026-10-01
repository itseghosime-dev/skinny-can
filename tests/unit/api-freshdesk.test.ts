import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/freshdesk/route'
import { resetRateLimits } from '@/lib/rate-limiter'

describe('API Route: POST /api/freshdesk', () => {
  const originalEnv = process.env

  beforeEach(() => {
    resetRateLimits()
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  function createRequest(formData: FormData, ip = '127.0.0.1'): NextRequest {
    const req = {
      headers: new Headers({
        'x-forwarded-for': ip,
      }),
      formData: async () => formData,
    } as unknown as NextRequest
    return req
  }

  it('rejects invalid inquiry data with 400 Bad Request', async () => {
    const formData = new FormData()
    formData.append('email', 'not-an-email')
    formData.append('topic', '')
    formData.append('description', 'hi')

    const req = createRequest(formData)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBe('Invalid inquiry data')
    expect(data.issues).toBeDefined()
  })

  it('rejects attachments exceeding 5MB with 413 Payload Too Large', async () => {
    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('topic', 'Partnership')
    formData.append(
      'description',
      'Valid inquiry description with more than 5 characters',
    )

    // Create a 6MB dummy file
    const oversizedBlob = new Blob([new Uint8Array(6 * 1024 * 1024)], {
      type: 'image/png',
    })
    formData.append('attachment', oversizedBlob, 'large-file.png')

    const req = createRequest(formData)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(413)
    expect(data.error).toContain('5MB')
  })

  it('rejects unsupported MIME types with 415 Unsupported Media Type', async () => {
    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('topic', 'Partnership')
    formData.append(
      'description',
      'Valid inquiry description with more than 5 characters',
    )

    const executableBlob = new Blob(['malicious executable'], {
      type: 'application/x-msdownload',
    })
    formData.append('attachment', executableBlob, 'danger.exe')

    const req = createRequest(formData)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(415)
    expect(data.error).toContain('Unsupported file type')
  })

  it('returns 503 in production if Freshdesk credentials are not configured (never returns mock)', async () => {
    ;(process.env as any).NODE_ENV = 'production'
    delete process.env.FRESHDESK_DOMAIN
    delete process.env.FRESHDESK_API_KEY

    const formData = new FormData()
    formData.append('email', 'partner@example.com')
    formData.append('topic', 'Wholesale inquiry')
    formData.append(
      'description',
      'Looking to stock Skinny Cans in 15 store locations.',
    )

    const req = createRequest(formData)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(503)
    expect(data.error).toContain('Inquiry service is temporarily unavailable')
    expect(data.mock).toBeUndefined()
  })

  it('enforces sliding-window rate limiting with 429 Too Many Requests', async () => {
    ;(process.env as any).NODE_ENV = 'test'
    process.env.FRESHDESK_DOMAIN = 'skinny'
    process.env.FRESHDESK_API_KEY = 'test_key'

    // Mock fetch for successful ticket creation
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 123 }),
    })

    const ip = '192.168.1.50'

    // Submit 5 requests within window (allowed)
    for (let i = 0; i < 5; i++) {
      const formData = new FormData()
      formData.append('email', `user${i}@example.com`)
      formData.append('topic', 'General Inquiry')
      formData.append('description', 'Need more info on product line.')

      const req = createRequest(formData, ip)
      const res = await POST(req)
      expect(res.status).toBe(200)
    }

    // 6th request from same IP must be rejected with 429
    const sixthForm = new FormData()
    sixthForm.append('email', 'user6@example.com')
    sixthForm.append('topic', 'Spam attempt')
    sixthForm.append('description', 'Spamming the inquiry endpoint rapidly.')

    const req6 = createRequest(sixthForm, ip)
    const res6 = await POST(req6)
    const data6 = await res6.json()

    expect(res6.status).toBe(429)
    expect(data6.error).toContain('Too many requests')
    expect(res6.headers.get('Retry-After')).toBe('60')
  })

  it('handles upstream Freshdesk 5xx failure with 502 Bad Gateway', async () => {
    ;(process.env as any).NODE_ENV = 'production'
    process.env.FRESHDESK_DOMAIN = 'skinny'
    process.env.FRESHDESK_API_KEY = 'test_key'

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const formData = new FormData()
    formData.append('email', 'partner@example.com')
    formData.append('topic', 'Inquiry')
    formData.append('description', 'Inquiry detail message text here.')

    const req = createRequest(formData)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(502)
    expect(data.error).toContain(
      'Support ticket service is temporarily unavailable',
    )
  })

  it('creates ticket successfully with 200 OK when upstream responds ok', async () => {
    ;(process.env as any).NODE_ENV = 'production'
    process.env.FRESHDESK_DOMAIN = 'skinny'
    process.env.FRESHDESK_API_KEY = 'valid_key'

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: 456, status: 2 }),
    })

    const formData = new FormData()
    formData.append('email', 'distributor@example.com')
    formData.append('topic', 'Distribution Europe')
    formData.append('description', 'We want to distribute in Scandinavia.')

    const req = createRequest(formData)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
