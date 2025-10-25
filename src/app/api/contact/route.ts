import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Basic rate limit via simple token bucket in memory (per runtime instance)
let lastWindow = Date.now();
let tokens = 20; // 20 requests per 10 minutes per instance
const WINDOW_MS = 10 * 60 * 1000;

function takeToken(): boolean {
  const now = Date.now();
  if (now - lastWindow > WINDOW_MS) {
    lastWindow = now;
    tokens = 20;
  }
  if (tokens > 0) {
    tokens -= 1;
    return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  if (!takeToken()) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL } = process.env as Record<string, string | undefined>;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;
  const hasResend = !!RESEND_API_KEY && !!CONTACT_TO_EMAIL;
  const hasSmtp = !!smtpHost && !!smtpPort && !!smtpUser && !!smtpPass && !!smtpFrom && !!CONTACT_TO_EMAIL;
  if (!hasResend && !hasSmtp) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message, website } = body ?? {};

    // Honeypot check
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    // Validate
    const errors: Record<string, string> = {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      errors.email = 'Valid email is required';
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Email content
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap;">${escapeHtml(message)}</pre>
      </div>
    `;

    if (hasResend) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [CONTACT_TO_EMAIL!],
          subject: `[Portfolio] ${subject}`,
          html,
          reply_to: email
        })
      });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ error: 'Failed to send', detail: text }, { status: 502 });
      }
    } else if (hasSmtp) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort!,
        secure: smtpPort === 465, // true for 465, false for others
        auth: { user: smtpUser!, pass: smtpPass! }
      });
      await transporter.sendMail({
        from: smtpFrom!,
        to: CONTACT_TO_EMAIL!,
        subject: `[Portfolio] ${subject}`,
        html,
        replyTo: email
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to process contact request', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

