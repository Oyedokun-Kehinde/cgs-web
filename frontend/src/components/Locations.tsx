interface Location {
  region: string
  areas: string[]
  icon: string
}

const Locations = () => {
  const locations: Location[] = [
    {
      region: 'Bundaberg',
      areas: ['Bundaberg Central', 'Bundaberg North', 'Bundaberg South', 'Bundaberg East', 'Bundaberg West'],
      icon: 'bi-building'
    },
    {
      region: 'Gympie',
      areas: ['Gympie Central', 'Gympie South', 'Gympie North', 'Cooloola', 'Surrounding Areas'],
      icon: 'bi-geo-alt'
    },
    {
      region: 'Hervey Bay',
      areas: ['Urangan', 'Pialba', 'Torquay', 'Scarness', 'Point Vernon'],
      icon: 'bi-water'
    },
    {
      region: 'Maryborough',
      areas: ['Maryborough Central', 'Maryborough West', 'Tinana', 'Granville', 'Surrounding Areas'],
      icon: 'bi-sun'
    }
  ]

  return (
    <div className="locations-section py-5">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="section-tag">Service Areas</span>
          <h2 className="section-title">We Service All of Queensland</h2>
          <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
            Our mobile technicians cover major metropolitan areas and regional Queensland, 
            providing fast, reliable gaming and technology services wherever you need us.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {locations.map((location, index) => (
            <div 
              className="col-lg-3 col-md-6" 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="location-card">
                <div className="location-icon">
                  <i className={`bi ${location.icon}`}></i>
                </div>
                <h4>{location.region}</h4>
                <ul className="location-list">
                  {location.areas.map((area, idx) => (
                    <li key={idx}>
                      <i className="bi bi-check2"></i>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="map-container" data-aos="fade-up">
          <div className="map-placeholder">
            <iframe
              title="Cooper Gaming Services Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57909.39675089747!2d152.28147713382342!3d-24.886473895391383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6bebb93f0664d9a3%3A0x400eef17f20d7c0!2sBundaberg%20QLD%204670!5e0!3m2!1sen!2sau!4v1765404675393!5m2!1sen!2sau"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          <div className="location-info-overlay">
            <div className="info-box">
              <h5>Head Office</h5>
              <p>
                <i className="bi bi-geo-alt"></i>
                Bundaberg, Queensland
              </p>
              <p>
                <i className="bi bi-telephone"></i>
                <a href="tel:0433323606">0433 323 606</a>
              </p>
              <p>
                <i className="bi bi-envelope"></i>
                <a href="mailto:info@coopergamingservices.com">info@coopergamingservices.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-muted">
            <i className="bi bi-info-circle"></i> Can't find your location? 
            <a href="#contact" className="ms-2">Contact us</a> to discuss service availability in your area.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Locations
