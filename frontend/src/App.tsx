import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AOS from 'aos'
import Header from './components/Header'
import HeroSlider from './components/HeroSlider'
import About from './components/About'
import Services from './components/Services'
import USPs from './components/USPs'
import Commitment from './components/Commitment'
import ResultsCounter from './components/ResultsCounter'
import Locations from './components/Locations'
import CTA from './components/CTA'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <section id="home">
            <HeroSlider />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="services">
            <Services />
          </section>
          
          <section id="why-choose-us">
            <USPs />
          </section>
          <Commitment />
          <ResultsCounter />
          
          <section id="locations">
            <Locations />
          </section>
          
          <CTA />
          
          <section id="contact">
            <ContactForm />
          </section>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
