import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple regex to validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, serviceType, message } = await request.json()

    console.log("Received form submission for email:", email)

    // Basic validation for email and other required fields
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    if (!name || !email || !phone || !serviceType) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Send email to the admin
    try {
      const adminResult = await resend.emails.send({
        from: "Your Company <onboarding@resend.dev>",
        to: "khashir657@gmail.com", // Replace with your admin email
        subject: "New Form Submission",
        html: `
          <h3>New Form Submission Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Message:</strong> ${message || "No message provided"}</p>
        `,
      })
      console.log("Admin notification email sent successfully:", adminResult)
    } catch (error) {
      console.error("Error sending admin notification email:", error)
      // We don't throw here to ensure the user still gets a success response and thank you email
    }

    // Send thank-you email to the user who submitted the form
    try {
      const thankYouResult = await resend.emails.send({
        from: "Your Company <onboarding@resend.dev>",
        to: email,
        subject: "Thank You for Your Submission",
        html: `
          <p>Dear ${name},</p>
          <p>Thank you for reaching out! We have received your inquiry and will respond shortly.</p>
          <p><strong>Submitted Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Company:</strong> ${company || "N/A"}</li>
            <li><strong>Service Type:</strong> ${serviceType}</li>
            <li><strong>Message:</strong> ${message || "No message provided"}</li>
          </ul>
          <p>Best regards,<br>Your Company Team</p>
        `,
      })
      console.log("Thank-you email sent successfully:", thankYouResult)
    } catch (error) {
      console.error("Error sending thank-you email:", error)
      // We don't throw here to ensure the user still gets a success response
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully. Thank you!" })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

