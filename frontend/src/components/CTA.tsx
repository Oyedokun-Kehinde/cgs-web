const CTA = () => {
  return (
    <div className="cta-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8" data-aos="fade-right">
            <h2>Ready to Elevate Your Gaming Operations?</h2>
            <p>
              Partner with Queensland's leading gaming machine specialists. 
              Get a free consultation and discover how we can optimize your venue's performance.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0" data-aos="fade-left">
            <a href="#contact" className="btn btn-light btn-lg me-2 mb-2">
              <i className="bi bi-chat-dots me-2"></i>
              Get Free Quote
            </a>
            <a href="tel:+61712345678" className="btn btn-outline-light btn-lg mb-2">
              <i className="bi bi-telephone me-2"></i>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA
