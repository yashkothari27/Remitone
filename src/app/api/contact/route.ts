import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || 'support@kogopay.com'
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || 'KogoPAY Website <onboarding@resend.dev>'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json({ status: 'FAIL', message: 'Contact form is not configured yet.' }, { status: 503 })
  }

  let body: { name?: string; email?: string; company?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ status: 'FAIL', message: 'Invalid request body.' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const company = (body.company || '').trim()
  const message = (body.message || '').trim()

  if (!name || name.length < 2) {
    return NextResponse.json({ status: 'FAIL', message: 'Please enter your name.' }, { status: 400 })
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ status: 'FAIL', message: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ status: 'FAIL', message: 'Message must be at least 10 characters.' }, { status: 400 })
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ status: 'FAIL', message: 'Unable to send your message right now.' }, { status: 502 })
    }

    return NextResponse.json({ status: 'SUCCESS' })
  } catch (err) {
    console.error('Contact form submission error:', err)
    return NextResponse.json({ status: 'FAIL', message: 'Unable to send your message right now.' }, { status: 500 })
  }
}
