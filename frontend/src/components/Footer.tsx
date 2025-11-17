import { Link as ScrollLink } from 'react-scroll'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    'Gaming Machine Sales',
    'Technical Service & Repairs',
    'Preventative Maintenance',
    'Consultation & Installation'
  ]

  const quickLinks = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'services', label: 'Services' },
    { to: 'locations', label: 'Locations' },
    { to: 'contact', label: 'Contact' }
  ]

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <img 
                src="/images/logo/cgs-cooper-logo-v1.png" 
                alt="Cooper Gaming Services" 
                className="footer-logo mb-3"
                style={{ width: '180px', height: 'auto' }}
              />
              <p className="footer-description">
                Queensland's premier gaming machine specialists, providing comprehensive 
                sales, service, and maintenance solutions for over 15 years.
              </p>
              <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <ScrollLink to={link.to} smooth={true} duration={500}>
                      {link.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="footer-title">Our Services</h5>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <ScrollLink to="services" smooth={true} duration={500}>
                      {service}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <h5 className="footer-title">Contact Us</h5>
              <ul className="footer-contact">
                <li>
                  <i className="bi bi-geo-alt"></i>
                  <span>Brisbane, Queensland, Australia</span>
                </li>
                <li>
                  <i className="bi bi-telephone"></i>
                  <a href="tel:+61712345678">+61 7 1234 5678</a>
                </li>
                <li>
                  <i className="bi bi-envelope"></i>
                  <a href="mailto:info@coopergamingservices.com">info@coopergamingservices.com</a>
                </li>
                <li>
                  <i className="bi bi-clock"></i>
                  <span>Mon-Fri: 8AM-6PM, Sat: 9AM-1PM</span>
                </li>
              </ul>
              <div className="emergency-contact mt-3">
                <strong>24/7 Emergency Service:</strong>
                <a href="tel:+61400000000" className="d-block text-danger">
                  <i className="bi bi-telephone-fill"></i> +61 400 000 000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                &copy; {currentYear} Cooper Gaming Services. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                Website Crafted by <a href="https://athenanetworks.com.au/" target="_blank" rel="noopener noreferrer" className="text-danger">Athena Networks</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollLink
        to="home"
        smooth={true}
        duration={500}
        className="scroll-to-top"
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up"></i>
      </ScrollLink>
    </footer>
  )
}

export default Footer
