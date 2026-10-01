import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const email = formData.get('email') as string
    const description = formData.get('description') as string
    const topic = formData.get('topic') as string
    const file = formData.get('attachment') as File | null

    const FRESHDESK_DOMAIN = process.env.FRESHDESK_DOMAIN
    const FRESHDESK_API_KEY = process.env.FRESHDESK_API_KEY

    if (!FRESHDESK_DOMAIN || !FRESHDESK_API_KEY) {
      console.error('Missing Freshdesk config')
      return NextResponse.json(
        { error: 'Freshdesk domain or API key is not set' },
        { status: 500 },
      )
    }

    const auth = Buffer.from(`${FRESHDESK_API_KEY}:X`).toString('base64')

    const fdForm = new FormData()
    fdForm.append('email', email)
    fdForm.append('subject', topic)
    fdForm.append('description', description)
    fdForm.append('status', '2')
    fdForm.append('priority', '1')
    if (file) {
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
      const errData = await response.text() // use text() in case JSON fails
      console.error('Freshdesk Error:', errData)
      return NextResponse.json(
        { error: 'Freshdesk responded with an error', details: errData },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Server crash:', err)
    return NextResponse.json(
      { error: 'Server error occurred' },
      { status: 500 },
    )
  }
}
