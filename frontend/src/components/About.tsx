const About = () => {
  return (
    <div className="about-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="about-image-wrapper">
              <img 
                src="/images/about/team.png"
                alt="Cooper Gaming Services Team" 
                className="img-fluid rounded shadow-lg"
              />
              <div className="experience-badge">
                <span className="badge-number">15+</span>
                <span className="badge-text">Years Experience</span>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <div className="about-content">
              <span className="section-tag">About Us</span>
              <h2 className="section-title">Queensland's Premier Gaming Machine Specialists</h2>
              <p className="section-description">
                Cooper Gaming Services has been at the forefront of gaming machine excellence for over 15 years. 
                We pride ourselves on delivering comprehensive solutions that combine technical expertise, 
                regulatory compliance, and outstanding customer service.
              </p>
              
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Fully Licensed & Certified</h4>
                    <p>All our technicians are certified and meet Queensland gaming regulations.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <div className="feature-text">
                    <h4>24/7 Emergency Support</h4>
                    <p>Round-the-clock technical assistance to minimize venue downtime.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="bi bi-award"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Industry Leaders</h4>
                    <p>Trusted by hundreds of venues across Queensland for quality service.</p>
                  </div>
                </div>
              </div>

              <div className="about-stats mt-4">
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Venues Serviced</p>
                </div>
                <div className="stat-item">
                  <h3>2000+</h3>
                  <p>Machines Maintained</p>
                </div>
                <div className="stat-item">
                  <h3>98%</h3>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="row mt-5">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="value-card mt-5">
              <div className="value-icon">
                <i className="bi bi-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide reliable, compliant, and innovative gaming machine solutions that 
                maximize venue performance and customer satisfaction.
              </p>
            </div>
          </div>
          
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="value-card mt-5">
              <div className="value-icon">
                <i className="bi bi-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>
                To be Queensland's most trusted gaming services partner, setting industry 
                standards for technical excellence and customer care.
              </p>
            </div>
          </div>
          
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div className="value-card mt-5">
              <div className="value-icon">
                <i className="bi bi-heart"></i>
              </div>
              <h3>Our Values</h3>
              <p>
                Integrity, excellence, and partnership. We build lasting relationships 
                through transparency, quality workmanship, and responsive service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

//Let us now use PNG images for the logo. The width and height of thelogs are: 22.578 and 6.418.The header is: C:\Users\oyedo\Desktop\Athena\projects\cgs-web\frontend\public\images\logo\cgs-cooper-logo-v2.png

//The footer is: C:\Users\oyedo\Desktop\Athena\projects\cgs-web\frontend\public\images\logo\cgs-cooper-logo-v2.png
