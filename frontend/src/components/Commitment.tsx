interface CommitmentItem {
  icon: string
  title: string
  description: string
}

const Commitment = () => {
  const commitments: CommitmentItem[] = [
    {
      icon: 'bi-patch-check',
      title: 'Licensed & Insured',
      description: 'Fully licensed gaming service provider with comprehensive public liability insurance'
    },
    {
      icon: 'bi-mortarboard',
      title: 'Ongoing Training',
      description: 'Our team undergoes continuous professional development and manufacturer training'
    },
    {
      icon: 'bi-bookmark-star',
      title: 'Industry Accredited',
      description: 'Member of Gaming Technologies Association and industry bodies'
    },
    {
      icon: 'bi-globe',
      title: 'Environmental Care',
      description: 'Responsible disposal and recycling of gaming machine components'
    },
    {
      icon: 'bi-shield-check',
      title: 'Compliance Experts',
      description: 'Up-to-date with Queensland gaming regulations and compliance requirements'
    },
    {
      icon: 'bi-award',
      title: 'Quality Guarantee',
      description: 'All work backed by our comprehensive service warranty and satisfaction guarantee'
    }
  ]

  return (
    <div className="commitment-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5" data-aos="fade-right">
            <div className="commitment-image mb-4">
              <img 
                src="/images/commitment/certification.png"
                alt="Cooper Gaming Services Certifications"
                className="img-fluid rounded shadow"
              />
            </div>
            
            <span className="section-tag">Our Commitment</span>
            <h2 className="section-title">Trust, Quality & Excellence</h2>
            
            <p className="section-description">
              Cooper Gaming Services is committed to upholding the highest standards of 
              professionalism, safety, and service quality. Our certifications and industry 
              memberships reflect our dedication to excellence.
            </p>
            <p>
              We believe in building long-term partnerships with our clients through 
              transparency, reliability, and delivering exceptional results every time.
            </p>
            
            <a href="#contact" className="btn btn-primary mt-3">
              Start Your Partnership
            </a>
          </div>

          <div className="col-lg-7" data-aos="fade-left" data-aos-delay="200">
            <div className="row g-3">
              {commitments.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="commitment-card">
                    <div className="commitment-icon">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Commitment
