import { motion } from 'framer-motion'

interface Service {
  id: number
  icon: string
  title: string
  description: string
  features: string[]
  image: string
}

const Services = () => {
  const services: Service[] = [
    {
      id: 1,
      icon: 'bi-cart-check',
      title: 'Gaming Machine Sales',
      description: 'Browse our extensive range of new and certified refurbished gaming machines. We offer premium EGMs from leading manufacturers, tailored to suit your venue\'s requirements and budget.',
      features: [
        'New & refurbished equipment',
        'Premium brand selection',
        'Competitive pricing',
        'Full warranty coverage'
      ],
      image: '/images/services/service-sales.png'
    },
    {
      id: 2,
      icon: 'bi-tools',
      title: 'Technical Service & Repairs',
      description: 'Our expert technicians provide rapid response repairs and technical support. We diagnose and resolve issues efficiently to minimize machine downtime and maintain peak venue performance.',
      features: [
        '24/7 emergency call-outs',
        'Certified technicians',
        'Diagnostic excellence',
        'Fast turnaround times'
      ],
      image: '/images/services/service-repairs.png'
    },
    {
      id: 3,
      icon: 'bi-gear',
      title: 'Preventative Maintenance',
      description: 'Regular scheduled maintenance programs designed to extend machine lifespan, ensure regulatory compliance, and prevent costly breakdowns. Proactive care for optimal performance.',
      features: [
        'Scheduled servicing',
        'Compliance inspections',
        'Performance optimization',
        'Detailed reporting'
      ],
      image: '/images/services/service-maintenance.png'
    },
    {
      id: 4,
      icon: 'bi-lightbulb',
      title: 'Consultation & Installation',
      description: 'From initial venue assessment to full installation and staff training, we provide end-to-end solutions. Our consultants work with you to design the perfect gaming floor layout.',
      features: [
        'Venue assessment',
        'Floor planning',
        'Complete installation',
        'Staff training'
      ],
      image: '/images/services/service-consultation.png'
    }
  ]

  const cardVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="services-section py-5">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">Comprehensive Gaming Solutions</h2>
          <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
            From sales to ongoing support, we deliver complete gaming machine services 
            that keep your venue running smoothly and profitably.
          </p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div 
              className="col-lg-6" 
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <motion.div
                className="service-card service-card-danger"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-icon">
                  <i className={`bi ${service.icon}`}></i>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="bi bi-check-circle"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#contact" className="btn btn-danger mt-3">
                    Learn More
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Additional Service Info */}
        <div className="service-cta-box mt-5" data-aos="fade-up">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3>Need a Custom Solution?</h3>
              <p className="mb-0">
                We understand every venue is unique. Contact us to discuss tailored 
                gaming solutions designed specifically for your business needs.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <a href="#contact" className="btn btn-light btn-lg">
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
