import { body } from 'express-validator'

export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name can only contain letters, spaces, hyphens, and apostrophes')
    .escape(),

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
      'Gaming Machine Sales',
      'Technical Service & Repairs',
      'Preventative Maintenance',
      'Consultation & Installation',
      'General Inquiry'
    ]).withMessage('Invalid service type selected'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 500 }).withMessage('Message must be between 10 and 500 characters')
    .custom((value) => {
      // Check for excessive URLs
      const urlCount = (value.match(/https?:\/\//g) || []).length
      if (urlCount > 2) {
        throw new Error('Message contains too many links')
      }
      
      // Check for excessive caps
      const capsRatio = (value.match(/[A-Z]/g) || []).length / value.length
      if (capsRatio > 0.5 && value.length > 20) {
        throw new Error('Please avoid excessive use of capital letters')
      }
      
      return true
    })
    .escape(),
]
