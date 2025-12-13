import { body } from 'express-validator'

export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .isLength({ max: 100 }).withMessage('Email must not exceed 100 characters')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/).withMessage('Please provide a valid Australian phone number')
    .customSanitizer(value => value.replace(/[\s\-\(\)]/g, '')),

  body('serviceType')
    .notEmpty().withMessage('Please select a service type')
    .isIn([
      'Gaming Room Design & Consoles',
      'Technical Service & Repairs',
      'Preventative Maintenance',
      'Retail IT Support',
      'Pay Systems Repairs & Maintenance',
      'Digital Signage',
      'General Inquiry'
    ]).withMessage('Invalid service type selected'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 500 }).withMessage('Message must be between 10 and 500 characters')
    .custom((value) => {
      // Block ALL URLs
      const urlPattern = /(?:https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-z]{2,})/gi
      if (urlPattern.test(value)) {
        throw new Error('URLs and website links are not allowed.')
      }

      // Block spam keywords (case-insensitive, specific phrases)
      const spamKeywords = [
        'seo service', 'mobile app development', 'virtual assistant service', 'va service',
        'web development service', 'app development service', 'digital marketing service',
        'social media marketing', 'smm service', 'content writing service', 'copywriting service',
        'graphic design service', 'logo design service', 'website design service', 'web design service',
        'wordpress development', 'shopify store', 'ecommerce solution',
        'backlink service', 'link building service', 'ranking service', 'google ranking service',
        'increase traffic', 'boost sales', 'lead generation service',
        'freelancer service', 'fiverr gig', 'upwork profile', 'outsource team', 'offshore developer',
        'cheap service', 'affordable price', 'best price guarantee', 'discount offer',
        'crypto trading', 'bitcoin investment', 'forex trading', 'investment opportunity'
      ]

      const lowerValue = value.toLowerCase()
      const foundKeywords = spamKeywords.filter(keyword => lowerValue.includes(keyword))

      if (foundKeywords.length > 0) {
        throw new Error('Your message contains prohibited keywords.')
      }

      // Check for excessive caps
      const capsRatio = (value.match(/[A-Z]/g) || []).length / value.length
      if (capsRatio > 0.5 && value.length > 20) {
        throw new Error('Please avoid excessive use of capital letters.')
      }

      return true
    }),
]
