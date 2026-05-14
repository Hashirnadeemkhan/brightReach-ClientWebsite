import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, postcode, service, date, message } = body


    // ✅ Production: send email via Resend
    const { data, error } = await resend.emails.send({
  from: "Bright Reach Solution <info@brightreachsolutions.com>",
  replyTo: "info@brightreachsolutions.com", // apna verified domain/email daalo
      to: [process.env.BUSINESS_EMAIL as string],

      subject: `New Contact Form Submission from ${name}`,
      text: `New Contact Form Submission from ${name}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n...`, // simple text version
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Postcode:</strong> ${postcode || "Not provided"}</p>
          <p><strong>Service:</strong> ${service || "Not specified"}</p>
          <p><strong>Preferred Date:</strong> ${date || "Not specified"}</p>
          <p><strong>Message:</strong> ${message || "No message"}</p>

          <hr />
          <p style="font-size: 12px; color: #6b7280;">
            This email was sent from your website contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("❌ Resend error:", error)
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("❌ API error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
