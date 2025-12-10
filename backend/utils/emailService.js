import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Configuration Error:', error)
  } else {
    console.log('✅ Email service is ready to send messages')
  }
})

// Send notification to admin
export const sendAdminNotification = async (formData) => {
  const { name, email, phone, serviceType, message, submittedAt } = formData

  const mailOptions = {
    from: `"CGS Website" <${process.env.SMTP_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Contact Form Submission - ${serviceType}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2563eb, #1e40af); color: #ffffff; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px; color: #ffffff;">📬 New Contact Form Submission</h1>
                    <p style="margin: 10px 0 0 0; color: #e0e7ff;">Cooper Gaming Services</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="background-color: #ffffff; padding: 30px;">
                    <!-- Service -->
                    <div style="margin-bottom: 20px;">
                      <div style="font-weight: bold; color: #334155; margin-bottom: 8px; font-size: 14px;">Service Inquiry:</div>
                      <div style="background-color: #f8fafc; padding: 12px; border-radius: 5px; border-left: 4px solid #2563eb;">
                        <span style="background-color: #2563eb; color: #ffffff; padding: 5px 12px; border-radius: 5px; display: inline-block; font-size: 13px;">${serviceType}</span>
                      </div>
                    </div>
                    
                    <!-- Name -->
                    <div style="margin-bottom: 20px;">
                      <div style="font-weight: bold; color: #334155; margin-bottom: 8px; font-size: 14px;">Name:</div>
                      <div style="background-color: #f8fafc; padding: 12px; border-radius: 5px; border-left: 4px solid #2563eb; color: #1e293b;">${name}</div>
                    </div>
                    
                    <!-- Email -->
                    <div style="margin-bottom: 20px;">
                      <div style="font-weight: bold; color: #334155; margin-bottom: 8px; font-size: 14px;">Email:</div>
                      <div style="background-color: #f8fafc; padding: 12px; border-radius: 5px; border-left: 4px solid #2563eb;">
                        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                      </div>
                    </div>
                    
                    <!-- Phone -->
                    <div style="margin-bottom: 20px;">
                      <div style="font-weight: bold; color: #334155; margin-bottom: 8px; font-size: 14px;">Phone:</div>
                      <div style="background-color: #f8fafc; padding: 12px; border-radius: 5px; border-left: 4px solid #2563eb;">
                        <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                      </div>
                    </div>
                    
                    <!-- Message -->
                    <div style="margin-bottom: 20px;">
                      <div style="font-weight: bold; color: #334155; margin-bottom: 8px; font-size: 14px;">Message:</div>
                      <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; border-left: 4px solid #64748b; color: #1e293b; white-space: pre-wrap;">${message}</div>
                    </div>
                    
                    <!-- Submitted -->
                    <div style="margin-bottom: 10px;">
                      <div style="font-weight: bold; color: #334155; margin-bottom: 8px; font-size: 14px;">Submitted:</div>
                      <div style="background-color: #f8fafc; padding: 12px; border-radius: 5px; border-left: 4px solid #2563eb; color: #1e293b;">${submittedAt}</div>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px;">This email was automatically generated from the Cooper Gaming Services contact form.</p>
                    <p style="margin: 0; color: #64748b; font-size: 12px;">&copy; ${new Date().getFullYear()} Cooper Gaming Services. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
NEW CONTACT FORM SUBMISSION
Cooper Gaming Services

Service Inquiry: ${serviceType}
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

Submitted: ${submittedAt}
    `
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Admin notification sent:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Admin email error:', error)
    throw error
  }
}

// Send confirmation to customer
export const sendCustomerConfirmation = async (formData) => {
  const { name, email, serviceType, message } = formData

  const mailOptions = {
    from: `"Cooper Gaming Services" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Thank You for Contacting Cooper Gaming Services',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2563eb, #1e40af); color: #ffffff; padding: 40px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px; color: #ffffff;">✅ Thank You, ${name.split(' ')[0]}!</h1>
                    <p style="margin: 10px 0 0 0; color: #e0e7ff;">We've received your inquiry</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="background-color: #ffffff; padding: 30px;">
                    <p style="color: #1e293b; margin: 0 0 15px 0;">Dear ${name},</p>
                    
                    <p style="color: #1e293b; margin: 0 0 20px 0;">Thank you for reaching out to <strong style="color: #2563eb;">Cooper Gaming Services</strong>. We've successfully received your inquiry regarding <strong style="color: #2563eb;">${serviceType}</strong> and appreciate your interest in our services.</p>
                    
                    <!-- Info Box -->
                    <div style="background-color: #dbeafe; border: 1px solid #2563eb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                      <strong style="color: #1e40af;">⏱️ What happens next?</strong><br>
                      <span style="color: #1e293b;">Our team will review your message and respond within <strong>24 hours</strong> during business days. For urgent matters, please don't hesitate to call us directly.</span>
                    </div>
                    
                    <!-- Message Box -->
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #64748b;">
                      <strong style="color: #334155;">Your Message:</strong><br><br>
                      <span style="color: #1e293b;">${message}</span>
                    </div>
                    
                    <p style="color: #1e293b; margin: 0 0 20px 0;">In the meantime, feel free to explore our services or contact us directly if you have any urgent questions.</p>
                    
                    <!-- Buttons -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="${process.env.FRONTEND_URL || 'https://coopergamingservices.com'}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-bottom: 10px; font-weight: bold;">🌐 Visit Our Website</a>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-top: 10px;">
                          <a href="tel:0433323606" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">📞 Call Us: 0433 323 606</a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Contact Info -->
                    <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 5px;">
                      <strong style="color: #334155;">Contact Information:</strong>
                      <div style="margin: 10px 0 5px 0; color: #1e293b;">📧 Email: info@coopergamingservices.com</div>
                      <div style="margin: 5px 0; color: #1e293b;">📞 Phone: 0433 323 606</div>
                      <div style="margin: 5px 0; color: #1e293b;">📍 Location: Brisbane, Queensland</div>
                      <div style="margin: 5px 0; color: #1e293b;">🕐 Hours: Mon-Fri 8AM-6PM | Sat 9AM-1PM</div>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #334155; color: #e2e8f0; padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #ffffff; font-weight: bold;">Cooper Gaming Services</p>
                    <p style="margin: 0 0 15px 0; color: #cbd5e1;">Queensland's Premier Gaming & Technology Specialists</p>
                    <p style="font-size: 12px; margin: 10px 0 5px 0;">
                      <a href="${process.env.FRONTEND_URL || 'https://coopergamingservices.com'}" style="color: #60a5fa; text-decoration: none; font-weight: 600;">Visit Our Website</a>
                    </p>
                    <p style="font-size: 12px; color: #94a3b8; margin: 5px 0 0 0;">
                      &copy; ${new Date().getFullYear()} Cooper Gaming Services. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
Dear ${name},

Thank you for contacting Cooper Gaming Services!

We've received your inquiry regarding ${serviceType} and will respond within 24 hours during business days.

Your Message:
${message}

Contact Information:
Phone: 0433 323 606
Email: info@coopergamingservices.com
Location: Brisbane, Queensland
Hours: Mon-Fri 8AM-6PM | Sat 9AM-1PM
Website: ${process.env.FRONTEND_URL || 'https://coopergamingservices.com'}

Best regards,
Cooper Gaming Services Team

---
© ${new Date().getFullYear()} Cooper Gaming Services. All rights reserved.
    `
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Customer confirmation sent:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Customer email error:', error)
    throw error
  }
}

export default transporter
