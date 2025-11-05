import { validationResult } from 'express-validator'
import { sendAdminNotification, sendCustomerConfirmation } from '../utils/emailService.js'

export const submitContactForm = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, email, phone, serviceType, message } = req.body

    // Prepare form data
    const formData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      serviceType,
      message: message.trim(),
      submittedAt: new Date().toLocaleString('en-AU', { 
        timeZone: 'Australia/Brisbane',
        dateStyle: 'full',
        timeStyle: 'long'
      })
    }

    // Send emails
    try {
      await Promise.all([
        sendAdminNotification(formData),
        sendCustomerConfirmation(formData)
      ])

      res.status(200).json({
        success: true,
        message: 'Your inquiry has been submitted successfully. We\'ll be in touch soon!'
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      
      // Even if email fails, return success to user (log for admin review)
      res.status(200).json({
        success: true,
        message: 'Your inquiry has been received. If you don\'t hear from us within 24 hours, please call us directly.'
      })
    }

  } catch (error) {
    console.error('Contact form submission error:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again or contact us directly.'
    })
  }
}
