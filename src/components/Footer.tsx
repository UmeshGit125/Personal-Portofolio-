import { links, profile } from '../data'
import { externalProps } from './Rich'

export default function Footer() {
  const items = [
    { label: 'GitHub', href: links.github },
    { label: 'LinkedIn', href: links.linkedin },
    { label: 'Email', href: `mailto:${links.email}` },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <span className="logo">
          {profile.initials}
          <span>.</span>
        </span>
        <p>
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <div className="footer-links">
          {items.map((i) => (
            <a key={i.label} href={i.href} className="muted-link" {...externalProps(i.href)}>
              {i.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
