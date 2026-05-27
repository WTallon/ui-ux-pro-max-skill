import { Resend } from 'resend'

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'noreply@provenhire.com'

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(apiKey)
}

interface EmailResult {
  success: boolean
  error?: string
}

async function sendEmail(to: string, subject: string, html: string): Promise<EmailResult> {
  try {
    await getResend().emails.send({ from: FROM_EMAIL, to, subject, html })
    return { success: true }
  } catch (err) {
    console.error('[Resend] Failed to send email:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendApplicationReceivedEmail(to: string, name: string) {
  return sendEmail(
    to,
    'Application Received — ProvenHire',
    `<h1>Hi ${name},</h1><p>We've received your application to ProvenHire. Complete your $15 test fee to begin the skill verification.</p><p>The ProvenHire Team</p>`
  )
}

export async function sendTestFeeConfirmedEmail(to: string, name: string) {
  return sendEmail(
    to,
    'Test Fee Confirmed — ProvenHire',
    `<h1>Hi ${name},</h1><p>Your $15 test fee has been received. Please complete and submit your skill challenge recording via your dashboard.</p><p>The ProvenHire Team</p>`
  )
}

export async function sendApplicationApprovedEmail(to: string, name: string, profileUrl: string) {
  return sendEmail(
    to,
    "Congratulations — You're Approved on ProvenHire!",
    `<h1>Hi ${name},</h1><p>Great news — you've been approved! Your profile is now live and visible to clients.</p><p><a href="${profileUrl}">View your profile</a></p><p>The ProvenHire Team</p>`
  )
}

export async function sendApplicationRejectedEmail(to: string, name: string, reason?: string) {
  return sendEmail(
    to,
    'ProvenHire Application Update',
    `<h1>Hi ${name},</h1><p>After careful review, we're unable to approve your application at this time.${reason ? ` Reason: ${reason}` : ''}</p><p>You may reapply after 30 days.</p><p>The ProvenHire Team</p>`
  )
}

export async function sendClientWelcomeEmail(to: string, companyName: string) {
  return sendEmail(
    to,
    'Welcome to ProvenHire!',
    `<h1>Welcome, ${companyName}!</h1><p>You now have access to browse and hire pre-vetted freelancers. Subscribe to unlock unlimited contact requests.</p><p>The ProvenHire Team</p>`
  )
}

export async function sendSubscriptionConfirmedEmail(to: string, companyName: string) {
  return sendEmail(
    to,
    'Subscription Confirmed — ProvenHire',
    `<h1>Hi ${companyName},</h1><p>Your ProvenHire subscription is now active. You can contact any verified freelancer on the platform.</p><p>The ProvenHire Team</p>`
  )
}

export async function sendAdminNewApplicationEmail(applicationCount: number) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return { success: false, error: 'Admin email not configured' }
  return sendEmail(
    adminEmail,
    `ProvenHire: ${applicationCount} New Application(s) Pending Review`,
    `<p>You have ${applicationCount} new freelancer application(s) waiting for review.</p><p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications">Review now</a></p>`
  )
}
