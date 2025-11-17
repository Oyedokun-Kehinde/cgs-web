// Vercel Serverless Function for Contact Form
import { submitContactForm } from '../controllers/contactController.js'
import { validateContactForm } from '../utils/validator.js'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many requests from this IP, please try again later.',
})

export default async function handler(req, res) {
  // Enable CORS
  await cors(corsOptions)(req, res, () => {})
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  // Apply rate limiting (simplified for serverless)
  // Note: In production, use a persistent store like Redis for rate limiting
  
  try {
    // Call the contact controller
    await submitContactForm(req, res)
  } catch (error) {
    console.error('Serverless function error:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred processing your request.'
    })
  }
}
