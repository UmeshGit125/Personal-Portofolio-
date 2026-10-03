import { useEffect } from 'react'
import About from './components/About'
import Blog from './components/Blog'
import ChatWidget from './components/ChatWidget'
import Contact from './components/Contact'
import CursorGlow from './components/CursorGlow'
import Marquee from './components/Marquee'
import Education from './components/Education'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

// Adds `.in` to every `.reveal` element the first time it scrolls into view
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()

  return (
    <div className="app">
      <div className="dot-grid" />
      <CursorGlow />
      <div className="app-content">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Education />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  )
}
