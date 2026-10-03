import { useEffect, useState } from 'react'
import { blog, links, profile } from '../data'
import ThemeToggle from './ThemeToggle'

const allLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const navLinks = allLinks.filter((l) => l.id !== 'blog' || blog.show)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = ['home', ...navLinks.map((l) => l.id)]
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(ids[i])
          return
        }
      }
      setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo" onClick={close}>
          {profile.initials}
          <span>.</span>
        </a>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link${active === l.id ? ' active' : ''}`}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
          <a href={links.resume} download className="nav-link" onClick={close}>
            Resume ↓
          </a>
          <a href="#contact" className="btn btn-primary" onClick={close}>
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}
