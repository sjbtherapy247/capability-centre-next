import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'hello@capabilitycentre.com.au'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Capability Centre <noreply@capabilitycentre.com.au>'

type Payload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  company_hp?: string
}

function escape(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(req: Request) {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // honeypot
  if (body.company_hp && body.company_hp.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, subject, message } = body
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (!resend) {
    // Allows form to be safely tested before RESEND_API_KEY is set
    console.warn('[contact] Resend not configured — message dropped:', { name, email, subject })
    return NextResponse.json({ ok: true, queued: false })
  }

  const subjectLine = subject?.trim() || `Capability Centre enquiry from ${name}`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Capability Centre] ${subjectLine}`,
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Subject:</strong> ${escape(subjectLine)}</p>
        <p><strong>Message:</strong></p>
        <p>${escape(message).replace(/\n/g, '<br>')}</p>
      `,
    })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
