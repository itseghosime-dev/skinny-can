import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const serverInquirySchema = z.object({
  email: z.string().email().max(255),
  topic: z.string().min(1).max(100),
  description: z.string().min(5).max(3000),
})

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
]

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const rawEmail = formData.get('email')?.toString() || ''
    const rawTopic = formData.get('topic')?.toString() || ''
    const rawDescription = formData.get('description')?.toString() || ''
    const file = formData.get('attachment') as File | null

    const validation = serverInquirySchema.safeParse({
      email: rawEmail.trim(),
      topic: rawTopic.trim(),
      description: rawDescription.trim(),
    })

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid inquiry data',
          issues: validation.error.issues.map((i) => i.message),
        },
        { status: 400 },
      )
    }

    if (file && file.size > 0) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: 'Attachment exceeds maximum allowable size of 5MB' },
          { status: 413 },
        )
      }
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: 'Unsupported file type. Accepted: JPG, PNG, WEBP, PDF' },
          { status: 415 },
        )
      }
    }

    const FRESHDESK_DOMAIN = process.env.FRESHDESK_DOMAIN
    const FRESHDESK_API_KEY = process.env.FRESHDESK_API_KEY

    // If Freshdesk is not configured in local development, simulate successful receipt
    if (!FRESHDESK_DOMAIN || !FRESHDESK_API_KEY) {
      console.warn(
        '⚠️ Freshdesk credentials not configured. Simulating successful mock submission.',
      )
      return NextResponse.json({
        success: true,
        mock: true,
        message: 'Inquiry received successfully (mock mode)',
      })
    }

    const auth = Buffer.from(`${FRESHDESK_API_KEY}:X`).toString('base64')

    const fdForm = new FormData()
    fdForm.append('email', validation.data.email)
    fdForm.append('subject', validation.data.topic)
    fdForm.append('description', validation.data.description)
    fdForm.append('status', '2') // Open
    fdForm.append('priority', '1') // Low
    if (file && file.size > 0) {
      fdForm.append('attachments[]', file, file.name)
    }

    const response = await fetch(
      `https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
        },
        body: fdForm,
      },
    )

    if (!response.ok) {
      console.error('Freshdesk API upstream error:', response.status)
      return NextResponse.json(
        {
          error:
            'Support ticket service is temporarily unavailable. Please try again later.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unhandled server error in inquiry route:', err)
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 },
    )
  }
}
