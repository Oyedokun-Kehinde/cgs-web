import { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'services', label: 'Services' },
    { to: 'why-choose-us', label: 'Why Choose Us' },
    { to: 'locations', label: 'Locations' },
    { to: 'contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="top-bar-info">
              <span className="info-item">
                <i className="bi bi-envelope"></i>
                <a href="mailto:info@coopergamingservices.com">info@coopergamingservices.com</a>
              </span>
              <span className="info-item">
                <i className="bi bi-telephone"></i>
                <a href="tel:+61712345678">+61 7 1234 5678</a>
              </span>
              <span className="info-item">
                <i className="bi bi-geo-alt"></i>
                Brisbane, Queensland
              </span>
              <span className="info-item">
                <i className="bi bi-clock"></i>
                Mon-Fri: 8AM-6PM | Sat: 9AM-1PM
              </span>
            </div>
            <div className="top-bar-social ms-auto">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <ScrollLink 
              to="home" 
              smooth={true} 
              duration={500}
              className="navbar-brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img 
                src="/images/logo/new-header-logo.png" 
                alt="Cooper Gaming Services" 
                className="brand-logo"
                style={{ width: '22.51cm', height: '6.62cm' }}
              />
            </ScrollLink>

            <button
              className={`navbar-toggler ${mobileMenuOpen ? 'active' : ''}`}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Desktop Menu */}
            <div className="collapse navbar-collapse d-none d-lg-flex">
              <ul className="navbar-nav ms-auto">
                {navLinks.map((link) => (
                  <li className="nav-item" key={link.to}>
                    <ScrollLink
                      to={link.to}
                      smooth={true}
                      duration={500}
                      spy={true}
                      offset={-80}
                      className="nav-link"
                      activeClass="active"
                    >
                      {link.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="btn btn-primary ms-lg-3"
              >
                Get Quote
              </ScrollLink>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Off-Canvas Menu */}
      <div className={`offcanvas-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="offcanvas-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="offcanvas-content">
          <div className="offcanvas-header">
            <h3>Menu</h3>
            <button className="close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-80}
                    activeClass="active"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="btn btn-primary btn-lg w-100 mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </ScrollLink>
            <div className="offcanvas-contact mt-4">
              <h5>Contact Us</h5>
              <p><i className="bi bi-telephone"></i> +61 7 1234 5678</p>
              <p><i className="bi bi-envelope"></i> info@coopergamingservices.com</p>
              <p><i className="bi bi-clock"></i> Mon-Fri: 8AM-6PM</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
