import { useState, ChangeEvent, FormEvent } from 'react'
import { validateForm, validateField } from '../utils/validation'
import Modal from './Modal'

interface ContactFormData {
  [key: string]: string
  name: string
  email: string
  phone: string
  serviceType: string
  message: string
  honeypot: string
}

interface FormErrors {
  [key: string]: string
}

interface ModalState {
  show: boolean
  type: 'success' | 'error' | 'info'
  message: string
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    honeypot: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'info', message: '' })

  const serviceTypes = [
    'Gaming Machine Sales',
    'Technical Service & Repairs',
    'Preventative Maintenance',
    'Consultation & Installation',
    'General Inquiry'
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      const error = validateField(name, value, formData)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value, formData)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check honeypot (anti-spam)
    if (formData.honeypot) {
      console.log('Spam detected')
      return
    }

    // Validate all fields
    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as { [key: string]: boolean })
    setTouched(allTouched)

    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      setModal({
        show: true,
        type: 'error',
        message: 'Please correct the errors in the form before submitting.'
      })
      return
    }

    // Submit form
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setModal({
          show: true,
          type: 'success',
          message: 'Thank you for contacting Cooper Gaming Services! We will get back to you as soon as possible. Check your email for a response.'
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          message: '',
          honeypot: ''
        })
        setTouched({})
        setErrors({})
      } else {
        setModal({
          show: true,
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setModal({
        show: true,
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setModal({ show: false, type: 'info', message: '' })
  }

  return (
    <div className="contact-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Let's Discuss Your Gaming Needs</h2>
            <p className="section-description">
              Have questions about our services? Need a quote? Our team is ready to help. 
              Fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="contact-info-list mt-4">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="contact-info-content">
                  <h5>Phone</h5>
                  <a href="tel:+61712345678">+61 7 1234 5678</a>
                  <p className="text-muted small mb-0">Mon-Fri: 8AM-6PM, Sat: 9AM-1PM</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="contact-info-content">
                  <h5>Email</h5>
                  <a href="mailto:info@coopergamingservices.com">info@coopergamingservices.com</a>
                  <p className="text-muted small mb-0">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="contact-info-content">
                  <h5>Location</h5>
                  <p className="mb-0">Brisbane, Queensland</p>
                  <p className="text-muted small mb-0">Servicing all of QLD</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="contact-info-content">
                  <h5>24/7 Emergency Service</h5>
                  <p className="mb-0">Emergency hotline available</p>
                  <a href="tel:+61400000000" className="text-danger">+61 400 000 000</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left">
            <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${touched.name && errors.name ? 'is-invalid' : touched.name && !errors.name ? 'is-valid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Smith"
                    />
                    {touched.name && errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : touched.email && !errors.email ? 'is-valid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                    />
                    {touched.email && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : touched.phone && !errors.phone ? 'is-valid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="04XX XXX XXX"
                    />
                    {touched.phone && errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="serviceType" className="form-label">
                      Service Required <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${touched.serviceType && errors.serviceType ? 'is-invalid' : touched.serviceType && !errors.serviceType ? 'is-valid' : ''}`}
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select a service...</option>
                      {serviceTypes.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                    {touched.serviceType && errors.serviceType && (
                      <div className="invalid-feedback">{errors.serviceType}</div>
                    )}
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="message" className="form-label">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${touched.message && errors.message ? 'is-invalid' : touched.message && !errors.message ? 'is-valid' : ''}`}
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                    {touched.message && errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                    <div className="form-text">
                      {formData.message.length}/500 characters
                    </div>
                  </div>

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  )
}

export default ContactForm
