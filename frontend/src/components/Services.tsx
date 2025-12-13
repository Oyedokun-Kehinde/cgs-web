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
      icon: 'bi-dice-5',
      title: 'Gaming Room Design & Consoles',
      description: 'Professional gaming room design and console base installations. We partner with leading manufacturers to deliver complete gaming floor solutions, including custom bases and full room layouts.',
      features: [
        'Custom room design',
        'Console base supply & installation',
        'Partnership with premium manufacturers',
        'Complete floor solutions'
      ],
      image: '/images/services/service-gaming-room.jpeg'
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
      image: '/images/services/service-technical.jpeg'
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
      icon: 'bi-shop',
      title: 'Retail IT Support',
      description: 'Comprehensive retail technology solutions including POS systems, EFTPOS terminals, and hardware support. We supply, install, repair, and maintain systems from leading brands.',
      features: [
        'POS repairs, supply & installation',
        'EFTPOS (Verifone, Ingenico, Paynuts)',
        'Hardware support (Toshiba, IBM, Fujitsu)',
        'Ongoing maintenance'
      ],
      image: '/images/services/service-retail-it.jpeg'
    },
    {
      id: 5,
      icon: 'bi-cash-coin',
      title: 'Pay Systems Repairs & Maintenance',
      description: 'Specialist service for ATMs, note counters, and note recyclers. We ensure your payment systems operate reliably with expert repairs, maintenance, and compliance support.',
      features: [
        'ATM service & repairs',
        'Note counter maintenance',
        'Note recycler support',
        'Compliance & reliability'
      ],
      image: '/images/services/service-pay-systems.jpeg'
    },
    {
      id: 6,
      icon: 'bi-tv',
      title: 'Digital Signage',
      description: 'Professional LED signage installation and service. We deliver eye-catching digital displays for your venue, with full installation support and ongoing maintenance.',
      features: [
        'LED display installation',
        'Professional setup',
        'Content management support',
        'Service & maintenance'
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
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
          <h2 className="section-title">Comprehensive Gaming & Technology Solutions</h2>
          <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
            From gaming room design to retail IT support, we deliver complete technology services
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

                  <a href="#contact" className="btn btn-primary mt-3">
                    Get Started
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
