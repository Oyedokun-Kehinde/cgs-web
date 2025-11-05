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
    from: `"CGS Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Contact Form Submission - ${serviceType}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc3545, #ff6b7a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .field-label { font-weight: bold; color: #2c3e50; margin-bottom: 5px; }
          .field-value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #dc3545; }
          .message-box { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #dc3545; white-space: pre-wrap; }
          .footer { text-align: center; margin-top: 20px; color: #95a5a6; font-size: 12px; }
          .badge { background: #dc3545; color: white; padding: 5px 10px; border-radius: 5px; display: inline-block; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Cooper Gaming Services</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">Service Inquiry:</div>
              <div class="field-value"><span class="badge">${serviceType}</span></div>
            </div>
            
            <div class="field">
              <div class="field-label">Name:</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #dc3545; text-decoration: none;">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">Phone:</div>
              <div class="field-value"><a href="tel:${phone}" style="color: #dc3545; text-decoration: none;">${phone}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">Message:</div>
              <div class="message-box">${message}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Submitted:</div>
              <div class="field-value">${submittedAt}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was automatically generated from the Cooper Gaming Services contact form.</p>
            <p>&copy; ${new Date().getFullYear()} Cooper Gaming Services. All rights reserved.</p>
          </div>
        </div>
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
    from: `"Cooper Gaming Services" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Thank You for Contacting Cooper Gaming Services',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc3545, #ff6b7a); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
          .message-box { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc3545; }
          .info-box { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { background: #2c3e50; color: white; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
          .footer a { color: #dc3545; text-decoration: none; }
          .button { display: inline-block; background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .contact-info { margin: 15px 0; }
          .contact-info div { margin: 8px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Thank You, ${name.split(' ')[0]}!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your inquiry</p>
          </div>
          
          <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for reaching out to <strong>Cooper Gaming Services</strong>. We've successfully received your inquiry regarding <strong>${serviceType}</strong> and appreciate your interest in our services.</p>
            
            <div class="info-box">
              <strong>⏱️ What happens next?</strong><br>
              Our team will review your message and respond within <strong>24 hours</strong> during business days. For urgent matters, please don't hesitate to call us directly.
            </div>
            
            <div class="message-box">
              <strong>Your Message:</strong><br><br>
              ${message}
            </div>
            
            <p>In the meantime, feel free to explore our services or contact us directly if you have any urgent questions.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+61712345678" class="button">📞 Call Us: +61 7 1234 5678</a>
            </div>
            
            <div class="contact-info">
              <strong>Contact Information:</strong>
              <div>📧 Email: info@coopergamingservices.com</div>
              <div>📍 Location: Brisbane, Queensland</div>
              <div>🕐 Hours: Mon-Fri 8AM-6PM, Sat 9AM-1PM</div>
              <div style="color: #dc3545; font-weight: bold;">🚨 24/7 Emergency: +61 400 000 000</div>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 15px 0;"><strong>Cooper Gaming Services</strong></p>
            <p style="margin: 0 0 10px 0;">Excellence in Gaming Solutions</p>
            <p style="font-size: 12px; opacity: 0.8; margin: 15px 0 0 0;">
              &copy; ${new Date().getFullYear()} Cooper Gaming Services. All rights reserved.
            </p>
          </div>
        </div>
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
Phone: +61 7 1234 5678
Email: info@coopergamingservices.com
Location: Brisbane, Queensland
Hours: Mon-Fri 8AM-6PM, Sat 9AM-1PM
24/7 Emergency: +61 400 000 000

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
