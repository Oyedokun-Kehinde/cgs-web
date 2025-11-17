import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  cta: string
  ctaLink: string
  image: string
}

const HeroSlider = () => {
  const slides: Slide[] = [
    {
      id: 1,
      title: 'Professional Gaming Machine Solutions',
      subtitle: 'Sales, Service & Maintenance Excellence',
      description: 'Queensland\'s trusted partner for gaming machine services. We deliver reliable solutions tailored to your venue\'s needs.',
      cta: 'Explore Services',
      ctaLink: 'services',
      image: '/images/hero/new-hero.avif'
    },
    {
      id: 2,
      title: 'Expert Technical Support',
      subtitle: '24/7 Service & Rapid Response',
      description: 'Minimize downtime with our dedicated technical team. Fast, efficient repairs and preventative maintenance to keep your machines running.',
      cta: 'Contact Us',
      ctaLink: 'contact',
      image: '/images/hero/hero-2.png'
    },
    {
      id: 3,
      title: 'Compliance & Quality Assured',
      subtitle: 'Fully Licensed & Certified',
      description: 'Our team ensures all gaming equipment meets Queensland regulatory standards. Trust, transparency, and technical excellence.',
      cta: 'Learn More',
      ctaLink: 'about',
      image: '/images/hero/hero-3.png'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="hero-overlay"></div>
              <div className="container">
                <motion.div
                  className="hero-content"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.span className="hero-subtitle" variants={itemVariants}>
                    {slide.subtitle}
                  </motion.span>
                  <motion.h1 className="hero-title" variants={itemVariants}>
                    {slide.title}
                  </motion.h1>
                  <motion.p className="hero-description" variants={itemVariants}>
                    {slide.description}
                  </motion.p>
                  <motion.div className="hero-actions" variants={itemVariants}>
                    <a href={`#${slide.ctaLink}`} className="btn btn-primary btn-lg">
                      {slide.cta}
                    </a>
                    <a href="#about" className="btn btn-outline-light btn-lg ms-3">
                      About Us
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HeroSlider
