import { motion } from 'framer-motion'

interface USP {
  icon: string
  title: string
  description: string
}

const USPs = () => {
  const usps: USP[] = [
    {
      icon: 'bi-lightning-charge',
      title: 'Rapid Response',
      description: 'Average 2-hour response time for emergency service calls across Queensland.'
    },
    {
      icon: 'bi-people',
      title: 'Expert Team',
      description: 'Certified technicians with extensive gaming industry experience and training.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Compliance Guarantee',
      description: 'All services meet Queensland Office of Liquor and Gaming Regulation standards.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Performance Focused',
      description: 'Proven track record of improving machine uptime and venue profitability.'
    },
    {
      icon: 'bi-telephone-outbound',
      title: '24/7 Support',
      description: 'Round-the-clock technical support and emergency call-out services available.'
    },
    {
      icon: 'bi-hand-thumbs-up',
      title: 'Quality Parts',
      description: 'We use only genuine manufacturer parts and components for all repairs.'
    }
  ]

  return (
    <div className="usps-section">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title text-white">What Sets Us Apart</h2>
        </div>

        <div className="row g-4">
          {usps.map((usp, index) => (
            <div 
              className="col-lg-4 col-md-6" 
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <motion.div
                className="usp-card"
              >
                <div className="usp-icon">
                  <i className={`bi ${usp.icon}`}></i>
                </div>
                <h4>{usp.title}</h4>
                <p>{usp.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default USPs
