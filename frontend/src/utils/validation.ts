// Validation utility functions

interface ContactFormData {
  [key: string]: string
}

export const validateField = (name: string, value: string, _formData?: ContactFormData): string => {
  switch (name) {
    case 'name':
      if (!value.trim()) {
        return 'Name is required'
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters'
      }
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes'
      }
      if (value.trim().length > 50) {
        return 'Name must not exceed 50 characters'
      }
      return ''

    case 'email':
      if (!value.trim()) {
        return 'Email is required'
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
      if (value.length > 100) {
        return 'Email must not exceed 100 characters'
      }
      return ''

    case 'phone':
      if (!value.trim()) {
        return 'Phone number is required'
      }
      // Remove spaces and common phone separators
      const cleanedPhone = value.replace(/[\s\-\(\)]/g, '')
      
      // Australian phone number validation
      // Accepts: 04XX XXX XXX, +61 4XX XXX XXX, 07 XXXX XXXX, etc.
      const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/
      
      if (!phoneRegex.test(cleanedPhone)) {
        return 'Please enter a valid Australian phone number'
      }
      return ''

    case 'serviceType':
      if (!value) {
        return 'Please select a service type'
      }
      return ''

    case 'message':
      if (!value.trim()) {
        return 'Message is required'
      }
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters'
      }
      if (value.length > 500) {
        return 'Message must not exceed 500 characters'
      }
      
      // Block ALL URLs (real-time)
      const urlPattern = /(?:https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-z]{2,})/gi
      if (urlPattern.test(value)) {
        return 'URLs and website links are not allowed. Please focus on legitimate gaming service inquiries.'
      }
      
      // Block spam keywords (real-time)
      const spamKeywords = [
        'seo', 'design', 'mobile app', 'virtual assistant', 'va service',
        'web development', 'app development', 'digital marketing', 
        'social media marketing', 'smm', 'content writing', 'copywriting',
        'graphic design', 'logo design', 'website design', 'web design',
        'wordpress', 'shopify', 'ecommerce', 'e-commerce',
        'backlinks', 'link building', 'ranking', 'google ranking',
        'traffic', 'increase traffic', 'boost sales', 'lead generation',
        'freelancer', 'fiverr', 'upwork', 'outsource', 'offshore',
        'cheap service', 'affordable price', 'best price', 'discount',
        'crypto', 'bitcoin', 'forex', 'trading', 'investment'
      ]
      
      const lowerValue = value.toLowerCase()
      const foundKeywords = spamKeywords.filter(keyword => lowerValue.includes(keyword))
      
      if (foundKeywords.length > 0) {
        return 'Your message contains prohibited keywords. Please focus on legitimate gaming service inquiries.'
      }
      
      // Check for excessive caps
      const capsRatio = (value.match(/[A-Z]/g) || []).length / value.length
      if (capsRatio > 0.5 && value.length > 20) {
        return 'Please avoid excessive use of capital letters. Please focus on legitimate gaming service inquiries.'
      }
      
      return ''

    default:
      return ''
  }
}

export const validateForm = (formData: ContactFormData): { [key: string]: string } => {
  const errors: { [key: string]: string } = {}
  
  const fields = ['name', 'email', 'phone', 'serviceType', 'message']
  
  fields.forEach(field => {
    const error = validateField(field, formData[field], formData)
    if (error) {
      errors[field] = error
    }
  })
  
  return errors
}

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  
  if (cleaned.startsWith('+61')) {
    return cleaned.replace(/(\+61)(\d{1})(\d{4})(\d{4})/, '$1 $2 $3 $4')
  }
  
  if (cleaned.startsWith('04')) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  }
  
  if (cleaned.startsWith('0')) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')
  }
  
  return phone
}
