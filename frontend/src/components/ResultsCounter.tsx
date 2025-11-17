import { useState } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

interface Stat {
  end: number
  suffix: string
  label: string
  icon: string
}

const ResultsCounter = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  if (inView && !hasAnimated) {
    setHasAnimated(true)
  }

  const stats: Stat[] = [
    {
      end: 500,
      suffix: '+',
      label: 'Venues Serviced',
      icon: 'bi-building'
    },
    {
      end: 2000,
      suffix: '+',
      label: 'Machines Maintained',
      icon: 'bi-gear-wide-connected'
    },
    {
      end: 15,
      suffix: '+',
      label: 'Years Experience',
      icon: 'bi-calendar-check'
    },
    {
      end: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      icon: 'bi-emoji-smile'
    }
  ]

  return (
    <div className="results-section" ref={ref}>
      <div className="container">
        <div className="row text-center">
          {stats.map((stat, index) => (
            <div 
              className="col-lg-3 col-md-6 col-6 mb-4 mb-lg-0" 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="stat-box">
                <div className="stat-icon">
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <h3 className="stat-number">
                  {hasAnimated ? (
                    <CountUp
                      end={stat.end}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    '0'
                  )}
                </h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResultsCounter
